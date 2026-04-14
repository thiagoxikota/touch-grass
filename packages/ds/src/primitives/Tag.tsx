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
      className={cn(
        'inline-flex items-center px-3 py-2 min-h-[36px] font-mono text-[13px] font-black uppercase tracking-[0.1em] border-2 cursor-pointer',
        active ? 'bg-[var(--color-earned)] text-black border-[var(--color-earned)]' : 'bg-black text-white border-white',
        'focus-visible:outline-2 focus-visible:outline-white focus-visible:[outline-offset:3px]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
