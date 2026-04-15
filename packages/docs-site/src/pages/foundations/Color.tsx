import { useState } from 'react';
import { DocPage, Section, RelatedLinks } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

/* ------------------------------------------------------------------ *
 * Color foundation — swatches with honest contrast ratios, copy-on-
 * click tokens, and the do/don't rule table.
 * ------------------------------------------------------------------ */

interface Swatch {
  token: string;
  hex: string;
  role: string;
  usage: string;
  onLight: boolean; // is this color light enough to need dark text?
  contrastOnBg: string; // ratio vs #000000
  pairs: { label: string; ratio: string; level: 'AAA' | 'AA' | 'AA LARGE' | 'FAIL' }[];
}

const SWATCHES: Swatch[] = [
  {
    token: '--color-bg',
    hex: '#000000',
    role: 'BACKGROUND',
    usage: 'Surface floor. Pure black. Zero tint.',
    onLight: false,
    contrastOnBg: '1.00:1',
    pairs: [
      { label: 'FG ON BG', ratio: '21:1', level: 'AAA' },
      { label: 'EARNED ON BG', ratio: '16.9:1', level: 'AAA' },
      { label: 'DANGER ON BG', ratio: '5.96:1', level: 'AA' },
    ],
  },
  {
    token: '--color-fg',
    hex: '#FFFFFF',
    role: 'TEXT (ALWAYS)',
    usage: 'Every text node. No exceptions. No muted. No grey.',
    onLight: true,
    contrastOnBg: '21:1',
    pairs: [
      { label: 'ON BG', ratio: '21:1', level: 'AAA' },
      { label: 'ON EARNED', ratio: '1.24:1', level: 'FAIL' },
      { label: 'ON DANGER', ratio: '3.52:1', level: 'AA LARGE' },
    ],
  },
  {
    token: '--color-earned',
    hex: '#A6FF00',
    role: 'EARNED · SCARCE',
    usage: 'Earned, active, success, eyebrow accent. Max one hit per component.',
    onLight: true,
    contrastOnBg: '16.9:1',
    pairs: [
      { label: 'BG ON EARNED', ratio: '16.9:1', level: 'AAA' },
      { label: 'FG ON EARNED', ratio: '1.24:1', level: 'FAIL' },
    ],
  },
  {
    token: '--color-danger',
    hex: '#FF3B3B',
    role: 'DANGER · BG ONLY',
    usage: 'Danger state backgrounds. Never danger-colored text on bg directly.',
    onLight: false,
    contrastOnBg: '5.96:1',
    pairs: [
      { label: 'FG ON DANGER', ratio: '3.52:1', level: 'AA LARGE' },
      { label: 'BG ON DANGER', ratio: '5.96:1', level: 'AA' },
    ],
  },
  {
    token: '--color-hairline',
    hex: '#1A1A1A',
    role: 'BORDER · NEVER TEXT',
    usage: '1px dividers, inset panels. Never used as a text color.',
    onLight: false,
    contrastOnBg: '1.18:1',
    pairs: [],
  },
  {
    token: '--color-bg-alt',
    hex: '#0A0A0A',
    role: 'INSET SURFACE',
    usage: 'Preview container fills, code block backgrounds. Never text.',
    onLight: false,
    contrastOnBg: '1.06:1',
    pairs: [],
  },
];

const RULES: [string, string][] = [
  ['NO GREY TEXT', 'Hierarchy is size + weight, not dimming. #666, #999, opacity tricks — banned.'],
  ['RED IS BG ONLY', 'Bare red text on black is banned. White text always sits on red.'],
  ['GREEN IS SCARCE', 'Max one green hit per component. Stacking greens is banned.'],
  ['REVERSE PAIRINGS', 'Black-on-green and white-on-red are the only allowed reverses.'],
  ['HAIRLINE IS NEVER TEXT', 'hairline and bg-alt exist for surfaces only. Using them for text is a bug.'],
];

function levelClass(level: string): string {
  if (level === 'AAA' || level === 'AA') return 'text-[var(--color-earned)]';
  if (level === 'AA LARGE') return 'text-[var(--color-fg)]';
  return 'text-[var(--color-danger)]';
}

function Clickable({ value, children }: { value: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* noop */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="cursor-pointer inline-flex items-center gap-2 hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] px-1 -mx-1 text-left"
      aria-label={`Copy ${value}`}
    >
      {children}
      <span className="font-mono text-[10px] font-black uppercase tracking-[0.14em] opacity-60">
        {copied ? 'COPIED' : 'COPY'}
      </span>
    </button>
  );
}

