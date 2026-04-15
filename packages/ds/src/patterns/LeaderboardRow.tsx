import type { ComponentProps } from 'react';
import { cn } from '../lib/cn';
import { Badge } from '../primitives/Badge';

export type LeaderboardRowVariant = 'default' | 'top1' | 'you';

export interface LeaderboardRowProps extends Omit<ComponentProps<'div'>, 'children'> {
  rank: number;
  name: string;
  handle: string;
  initials: string;
  hours: string;
  delta?: string;
  variant?: LeaderboardRowVariant;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max) + '…';
}

function formatRank(n: number): string {
  if (n < 100) return String(n).padStart(2, '0');
  if (n <= 9999) return String(n);
  return '9999+';
}

export function LeaderboardRow({
  rank,
  name,
  handle,
  initials,
  hours,
  delta,
  variant = 'default',
  className,
  ...rest
}: LeaderboardRowProps) {
  const isTop1 = variant === 'top1';
  const isYou = variant === 'you';

  return (
    <div
      className={cn(
        'grid grid-cols-[56px_44px_1fr_140px_100px] gap-4 px-5 py-4 border-b border-hairline items-center font-mono',
        isYou && 'bg-[var(--color-bg-alt)] border-l-4 border-earned',
        className
      )}
      {...rest}
    >
      <div className={cn('font-black', isTop1 ? 'text-[22px] text-earned' : 'text-[18px] text-white')}>
        {formatRank(rank)}
      </div>
      <div className="w-10 h-10 bg-black border-2 border-white flex items-center justify-center text-[14px] font-black text-white">
        {initials.slice(0, 2).toUpperCase()}
      </div>
      <div className="leading-tight">
        <div className="text-[18px] font-bold text-white" style={{ fontFamily: 'Geist, sans-serif' }}>
          {truncate(name, 16)}
        </div>
        <div className="text-[13px] font-semibold text-[var(--color-fg-muted)] uppercase tracking-[0.08em] mt-1">
          @{truncate(handle.toUpperCase(), 14)}
        </div>
      </div>
      <div className={cn('text-right text-[22px] font-black', isTop1 ? 'text-earned' : 'text-white')}>
        {hours}
      </div>
      <div className="flex justify-end">
        {isTop1 ? (
          <Badge variant="earned" size="md">KING</Badge>
        ) : delta ? (
          <span className="inline-flex items-center px-2.5 py-1 text-[13px] font-black text-white border-2 border-white">
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
