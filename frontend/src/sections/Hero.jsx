import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import irlPic from '../assets/20260925_185912(1).jpg';
import { certificationLinks } from '../data/data';

export default function Hero() {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-text">
        <p className="eyebrow">
          <span className="status-dot" /> AI & DATA CONSULTANT AT EY
        </p>
        <h1 id="hero-title">
          Hi, I’m Steven.
          <br />
          Building software.
          <br />
          <span className="hero-emphasis">Connecting data.</span>
        </h1>
        <p className="hero-description">
          I build applications, APIs and data pipelines. My work brings
          together software development, data engineering and practical uses of
          AI.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#projects">
            Explore my work <ArrowDown size={17} />
          </a>
          <a className="text-link" href="#contact">
            Let’s connect <ArrowUpRight size={17} />
          </a>
        </div>
        <p className="location">
          <MapPin size={14} /> From Belfast.
        </p>
      </div>
      <div className="hero-aside">
        <div className="portrait-card">
          <div className="portrait-image">
            <img src={irlPic} alt="Steven Jackson" />
          </div>
          <div className="portrait-caption">
            <div>
              <strong>Steven Jackson</strong>
              <span>Consultant. Developer. Always learning.</span>
            </div>
          </div>
        </div>
        <a
          className="cert-note"
          href={certificationLinks.databricks}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cert-mark">✳</span>
          <div>
            <span className="eyebrow">DATABRICKS CERTIFIED</span>
            <strong>Generative AI Engineer Associate</strong>
          </div>
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">
            Verify credential (opens in a new tab)
          </span>
        </a>
        <a
          className="cert-note"
          href={certificationLinks.microsoft}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cert-mark">◇</span>
          <div>
            <span className="eyebrow">MICROSOFT CERTIFIED · DP-900</span>
            <strong>Azure Data Fundamentals</strong>
          </div>
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">
            Verify credential (opens in a new tab)
          </span>
        </a>
      </div>
      <div className="hero-bottom">
        <span>SOFTWARE · DATA · AI</span>
        <a href="#about">
          A bit more about me <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
