import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { Switch } from '../../src';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch label="TEST SWITCH" />);
    expect(screen.getByLabelText('TEST SWITCH')).toBeInTheDocument();
  });
  
  it('applies disabled attributes', () => {
    render(<Switch label="DISABLED" disabled />);
    expect(screen.getByLabelText('DISABLED')).toBeDisabled();
  });

  it('passes a11y standards', async () => {
    const { container } = render(<Switch label="A11Y SWITCH" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

