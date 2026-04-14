import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sparkline } from '../../src';

describe('Sparkline', () => {
  it('renders correctly', () => {
    const { container } = render(<Sparkline data={[10, 20, 30]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
