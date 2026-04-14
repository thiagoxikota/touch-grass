import { useEffect, useState } from 'react';
import { Stat } from './Stat';

type TimerVariant = 'static' | 'live';

export interface TimerProps {
  variant?: TimerVariant;
  /** Required when variant === 'static' */
  value?: string;
  /** Required when variant === 'live'. Timer computes elapsed = now - start. */
  start?: Date;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

function formatElapsed(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function Timer({ variant = 'static', value, start, label, size = 'lg', className }: TimerProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (variant !== 'live') return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [variant]);

  const display = variant === 'live' && start
    ? formatElapsed(now - start.getTime())
    : (value ?? '00:00:00');

  return <Stat role="timer" aria-live="off" variant="hero" label={label} value={display} size={size} className={className} />;
}
