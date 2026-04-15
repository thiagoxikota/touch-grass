import { forwardRef, type ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface BarChartProps extends Omit<ComponentProps<'figure'>, 'children'> {
  title?: string;
  data: readonly BarChartDatum[];
  dangerThreshold?: number;
  height?: number;
}

export const BarChart = forwardRef<HTMLElement, BarChartProps>(function BarChart(
  { title = 'BAR CHART', data, dangerThreshold, height = 120, className, ...rest },
  ref
) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const summary = data.map((d) => `${d.label} ${d.value}`).join(', ');

  return (
    <figure
      ref={ref}
      className={cn('border border-[var(--color-hairline)]', className)}
      role="img"
      aria-label={`${title}: ${summary}`}
      {...rest}
    >
      <figcaption className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] border-b border-[var(--color-hairline)] px-4 py-2">
        // {title}
      </figcaption>
      <div className="p-4 bg-[var(--color-bg)]">
        <ol className="grid grid-cols-1 gap-2" style={{ minHeight: `${height}px` }}>
          {data.map((d) => {
            const pct = Math.max((d.value / max) * 100, 1);
            const isDanger = dangerThreshold !== undefined && d.value >= dangerThreshold;

            return (
              <li key={d.label} className="grid grid-cols-[72px_1fr_auto] items-center gap-3 min-h-12">
                <span className="font-mono text-[11px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)]">
                  {d.label}
                </span>
                <div className="h-4 border border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
                  <div className={cn('h-full', isDanger ? 'bg-[var(--color-danger)]' : 'bg-[var(--color-earned)]')} style={{ width: `${pct}%` }} />
                </div>
                <span className="font-mono text-[12px] font-black uppercase tracking-[0.1em] text-[var(--color-fg)] min-w-[44px] text-right">
                  {d.value}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="border-t border-[var(--color-hairline)] mt-3 pt-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
          // SCALE: RELATIVE TO MAX ({max})
        </div>
      </div>
    </figure>
  );
});
