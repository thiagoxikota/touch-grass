import { Button } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  Preview,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  VariantsMatrix,
} from '../../ui/DocPage';

export const title = 'BUTTON';

const VARIANTS = ['primary', 'ghost', 'danger'] as const;
const STATES = ['default', 'hover', 'focus', 'disabled', 'loading'] as const;

const PROPS = [
  {
    name: 'variant',
    type: "'primary' | 'ghost' | 'danger'",
    default: "'primary'",
    description: 'Visual variant. Primary for the main CTA, ghost for secondary, danger for destructive.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Renders block-character loader "█▌" prefixed to loadingLabel. Disables the button.',
  },
  {
    name: 'loadingLabel',
    type: 'string',
    default: "'LOADING'",
    description: 'Label shown during loading. Use verb-ing form: SYNCING, STARTING, ENDING.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Dashed border, cursor-not-allowed. Looks broken on purpose.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    required: true,
    description: 'Button label. Use verbs in imperative form: START, CANCEL, END SESSION.',
  },
];

const CODE = `import { Button } from '@touch-grass-ds/react';

<Button>START FOCUS</Button>
<Button variant="ghost">CANCEL</Button>
<Button variant="danger">END SESSION</Button>
<Button loading loadingLabel="SYNCING">START FOCUS</Button>
<Button disabled>START FOCUS</Button>`;

function renderCell(variant: (typeof VARIANTS)[number], state: (typeof STATES)[number]) {
  switch (state) {
    case 'default':
      return <Button variant={variant}>START</Button>;
    case 'hover':
      return (
        <Button
          variant={variant}
          className="[box-shadow:inset_0_0_0_2px_var(--color-bg)]"
        >
          START
        </Button>
      );
    case 'focus':
      return (
        <Button
          variant={variant}
          className="outline outline-2 outline-[var(--color-fg)] [outline-offset:3px]"
        >
          START
        </Button>
      );
    case 'disabled':
      return (
        <Button variant={variant} disabled>
          START
        </Button>
      );
    case 'loading':
      return (
        <Button variant={variant} loading loadingLabel="SYNCING">
          START
        </Button>
      );
  }
}

export function ButtonPage() {
  return (
    <DocPage
      eyebrow="PRIMITIVES / BUTTON"
      title="BUTTON"
      kicker="The interaction primitive. Three variants, five states, 48px tap target floor. Loading is a block-character prefix — never a spinner."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        tapTarget: '48px',
        role: 'button',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="VARIANTS × STATES" title="THE FULL MATRIX">
        <VariantsMatrix
          variants={VARIANTS}
          states={STATES}
          renderCell={renderCell}
        />
      </Section>

      <Section eyebrow="USAGE" title="CODE">
        <CodeBlock code={CODE} />
      </Section>

      <Section eyebrow="API" title="PROPS">
        <PropsTable rows={PROPS} />
      </Section>

      <Section eyebrow="ACCESSIBILITY" title="WHAT BUTTON GUARANTEES">
        <ul className="border border-[var(--color-hairline)]">
          {[
            ['NATIVE ELEMENT', 'Renders a real <button>, not a div. Keyboard, focus, and click semantics come free.'],
            ['TAP TARGET ≥ 48PX', 'min-h-[48px] enforced. Meets WCAG 2.5.5 Level AAA target size.'],
            ['FOCUS RING', '2px outline at 3px offset. Visible on focus-visible — never clipped, never animated.'],
            ['LOADING ARIA', 'Sets aria-busy when loading. Screen readers announce the loadingLabel.'],
            ['DISABLED NATIVELY', 'Uses the disabled attribute, not aria-disabled. Receives no events, no focus.'],
          ].map(([k, v], i, arr) => (
            <li
              key={k}
              className={`grid grid-cols-[120px_1fr] md:grid-cols-[220px_1fr] ${
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

      <Section eyebrow="COMPOSED IN" title="WHERE BUTTON SHOWS UP">
        <p className="font-mono text-[13px] font-semibold max-w-[62ch] text-[var(--color-fg)]">
          Button is consumed by <strong className="text-[var(--color-earned)]">FocusTimerDisplay</strong>,{' '}
          <strong className="text-[var(--color-earned)]">PatternInterruptModal</strong>,{' '}
          <strong className="text-[var(--color-earned)]">SessionSummaryCard</strong>, and used
          directly on the <strong className="text-[var(--color-earned)]">Timeouts.app</strong> landing.
        </p>
      </Section>

      <RelatedLinks
        items={[
          { label: 'INPUT', to: '/primitives/input', kind: 'primitive' },
          { label: 'STATES', to: '/foundations/states', kind: 'foundation' },
          { label: 'FOCUS TIMER DISPLAY', to: '/patterns/focus-timer-display', kind: 'pattern' },
        ]}
      />

      <Preview label="LIVE PREVIEW">
        <div className="flex flex-wrap gap-4">
          <Button>START FOCUS</Button>
          <Button variant="ghost">CANCEL</Button>
          <Button variant="danger">END SESSION</Button>
          <Button loading loadingLabel="SYNCING">
            START
          </Button>
          <Button disabled>START</Button>
        </div>
      </Preview>
    </DocPage>
  );
}
