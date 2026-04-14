import { forwardRef, type ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface __NAME__Props extends ComponentProps<'div'> {
  // Add strict types here
}

// Keep tokens pure. Zero rounded corners.
export const __NAME__ = forwardRef<HTMLDivElement, __NAME__Props>(function __NAME__(
  { className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('', className)} {...rest}>
      __NAME__ works!
    </div>
  );
});
