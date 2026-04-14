import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SessionSummaryCard } from '../../src/patterns/SessionSummaryCard';

describe('SessionSummaryCard', () => {
  it('renders header, headline duration, and stats grid', () => {
    render(
      <SessionSummaryCard
        date="2026-04-13"
        duration="04:32:18"
        stats={[
          { k: 'GOAL', v: 'SHIP V1' },
          { k: 'BLOCKS', v: '4' },
          { k: 'RANK', v: '#17' },
        ]}
      />
    );
    expect(screen.getByText('SESSION SUMMARY')).toBeInTheDocument();
    expect(screen.getByText('2026-04-13')).toBeInTheDocument();
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
    expect(screen.getByText('GOAL')).toBeInTheDocument();
    expect(screen.getByText('SHIP V1')).toBeInTheDocument();
    expect(screen.getByText('BLOCKS')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
