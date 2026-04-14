import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../../src/patterns/Toast';

// Deterministic ids so toast keys are predictable in tests.
beforeEach(() => {
  let counter = 0;
  vi.stubGlobal('crypto', {
    randomUUID: () => `toast-${++counter}`,
  });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function Trigger({ message, type }: { message: string; type?: 'default' | 'danger' | 'success' }) {
  const { toast } = useToast();
  return (
    <button onClick={() => toast(message, type)}>FIRE</button>
  );
}

describe('Toast', () => {
  it('renders a status-role toast for default type', () => {
    render(
      <ToastProvider>
        <Trigger message="SAVED" />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'FIRE' }).click();
    });
    const el = screen.getByRole('status');
    expect(el).toHaveTextContent('SAVED');
    expect(el.className).toContain('border-hairline');
  });

  it('renders an alert-role toast for danger type with danger border', () => {
    render(
      <ToastProvider>
        <Trigger message="FAILED" type="danger" />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'FIRE' }).click();
    });
    const el = screen.getByRole('alert');
    expect(el).toHaveTextContent('FAILED');
    expect(el.className).toContain('border-danger');
  });

  it('uses earned border for success type', () => {
    render(
      <ToastProvider>
        <Trigger message="SHIPPED" type="success" />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'FIRE' }).click();
    });
    expect(screen.getByRole('alert').className).toContain('border-earned');
  });

  it('removes the toast after 3 seconds', () => {
    render(
      <ToastProvider>
        <Trigger message="EPHEMERAL" />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'FIRE' }).click();
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('throws when useToast is used outside a ToastProvider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger message="X" />)).toThrow(/useToast/);
    errorSpy.mockRestore();
  });
});
