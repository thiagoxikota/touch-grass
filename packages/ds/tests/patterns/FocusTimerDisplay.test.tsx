import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FocusTimerDisplay } from '../../src/patterns/FocusTimerDisplay';

describe('FocusTimerDisplay', () => {
  it('renders header label, stat value, and CTA', () => {
    render(
      <FocusTimerDisplay
        header="FOCUS / TODAY"
        sessionLabel="SESSION 04"
        label="UNTETHERED TODAY"
        value="04:32:18"
        meta={[
          { k: 'VS YESTERDAY', v: '+47%' },
          { k: 'STREAK', v: '12 DAYS' },
          { k: 'RANK', v: '#17' },
        ]}
        ctaLabel="START FOCUS"
      />
    );
    expect(screen.getByText('FOCUS / TODAY')).toBeInTheDocument();
    expect(screen.getByText('SESSION 04')).toBeInTheDocument();
    expect(screen.getByText('UNTETHERED TODAY')).toBeInTheDocument();
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
    expect(screen.getByText('VS YESTERDAY')).toBeInTheDocument();
    expect(screen.getByText('STREAK')).toBeInTheDocument();
    expect(screen.getByText('12 DAYS')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /START FOCUS/i })).toBeInTheDocument();
  });

  it('CTA fires onCtaClick', () => {
    let clicked = 0;
    render(
      <FocusTimerDisplay
        header="X"
        label="Y"
        value="00:00"
        ctaLabel="GO"
        onCtaClick={() => { clicked += 1; }}
      />
    );
    screen.getByRole('button', { name: /GO/i }).click();
    expect(clicked).toBe(1);
  });

  it('omits sessionLabel when not provided', () => {
    render(<FocusTimerDisplay header="X" label="Y" value="00:00" ctaLabel="GO" />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });
});
