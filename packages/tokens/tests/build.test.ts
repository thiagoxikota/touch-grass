import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from '../build';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');

describe('token build', () => {
  beforeAll(async () => {
    await build();
  });

  it('emits tokens.css with all six color variables', () => {
    const css = readFileSync(join(dist, 'tokens.css'), 'utf8');
    expect(css).toContain('--color-bg: #000000');
    expect(css).toContain('--color-fg: #ffffff');
    expect(css).toContain('--color-earned: #a6ff00');
    expect(css).toContain('--color-danger: #ff3b3b');
    expect(css).toContain('--color-hairline: #1a1a1a');
    expect(css).toContain('--color-bg-alt: #0a0a0a');
  });

  it('emits tokens.css with type scale', () => {
    const css = readFileSync(join(dist, 'tokens.css'), 'utf8');
    expect(css).toContain('--font-size-stat-lg: 80px');
    expect(css).toContain('--font-size-body: 16px');
    expect(css).toContain('--font-size-label: 13px');
  });

  it('emits tokens.css with spacing scale', () => {
    const css = readFileSync(join(dist, 'tokens.css'), 'utf8');
    expect(css).toContain('--space-1: 4px');
    expect(css).toContain('--space-32: 128px');
  });

  it('emits tailwind.theme.css with @theme block', () => {
    const css = readFileSync(join(dist, 'tailwind.theme.css'), 'utf8');
    expect(css).toContain('@theme {');
    expect(css).toContain('--color-earned: #a6ff00');
  });

  it('emits figma-tokens.json with W3C-format tokens', () => {
    expect(existsSync(join(dist, 'figma-tokens.json'))).toBe(true);
    const json = JSON.parse(readFileSync(join(dist, 'figma-tokens.json'), 'utf8'));
    expect(json.color.earned.$value).toBe('#a6ff00');
  });
});
