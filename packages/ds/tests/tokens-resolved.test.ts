import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('ds token integration', () => {
  it('re-exports tokens.css from @touch-grass-ds/tokens', () => {
    const tokensCss = readFileSync(
      resolve(__dirname, '../../tokens/dist/tokens.css'),
      'utf8'
    );
    expect(tokensCss).toContain('--color-earned: #a6ff00');
    expect(tokensCss).toContain('--color-fg-muted: #b3b3b3');
    expect(tokensCss).toContain('--color-fg-subtle: #808080');
    expect(tokensCss).toContain('--color-hairline-strong: #333333');
  });

  it('base.css references tokens via var()', () => {
    const baseCss = readFileSync(
      resolve(__dirname, '../src/styles/base.css'),
      'utf8'
    );
    expect(baseCss).toContain('var(--color-bg)');
    expect(baseCss).toContain('var(--color-fg)');
  });

  it('base.css enforces zero radius globally', () => {
    const baseCss = readFileSync(
      resolve(__dirname, '../src/styles/base.css'),
      'utf8'
    );
    expect(baseCss).toContain('border-radius: 0 !important');
  });

  it('base.css kills all transitions', () => {
    const baseCss = readFileSync(
      resolve(__dirname, '../src/styles/base.css'),
      'utf8'
    );
    expect(baseCss).toContain('transition-duration: 0ms !important');
  });
});
