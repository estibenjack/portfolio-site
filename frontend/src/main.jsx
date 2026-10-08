import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import './tech-theme.css';
import './themes.css';
import './motion.css';
import './banner.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
