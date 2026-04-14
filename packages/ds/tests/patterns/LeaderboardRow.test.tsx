import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LeaderboardRow } from '../../src/patterns/LeaderboardRow';

describe('LeaderboardRow', () => {
  const base = {
    rank: 17,
    name: 'You',
    handle: 'thiagoxikota',
    initials: 'TX',
    hours: '22:48:33',
    delta: '−08:16',
  };

  it('renders rank, name, handle, hours', () => {
    render(<LeaderboardRow {...base} />);
    expect(screen.getByText('17')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('@THIAGOXIKOTA')).toBeInTheDocument();
    expect(screen.getByText('22:48:33')).toBeInTheDocument();
  });

  it('renders delta chip in default variant', () => {
    render(<LeaderboardRow {...base} />);
    expect(screen.getByText('−08:16')).toBeInTheDocument();
  });

  it('top1 variant renders KING badge instead of delta', () => {
    render(<LeaderboardRow {...base} variant="top1" rank={1} />);
    expect(screen.getByText('KING')).toBeInTheDocument();
    expect(screen.queryByText('−08:16')).not.toBeInTheDocument();
  });

  it('top1 hours use earned color', () => {
    render(<LeaderboardRow {...base} variant="top1" rank={1} hours="62:14:08" />);
    const hours = screen.getByText('62:14:08');
    expect(hours.className).toContain('text-[var(--color-earned)]');
  });

  it('you variant has green left border', () => {
    render(<LeaderboardRow {...base} variant="you" data-testid="row" />);
    expect(screen.getByTestId('row').className).toContain('border-l-4');
    expect(screen.getByTestId('row').className).toContain('border-[var(--color-earned)]');
  });

  it('truncates names longer than 16 chars', () => {
    render(<LeaderboardRow {...base} name="This is a very long display name" />);
    expect(screen.getByText(/This is a very l…/)).toBeInTheDocument();
  });

  it('truncates handles longer than 14 chars', () => {
    render(<LeaderboardRow {...base} handle="averylonghandle12345" />);
    expect(screen.getByText('@AVERYLONGHANDL…')).toBeInTheDocument();
  });

  it('uppercases the handle', () => {
    render(<LeaderboardRow {...base} handle="dhh" />);
    expect(screen.getByText('@DHH')).toBeInTheDocument();
  });

  it('formats rank with leading zero up to 99', () => {
    render(<LeaderboardRow {...base} rank={4} />);
    expect(screen.getByText('04')).toBeInTheDocument();
  });
});