function Swatch({ s }: { s: Swatch }) {
  // Pick fg colors that pass WCAG for each swatch:
  // - light bg (earned/fg): black text
  // - near-black bg (hairline/bg-alt): earned text — fg is too close to read
  // - danger (#FF3B3B) bg: black text at 11px (5.96:1 passes AA), white at 40px hex (passes AA Large)
  // - dark bg (bg): white text (21:1)
  const isNearBlack = s.token === '--color-hairline' || s.token === '--color-bg-alt';
  const isDanger = s.token === '--color-danger';
  const labelHex = s.onLight ? '#000' : isNearBlack ? '#A6FF00' : isDanger ? '#000' : '#FFF';
  const displayHex = s.onLight ? '#000' : isNearBlack ? '#A6FF00' : '#FFF';
  return (
    <article className="border border-[var(--color-hairline)]">
      {/* Dynamic swatch color must be inline — hex is data, not style. */}
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div
        className="h-[240px] p-6 flex flex-col justify-between"
        style={{ backgroundColor: s.hex }}
      >
        {/* eslint-disable-next-line react/forbid-dom-props */}
        <div
          className="font-mono text-[11px] font-black uppercase tracking-[0.14em]"
          style={{ color: labelHex }}
        >
          {s.role}
        </div>
        <div>
          {/* eslint-disable-next-line react/forbid-dom-props */}
          <div
            className="font-black text-[40px] leading-none tracking-[-0.02em]"
            style={{ color: displayHex }}
          >
            {s.hex}
          </div>
          {/* eslint-disable-next-line react/forbid-dom-props */}
          <div
            className="font-mono text-[11px] font-black uppercase tracking-[0.14em] mt-2"
            style={{ color: labelHex }}
          >
            {s.contrastOnBg} ON BG
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
        <Clickable value={s.token}>
          <span className="font-mono text-[13px] font-black uppercase tracking-[0.08em] text-[var(--color-fg)]">
            {s.token}
          </span>
        </Clickable>
        <p className="font-mono text-[12px] font-semibold mt-3 text-[var(--color-fg)] leading-relaxed">
          {s.usage}
        </p>
        {s.pairs.length > 0 && (
          <ul className="mt-4 border-t border-[var(--color-hairline)] pt-3 space-y-1">
            {s.pairs.map((p) => (
              <li
                key={p.label}
                className="flex items-center justify-between font-mono text-[11px] font-black uppercase tracking-[0.12em]"
              >
                <span className="text-[var(--color-fg)]">{p.label}</span>
                <span className={levelClass(p.level)}>
                  {p.ratio} · {p.level}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function Color() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / COLOR"
      title="FOUR COLORS"
      kicker="Two structural (bg, fg). Two expressive (earned, danger). Two surface-only (hairline, bg-alt). No greys, no tertiaries, no brand secondaries. Hierarchy is built from size and weight — not from dimming."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'token-layer',
        importPath: '@touch-grass-ds/tokens',
      }}
    >
      <Section eyebrow="PALETTE" title="EVERY TOKEN WE SHIP">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SWATCHES.map((s) => (
            <Swatch key={s.token} s={s} />
          ))}
        </div>
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] mt-6">
          // CLICK ANY TOKEN TO COPY. CONTRAST RATIOS ARE WCAG 2.1 ON #000000 BG.
        </p>
      </Section>

      <Section eyebrow="RULES" title="FIVE NON-NEGOTIABLES">
        <div className="border border-[var(--color-hairline)]">
          {RULES.map(([rule, desc], i) => (
            <div
              key={rule}
              className={`grid grid-cols-[96px_1fr] md:grid-cols-[240px_1fr] ${
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

      <Section eyebrow="DO / DON'T" title="PATTERNS VERSUS ANTI-PATTERNS">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-hairline)]">
          <div className="p-6 border-b md:border-b-0 md:border-r border-[var(--color-hairline)]">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-4">
              // DO — ONE EARNED HIT
            </div>
            <div className="border-2 border-[var(--color-fg)] p-5">
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-1">
                // STREAK
              </div>
              <div className="font-black text-[56px] leading-none tracking-[-0.04em] text-[var(--color-fg)]">
                12<span className="text-[var(--color-earned)]">d</span>
              </div>
            </div>
            <p className="font-mono text-[12px] font-semibold mt-4 text-[var(--color-fg)]">
              One token of earned — on the unit, not the number. Scarcity keeps it loud.
            </p>
          </div>
          <div className="p-6">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-danger)] mb-4">
              // DON'T — EARNED STACK
            </div>
            <div className="border-2 border-[var(--color-danger)] border-dashed p-5">
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-1">
                // STREAK
              </div>
              <div className="font-black text-[56px] leading-none tracking-[-0.04em] text-[var(--color-earned)]">
                12<span className="text-[var(--color-earned)]">d</span>
              </div>
            </div>
            <p className="font-mono text-[12px] font-semibold mt-4 text-[var(--color-fg)]">
              Label + number + unit all earned. Two hits kill scarcity. Three kill the brand.
            </p>
          </div>
        </div>
      </Section>

      <RelatedLinks
        items={[
          { label: 'TYPOGRAPHY', to: '/foundations/typography', kind: 'foundation' },
          { label: 'BORDERS', to: '/foundations/borders', kind: 'foundation' },
          { label: 'STATES', to: '/foundations/states', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
