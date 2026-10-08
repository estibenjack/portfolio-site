import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function Banner() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`banner ${paused ? 'banner-paused' : ''}`}>
      <span className="sr-only">Work in progress — still building</span>
      <div className="banner-track" aria-hidden="true">
        {[0, 1].map(group => (
          <div className="banner-group" key={group}>
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index}>Work in progress — still building <span className="banner-star">✳</span></span>
            ))}
          </div>
        ))}
      </div>
      <span className="banner-static" aria-hidden="true">Work in progress — still building</span>
      <button className="banner-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume banner animation' : 'Pause banner animation'} aria-pressed={paused}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
      </button>
    </div>
  );
}

