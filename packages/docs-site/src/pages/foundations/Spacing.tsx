import { DocPage, Section, RelatedLinks } from '../../ui/DocPage';

/* ------------------------------------------------------------------ *
 * Spacing foundation — 4px base, 11-step scale, visual ruler,
 * section rhythm examples.
 * ------------------------------------------------------------------ */

export const title = 'SPACING';

interface SpaceRow {
  token: string;
  px: number;
  cls: string; // explicit tailwind width class so sizes stay static at build time
  use: string;
}

const SCALE: SpaceRow[] = [
  { token: 'space-1', px: 4, cls: 'w-[4px]', use: 'Hairline nudge. Icon ↔ label.' },
  { token: 'space-2', px: 8, cls: 'w-[8px]', use: 'Tight grouping. Badge ↔ text.' },
  { token: 'space-3', px: 12, cls: 'w-[12px]', use: 'Meta row gap. Stat → Stat.' },
  { token: 'space-4', px: 16, cls: 'w-[16px]', use: 'Block padding. Body floor. Most common.' },
  { token: 'space-5', px: 20, cls: 'w-[20px]', use: 'Leaderboard row horizontal padding.' },
  { token: 'space-6', px: 24, cls: 'w-[24px]', use: 'Card padding. Mobile page gutter.' },
  { token: 'space-8', px: 32, cls: 'w-[32px]', use: 'Tablet gutter. Section sub-gap.' },
  { token: 'space-12', px: 48, cls: 'w-[48px]', use: 'Mobile section rhythm. Desktop page gutter.' },
  { token: 'space-16', px: 64, cls: 'w-[64px]', use: 'Desktop section rhythm.' },
  { token: 'space-24', px: 96, cls: 'w-[96px]', use: 'Hero chapter break.' },
  { token: 'space-32', px: 128, cls: 'w-[128px]', use: 'Full chapter break. Use sparingly.' },
];

const RULES: [string, string][] = [
  ['4PX BASE', 'Every value on the scale is a multiple of 4. Off-grid values are banned.'],
  ['NO IN-BETWEENS', '5, 7, 10, 14, 28… none of these exist. If you need them, the design is wrong.'],
  ['BODY GUTTER FLOORS AT 24PX MOBILE', 'Mobile: space-6 (24). Tablet: space-8 (32). Desktop: space-12 (48).'],
  ['SECTION RHYTHM ≥ 48PX', 'Vertical gap between sections floors at space-12 mobile, space-16 desktop.'],
  ['CONTENT MAX-WIDTH 1280PX', 'Never bleed past 1280px except for full-bleed hero bars.'],
];

export function Spacing() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / SPACING"
      title="4PX BASE"
      kicker="Eleven values on the scale. Nothing in between. Density is the brand — and off-grid values are what softens a page first."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'token-layer',
        importPath: '@touch-grass-ds/tokens',
      }}
    >
      <Section eyebrow="SCALE" title="ELEVEN VALUES, ZERO IN BETWEEN">
        <div className="border border-[var(--color-hairline)]">
          {SCALE.map((s, i) => (
            <div
              key={s.token}
              className={`grid grid-cols-[120px_72px_1fr] md:grid-cols-[200px_120px_1fr_2fr] items-center ${
                i < SCALE.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
              }`}
            >
              <div className="p-4 font-mono text-[12px] md:text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">
                // {s.token.toUpperCase()}
              </div>
              <div className="p-4 font-mono text-[13px] md:text-[15px] font-black border-r border-[var(--color-hairline)] text-[var(--color-fg)]">
                {s.px}px
              </div>
              <div className="p-4 border-r-0 md:border-r border-[var(--color-hairline)]">
                <div className={`h-6 bg-[var(--color-earned)] ${s.cls}`} />
              </div>
              <div className="hidden md:block p-4 font-mono text-[12px] font-semibold text-[var(--color-fg)]">
                {s.use}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="RHYTHM" title="HOW THE SCALE COMPOSES">
        <div className="border border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
          <div className="p-4 md:p-12 space-y-12">
            <div>
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
                // SECTION ONE
              </div>
              <h3 className="font-black text-[32px] tracking-[-0.02em] leading-none mb-4 text-[var(--color-fg)]">
                Dense sections stack with space-16 (64px).
              </h3>
              <p className="font-mono text-[13px] font-semibold max-w-[60ch] text-[var(--color-fg)]">
                Body copy sits on a 16px (space-4) rhythm. Block padding floors at
                space-6 (24px) mobile, space-12 (48px) desktop.
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
                // SECTION TWO
              </div>
              <h3 className="font-black text-[32px] tracking-[-0.02em] leading-none mb-4 text-[var(--color-fg)]">
                Never 28px, never 36px, never 60px.
              </h3>
              <p className="font-mono text-[13px] font-semibold max-w-[60ch] text-[var(--color-fg)]">
                If the intended rhythm is 28, jump to 32. If it's 36, jump to 32 or
                48. The jump forces intentional decisions and kills off-grid drift.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="RULES" title="FIVE NON-NEGOTIABLES">
        <div className="border border-[var(--color-hairline)]">
          {RULES.map(([rule, desc], i) => (
            <div
              key={rule}
              className={`grid grid-cols-[120px_1fr] md:grid-cols-[300px_1fr] ${
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
          { label: 'GRID', to: '/foundations/grid', kind: 'foundation' },
          { label: 'BORDERS', to: '/foundations/borders', kind: 'foundation' },
          { label: 'TYPOGRAPHY', to: '/foundations/typography', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
