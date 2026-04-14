import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // Exclude playwright component test specs — they run via playwright-ct, not vitest.
    exclude: ['**/node_modules/**', '**/dist/**', '**/playwright/**']
  }
});
