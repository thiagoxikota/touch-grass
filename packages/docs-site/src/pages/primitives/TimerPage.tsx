import { useMemo } from 'react';
import { Timer } from '@touch-grass/ds';

export function TimerPage() {
  // Static start time so the live timer counts up from page load
  const start = useMemo(() => new Date(), []);

  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / TIMER
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">TIMER.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Static (fixed value) or Live (re-renders every second from a start Date). Composes Stat under the hood. The digits don't tween — they jump. No animation.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">STATIC</h2>
      <div className="border border-[var(--color-hairline)] p-8 mb-12">
        <Timer variant="static" value="04:32:18" label="UNTETHERED TODAY" />
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">LIVE (TICKING SINCE PAGE LOAD)</h2>
      <div className="border border-[var(--color-hairline)] p-8">
        <Timer variant="live" start={start} label="ELAPSED THIS SESSION" />
      </div>
    </div>
  );
}
