import { forwardRef, type ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  label?: string;
  error?: boolean;
}

const base =
  'peer appearance-none shrink-0 w-6 h-6 border-2 outline-none cursor-pointer ' +
  'bg-black border-white focus-visible:outline-2 focus-visible:outline-white focus-visible:[outline-offset:3px] ' +
  'checked:bg-earned checked:border-earned ' +
  'disabled:cursor-not-allowed disabled:border-dashed disabled:checked:bg-black disabled:checked:border-white';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, className, disabled, ...rest },
  ref
) {
  return (
    <label className={cn('inline-flex items-center gap-3', disabled && 'cursor-not-allowed', className)}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          disabled={disabled}
          className={cn(base, error && 'border-danger')}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
        {/* Using a brutalist SVG path without rounding (straight strokes, sharp vectors) to simulate the 'X' cross check */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none hidden peer-checked:block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M5 5 L19 19 M19 5 L5 19" />
        </svg>
      </div>
      {label && (
        <span className="font-mono text-[14px] font-black uppercase text-white tracking-[0.1em]">
          {label}
        </span>
      )}
    </label>
  );
});
