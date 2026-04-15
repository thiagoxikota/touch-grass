import TouchGrassLogo from '@brand/touch-grass/logo.svg?react';
import TouchGrassIcon from '@brand/touch-grass/icon.svg?react';
import { DocPage, Section, RelatedLinks } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'BRAND';

const accent = { color: 'var(--color-earned)' };

const RULES: [string, string][] = [
  ['ALWAYS LIME', 'The brand mark renders in --color-earned on --color-bg. No tints, no opacity, no white-on-black variant.'],
  ['CURRENTCOLOR', 'Brand SVGs use fill="currentColor". Set color on a parent via the token. Never hardcode hex inside a mark.'],
  ['NO RECOLORING', 'No alt color schemes. No "light mode" lockup. There is no light mode.'],
  ['CLEARSPACE', 'Minimum padding around the mark equals the height of one wordmark letter (~half the icon at its natural size).'],
  ['PRODUCT-AGNOSTIC', 'Touch Grass does not ship product brands. Apps built on the DS (Timeouts, etc.) keep their marks in their own repositories.'],
  ['SOURCE OF TRUTH', 'Canonical SVGs live at brand/touch-grass/*. Imported via @brand/ alias + ?react suffix (vite-plugin-svgr).'],
];

export function Brand() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / BRAND"
      title="ONE MARK"
      kicker="Touch Grass is a product-agnostic design system. The only brand mark shipped inside this repo is the Touch Grass mark itself. Products built on top of the DS (Timeouts, future apps) keep their own brand assets in their own repos."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'brand-layer',
      }}
    >
      <Section eyebrow="LOCKUP" title="TWO FORMS, ONE COLOR">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] border border-[var(--color-hairline)]">
          <div className="bg-[var(--color-bg)] p-12 border-b md:border-b-0 md:border-r border-[var(--color-hairline)] flex items-center justify-center">
            {/* eslint-disable-next-line react/forbid-dom-props */}
            <TouchGrassLogo style={accent} className="w-full max-w-[480px] h-auto" />
          </div>
          <div className="bg-[var(--color-bg)] p-12 flex items-center justify-center">
            {/* eslint-disable-next-line react/forbid-dom-props */}
            <TouchGrassIcon style={accent} className="w-[120px] h-[120px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-hairline)] border-t-0 bg-[var(--color-bg-alt)]">
          <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-hairline)]">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-1">
              // WORDMARK
            </div>
            <p className="font-mono text-[12px] font-semibold text-[var(--color-fg)]">
              Long-form contexts. Use when vertical space ≥ 40px.
            </p>
          </div>
          <div className="p-5">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-1">
              // ICON
            </div>
            <p className="font-mono text-[12px] font-semibold text-[var(--color-fg)]">
              Tight spaces. Nav bars, favicons, social avatars.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="RULES" title="SIX NON-NEGOTIABLES">
        <div className="border border-[var(--color-hairline)]">
          {RULES.map(([rule, desc], i) => (
            <div
              key={rule}
              className={`grid grid-cols-[120px_1fr] md:grid-cols-[240px_1fr] ${
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
          { label: 'TYPOGRAPHY', to: '/foundations/typography', kind: 'foundation' },
          { label: 'GITHUB REPO', to: 'https://github.com/thiagoxikota/touch-grass', kind: 'external' },
        ]}
      />
    </DocPage>
  );
}
