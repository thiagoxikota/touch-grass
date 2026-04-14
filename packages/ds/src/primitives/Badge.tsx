import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface BadgeProps {
  variant?: 'earned' | 'neutral' | 'danger';
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

const base = 'inline-flex items-center font-mono font-black uppercase tracking-[0.1em] border-2';

const variants = {
  earned:  'bg-[var(--color-earned)] text-black border-[var(--color-earned)]',
  neutral: 'bg-black text-white border-white',
  danger:  'bg-[var(--color-danger)] text-white border-[var(--color-danger)]',
};

const sizes = {
  sm: 'text-[11px] px-1.5 py-1',
  md: 'text-[13px] px-2.5 py-1.5',
};

export function Badge({ variant = 'neutral', size = 'md', children, className }: BadgeProps) {
  return <span className={cn(base, variants[variant], sizes[size], className)}>{children}</span>;
}
