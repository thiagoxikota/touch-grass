import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Field } from '../../src/patterns/Field';
import { Input } from '../../src/primitives/Input';

describe('Field', () => {
  it('renders label and associates it with the input via htmlFor/id', () => {
    render(
      <Field label="@HANDLE">
        <Input placeholder="thiagoxikota" />
      </Field>
    );
    const label = screen.getByText('@HANDLE');
    const input = screen.getByPlaceholderText('thiagoxikota');
    expect(label.tagName).toBe('LABEL');
    expect(label.getAttribute('for')).toBeTruthy();
    expect(input.id).toBe(label.getAttribute('for'));
  });

  it('renders description and wires it via aria-describedby', () => {
    render(
      <Field label="@HANDLE" description="Your public name.">
        <Input />
      </Field>
    );
    const desc = screen.getByText('Your public name.');
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-describedby')).toContain(desc.id);
  });

  it('renders error message with role="alert" and aria-describedby wiring', () => {
    render(
      <Field label="@HANDLE" error="Handle is taken.">
        <Input />
      </Field>
    );
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Handle is taken.');
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-describedby')).toContain(error.id);
  });

  it('passes error flag to child input when error prop is set', () => {
    render(
      <Field label="@HANDLE" error="bad">
        <Input />
      </Field>
    );
    expect(screen.getByRole('textbox').className).toContain('border-danger');
  });

  it('combines description and error in aria-describedby', () => {
    render(
      <Field label="@HANDLE" description="Your public name." error="Handle is taken.">
        <Input />
      </Field>
    );
    const input = screen.getByRole('textbox');
    const describedBy = input.getAttribute('aria-describedby') || '';
    expect(describedBy.split(' ')).toHaveLength(2);
  });
});
