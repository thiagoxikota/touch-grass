import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface TagProps extends ComponentProps<'button'> {
  active?: boolean;
  children: ReactNode;
}

export function Tag({ active, children, className, ...rest }: TagProps) {
  return (
    <button
      type="button"
      aria-pressed={active !== undefined ? active : undefined}
      className={cn(
        // Visual chip: 32px tall, 1px border so it visibly de-escalates from Button's 2px.
        // Hit area: invisible 48px tap zone via :before pseudo, satisfying WCAG 2.5.5
        // without inflating the visible chip. Inset is -inset-y-2 (8px each side → 32+16=48).
        'relative inline-flex items-center px-3 py-2 min-h-8 font-mono text-[12px] font-black uppercase tracking-[0.1em] border cursor-pointer',
        'before:absolute before:content-[""] before:left-0 before:right-0 before:-top-2 before:-bottom-2',
        active ? 'bg-earned text-black border-earned' : 'bg-black text-white border-white',
        'focus-visible:outline-2 focus-visible:outline-white focus-visible:[outline-offset:3px]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
