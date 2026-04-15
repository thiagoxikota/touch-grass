import { FocusTimerDisplay } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'FOCUS TIMER';

const PROPS = [
  { name: 'header', type: 'ReactNode', required: true, default: '—', description: 'Card header — typically "// FOCUS / TODAY".' },
  { name: 'sessionLabel', type: 'ReactNode', default: '—', description: 'Optional session counter shown right-aligned in the header.' },
  { name: 'label', type: 'ReactNode', required: true, default: '—', description: 'Stat label above the number.' },
  { name: 'value', type: 'ReactNode', required: true, default: '—', description: 'The number itself. HH:MM:SS typically.' },
  { name: 'meta', type: 'StatMeta[]', default: '—', description: 'Optional meta row below the number.' },
  { name: 'ctaLabel', type: 'ReactNode', required: true, default: '—', description: 'Button label. Use verb-first imperative.' },
  { name: 'onCtaClick', type: '() => void', default: '—', description: 'Click handler for the CTA button.' },
];

const CODE = `import { FocusTimerDisplay } from '@touch-grass-ds/react';

<FocusTimerDisplay
  header="// FOCUS / TODAY"
  sessionLabel="SESSION 04"
  label="UNTETHERED TODAY"
  value="04:32:18"
  meta={[
    { k: 'VS YESTERDAY', v: '+47%' },
    { k: 'STREAK', v: '12 DAYS' },
    { k: 'RANK', v: '#17' },
  ]}
  ctaLabel="START FOCUS"
  onCtaClick={() => console.log('start')}
/>`;

export function FocusTimerDisplayPage() {
  return (
    <DocPage
      eyebrow="PATTERNS / FOCUS TIMER DISPLAY"
      title="FOCUS TIMER"
      kicker="The home screen's primary surface in Timeouts. Card + Stat + meta strip + full-width Button. Composes three primitives — the canonical proof of how the DS assembles."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'region',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="LIVE" title="THE FULL PATTERN">
        <Preview>
          <div className="max-w-[640px]">
            <FocusTimerDisplay
              header="// FOCUS / TODAY"
              sessionLabel="SESSION 04"
              label="UNTETHERED TODAY"
              value="04:32:18"
              meta={[
                { k: 'VS YESTERDAY', v: '+47%' },
                { k: 'STREAK', v: '12 DAYS' },
                { k: 'RANK', v: '#17' },
              ]}
              ctaLabel="START FOCUS"
            />
          </div>
        </Preview>
      </Section>

      <Section eyebrow="COMPOSED OF" title="THREE PRIMITIVES, ZERO MAGIC">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--color-hairline)]">
          {[
            ['// CARD', 'Container with hairline border + optional header slot.'],
            ['// STAT', 'Hero number with optional label and meta row.'],
            ['// BUTTON', 'Full-width primary CTA below the stat.'],
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
          { label: 'CARD', to: '/primitives/card', kind: 'primitive' },
          { label: 'STAT', to: '/primitives/stat', kind: 'primitive' },
          { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
        ]}
      />
    </DocPage>
  );
}
