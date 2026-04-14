import type { ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface DividerProps extends ComponentProps<'div'> {
  variant?: 'hairline' | 'strong';
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ variant = 'hairline', orientation = 'horizontal', className, ...rest }: DividerProps) {
  const isStrong = variant === 'strong';
  const isV = orientation === 'vertical';
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        isV
          ? isStrong ? 'border-l-2 border-white h-full w-0' : 'border-l border-hairline h-full w-0'
          : isStrong ? 'border-t-2 border-white w-full h-0' : 'border-t border-hairline w-full h-0',
        className
      )}
      {...rest}
    />
  );
}
