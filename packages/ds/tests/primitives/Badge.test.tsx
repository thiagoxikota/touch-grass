import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../src/primitives/Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>KING</Badge>);
    expect(screen.getByText('KING')).toBeInTheDocument();
  });
  it('defaults to neutral md', () => {
    render(<Badge>x</Badge>);
    const el = screen.getByText('x');
    expect(el.className).toContain('bg-black');
    expect(el.className).toContain('border-white');
    expect(el.className).toContain('text-[11px]');
    expect(el.className).toContain('min-h-6');
  });
  it('earned variant uses green bg + black text', () => {
    render(<Badge variant="earned">x</Badge>);
    const el = screen.getByText('x');
    expect(el.className).toContain('bg-earned');
    expect(el.className).toContain('text-black');
  });
  it('danger variant uses red bg + white text', () => {
    render(<Badge variant="danger">x</Badge>);
    const el = screen.getByText('x');
    expect(el.className).toContain('bg-danger');
  });
  it('sm size uses 10px and tighter min-h', () => {
    render(<Badge size="sm">x</Badge>);
    const el = screen.getByText('x');
    expect(el.className).toContain('text-[10px]');
    expect(el.className).toContain('min-h-4');
  });
});
