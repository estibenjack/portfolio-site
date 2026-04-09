import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <a href="/" className="nav-username">
          @estibenjack
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="nav-hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {isOpen && (
        <div className="nav-mobile-dropdown">
          <a href="#about" onClick={() => setIsOpen(false)}>
            About
          </a>
          <a href="#projects" onClick={() => setIsOpen(false)}>
            Projects
          </a>
          <a href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
