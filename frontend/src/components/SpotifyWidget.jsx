import { useState, useEffect } from 'react';
import { Music2 } from 'lucide-react';

const endpoint = import.meta.env.VITE_SPOTIFY_ENDPOINT || '/api/now-playing';

export default function SpotifyWidget() {
  const [track, setTrack] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let disposed = false;
    let timer;
    let controller;
    const fetchTrack = async () => {
      if (disposed) return;
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok) throw new Error('Spotify is unavailable');
        const data = response.status === 204 ? null : await response.json();
        if (data?.error) throw new Error('Spotify is unavailable');
        if (!disposed) {
          const validTrack =
            data?.title &&
            data?.artist &&
            /^https:\/\/open\.spotify\.com\//.test(data?.songUrl || '');
          setTrack(validTrack ? data : null);
          setStatus(validTrack ? 'ready' : 'empty');
        }
      } catch {
        if (!disposed) {
          setTrack(null);
          setStatus('unavailable');
        }
      } finally {
        clearTimeout(timeout);
        if (!disposed) timer = setTimeout(fetchTrack, 60000);
      }
    };
    fetchTrack();
    return () => {
      disposed = true;
      clearTimeout(timer);
      controller?.abort();
    };
  }, []);

  return (
    <div className="spotify-widget">
      <Music2 size={17} className="spotify-icon" aria-hidden="true" />
      {track ? (
        <>
          {track.albumArt && (
            <img
              src={track.albumArt}
              alt={track.album || 'Album artwork'}
              className="spotify-album-art"
            />
          )}
          <div className="spotify-info">
            <p className="spotify-label">
              {track.isPlaying ? 'ON REPEAT · NOW PLAYING' : 'LAST LISTENED TO'}
            </p>
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-title"
            >
              {track.title}
            </a>
            <p className="spotify-artist">{track.artist}</p>
          </div>
        </>
      ) : (
        <span className="spotify-empty">
          {status === 'loading'
            ? 'Checking the soundtrack…'
            : status === 'empty'
              ? 'Nothing on the turntable right now.'
              : 'The soundtrack is taking a break.'}
        </span>
      )}
    </div>
  );
}
