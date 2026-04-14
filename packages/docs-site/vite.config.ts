import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

const __dirname = dirname(fileURLToPath(import.meta.url));

// base: '/' for local dev, '/touch-grass/' when building for production.
// The docs site is served from https://timeouts.app/touch-grass/ in production,
// which requires every asset URL to be prefixed with that path. Vite's `base`
// option handles this automatically. Override with DOCS_BASE env var if needed.
const docsBase = process.env.DOCS_BASE ?? (process.env.NODE_ENV === 'production' ? '/touch-grass/' : '/');

export default defineConfig({
  base: docsBase,
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@brand': resolve(__dirname, '../../brand'),
    },
  },
  server: { port: 5173, host: true },
});
