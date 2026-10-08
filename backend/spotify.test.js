const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createSpotifyClient } = require('./spotify');
const { createApp } = require('./index');

const track = {
  name: 'Test track',
  artists: [{ name: 'Artist' }],
  album: { name: 'Album', images: [{ url: 'https://example.com/cover.jpg' }] },
  external_urls: { spotify: 'https://open.spotify.com/track/test' }
};
const token = () =>
  Response.json({ access_token: 'access-token', expires_in: 3600 });
function clientWith(responses, options = {}) {
  const calls = [];
  return {
    calls,
    client: createSpotifyClient({
      clientId: 'id',
      clientSecret: 'secret',
      refreshToken: 'refresh',
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        if (!responses.length) throw new Error('Unexpected upstream call');
        return responses.shift()();
      },
      ...options
    })
  };
}

test('current music is normalised and concurrent requests share upstream work', async () => {
  const { client, calls } = clientWith([
    token,
    () => Response.json({ item: track, is_playing: true })
  ]);
  const [a, b] = await Promise.all([
    client.getNowPlaying(),
    client.getNowPlaying()
  ]);
  assert.equal(a.title, 'Test track');
  assert.equal(a.isPlaying, true);
  assert.deepEqual(a, b);
  assert.equal(calls.length, 2);
  await client.getNowPlaying();
  assert.equal(calls.length, 2);
});

test('204 falls back to recent listening', async () => {
  const { client } = clientWith([
    token,
    () => new Response(null, { status: 204 }),
    () => Response.json({ items: [{ track }] })
  ]);
  assert.equal((await client.getNowPlaying()).isPlaying, false);
});

test('empty history is a valid empty state', async () => {
  const { client } = clientWith([
    token,
    () => Response.json({ item: null }),
    () => Response.json({ items: [] })
  ]);
  assert.deepEqual(await client.getNowPlaying(), { isPlaying: false });
});

test('episodes fall back to music without dereferencing missing artist fields', async () => {
  const { client } = clientWith([
    token,
    () =>
      Response.json({
        currently_playing_type: 'episode',
        item: { name: 'Podcast' }
      }),
    () => Response.json({ items: [{ track: { ...track, album: {} } }] })
  ]);
  const result = await client.getNowPlaying();
  assert.equal(result.title, 'Test track');
  assert.equal(result.albumArt, null);
});

test('authentication failure stops before playback requests', async () => {
  const { client, calls } = clientWith([
    () => Response.json({ error: 'invalid_grant' }, { status: 400 })
  ]);
  await assert.rejects(client.getNowPlaying(), { status: 503 });
  assert.equal(calls.length, 1);
});

test('missing credentials make no upstream calls', async () => {
  const { client, calls } = clientWith([], { clientId: '' });
  await assert.rejects(client.getNowPlaying(), { status: 503 });
  assert.equal(calls.length, 0);
});

test('401 refreshes the access token and retries once', async () => {
  const { client, calls } = clientWith([
    token,
    () => new Response(null, { status: 401 }),
    token,
    () => Response.json({ item: track, is_playing: true })
  ]);
  assert.equal((await client.getNowPlaying()).title, 'Test track');
  assert.equal(calls.length, 4);
});

test('403 is not mistaken for no playback', async () => {
  const { client, calls } = clientWith([
    token,
    () => new Response(null, { status: 403 })
  ]);
  await assert.rejects(client.getNowPlaying(), { status: 503 });
  assert.equal(calls.length, 2);
});

test('rate limits honour Retry-After and suppress new upstream requests', async () => {
  const { client, calls } = clientWith([
    token,
    () => new Response(null, { status: 429, headers: { 'Retry-After': '120' } })
  ]);
  await assert.rejects(client.getNowPlaying(), {
    status: 503,
    retryAfter: 120
  });
  await assert.rejects(client.getNowPlaying(), (error) => error.retryAfter > 0);
  assert.equal(calls.length, 2);
});

test('track cache expiry does not unnecessarily refresh an unexpired access token', async () => {
  let clock = 100000;
  const { client, calls } = clientWith(
    [
      token,
      () => Response.json({ item: track }),
      () => Response.json({ item: track })
    ],
    { now: () => clock }
  );
  await client.getNowPlaying();
  clock += 31000;
  await client.getNowPlaying();
  assert.equal(calls.length, 3);
});

test('HTTP endpoint returns generic errors without exposing credentials', async () => {
  const server = createApp({
    spotify: {
      getNowPlaying: async () => {
        const error = new Error('private upstream failure');
        error.status = 503;
        error.retryAfter = 30;
        throw error;
      }
    }
  }).listen(0, '127.0.0.1');
  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const response = await fetch(
      'http://127.0.0.1:' + server.address().port + '/api/now-playing'
    );
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('retry-after'), '30');
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await response.json(), {
      error: 'Listening data is currently unavailable'
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
