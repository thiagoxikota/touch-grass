import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../../src/primitives/Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>body</Card>);
    expect(screen.getByText('body')).toBeInTheDocument();
  });
  it('default variant uses black bg', () => {
    render(<Card data-testid="c">x</Card>);
    expect(screen.getByTestId('c').className).toContain('bg-black');
    expect(screen.getByTestId('c').className).toContain('border-[var(--color-hairline)]');
  });
  it('inset variant uses alt bg', () => {
    render(<Card variant="inset" data-testid="c">x</Card>);
    expect(screen.getByTestId('c').className).toContain('bg-[var(--color-bg-alt)]');
  });
  it('renders header slot when provided', () => {
    render(<Card header={<span>HEAD</span>}>body</Card>);
    expect(screen.getByText('HEAD')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
  });
});
