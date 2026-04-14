import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../lib/cn';

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: 'earned' | 'neutral' | 'danger';
  size?: 'sm' | 'md';
  /**
   * Render the badge as its single child (e.g. an anchor or a Link)
   * via Radix Slot. When true, the rendered element adopts Badge's
   * class and forwarded props but keeps its own tag.
   */
  asChild?: boolean;
  children: ReactNode;
}

const base = 'inline-flex items-center font-mono font-black uppercase tracking-[0.1em] border-2';

const variants = {
  earned:  'bg-earned text-black border-earned',
  neutral: 'bg-black text-white border-white',
  danger:  'bg-danger text-black border-danger',
};

const sizes = {
  sm: 'text-[11px] px-1.5 py-1',
  md: 'text-[13px] px-2.5 py-1.5',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', size = 'md', asChild, children, className, ...rest },
  ref
) {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Comp>
  );
});
