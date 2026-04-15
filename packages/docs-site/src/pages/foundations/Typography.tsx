import { useState } from 'react';
import { DocPage, Section, RelatedLinks } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

/* ------------------------------------------------------------------ *
 * Typography foundation — the 10-step scale, weight ladder, copy-on-
 * click token names, and the rules of engagement for mono vs sans.
 * ------------------------------------------------------------------ */

export const title = 'TYPE';

interface TypeRow {
  token: string;
  size: number;
  family: 'mono' | 'sans';
  sample: string;
  use: string;
  tracking: 'tight' | 'normal' | 'wide';
  upper?: boolean;
  weight?: number;
}

const SCALE: TypeRow[] = [
  { token: 'stat-xl', size: 96, family: 'mono', sample: '04:32:18', use: 'Full-bleed hero only.', tracking: 'tight', weight: 900 },
  { token: 'stat-lg', size: 80, family: 'mono', sample: '04:32:18', use: 'Default stat hero with seconds.', tracking: 'tight', weight: 900 },
  { token: 'stat-md', size: 64, family: 'mono', sample: '04:32:18', use: 'Mobile stat hero.', tracking: 'tight', weight: 900 },
  { token: 'display', size: 56, family: 'sans', sample: '47 minutes wasted.', use: 'Landing hero headline.', tracking: 'tight', weight: 900 },
  { token: 'h1', size: 32, family: 'sans', sample: 'Page title', use: 'Page title. One per page.', tracking: 'tight', weight: 800 },
  { token: 'h2', size: 24, family: 'sans', sample: 'Section title', use: 'Section title.', tracking: 'normal', weight: 800 },
  { token: 'h3', size: 18, family: 'sans', sample: 'Component title', use: 'Component title or card header.', tracking: 'normal', weight: 700 },
  { token: 'row-num', size: 22, family: 'mono', sample: '62:14:08', use: 'Mono numbers in lists / leaderboards.', tracking: 'tight', weight: 900 },
  { token: 'row-name', size: 18, family: 'sans', sample: 'David H.', use: 'Row display names.', tracking: 'normal', weight: 700 },
  { token: 'body', size: 16, family: 'sans', sample: 'Body floor — never smaller.', use: 'Body floor. Never smaller than this.', tracking: 'normal', weight: 500 },
  { token: 'label', size: 13, family: 'mono', sample: 'UNTETHERED TODAY', use: 'Eyebrows, metadata, rótulos. Always uppercase.', tracking: 'wide', upper: true, weight: 800 },
];

const WEIGHTS: { w: number; label: string; use: string }[] = [
  { w: 500, label: 'MEDIUM', use: 'Body copy baseline.' },
  { w: 700, label: 'BOLD', use: 'h3, row-name, mid-hierarchy accents.' },
  { w: 800, label: 'EXTRABOLD', use: 'h1, h2, labels.' },
  { w: 900, label: 'BLACK', use: 'Stat heroes, display, row-num.' },
];

const RULES: [string, string][] = [
  ['NUMBERS ARE MONO', 'Any digit rendered at ≥18px uses Geist Mono. No exceptions.'],
  ['LABELS ARE MONO + UPPERCASE', '13px, font-black, tracking 0.12em, always uppercase. Prefix with //.'],
  ['BODY FLOORS AT 16PX', 'Never ship text below 16px for reading copy.'],
  ['TIGHT TRACKING ON DISPLAYS', 'Any size ≥32px takes -0.04em tracking to tighten silhouette.'],
  ['NO MIXED FAMILIES IN A LINE', 'One line = one family. Mixing mono and sans on the same baseline is a bug.'],
  ['NO OPACITY FOR HIERARCHY', 'Text hierarchy uses fg / fg-muted / fg-subtle tokens. Never use opacity or rgba() alpha to dim text.'],
];

const HIERARCHY_TIERS: { token: string; cssVar: string; hex: string; role: string; usage: string }[] = [
  { token: 'fg', cssVar: '--color-fg', hex: '#FFFFFF', role: 'PRIMARY', usage: 'Body copy, headings, stat values, button labels. The default.' },
  { token: 'fg-muted', cssVar: '--color-fg-muted', hex: '#B3B3B3', role: 'SECONDARY', usage: 'Labels, helper text, field descriptions, secondary metadata. Not for body copy.' },
  { token: 'fg-subtle', cssVar: '--color-fg-subtle', hex: '#808080', role: 'TERTIARY', usage: 'Timestamps, placeholders, table headers, input hints. Metadata/labels only — never body copy.' },
];

const SIZE_CLASS: Record<number, string> = {
  96: 'text-[96px]',
  80: 'text-[80px]',
  64: 'text-[64px]',
  56: 'text-[56px]',
  32: 'text-[32px]',
  24: 'text-[24px]',
  22: 'text-[22px]',
  18: 'text-[18px]',
  16: 'text-[16px]',
  13: 'text-[13px]',
};

const WEIGHT_CLASS: Record<number, string> = {
  500: 'font-medium',
  700: 'font-bold',
  800: 'font-extrabold',
  900: 'font-black',
};

