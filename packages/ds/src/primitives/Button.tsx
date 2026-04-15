import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/cn';

type ButtonVariant = 'primary' | 'ghost' | 'danger';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  loading?: boolean;
  loadingLabel?: string;
  /**
   * Render the button as its single child (e.g. an `<a>` or a
   * react-router `<Link>`) via Radix Slot. When true, the rendered
   * element adopts the Button's classes and forwarded props but keeps
   * its own tag. `disabled` is translated to `aria-disabled` +
   * `pointer-events-none` because arbitrary elements don't support the
   * real HTML `disabled` attribute.
   */
  asChild?: boolean;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 min-h-12 min-w-32 px-6 py-3 ' +
  'font-mono text-[14px] font-black uppercase tracking-[0.12em] leading-none ' +
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
    'bg-danger text-black border-danger ' +
    'disabled:bg-black disabled:text-white disabled:border-white disabled:border-dashed disabled:hover:shadow-none',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', loading, loadingLabel, asChild, children, className, disabled, ...rest },
  ref
) {
  const isDisabled = disabled || loading;
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      {...(asChild ? {} : { disabled: isDisabled })}
      aria-disabled={isDisabled ? true : undefined}
      aria-busy={loading ? true : undefined}
      className={cn(
        base,
        variants[variant],
        className,
        isDisabled && 'pointer-events-none',
      )}
      {...rest}
    >
      {loading ? `█▌ ${loadingLabel ?? 'LOADING'}` : children}
    </Comp>
  );
});
