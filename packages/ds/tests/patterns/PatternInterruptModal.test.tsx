import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PatternInterruptModal } from '../../src/patterns/PatternInterruptModal';

describe('PatternInterruptModal', () => {
  const base = {
    headline: '47 minutes wasted. Put it down.',
    time: '03:42 AM',
    status: 'YOU ARE LOSING',
    context: [
      { k: 'YOUR GOAL', v: 'SHIP TIMEOUTS V1' },
      { k: 'DAYS LEFT', v: '23' },
      { k: 'RANK', v: '#17 / 2418' },
    ],
    primaryLabel: 'PUT IT DOWN. START FOCUS.',
    secondaryLabel: '5 MORE MIN',
  };

  it('renders headline, header, context, and buttons', () => {
    render(<PatternInterruptModal {...base} />);
    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('47 minutes wasted. Put it down.')).toBeInTheDocument();
    expect(screen.getByText(/INTERRUPT/)).toBeInTheDocument();
    expect(screen.getByText('YOU ARE LOSING')).toBeInTheDocument();
    expect(screen.getByText('YOUR GOAL')).toBeInTheDocument();
    expect(screen.getByText('SHIP TIMEOUTS V1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /PUT IT DOWN/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /5 MORE MIN/i })).toBeInTheDocument();
  });

  it('fires primary and secondary callbacks', () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(<PatternInterruptModal {...base} onPrimary={onPrimary} onSecondary={onSecondary} />);
    screen.getByRole('button', { name: /PUT IT DOWN/i }).click();
    screen.getByRole('button', { name: /5 MORE MIN/i }).click();
    expect(onPrimary).toHaveBeenCalledOnce();
    expect(onSecondary).toHaveBeenCalledOnce();
  });

  it('fires onEscape when Escape is pressed', () => {
    const onEscape = vi.fn();
    render(<PatternInterruptModal {...base} onEscape={onEscape} />);
    screen.getByRole('alertdialog').focus();
    screen.getByRole('alertdialog').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(onEscape).toHaveBeenCalledOnce();
  });

  it('falls back to onSecondary for Escape when onEscape is absent', () => {
    const onSecondary = vi.fn();
    render(<PatternInterruptModal {...base} onSecondary={onSecondary} />);
    screen.getByRole('alertdialog').focus();
    screen.getByRole('alertdialog').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(onSecondary).toHaveBeenCalledOnce();
  });

});
