// import myPic from '../assets/steven_photo.png';
import pixelPic from '../assets/pixel_art_me.png';
import irlPic from '../assets/real_life_me.png';
import SocialLinks from '../components/SocialLinks';
import { useState } from 'react';

const Hero = () => {
  const [isPixel, setIsPixel] = useState(true);

  return (
    <div className="hero-section">
      <div className="hero-text">
        <p className="above-name">Hi! I'm</p>
        <h1 className="hero-name text-gradient">Steven Jackson</h1>
        <p className="hero-job-title">software engineer</p>
        <SocialLinks />
      </div>
      <div className="hero-img-wrapper">
        <img src={isPixel ? pixelPic : irlPic} alt="Photo of Steven" />
        <button onClick={() => setIsPixel(!isPixel)}>
          {isPixel ? 'Unpixelate!' : 'Pixelate!'}
        </button>
      </div>
    </div>
  );
};

export default Hero;
