import { DocPage, Section, RelatedLinks } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'GRID';

interface Breakpoint {
  label: string;
  cols: number;
  min: string;
  gutter: string;
  maxW: string;
  colsCls: string;
  gapCls: string;
}

const BREAKS: Breakpoint[] = [
  { label: 'MOBILE', cols: 4, min: '0px', gutter: '8px', maxW: '100%', colsCls: 'grid-cols-4', gapCls: 'gap-2' },
  { label: 'TABLET', cols: 8, min: '768px', gutter: '12px', maxW: '100%', colsCls: 'grid-cols-8', gapCls: 'gap-3' },
  { label: 'DESKTOP', cols: 12, min: '1024px', gutter: '16px', maxW: '1280px', colsCls: 'grid-cols-12', gapCls: 'gap-4' },
];

const RULES: [string, string][] = [
  ['12 / 8 / 4', 'Desktop columns collapse to 8 at 768px and 4 at mobile. No in-between column counts.'],
  ['CONTENT MAX 1280PX', 'Never bleed past 1280px except for full-bleed hero bars and footer strips.'],
  ['ASYMMETRY IS REQUIRED', 'Don\'t default to 3-col symmetric grids. Break 2/3 + 1/3, 1/4 + 3/4, or full-bleed alternating.'],
  ['HAIRLINES ARE STRUCTURE', 'Prefer grid-with-hairlines over gaps. Density is the brand.'],
];

export function Grid() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / GRID"
      title="12 / 8 / 4"
      kicker="Twelve columns on desktop. Eight on tablet. Four on mobile. 4px base gutter. Content caps at 1280px. Asymmetry is required — don't default to centered three-column grids."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'layout-contract',
      }}
    >
      <Section eyebrow="BREAKPOINTS" title="THREE VIEWPORTS, NOTHING IN BETWEEN">
        <div className="space-y-8">
          {BREAKS.map((b) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
                  // {b.label} · {b.cols} COL · {b.gutter} GUTTER · MIN {b.min}
                </div>
                <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)]">
                  MAX {b.maxW}
                </div>
              </div>
              <div className={`grid ${b.colsCls} ${b.gapCls} border border-[var(--color-hairline)] p-3`}>
                {Array.from({ length: b.cols }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 border-2 border-[var(--color-earned)] bg-[var(--color-bg-alt)] flex items-center justify-center font-mono text-[13px] font-black text-[var(--color-earned)]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="RULES" title="FOUR NON-NEGOTIABLES">
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
          { label: 'SPACING', to: '/foundations/spacing', kind: 'foundation' },
          { label: 'TYPOGRAPHY', to: '/foundations/typography', kind: 'foundation' },
          { label: 'LEADERBOARD ROW', to: '/patterns/leaderboard-row', kind: 'pattern' },
        ]}
      />
    </DocPage>
  );
}
