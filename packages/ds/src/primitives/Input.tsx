import { forwardRef, type ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface InputProps extends ComponentProps<'input'> {
  variant?: 'text' | 'numeric';
  error?: boolean;
}

const base =
  'block w-full bg-black text-white text-[15px] font-semibold leading-none ' +
  'px-5 py-3 min-h-12 border-2 border-white ' +
  'placeholder:text-white placeholder:font-mono placeholder:uppercase placeholder:tracking-[0.08em] placeholder:text-[13px] ' +
  'focus-visible:outline-2 focus-visible:outline-earned focus-visible:[outline-offset:3px] ' +
  'disabled:cursor-not-allowed disabled:border-dashed';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = 'text', error, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        base,
        variant === 'numeric' ? 'font-mono' : 'font-sans',
        error && 'border-danger',
        className
      )}
      aria-invalid={error ? true : undefined}
      {...rest}
    />
  );
});
