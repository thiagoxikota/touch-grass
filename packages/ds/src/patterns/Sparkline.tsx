import { forwardRef, type ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface SparklineProps extends Omit<ComponentProps<'div'>, 'children'> {
  data: number[];
  dangerThreshold?: number; // values >= this will be painted danger
  height?: number; // max height in px
}

// Zero motion data visualization. Pure DOM structure.
export const Sparkline = forwardRef<HTMLDivElement, SparklineProps>(function Sparkline(
  { data, dangerThreshold, height = 64, className, ...rest },
  ref
) {
  const max = Math.max(...data, 1);
  
  return (
    <div 
      ref={ref} 
      className={cn('flex items-end gap-[2px]', className)} 
      style={{ height: `${height}px` }} 
      {...rest}
    >
      {data.map((val, i) => {
        const pct = Math.max((val / max) * 100, 1); // 1% minimum visual height
        const isDanger = dangerThreshold !== undefined && val >= dangerThreshold;
        return (
          <div 
            key={i}
            className={cn('flex-1 w-full', isDanger ? 'bg-danger' : 'bg-earned')}
            style={{ height: `${pct}%` }}
          />
        );
      })}
    </div>
  );
});
