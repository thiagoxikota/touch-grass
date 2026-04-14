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
  'hover:[box-shadow:inset_0_0_0_2px_#000] ' +
  'focus-visible:outline-2 focus-visible:outline-white focus-visible:[outline-offset:3px]';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-earned)] text-black border-[var(--color-earned)] ' +
    'disabled:bg-black disabled:text-white disabled:border-white disabled:border-dashed disabled:hover:shadow-none',
  ghost:
    'bg-black text-white border-white ' +
    'disabled:border-dashed disabled:hover:shadow-none',
  danger:
    'bg-[var(--color-danger)] text-white border-[var(--color-danger)] ' +
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
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {loading ? `█▌ ${loadingLabel ?? 'LOADING'}` : children}
    </button>
  );
});
