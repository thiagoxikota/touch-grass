import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/cn';

type StatVariant = 'hero' | 'inline';
type StatSize = 'sm' | 'md' | 'lg' | 'xl';

export interface StatMeta {
  k: string;
  v: string;
}

export interface StatProps extends ComponentProps<'div'> {
  variant?: StatVariant;
  size?: StatSize;
  label?: ReactNode;
  value: ReactNode;
  meta?: StatMeta[];
}

const sizeClasses: Record<StatSize, string> = {
  sm: 'text-[24px]',
  md: 'text-[64px]',
  lg: 'text-[80px]',
  xl: 'text-[96px]',
};

export function Stat({ variant = 'hero', size = 'lg', label, value, meta, className, ...rest }: StatProps) {
  if (variant === 'inline') {
    return (
      <span className={cn('font-mono font-black text-white', sizeClasses[size === 'lg' ? 'sm' : size], className)} {...rest}>
        {value}
      </span>
    );
  }
  return (
    <div className={cn('block', className)} {...rest}>
      {label && (
        <div className="font-mono text-[13px] font-black uppercase tracking-[0.14em] text-white mb-4">
          {label}
        </div>
      )}
      <div className={cn('font-mono font-black leading-[0.9] tracking-[-0.04em] text-earned', sizeClasses[size])}>
        {value}
      </div>
      {meta && meta.length > 0 && (
        <div className="flex gap-4 mt-6 pt-6 border-t border-hairline">
          {meta.map((m) => (
            <div key={m.k} className="flex-1">
              <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-fg-muted)]">{m.k}</div>
              <div className="font-mono text-[22px] font-black text-white mt-2">{m.v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
