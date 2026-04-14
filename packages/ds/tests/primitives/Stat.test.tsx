import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stat } from '../../src/primitives/Stat';

describe('Stat', () => {
  it('hero variant renders label + value', () => {
    render(<Stat variant="hero" label="UNTETHERED TODAY" value="04:32:18" />);
    expect(screen.getByText('UNTETHERED TODAY')).toBeInTheDocument();
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
  });
  it('hero value uses earned color and 80px (lg default)', () => {
    render(<Stat variant="hero" label="x" value="00:00" />);
    const v = screen.getByText('00:00');
    expect(v.className).toContain('text-[var(--color-earned)]');
    expect(v.className).toContain('text-[80px]');
  });
  it('hero size md uses 64px', () => {
    render(<Stat variant="hero" label="x" value="00:00" size="md" />);
    const v = screen.getByText('00:00');
    expect(v.className).toContain('text-[64px]');
  });
  it('inline variant has no label container', () => {
    render(<Stat variant="inline" value="12D" />);
    expect(screen.getByText('12D')).toBeInTheDocument();
  });
  it('hero renders meta items when provided', () => {
    render(
      <Stat variant="hero" label="x" value="00:00" meta={[
        { k: 'STREAK', v: '12D' },
        { k: 'RANK', v: '#17' },
      ]} />
    );
    expect(screen.getByText('STREAK')).toBeInTheDocument();
    expect(screen.getByText('12D')).toBeInTheDocument();
    expect(screen.getByText('RANK')).toBeInTheDocument();
  });
});
