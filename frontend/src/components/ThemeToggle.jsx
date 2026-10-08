import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light'
  );

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const updateFromSystem = () => {
      try {
        if (['light', 'dark'].includes(localStorage.getItem('portfolio-theme')))
          return;
      } catch {
        /* System preference still works when storage is unavailable. */
      }
      setTheme(systemTheme.matches ? 'dark' : 'light');
    };
    systemTheme.addEventListener('change', updateFromSystem);
    return () => systemTheme.removeEventListener('change', updateFromSystem);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      /* Keep the toggle usable without storage. */
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