const TRACK_CLASS: Record<'tight' | 'normal' | 'wide', string> = {
  tight: 'tracking-[-0.04em]',
  normal: 'tracking-normal',
  wide: 'tracking-[0.12em]',
};

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
      <span className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
        {copied ? 'COPIED' : 'COPY'}
      </span>
    </button>
  );
}

function ScaleRow({ r }: { r: TypeRow }) {
  const sampleClass = [
    'p-6',
    'overflow-hidden',
    'leading-[0.95]',
    'text-[var(--color-fg)]',
    r.family === 'mono' ? 'font-mono' : 'font-sans',
    SIZE_CLASS[r.size],
    WEIGHT_CLASS[r.weight ?? 900],
    TRACK_CLASS[r.tracking],
    r.upper ? 'uppercase' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-[var(--color-hairline)] last:border-b-0 items-center">
      <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
        <Clickable value={`--type-${r.token}`}>
          <span className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">
            // {r.token.toUpperCase()}
          </span>
        </Clickable>
        <div className="font-mono text-[12px] font-black mt-2 text-[var(--color-fg)]">
          {r.size}px · {r.family.toUpperCase()} · {r.weight ?? 900}
        </div>
        <div className="font-mono text-[11px] font-semibold mt-2 text-[var(--color-fg)] leading-relaxed">
          {r.use}
        </div>
      </div>
      <div className={sampleClass}>{r.sample}</div>
    </div>
  );
}

export function Typography() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / TYPOGRAPHY"
      title="TYPE"
      kicker="Two families — Geist Sans for speech, Geist Mono for data. Eleven sizes on the scale, four weights on the ladder. Numbers ≥18px are always mono. Body floors at 16px."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'token-layer',
        importPath: '@touch-grass-ds/tokens',
      }}
    >
      <Section eyebrow="SCALE" title="ELEVEN SIZES, NOTHING IN BETWEEN">
        <div className="border border-[var(--color-hairline)]">
          {SCALE.map((r) => (
            <ScaleRow key={r.token} r={r} />
          ))}
        </div>
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] mt-4">
          // CLICK ANY TOKEN TO COPY THE CSS VARIABLE NAME.
        </p>
      </Section>

      <Section eyebrow="HIERARCHY" title="THREE TIERS OF TEXT COLOR">
        <div className="border border-[var(--color-hairline)]">
          {HIERARCHY_TIERS.map((t, i) => (
            <div
              key={t.token}
              className={`grid grid-cols-1 md:grid-cols-[200px_1fr] ${
                i < HIERARCHY_TIERS.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
              }`}
            >
              <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
                <Clickable value={t.cssVar}>
                  <span className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">
                    // {t.token.toUpperCase()}
                  </span>
                </Clickable>
                <div className="font-mono text-[12px] font-black mt-2" style={{ color: t.hex }}>
                  {t.hex} · {t.role}
                </div>
              </div>
              <div className="p-5 flex items-center">
                <div>
                  <div className="text-[24px] font-black leading-none" style={{ color: t.hex }}>
                    Sample text at this tier
                  </div>
                  <p className="font-mono text-[12px] font-semibold mt-3 text-[var(--color-fg)] leading-relaxed">
                    {t.usage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg-muted)] mt-4">
          // NEVER USE OPACITY OR RGBA() ALPHA TO DIM TEXT. USE THESE TOKENS.
        </p>
      </Section>

      <Section eyebrow="WEIGHTS" title="FOUR WEIGHTS ON THE LADDER">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-[var(--color-hairline)] border-r-0 border-b-0">
          {WEIGHTS.map((w) => (
            <div
              key={w.w}
              className="p-6 border-r border-b border-[var(--color-hairline)]"
            >
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
                // {w.label} · {w.w}
              </div>
              <div
                className={`text-[40px] leading-none tracking-[-0.02em] text-[var(--color-fg)] mb-4 ${WEIGHT_CLASS[w.w]}`}
              >
                Aa Bb 01
              </div>
              <p className="font-mono text-[11px] font-semibold text-[var(--color-fg)]">{w.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAMILIES" title="SANS AND MONO HAVE DIFFERENT JOBS">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-hairline)]">
          <div className="p-8 border-b md:border-b-0 md:border-r border-[var(--color-hairline)]">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-4">
              // GEIST SANS · SPEECH
            </div>
            <div className="font-black text-[56px] leading-none tracking-[-0.04em] text-[var(--color-fg)]">
              You touched
              <br />
              grass today.
            </div>
            <p className="font-mono text-[11px] font-semibold mt-6 text-[var(--color-fg)]">
              Headlines, row names, body prose, CTA labels when conversational.
            </p>
          </div>
          <div className="p-8">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-4">
              // GEIST MONO · DATA
            </div>
            <div className="font-mono font-black text-[56px] leading-none tracking-[-0.04em] text-[var(--color-fg)]">
              02:41:22
            </div>
            <p className="font-mono text-[11px] font-semibold mt-6 text-[var(--color-fg)]">
              Numbers, labels, eyebrows, code, timers, leaderboard rows, metadata.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="RULES" title="SIX NON-NEGOTIABLES">
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
          { label: 'SPACING', to: '/foundations/spacing', kind: 'foundation' },
          { label: 'STAT PRIMITIVE', to: '/primitives/stat', kind: 'primitive' },
        ]}
      />
    </DocPage>
  );
}
