import { SessionSummaryCard } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'SESSION SUMMARY';

const PROPS = [
  { name: 'date', type: 'string', required: true, default: '—', description: 'ISO-style date in the header (right-aligned).' },
  { name: 'duration', type: 'string', required: true, default: '—', description: 'HH:MM:SS stat value — the lead number.' },
  { name: 'stats', type: 'StatMeta[]', required: true, default: '—', description: 'Meta row below the duration: { k, v } pairs.' },
];

const CODE = `import { SessionSummaryCard } from '@touch-grass-ds/react';

<SessionSummaryCard
  date="2026-04-13"
  duration="04:32:18"
  stats={[
    { k: 'GOAL', v: 'SHIP V1' },
    { k: 'BLOCKS', v: '4' },
    { k: 'RANK', v: '#17' },
  ]}
/>`;

export function SessionSummaryCardPage() {
  return (
    <DocPage
      eyebrow="PATTERNS / SESSION SUMMARY CARD"
      title="SESSION SUMMARY"
      kicker="Post-session retro for the social feed. Card + md Stat + meta grid. Composes two primitives — the quietest pattern in the system."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'article',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="LIVE" title="THE CARD">
        <Preview>
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
        </Preview>
      </Section>

      <Section eyebrow="COMPOSED OF" title="TWO PRIMITIVES">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-hairline)]">
          <div className="p-6 border-b md:border-b-0 md:border-r border-[var(--color-hairline)]">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
              // CARD
            </div>
            <p className="font-mono text-[12px] font-semibold text-[var(--color-fg)]">
              With header slot for date + title. Default variant.
            </p>
          </div>
          <div className="p-6">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
              // STAT · SIZE MD
            </div>
            <p className="font-mono text-[12px] font-semibold text-[var(--color-fg)]">
              64px hero value with the three-item meta row below.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="USAGE" title="CODE">
        <CodeBlock code={CODE} />
      </Section>

      <Section eyebrow="API" title="PROPS">
        <PropsTable rows={PROPS} />
      </Section>

      <RelatedLinks
        items={[
          { label: 'CARD', to: '/primitives/card', kind: 'primitive' },
          { label: 'STAT', to: '/primitives/stat', kind: 'primitive' },
          { label: 'LEADERBOARD ROW', to: '/patterns/leaderboard-row', kind: 'pattern' },
        ]}
      />
    </DocPage>
  );
}
