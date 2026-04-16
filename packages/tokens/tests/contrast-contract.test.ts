import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

type ColorMap = Record<string, { value: string }>;

function readColors(fileName: string): ColorMap {
  const filePath = join(process.cwd(), 'src', fileName);
  const raw = readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw) as { color: ColorMap };
  return parsed.color;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '').trim();
  if (clean.length !== 6) throw new Error(`Expected 6-digit hex, got "${hex}"`);
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('contrast contract for accent fills', () => {
  it('forbids white text on earned backgrounds in dark and light themes', () => {
    const dark = readColors('color.json');
    const light = readColors('color-light.json');

    const darkEarnedOnBlack = contrastRatio(dark.earned.value, dark.bg.value);
    const lightEarnedOnFg = contrastRatio(light.earned.value, light.fg.value);
    const darkEarnedOnWhite = contrastRatio(dark.earned.value, dark.fg.value);
    const lightEarnedOnWhite = contrastRatio(light.earned.value, '#FFFFFF');

    expect(darkEarnedOnBlack).toBeGreaterThanOrEqual(4.5);
    expect(lightEarnedOnFg).toBeGreaterThanOrEqual(4.5);
    expect(darkEarnedOnWhite).toBeLessThan(4.5);
    expect(lightEarnedOnWhite).toBeLessThan(4.5);
  });

  it('keeps dark theme danger fill readable with black foreground', () => {
    const dark = readColors('color.json');
    const dangerOnBlack = contrastRatio(dark.danger.value, dark.bg.value);
    const dangerOnWhite = contrastRatio(dark.danger.value, dark.fg.value);

    expect(dangerOnBlack).toBeGreaterThanOrEqual(4.5);
    expect(dangerOnWhite).toBeLessThan(4.5);
  });
});
