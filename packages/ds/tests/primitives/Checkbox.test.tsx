import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Checkbox } from '../../src';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox label="TEST CHECKBOX" />);
    expect(screen.getByLabelText('TEST CHECKBOX')).toBeInTheDocument();
  });
  
  it('applies disabled attributes', () => {
    render(<Checkbox label="DISABLED" disabled />);
    expect(screen.getByLabelText('DISABLED')).toBeDisabled();
  });
});
