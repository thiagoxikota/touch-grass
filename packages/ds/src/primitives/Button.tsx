import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../lib/cn';

type ButtonVariant = 'primary' | 'ghost' | 'danger';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  loading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center min-h-[48px] px-4 py-3 ' +
  'font-mono text-[15px] font-black uppercase tracking-[0.1em] ' +
  'border-2 cursor-pointer ' +
  'disabled:cursor-not-allowed ' +
  'hover:shadow-[inset_0_0_0_2px_var(--color-bg)] ' +
  'focus-visible:outline-2 focus-visible:outline-white focus-visible:[outline-offset:3px]';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-earned text-black border-earned ' +
    'disabled:bg-black disabled:text-white disabled:border-white disabled:border-dashed disabled:hover:shadow-none',
  ghost:
    'bg-black text-white border-white ' +
    'disabled:border-dashed disabled:hover:shadow-none',
  danger:
    'bg-danger text-white border-danger ' +
    'disabled:bg-black disabled:text-white disabled:border-white disabled:border-dashed disabled:hover:shadow-none',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', loading, loadingLabel, children, className, disabled, ...rest },
  ref
) {
  const isDisabled = disabled || loading;
  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-busy={loading ? true : undefined}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {loading ? `█▌ ${loadingLabel ?? 'LOADING'}` : children}
    </button>
  );
});
