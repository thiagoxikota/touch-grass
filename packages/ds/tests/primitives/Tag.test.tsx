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
});
