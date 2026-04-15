import { DocPage, Section, RelatedLinks } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'BORDERS';

interface BorderRow {
  token: string;
  cls: string;
  desc: string;
  usage: string;
}

const BORDERS: BorderRow[] = [
  {
    token: 'hairline',
    cls: 'border border-[var(--color-hairline)]',
    desc: '1px #1A1A1A',
    usage: 'Default structure. Dividers, row separators, card edges.',
  },
  {
    token: 'strong',
    cls: 'border-2 border-[var(--color-fg)]',
    desc: '2px fg / white',
    usage: 'Important boundaries. Section caps, surface containers, hero frames.',
  },
  {
    token: 'active',
    cls: 'border-2 border-[var(--color-earned)]',
    desc: '2px earned / lime',
    usage: 'Active, selected, currently-focused. Pair with earned background only when explicitly "on".',
  },
  {
    token: 'danger',
    cls: 'border-2 border-[var(--color-danger)]',
    desc: '2px danger / red',
    usage: 'Danger state frames. Confirm-destructive modals, error containers.',
  },
  {
    token: 'disabled',
    cls: 'border-2 border-dashed border-[var(--color-fg)]',
    desc: '2px DASHED fg',
    usage: 'Disabled state. Looks broken on purpose — dashed is the system\'s honesty signal.',
  },
];

const RULES: [string, string][] = [
  ['RADIUS = 0', 'The only radius. Ever. Avatars included — the square avatar is a brand signature.'],
  ['NO SHADOWS', 'Drop shadows are banned. Depth is built from stacked hairlines, not blur.'],
  ['DASHED = BROKEN', 'Dashed borders are exclusively reserved for disabled state.'],
  ['HAIRLINE IS SURFACE ONLY', 'Never use --color-hairline for text. It exists to separate, not to speak.'],
  ['NO GRADIENT BORDERS', 'A border is a single solid line at 1px or 2px. Gradients, glows, double-strokes — all banned.'],
];

export function Borders() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / BORDERS"
      title="FIVE BORDERS"
      kicker="Every boundary in the DS is one of these five tokens. Radius is locked at zero — forever. Including avatars. The square avatar is a brand signature."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'token-layer',
        importPath: '@touch-grass-ds/tokens',
      }}
    >
      <Section eyebrow="TOKENS" title="FIVE BORDERS AND THEIR JOBS">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BORDERS.map((b) => (
            <article
              key={b.token}
              className={`p-8 ${b.cls} bg-[var(--color-bg)]`}
            >
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
                // BORDER / {b.token.toUpperCase()}
              </div>
              <div className="font-black text-[32px] leading-none tracking-[-0.02em] text-[var(--color-fg)] mb-3">
                {b.desc}
              </div>
              <p className="font-mono text-[12px] font-semibold text-[var(--color-fg)] leading-relaxed">
                {b.usage}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="RULES" title="FIVE NON-NEGOTIABLES">
        <div className="border border-[var(--color-hairline)]">
          {RULES.map(([rule, desc], i) => (
            <div
              key={rule}
              className={`grid grid-cols-[120px_1fr] md:grid-cols-[280px_1fr] ${
                i < RULES.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
              }`}
            >
              <div className="p-5 font-mono text-[12px] md:text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">
                {rule}
              </div>
              <div className="p-5 font-mono text-[13px] md:text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
                {desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <RelatedLinks
        items={[
          { label: 'COLOR', to: '/foundations/color', kind: 'foundation' },
          { label: 'STATES', to: '/foundations/states', kind: 'foundation' },
          { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
        ]}
      />
    </DocPage>
  );
}
