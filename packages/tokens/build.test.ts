import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('tokens sources', () => {
  it('includes core color token keys', () => {
    const colorPath = join(process.cwd(), 'src', 'color.json');
    const raw = readFileSync(colorPath, 'utf8');
    const data = JSON.parse(raw) as Record<string, Record<string, unknown>>;

    expect(data.color).toBeDefined();
    expect(data.color.bg).toBeDefined();
    expect(data.color.fg).toBeDefined();
    expect(data.color.earned).toBeDefined();
    expect(data.color.danger).toBeDefined();
  });
});
