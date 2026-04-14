import { PatternInterruptModal } from '@touch-grass/ds';

export const title = "INTERRUPT";

export function PatternInterruptModalPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / PATTERNINTERRUPTMODAL
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">PATTERNINTERRUPTMODAL.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        The bullying notification. 56px display headline (max 8 words — enforced via console.warn). Red header bar, white-bordered context block, two-button row. Self-contained block; wrap in a real modal portal at app integration time.
      </p>

      <div className="max-w-[800px]">
        <PatternInterruptModal
          headline="47 minutes wasted. Put it down."
          time="03:42 AM"
          status="YOU ARE LOSING"
          context={[
            { k: 'YOUR GOAL', v: 'SHIP TIMEOUTS V1' },
            { k: 'DAYS LEFT', v: '23' },
            { k: 'RANK', v: '#17 / 2418' },
          ]}
          primaryLabel="PUT IT DOWN. START FOCUS."
          secondaryLabel="5 MORE MIN"
        />
      </div>
    </div>
  );
}
