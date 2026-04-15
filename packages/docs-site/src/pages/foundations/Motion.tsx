import { DocPage, Section, RelatedLinks } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'MOTION';

const RULES: [string, string][] = [
  ['DURATION', '0ms. The only duration that exists. There is no "fast" or "slow".'],
  ['EASING', 'linear. Also irrelevant because duration is 0.'],
  ['TRANSITIONS', 'None. No transition-colors, no transition-transform, no transition-opacity.'],
  ['ANIMATIONS', 'None. No @keyframes, no framer-motion, no scroll-triggered reveals.'],
  ['EXCEPTION', 'The BeReal capture flow may use a 2-frame hard cut for the shutter flash. No easing, no tween.'],
];

const WHY: [string, string][] = [
  ['DISCIPLINE, NOT DELIGHT', 'The product\'s job is to make you put your phone down. Soft animation is what phones use to keep you scrolling — it is the enemy.'],
  ['RESPECT THE USER\'S TIME', 'Every millisecond of easing is a millisecond the user is waiting on the UI instead of the UI waiting on them.'],
  ['NO UNCANNY VALLEY', 'Cheap animations feel cheap. Hard cuts feel intentional. When you can\'t afford Pixar, ship punk.'],
  ['ACCESSIBILITY FREE', 'Zero motion means 100% prefers-reduced-motion compatibility by default, with no alternate stylesheet to maintain.'],
];

export function Motion() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / MOTION"
      title="ZERO"
      kicker="Instant state changes. No fades. No slides. No easing. No stagger. The product's emotional register is discipline, not delight — and phones already have enough delight."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'token-layer',
      }}
    >
      <Section eyebrow="TOKENS" title="ONE VALUE, ONE EASING">
        <div className="border border-[var(--color-hairline)]">
          {RULES.map(([rule, desc], i) => (
            <div
              key={rule}
              className={`grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] ${
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

      <Section eyebrow="WHY" title="FOUR REASONS WE KILLED MOTION">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-hairline)] border-r-0 border-b-0">
          {WHY.map(([label, desc]) => (
            <div
              key={label}
              className="p-6 border-r border-b border-[var(--color-hairline)]"
            >
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
                // {label}
              </div>
              <p className="font-mono text-[13px] font-semibold text-[var(--color-fg)] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="INTERACTION SIGNAL" title="HOW FEEDBACK WORKS WITHOUT MOTION">
        <p className="font-mono text-[13px] font-semibold max-w-[62ch] mb-6 text-[var(--color-fg)]">
          Without transitions, every interaction signal is structural — it changes the
          shape, color, or border of the element instantly. Three patterns carry all the
          weight:
        </p>
        <ol className="border border-[var(--color-hairline)]">
          <li className="p-6 border-b border-[var(--color-hairline)] grid grid-cols-[60px_1fr]">
            <div className="font-black text-[40px] leading-none text-[var(--color-earned)]">01</div>
            <div>
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
                // COLOR FLIP
              </div>
              <p className="font-mono text-[13px] font-semibold text-[var(--color-fg)]">
                Hover swaps bg and fg. Black text on lime becomes lime text on black. Instant.
              </p>
            </div>
          </li>
          <li className="p-6 border-b border-[var(--color-hairline)] grid grid-cols-[60px_1fr]">
            <div className="font-black text-[40px] leading-none text-[var(--color-earned)]">02</div>
            <div>
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
                // BORDER INVERSION
              </div>
              <p className="font-mono text-[13px] font-semibold text-[var(--color-fg)]">
                Focus gets a 2px outline at 3px offset. A hard halo, never a glow.
              </p>
            </div>
          </li>
          <li className="p-6 grid grid-cols-[60px_1fr]">
            <div className="font-black text-[40px] leading-none text-[var(--color-earned)]">03</div>
            <div>
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
                // TEXT REPLACEMENT
              </div>
              <p className="font-mono text-[13px] font-semibold text-[var(--color-fg)]">
                Loading replaces the label with "█▌ SYNCING". Pressed changes copy. No spinner.
              </p>
            </div>
          </li>
        </ol>
      </Section>

      <RelatedLinks
        items={[
          { label: 'STATES', to: '/foundations/states', kind: 'foundation' },
          { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
          { label: 'TIMER', to: '/primitives/timer', kind: 'primitive' },
        ]}
      />
    </DocPage>
  );
}
