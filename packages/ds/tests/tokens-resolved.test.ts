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

  it('base.css kills all animations', () => {
    const baseCss = readFileSync(
      resolve(__dirname, '../src/styles/base.css'),
      'utf8'
    );
    expect(baseCss).toContain('animation-duration: 0ms !important');
  });

  it('base.css defines hard-halo focus ring', () => {
    const baseCss = readFileSync(
      resolve(__dirname, '../src/styles/base.css'),
      'utf8'
    );
    expect(baseCss).toContain(':focus-visible');
    expect(baseCss).toContain('outline: 2px solid var(--color-fg)');
    expect(baseCss).toContain('outline-offset: 3px');
  });

  it('tokens.css emits all 7 color tokens', () => {
    const tokensCss = readFileSync(
      resolve(__dirname, '../../tokens/dist/tokens.css'),
      'utf8'
    );
    expect(tokensCss).toContain('--color-bg:');
    expect(tokensCss).toContain('--color-fg:');
    expect(tokensCss).toContain('--color-earned:');
    expect(tokensCss).toContain('--color-danger:');
    expect(tokensCss).toContain('--color-muted:');
    expect(tokensCss).toContain('--color-hairline:');
    expect(tokensCss).toContain('--color-bg-alt:');
  });

  it('tokens.css emits zero-motion duration', () => {
    const tokensCss = readFileSync(
      resolve(__dirname, '../../tokens/dist/tokens.css'),
      'utf8'
    );
    expect(tokensCss).toContain('--motion-duration-instant: 0ms');
  });
});
