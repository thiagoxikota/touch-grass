import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../../src/primitives/Button';

describe('Button', () => {
  it('renders children as label', () => {
    render(<Button>START FOCUS</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('START FOCUS');
  });

  it('defaults to primary variant', () => {
    render(<Button>x</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[var(--color-earned)]');
    expect(btn.className).toContain('text-black');
  });

  it('applies ghost variant', () => {
    render(<Button variant="ghost">x</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-black');
    expect(btn.className).toContain('text-white');
    expect(btn.className).toContain('border-white');
  });

  it('applies danger variant', () => {
    render(<Button variant="danger">x</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[var(--color-danger)]');
    expect(btn.className).toContain('text-white');
  });

  it('shows loading state with verb-ing label and block prefix', () => {
    render(<Button loading loadingLabel="SYNCING">START FOCUS</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('█▌ SYNCING');
    expect(btn).toBeDisabled();
  });

  it('disabled state uses dashed border', () => {
    render(<Button disabled>x</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-dashed');
    expect(btn).toBeDisabled();
  });

  it('forwards ref to button element', () => {
    let ref: HTMLButtonElement | null = null;
    render(<Button ref={(el) => { ref = el; }}>x</Button>);
    expect(ref).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards arbitrary HTML props', () => {
    render(<Button data-testid="x" type="submit">x</Button>);
    expect(screen.getByTestId('x')).toHaveAttribute('type', 'submit');
  });
});
