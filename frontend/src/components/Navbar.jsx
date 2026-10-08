import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Contact', '#contact']
];
import ThemeToggle from './ThemeToggle';
import Banner from './Banner';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);
  return (
    <header className="site-header">
      <Banner />
      <nav className="navbar" aria-label="Main navigation">
        <a href="#home" className="nav-brand" aria-label="Steven Jackson home">
          sj<span>.</span>
        </a>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <a
            className="nav-connect"
            href="https://www.linkedin.com/in/steven-jackson-62b795193/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            className="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="nav-mobile-dropdown" id="mobile-navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setIsOpen(false)}>
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
