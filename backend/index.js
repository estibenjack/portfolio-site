const express = require('express');
const cors = require('cors');
require('dotenv').config({
  path: require('node:path').join(__dirname, '.env')
});
const { createSpotifyClient } = require('./spotify');

function createApp({
  spotify = createSpotifyClient({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
  })
} = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
  app.get('/api/now-playing', async (_req, res) => {
    res.set('Cache-Control', 'no-store');
    try {
      return res.json(await spotify.getNowPlaying());
    } catch (error) {
      const status = error.status || 502;
      console.error('Spotify widget:', error.message);
      if (error.retryAfter) res.set('Retry-After', String(error.retryAfter));
      return res
        .status(status)
        .json({ error: 'Listening data is currently unavailable' });
    }
  });
  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 8888;
  createApp().listen(port, () => console.log('Server running on port ' + port));
}
module.exports = { createApp };
