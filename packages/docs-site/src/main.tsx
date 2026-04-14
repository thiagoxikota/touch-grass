import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { App } from './App';

// Vite injects BASE_URL. In dev it's "/", in production builds it matches
// vite.config.ts `base` (e.g. "/touch-grass/"). react-router needs this so
// all in-app navigation stays inside the subpath when deployed at
// timeouts.app/touch-grass.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
