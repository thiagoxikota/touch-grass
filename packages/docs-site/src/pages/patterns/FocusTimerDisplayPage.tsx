import { FocusTimerDisplay } from '@touch-grass/ds';

export function FocusTimerDisplayPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / FOCUSTIMERDISPLAY
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">FOCUSTIMERDISPLAY.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        The home screen's primary surface. Card + Stat + meta strip + full-width Button. Composes three primitives.
      </p>

      <div className="max-w-[640px]">
        <FocusTimerDisplay
          header="FOCUS / TODAY"
          sessionLabel="SESSION 04"
          label="UNTETHERED TODAY"
          value="04:32:18"
          meta={[
            { k: 'VS YESTERDAY', v: '+47%' },
            { k: 'STREAK', v: '12 DAYS' },
            { k: 'RANK', v: '#17' },
          ]}
          ctaLabel="START FOCUS"
        />
      </div>
    </div>
  );
}
