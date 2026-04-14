import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { __NAME__ } from '../../src';

describe('__NAME__', () => {
  it('renders correctly', () => {
    render(<__NAME__ data-testid="__NAME__-root" />);
    expect(screen.getByTestId('__NAME__-root')).toBeInTheDocument();
  });
});
