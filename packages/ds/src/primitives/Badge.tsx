import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: 'earned' | 'neutral' | 'danger';
  size?: 'sm' | 'md';
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

export function Badge({ variant = 'neutral', size = 'md', children, className, ...rest }: BadgeProps) {
  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </span>
  );
}
