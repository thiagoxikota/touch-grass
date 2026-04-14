import { BeRealStamp } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'BEREAL STAMP';
export const slug = 'bereal-stamp';

const PROPS = [
  { name: 'timestamp', type: 'string', required: true, default: '—', description: 'ISO-style timestamp rendered bottom-left. Keep it locale-neutral when possible.' },
  { name: 'hours', type: 'string', required: true, default: '—', description: 'Hours block at bottom-right. Drives the eye — the biggest number in the layout.' },
  { name: 'src', type: 'string', default: '—', description: 'Photo URL. If omitted, render children in the base layer.' },
  { name: 'alt', type: 'string', default: "''", description: 'Alt text for the photo.' },
];

const CODE = `import { BeRealStamp } from '@touch-grass-ds/react';

<BeRealStamp
  timestamp="2026-04-13 19:42"
  hours="04:32:18"
  src="/proof.jpg"
  alt="Trail photo from 7:42pm"
/>`;

export function BeRealStampPage() {
  return (
    <DocPage
      eyebrow="PATTERNS / BEREAL STAMP"
      title="BEREAL STAMP"
      kicker="Three-layer overlay system for raw photos. Top-left: verify badge. Bottom-left: timestamp. Bottom-right: hours flex block — the part the eye sees first. No rounded corners. No filters."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'figure',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="LIVE" title="TWO PROOFS">
        <Preview>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px]">
            <BeRealStamp timestamp="2026-04-13 19:42" hours="04:32:18">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[14px] font-bold text-[var(--color-fg)] tracking-[0.2em] opacity-30">
                PHOTO PLACEHOLDER
              </div>
            </BeRealStamp>
            <BeRealStamp timestamp="2026-04-13 06:11" hours="08:14:02">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[14px] font-bold text-[var(--color-fg)] tracking-[0.2em] opacity-30">
                PHOTO PLACEHOLDER
              </div>
            </BeRealStamp>
          </div>
        </Preview>
      </Section>

      <Section eyebrow="ANATOMY" title="FOUR LAYERS, ONE RULE">
        <ol className="border border-[var(--color-hairline)]">
          {[
            ['01', '// BASE PHOTO', 'Fills the square. Never filtered, never cropped-to-round.'],
            ['02', '// VERIFY BADGE', 'Top-left. 2px earned border. "// VERIFIED OFFLINE" mono label.'],
            ['03', '// TIMESTAMP', 'Bottom-left. 2px fg border. ISO-style time, uppercase mono.'],
            ['04', '// HOURS FLEX', 'Bottom-right. Solid earned fill. 28px number + "UNTETHERED" label. Dominant.'],
          ].map(([i, label, desc], idx, arr) => (
            <li
              key={i}
              className={`grid grid-cols-[60px_1fr] md:grid-cols-[60px_220px_1fr] items-start ${
                idx < arr.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
              }`}
            >
              <div className="p-5 font-black text-[32px] leading-none text-[var(--color-earned)] border-r border-[var(--color-hairline)]">
                {i}
              </div>
              <div className="p-5 font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">
                {label}
              </div>
              <div className="col-span-2 md:col-span-1 p-5 border-t md:border-t-0 border-[var(--color-hairline)] font-mono text-[13px] font-semibold text-[var(--color-fg)]">
                {desc}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="USAGE" title="CODE">
        <CodeBlock code={CODE} />
      </Section>

      <Section eyebrow="API" title="PROPS">
        <PropsTable rows={PROPS} />
      </Section>

      <RelatedLinks
        items={[
          { label: 'LEADERBOARD ROW', to: '/patterns/leaderboard-row', kind: 'pattern' },
          { label: 'BORDERS', to: '/foundations/borders', kind: 'foundation' },
          { label: 'COLOR', to: '/foundations/color', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
