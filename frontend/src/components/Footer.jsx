import SpotifyWidget from './SpotifyWidget';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a href="#home" className="nav-brand" aria-label="Back to top">
          sj<span>.</span>
        </a>
        <p>Built with React, good vibes and listening to some tunes.</p>
        <SpotifyWidget />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Steven Jackson</span>
        <span>Personal portfolio · Views are my own.</span>
      </div>
    </footer>
  );
}
