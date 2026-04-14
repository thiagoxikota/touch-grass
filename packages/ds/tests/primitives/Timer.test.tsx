import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Timer } from '../../src/primitives/Timer';

describe('Timer', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('static variant renders the given value', () => {
    render(<Timer variant="static" value="04:32:18" />);
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
  });

  it('live variant computes elapsed from start', () => {
    const start = new Date('2026-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2026-01-01T01:23:45Z'));
    render(<Timer variant="live" start={start} />);
    expect(screen.getByText('01:23:45')).toBeInTheDocument();
  });

  it('live variant re-renders each second', () => {
    const start = new Date('2026-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2026-01-01T00:00:01Z'));
    render(<Timer variant="live" start={start} />);
    expect(screen.getByText('00:00:01')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByText('00:00:03')).toBeInTheDocument();
  });
});
