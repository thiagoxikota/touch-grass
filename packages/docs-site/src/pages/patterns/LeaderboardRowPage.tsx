import { LeaderboardRow } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'LEADERBOARD ROW';

const PROPS = [
  { name: 'rank', type: 'number', required: true, default: '—', description: 'Numeric rank. Pads to 2 digits below 100, caps at "9999+".' },
  { name: 'name', type: 'string', required: true, default: '—', description: 'Display name. Truncates at 16 characters.' },
  { name: 'handle', type: 'string', required: true, default: '—', description: 'Handle (without @). Truncates at 14 characters.' },
  { name: 'initials', type: 'string', required: true, default: '—', description: 'Two characters rendered in the square avatar. First 2 taken.' },
  { name: 'hours', type: 'string', required: true, default: '—', description: 'Formatted untethered time, e.g. "62:14:08".' },
  { name: 'delta', type: 'string', default: '—', description: 'Optional delta badge: "+02:11" / "−00:42". Hidden on top1 variant.' },
  { name: 'variant', type: "'default' | 'top1' | 'you'", default: "'default'", description: 'top1 renders KING badge + earned hours. you renders earned left-border highlight.' },
];

const CODE = `import { LeaderboardRow } from '@touch-grass-ds/react';

<LeaderboardRow variant="top1" rank={1} name="David H." handle="dhh" initials="DH" hours="62:14:08" />
<LeaderboardRow rank={2} name="Pieter Levels" handle="levelsio" initials="PL" hours="58:09:41" delta="+02:11" />
<LeaderboardRow variant="you" rank={17} name="You" handle="thiagoxikota" initials="TX" hours="22:48:33" delta="−08:16" />`;

export function LeaderboardRowPage() {
  return (
    <DocPage
      eyebrow="PATTERNS / LEADERBOARD ROW"
      title="LEADERBOARD ROW"
      kicker="One row in the social ranking. Three variants — top1, default, you. The row that carries Timeouts' core social loop. Names truncate at 16 chars, handles at 14."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'listitem',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="LIVE" title="A FULL LEADERBOARD">
        <Preview label="PATTERN · COMPOSED OF BADGE + SQUARE AVATAR">
          <div className="bg-[var(--color-bg)] border border-[var(--color-hairline)] -mx-6 md:mx-0">
            <LeaderboardRow variant="top1" rank={1} name="David H." handle="dhh" initials="DH" hours="62:14:08" />
            <LeaderboardRow rank={2} name="Pieter Levels" handle="levelsio" initials="PL" hours="58:09:41" delta="+02:11" />
            <LeaderboardRow rank={3} name="Naval R." handle="naval" initials="NR" hours="51:33:17" delta="+01:08" />
            <LeaderboardRow rank={4} name="Sam Corcos" handle="samcorcos" initials="SC" hours="44:21:52" delta="−00:42" />
            <LeaderboardRow variant="you" rank={17} name="You" handle="thiagoxikota" initials="TX" hours="22:48:33" delta="−08:16" />
          </div>
        </Preview>
      </Section>

      <Section eyebrow="EDGE CASES" title="TRUNCATION + LONG RANKS">
        <Preview label="EDGE CASES · LONG RANK + LONG NAME">
          <div className="bg-[var(--color-bg)] border border-[var(--color-hairline)] -mx-6 md:mx-0">
            <LeaderboardRow rank={1247} name="Long ranking number" handle="longrank" initials="LR" hours="12:00:00" delta="+00:01" />
            <LeaderboardRow rank={42} name="Display name truncates here" handle="reallylonghandle" initials="DN" hours="08:30:00" delta="−00:15" />
          </div>
        </Preview>
      </Section>

      <Section eyebrow="COMPOSED OF" title="WHICH PRIMITIVES IT USES">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--color-hairline)]">
          {[
            ['// PRIMITIVE / BADGE', 'KING badge on top1 rows.'],
            ['// PRIMITIVE / TYPOGRAPHY', 'row-num (22px mono) + row-name (18px sans).'],
            ['// PRIMITIVE / SQUARE AVATAR', 'Inline 40×40 square avatar with 2-char initials.'],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`p-6 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-[var(--color-hairline)]' : ''}`}
            >
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
                {k}
              </div>
              <p className="font-mono text-[12px] font-semibold text-[var(--color-fg)]">{v}</p>
            </div>
          ))}
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
          { label: 'BADGE', to: '/primitives/badge', kind: 'primitive' },
          { label: 'STAT', to: '/primitives/stat', kind: 'primitive' },
          { label: 'BEREAL STAMP', to: '/patterns/bereal-stamp', kind: 'pattern' },
        ]}
      />
    </DocPage>
  );
}
