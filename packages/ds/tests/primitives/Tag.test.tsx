import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tag } from '../../src/primitives/Tag';

describe('Tag', () => {
  it('renders default state with white border', () => {
    render(<Tag>WEEKLY</Tag>);
    const el = screen.getByText('WEEKLY');
    expect(el.className).toContain('border-white');
    expect(el.className).toContain('text-white');
  });
  it('active state uses green bg + black text', () => {
    render(<Tag active>WEEKLY</Tag>);
    const el = screen.getByText('WEEKLY');
    expect(el.className).toContain('bg-earned');
    expect(el.className).toContain('text-black');
  });
  it('chip dimensions de-escalate from Button: 32px visual + 1px border + invisible 48px hit area', () => {
    // Tier contract: Tag is a chip, not a CTA. 1px border + 32px height
    // distinguish it from Button. The :before pseudo provides a 48px hit zone
    // (32 + 16 = 48) so we still meet WCAG 2.5.5 without inflating the visible chip.
    render(<Tag>WEEKLY</Tag>);
    const el = screen.getByText('WEEKLY');
    expect(el.className).toContain('min-h-8');
    expect(el.className).toContain('text-[12px]');
    expect(el.className).toContain('before:-top-2');
    expect(el.className).toContain('before:-bottom-2');
    // 1px border, not border-2 — the visible weight is what de-escalates from Button
    expect(el.className).toMatch(/(^|\s)border(\s|$)/);
    expect(el.className).not.toContain('border-2');
  });
});
