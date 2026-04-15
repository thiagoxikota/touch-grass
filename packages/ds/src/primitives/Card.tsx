import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface CardProps extends ComponentProps<'div'> {
  variant?: 'default' | 'inset';
  header?: ReactNode;
}

export function Card({ variant = 'default', header, children, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'border border-hairline',
        variant === 'inset' ? 'bg-bg-alt' : 'bg-black',
        className
      )}
      {...rest}
    >
      {header && (
        <div className="p-6 border-b border-hairline font-mono text-[13px] font-black uppercase tracking-[0.12em] text-white">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
