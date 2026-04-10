import { useState, useEffect } from 'react';

const SpotifyWidget = () => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch(
          'https://portfolio-site-backend-m6yo.onrender.com/api/now-playing'
        );
        const data = await response.json();
        setTrack(data);
      } catch (err) {
        console.error(`Error fetching Spotify data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return null;
  if (!track) return null;

  return (
    <div className="spotify-widget">
      <p className="spotify-label">
        {track.isPlaying ? '▶ Now listening to:' : '⏸ Last listened to:'}
      </p>
      <div className="spotify-content">
        <img
          src={track.albumArt}
          alt={track.album}
          className="spotify-album-art"
        />
        <div className="spotify-info">
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
      </div>
    </div>
  );
};

export default SpotifyWidget;
