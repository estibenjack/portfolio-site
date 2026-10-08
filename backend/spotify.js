// All Spotify credentials stay on the server.
class SpotifyError extends Error {
  constructor(message, status = 502, retryAfter = null) {
    super(message);
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

function normaliseTrack(track, isPlaying = false) {
  if (
    !track?.name ||
    !Array.isArray(track.artists) ||
    !track.external_urls?.spotify
  )
    return null;
  return {
    isPlaying: Boolean(isPlaying),
    title: track.name,
    artist: track.artists
      .map((artist) => artist.name)
      .filter(Boolean)
      .join(', '),
    album: track.album?.name || '',
    albumArt: track.album?.images?.[0]?.url || null,
    songUrl: track.external_urls.spotify
  };
}

function createSpotifyClient({
  clientId,
  clientSecret,
  refreshToken,
  fetchImpl = fetch,
  now = Date.now
}) {
  let token;
  let tokenExpiresAt = 0;
  let tokenRequest;
  let cachedTrack;
  let cacheExpiresAt = 0;
  let trackRequest;
  let retryAt = 0;
  const configured = Boolean(clientId && clientSecret && refreshToken);

  const request = (url, options = {}) =>
    fetchImpl(url, { ...options, signal: AbortSignal.timeout(10000) });
  const getAccessToken = async () => {
    if (token && now() < tokenExpiresAt) return token;
    if (tokenRequest) return tokenRequest;
    tokenRequest = (async () => {
      const response = await request('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      });
      if (!response.ok)
        throw new SpotifyError('Spotify authentication failed', 503);
      const data = await response.json();
      if (!data.access_token)
        throw new SpotifyError('Spotify did not provide an access token', 503);
      token = data.access_token;
      if (data.refresh_token) refreshToken = data.refresh_token;
      tokenExpiresAt =
        now() + Math.max(0, (Number(data.expires_in) || 3600) - 60) * 1000;
      return token;
    })();
    try {
      return await tokenRequest;
    } finally {
      tokenRequest = null;
    }
  };

  const spotifyRequest = async (path, allowRetry = true) => {
    const accessToken = await getAccessToken();
    const response = await request('https://api.spotify.com/v1/me/' + path, {
      headers: { Authorization: 'Bearer ' + accessToken }
    });
    if (response.status === 401 && allowRetry) {
      token = null;
      tokenExpiresAt = 0;
      return spotifyRequest(path, false);
    }
    if (response.status === 429) {
      const seconds = Math.max(
        1,
        Number(response.headers.get('retry-after')) || 60
      );
      retryAt = now() + seconds * 1000;
      throw new SpotifyError('Spotify rate limit reached', 503, seconds);
    }
    if (!response.ok)
      throw new SpotifyError(
        'Spotify request failed (' + response.status + ')',
        response.status === 401 || response.status === 403 ? 503 : 502
      );
    if (response.status === 204) return null;
    return response.json();
  };

  const getNowPlaying = async () => {
    if (!configured) throw new SpotifyError('Spotify is not configured', 503);
    if (now() < retryAt)
      throw new SpotifyError(
        'Spotify rate limit reached',
        503,
        Math.ceil((retryAt - now()) / 1000)
      );
    if (now() < cacheExpiresAt) return cachedTrack;
    if (trackRequest) return trackRequest;
    trackRequest = (async () => {
      const current = await spotifyRequest('player/currently-playing');
      // Podcasts, ads, and missing items must not be parsed as music tracks.
      let track =
        current?.currently_playing_type !== 'episode' &&
        current?.currently_playing_type !== 'ad'
          ? normaliseTrack(current?.item, current?.is_playing)
          : null;
      if (!track) {
        const recent = await spotifyRequest('player/recently-played?limit=1');
        track = normaliseTrack(recent?.items?.[0]?.track);
      }
      cachedTrack = track || { isPlaying: false };
      // Keep request sharing without holding a paused state for too long.
      cacheExpiresAt = now() + 5000;
      return cachedTrack;
    })();
    try {
      return await trackRequest;
    } finally {
      trackRequest = null;
    }
  };
  return { getNowPlaying };
}

module.exports = { createSpotifyClient, normaliseTrack, SpotifyError };
