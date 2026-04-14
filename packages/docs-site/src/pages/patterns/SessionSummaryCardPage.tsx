import { SessionSummaryCard } from '@touch-grass/ds';

export const title = "SESSION SUMMARY";

export function SessionSummaryCardPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / SESSIONSUMMARYCARD
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">SESSIONSUMMARYCARD.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Post-session retro for the social feed. Card + Stat (md) + meta grid. Composes two primitives.
      </p>

      <div className="max-w-[640px]">
        <SessionSummaryCard
          date="2026-04-13"
          duration="04:32:18"
          stats={[
            { k: 'GOAL', v: 'SHIP V1' },
            { k: 'BLOCKS', v: '4' },
            { k: 'RANK', v: '#17' },
          ]}
        />
      </div>
    </div>
  );
}
