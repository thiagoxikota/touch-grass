import { cloneElement, useId, type ReactElement } from 'react';
import { cn } from '../lib/cn';

export interface FieldProps {
  label: string;
  description?: string;
  error?: string;
  children: ReactElement<{ id?: string, error?: boolean, 'aria-describedby'?: string }>;
  className?: string;
}

export function Field({ label, description, error, children, className }: FieldProps) {
  const generatedId = useId();
  const id = children.props.id || generatedId;
  const descriptionId = `${id}-desc`;
  const errorId = `${id}-error`;

  const ariaDescribedBy = [
    description ? descriptionId : null,
    error ? errorId : null,
  ].filter(Boolean).join(' ');

  const clonedChild = cloneElement(children, {
    id,
    error: !!error,
    'aria-describedby': ariaDescribedBy || undefined,
  });

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="font-mono text-[14px] font-black uppercase text-white tracking-[0.1em]">
        {label}
      </label>
      {description && (
        <span id={descriptionId} className="font-sans text-[14px] text-[var(--color-fg-muted)]">
          {description}
        </span>
      )}
      {clonedChild}
      {error && (
        <span id={errorId} className="font-mono text-[13px] font-black uppercase text-danger mt-1 tracking-[0.05em]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
