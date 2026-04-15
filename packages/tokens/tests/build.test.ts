import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIST = resolve(process.cwd(), 'dist');

describe('token build outputs', () => {
  it('emits core files', () => {
    const required = [
      'tokens.css',
      'light.css',
      'tailwind.theme.css',
      'tailwind-preset.js',
      'figma-tokens.json',
      'tokens.js',
      'tokens.d.ts',
    ];

    for (const file of required) {
      expect(existsSync(resolve(DIST, file))).toBe(true);
    }
  });

  it('includes canonical color token variables', () => {
    const css = readFileSync(resolve(DIST, 'tokens.css'), 'utf8');
    expect(css).toContain('--color-bg');
    expect(css).toContain('--color-fg');
    expect(css).toContain('--color-earned');
  });
});

