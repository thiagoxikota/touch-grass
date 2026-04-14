import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from '../../src/primitives/Divider';

describe('Divider', () => {
  it('default is hairline horizontal', () => {
    render(<Divider data-testid="d" />);
    const el = screen.getByTestId('d');
    expect(el.className).toContain('border-t');
    expect(el.className).toContain('border-[var(--color-hairline)]');
  });
  it('strong variant uses white 2px', () => {
    render(<Divider variant="strong" data-testid="d" />);
    const el = screen.getByTestId('d');
    expect(el.className).toContain('border-t-2');
    expect(el.className).toContain('border-white');
  });
  it('vertical orientation uses border-l', () => {
    render(<Divider orientation="vertical" data-testid="d" />);
    const el = screen.getByTestId('d');
    expect(el.className).toContain('border-l');
  });
});
