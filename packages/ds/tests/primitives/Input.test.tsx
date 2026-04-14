import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../../src/primitives/Input';

describe('Input', () => {
  it('renders an HTML input with given placeholder', () => {
    render(<Input placeholder="@HANDLE" />);
    expect(screen.getByPlaceholderText('@HANDLE')).toBeInTheDocument();
  });

  it('defaults to text variant (sans font)', () => {
    render(<Input placeholder="x" />);
    const input = screen.getByPlaceholderText('x');
    expect(input.className).toContain('font-sans');
    // The input itself shouldn't have plain font-mono (placeholder:font-mono is fine)
    expect(input.className).toMatch(/(?:^|\s)font-sans(?:\s|$)/);
  });

  it('numeric variant uses mono font', () => {
    render(<Input variant="numeric" placeholder="0" />);
    const input = screen.getByPlaceholderText('0');
    expect(input.className).toContain('font-mono');
  });

  it('error state has red border', () => {
    render(<Input error placeholder="x" />);
    const input = screen.getByPlaceholderText('x');
    expect(input.className).toContain('border-danger');
  });

  it('disabled state has dashed border', () => {
    render(<Input disabled placeholder="x" />);
    const input = screen.getByPlaceholderText('x');
    expect(input.className).toContain('border-dashed');
    expect(input).toBeDisabled();
  });

  it('forwards ref', () => {
    let ref: HTMLInputElement | null = null;
    render(<Input ref={(el) => { ref = el; }} />);
    expect(ref).toBeInstanceOf(HTMLInputElement);
  });
});
