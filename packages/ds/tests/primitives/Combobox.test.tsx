import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Combobox } from '../../src/primitives/Combobox';

describe('Combobox', () => {
  it('renders input and datalist options', () => {
    render(<Combobox options={['FOCUS', 'DEEP WORK']} aria-label="Session type" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    const list = document.querySelector('datalist');
    expect(list).toBeTruthy();
    expect(list?.querySelectorAll('option')).toHaveLength(2);
  });

  it('default state uses mono uppercase styling', () => {
    render(<Combobox options={['FOCUS']} aria-label="Session type" />);
    const input = screen.getByRole('combobox');
    expect(input.className).toContain('font-mono');
    expect(input.className).toContain('uppercase');
  });

  it('error state uses danger border', () => {
    render(<Combobox options={['FOCUS']} aria-label="Session type" error />);
    expect(screen.getByRole('combobox').className).toContain('border-danger');
  });

  it('disabled state uses dashed border', () => {
    render(<Combobox options={['FOCUS']} aria-label="Session type" disabled />);
    const input = screen.getByRole('combobox');
    expect(input.className).toContain('border-dashed');
    expect(input).toBeDisabled();
  });

  it('forwards ref', () => {
    let ref: HTMLInputElement | null = null;
    render(<Combobox options={['FOCUS']} ref={(el) => { ref = el; }} aria-label="Session type" />);
    expect(ref).toBeInstanceOf(HTMLInputElement);
  });

  it('forwards arbitrary props and events', () => {
    const onChange = vi.fn();
    render(<Combobox options={['FOCUS']} onChange={onChange} data-testid="combo" />);
    fireEvent.change(screen.getByTestId('combo'), { target: { value: 'FOCUS' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
