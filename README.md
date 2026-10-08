# Steven Jackson — portfolio

Personal portfolio built with React and Vite, with a small Express backend for Spotify listening data.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci --prefix frontend
npm ci --prefix backend
npm run dev --prefix frontend
```

In another terminal, start the Spotify backend:

```sh
npm run dev --prefix backend
```

Vite forwards `/api` requests to `http://localhost:8888`.

## Spotify configuration

Copy `backend/.env.example` to `backend/.env` and fill in your Spotify client ID, client secret, and refresh token. These values belong only on the backend.

The refresh token needs both `user-read-currently-playing` and `user-read-recently-played` permissions. If the old token was revoked or lacks those permissions, authorise your Spotify app again to obtain a new one. See Spotify's [currently playing](https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track), [recently played](https://developer.spotify.com/documentation/web-api/reference/get-recently-played), and [token refresh](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens) documentation.

The backend handles empty history, unavailable playback, authentication errors, podcasts, and rate limits. Access tokens and successful track responses are cached to reduce upstream traffic. Failed upstream requests return a generic error, and the frontend shows a quiet fallback.

For a separate production backend, copy `frontend/.env.example` to `frontend/.env` and set `VITE_SPOTIFY_ENDPOINT` to its full HTTPS `/api/now-playing` URL. Set this variable in the frontend host's build environment before rebuilding. Set `FRONTEND_ORIGIN` on the backend to the deployed frontend origin. Without an override, the frontend uses the same-origin `/api/now-playing` path; the Vite proxy only applies in development.

Live Spotify verification requires valid server credentials, which are not included in this repository.

## Edit content

- `frontend/src/data/data.js`: skill groups and project descriptions, technologies, links, categories, and status notes.
- `frontend/src/sections/Hero.jsx` and `About.jsx`: introduction, current EY role, and ongoing MSc.
- `frontend/src/style.css`: colours, layout, and responsive styles.

Project visuals are illustrative concept previews, not screenshots of the applications. Academy and ongoing MSc work are clearly labelled and do not show invented repository or demo links.

The TfL description and stack are based on the [project README](https://github.com/estibenjack/azure-tfl-network-status-pipeline).

## Validate and build

```sh
npm run lint --prefix frontend
npm run build --prefix frontend
npm test --prefix backend
```

The production frontend output is `frontend/dist`. Deploy it with your existing static hosting setup, and deploy the backend separately or route the same-origin API to it.
