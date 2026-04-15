import { DocPage, Section, RelatedLinks } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'ACCESSIBILITY';

const RULES: [string, string][] = [
  ['WCAG 2.1 AAA', 'We aim for strict 7.0:1 contrast ratios for text. No excuses. If it\'s unreadable, it\'s unfinished.'],
  ['ZERO SHADES OF GRAY', 'The design uses pure black (--color-bg) and flat colors. Text uses --color-fg (primary), --color-fg-muted (secondary), or --color-fg-subtle (metadata only). No opacity-based hierarchy — use the neutral tokens instead.'],
  ['DANGER CONTRAST', 'Our danger red (--color-danger / #FF6B6B) pairs strictly with black text. Do not use white text over the red danger background; it fails WCAG.'],
  ['FOCUS HALOS', 'Every interactive element forces a 2px rigid white outline structure with a 3px offset. It screams focus. It cannot be disabled.'],
  ['SEMANTIC STRICTNESS', 'Use pure HTML5 whenever possible. Custom components (like our brutalist SVG toggles) rely heavily on aria-hidden="true" to keep screen readers clean and loud.'],
];

export function Accessibility() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / ACCESSIBILITY"
      title="NO EXCUSES"
      kicker="We build digital interfaces for everyone. The brutalist nature of Touch Grass demands sheer clarity. Massive contrast, zero visual noise, strict semantic trees. This is AAA or nothing."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'a11y-layer',
      }}
    >
      <Section eyebrow="STANDARDS" title="THE AAA PROTOCOL">
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
      
      <Section eyebrow="COMPONENTS" title="ARIA EXPECTATIONS">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
          <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-hairline)]">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
              // FORMS & LABELS
            </div>
            <p className="font-mono text-[13px] font-semibold text-[var(--color-fg)] leading-relaxed">
              Inputs are linked explicitly using <code>aria-describedby</code> and <code>htmlFor</code> properties. Assistive technologies trace the ID bridges between errors, descriptions, and inputs instantly.
            </p>
          </div>
          <div className="p-5">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
              // DECORATIVE NOISE
            </div>
            <p className="font-mono text-[13px] font-semibold text-[var(--color-fg)] leading-relaxed">
              If an icon provides no context, it's purged from the accessibility tree. <code>aria-hidden="true"</code> enforces silence on decorative brutalist SVG illustrations.
            </p>
          </div>
        </div>
      </Section>

      <RelatedLinks
        items={[
          { label: 'COLOR', to: '/foundations/color', kind: 'foundation' },
          { label: 'CHECKBOX', to: '/primitives/checkbox', kind: 'primitive' },
          { label: 'WCAG GUIDELINES', to: 'https://www.w3.org/TR/WCAG21/', kind: 'external' },
        ]}
      />
    </DocPage>
  );
}
