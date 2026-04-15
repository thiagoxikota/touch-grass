import { LeaderboardRow, Divider } from '@touch-grass-ds/react';
import { Breadcrumb, Eyebrow, Section, CodeBlock, Preview } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'DENSE TABLE';

const ROWS = [
  { rank: 1, name: 'BIA CORRE', handle: 'bcorre', initials: 'BC', hours: '18h 42m', variant: 'top1' as const },
  { rank: 2, name: 'RAFA SANTOS', handle: 'rafas', initials: 'RS', hours: '16h 09m', delta: '+2h' },
  { rank: 3, name: 'THIAGO XIKOTA', handle: 'thiagoxikota', initials: 'TX', hours: '14h 51m', delta: '+0h', variant: 'you' as const },
  { rank: 4, name: 'MAYA R.', handle: 'mayar', initials: 'MR', hours: '12h 03m' },
  { rank: 5, name: 'JOÃO SILVA', handle: 'joaos', initials: 'JS', hours: '11h 22m', delta: '-1h' },
  { rank: 6, name: 'ANA LIMA', handle: 'analima', initials: 'AL', hours: '10h 05m' },
  { rank: 7, name: 'PEDRO COSTA', handle: 'pedroc', initials: 'PC', hours: '09h 44m', delta: '-2h' },
  { rank: 8, name: 'LUCA M.', handle: 'lucam', initials: 'LM', hours: '08h 31m' },
];

export function DenseTablePage() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / DENSE TABLE</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          DENSE TABLE<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)]">
          Leaderboard in dense mode — tight rows, hairline rhythm. Uses the
          <code className="text-[var(--color-earned)]"> tg-density-dense</code> class
          to demonstrate density modes.
        </p>
      </header>

      <Section eyebrow="PREVIEW — DEFAULT DENSITY" title="STANDARD LEADERBOARD">
        <Preview label="LEADERBOARD — DEFAULT">
          <div className="bg-[var(--color-bg)] border border-[var(--color-hairline)]">
            <div className="px-5 py-3 border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
                // WEEKLY LEADERBOARD — DEFAULT DENSITY
              </div>
            </div>
            {ROWS.slice(0, 5).map((r) => (
              <LeaderboardRow key={r.rank} {...r} />
            ))}
          </div>
        </Preview>
      </Section>

      <Section eyebrow="PREVIEW — DENSE MODE" title="DENSE LEADERBOARD">
        <Preview label="LEADERBOARD — DENSE (tg-density-dense)">
          <div className="tg-density-dense bg-[var(--color-bg)] border border-[var(--color-hairline)]">
            <div className="px-[var(--density-cell-px)] py-[var(--density-cell-py)] border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
                // WEEKLY LEADERBOARD — DENSE MODE
              </div>
            </div>
            {ROWS.map((r) => (
              <LeaderboardRow key={r.rank} {...r} />
            ))}
          </div>
        </Preview>
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-muted)] mt-4">
          // ADD CLASS <code className="text-[var(--color-earned)]">tg-density-dense</code> TO A CONTAINER TO ACTIVATE DENSE MODE.
          DENSITY TOKENS REMAP SPACING FOR TIGHTER ROWS.
        </p>
      </Section>

      <Divider variant="strong" className="my-12" />

      <Section eyebrow="RATIONALE" title="WHY IT WORKS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="tg-density-dense remaps --density-cell-py, --density-cell-px, --density-stack">
            DENSITY MODES
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            The <code className="text-[var(--color-earned)]">tg-density-dense</code> class
            is applied to a container element. It remaps density CSS variables to tighter values
            (8px→cell-py, 12px→cell-px). Components that reference these variables automatically
            become denser — no prop changes needed.
          </p>

          <SectionHeading sub="Hairline between rows, strong divider between sections">
            HAIRLINE RHYTHM
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Every row has a hairline bottom border. The header uses bg-alt for visual separation.
            Rank #1 uses earned color. The current user (&ldquo;you&rdquo;) has a 4px earned left border.
            Structure replaces decoration.
          </p>
        </div>
      </Section>

      <Section eyebrow="CODE" title="COPY / PASTE">
        <CodeBlock
          code={`import { LeaderboardRow } from '@touch-grass-ds/react';

function DenseLeaderboard() {
  return (
    // Add tg-density-dense to activate dense mode
    <div className="tg-density-dense border border-[var(--color-hairline)]">
      <div className="px-[var(--density-cell-px)] py-[var(--density-cell-py)] border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
        <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
          // WEEKLY LEADERBOARD
        </div>
      </div>
      <LeaderboardRow rank={1} name="BIA CORRE" handle="bcorre" initials="BC" hours="18h 42m" variant="top1" />
      <LeaderboardRow rank={2} name="RAFA SANTOS" handle="rafas" initials="RS" hours="16h 09m" delta="+2h" />
      <LeaderboardRow rank={3} name="YOU" handle="you" initials="YO" hours="14h 51m" variant="you" />
    </div>
  );
}

// Density modes:
// - Default: --density-cell-py: 16px, --density-cell-px: 20px
// - Dense:   --density-cell-py: 8px,  --density-cell-px: 12px`}
        />
      </Section>
    </div>
  );
}
