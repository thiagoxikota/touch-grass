import { PatternInterruptModal } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'INTERRUPT';

const PROPS = [
  { name: 'headline', type: 'string', required: true, default: '—', description: '56px display headline. Keep under 8 words — enforced with console.warn in dev.' },
  { name: 'time', type: 'string', required: true, default: '—', description: 'Time shown in the header bar, e.g. "03:42 AM".' },
  { name: 'status', type: 'string', required: true, default: '—', description: 'Short status string in the header, e.g. "YOU ARE LOSING".' },
  { name: 'context', type: 'PatternInterruptContextItem[]', required: true, default: '—', description: 'Three-item context grid: { k, v } pairs.' },
  { name: 'primaryLabel', type: 'string', required: true, default: '—', description: 'Primary CTA label. Use a full sentence imperative.' },
  { name: 'secondaryLabel', type: 'string', required: true, default: '—', description: 'Secondary CTA (danger variant). Typically a delay option.' },
  { name: 'onPrimary', type: '() => void', default: '—', description: 'Primary click handler.' },
  { name: 'onSecondary', type: '() => void', default: '—', description: 'Secondary click handler.' },
];

const CODE = `import { PatternInterruptModal } from '@touch-grass-ds/react';

<PatternInterruptModal
  headline="47 minutes wasted. Put it down."
  time="03:42 AM"
  status="YOU ARE LOSING"
  context={[
    { k: 'YOUR GOAL', v: 'SHIP TIMEOUTS V1' },
    { k: 'DAYS LEFT', v: '23' },
    { k: 'RANK', v: '#17 / 2418' },
  ]}
  primaryLabel="PUT IT DOWN. START FOCUS."
  secondaryLabel="5 MORE MIN"
/>`;

export function PatternInterruptModalPage() {
  return (
    <DocPage
      eyebrow="PATTERNS / PATTERN INTERRUPT MODAL"
      title="INTERRUPT"
      kicker="The bullying notification. A 56px headline that names what you're losing, a context grid that shows the stakes, and a primary/secondary button row. Self-contained block — wrap in a real modal portal at integration time."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'alertdialog',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="LIVE" title="THE FULL MODAL">
        <Preview>
          <div className="max-w-[800px]">
            <PatternInterruptModal
              headline="47 minutes wasted. Put it down."
              time="03:42 AM"
              status="YOU ARE LOSING"
              context={[
                { k: 'YOUR GOAL', v: 'SHIP TIMEOUTS V1' },
                { k: 'DAYS LEFT', v: '23' },
                { k: 'RANK', v: '#17 / 2418' },
              ]}
              primaryLabel="PUT IT DOWN. START FOCUS."
              secondaryLabel="5 MORE MIN"
            />
          </div>
        </Preview>
      </Section>

      <Section eyebrow="COPYWRITING" title="HOW THE COPY CARRIES THE WEIGHT">
        <ul className="border border-[var(--color-hairline)]">
          {[
            ['NAME THE LOSS', 'Lead with minutes, dollars, days — never "you\'ve been using the phone".'],
            ['2ND PERSON, PRESENT', '"You are losing" beats "Your session is active". Directness > euphemism.'],
            ['≤ 8 WORDS HEADLINE', 'Anything longer breaks the line and softens the punch. Dev warn enforces it.'],
            ['PRIMARY AS A SENTENCE', '"Put it down. Start focus." beats "OK". The CTA is a verbal promise.'],
            ['SECONDARY ADMITS DEFEAT', '"5 more min" is honest. Never label the escape hatch as "Cancel".'],
          ].map(([k, v], i, arr) => (
            <li
              key={k}
              className={`grid grid-cols-[140px_1fr] md:grid-cols-[260px_1fr] ${
                i < arr.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
              }`}
            >
              <div className="p-5 font-mono text-[12px] md:text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">
                {k}
              </div>
              <div className="p-5 font-mono text-[13px] md:text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
                {v}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="USAGE" title="CODE">
        <CodeBlock code={CODE} />
      </Section>

      <Section eyebrow="API" title="PROPS">
        <PropsTable rows={PROPS} />
      </Section>

      <RelatedLinks
        items={[
          { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
          { label: 'TOAST', to: '/patterns/toast', kind: 'pattern' },
          { label: 'COLOR', to: '/foundations/color', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
