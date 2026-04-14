import { Card } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'CARD';

const PROPS = [
  { name: 'variant', type: "'default' | 'inset'", default: "'default'", description: 'Default uses bg. Inset uses bg-alt — for nested panels inside another card.' },
  { name: 'header', type: 'ReactNode', default: '—', description: 'Optional header slot. Rendered as mono uppercase, separated by hairline.' },
  { name: 'children', type: 'ReactNode', default: '—', required: true, description: 'Card body. Padded 24px.' },
];

const CODE = `import { Card } from '@touch-grass-ds/react';

<Card>
  <p>Default card. Hairline border.</p>
</Card>

<Card variant="inset" header={<span>SESSION 04</span>}>
  <p>Inset card with header.</p>
</Card>`;

export function CardPage() {
  return (
    <DocPage
      eyebrow="PRIMITIVES / CARD"
      title="CARD"
      kicker="Container with hairline border. Optional mono-uppercase header slot. Inset variant uses bg-alt for nested content — use sparingly."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'container',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="VARIANTS" title="DEFAULT AND INSET">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)]">
              Default card. Hairline border. bg floor.
            </p>
          </Card>
          <Card variant="inset">
            <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)]">
              Inset card. bg-alt surface. Use inside another card.
            </p>
          </Card>
          <Card header={<span>// FOCUS / TODAY</span>}>
            <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)]">
              Card with mono header, separated by hairline.
            </p>
          </Card>
          <Card variant="inset" header={<span>// SESSION 04</span>}>
            <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)]">
              Inset + header combination.
            </p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="USAGE" title="CODE">
        <CodeBlock code={CODE} />
      </Section>

      <Section eyebrow="API" title="PROPS">
        <PropsTable rows={PROPS} />
      </Section>

      <Preview label="LIVE · NESTED CARDS">
        <Card header={<span>// HABIT STACK</span>}>
          <div className="space-y-3">
            <Card variant="inset">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] font-black uppercase tracking-[0.1em] text-[var(--color-fg)]">
                  READ 30 MIN
                </span>
                <span className="font-mono text-[13px] font-black text-[var(--color-earned)]">
                  12D STREAK
                </span>
              </div>
            </Card>
            <Card variant="inset">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] font-black uppercase tracking-[0.1em] text-[var(--color-fg)]">
                  WALK 10K
                </span>
                <span className="font-mono text-[13px] font-black text-[var(--color-earned)]">
                  04D STREAK
                </span>
              </div>
            </Card>
          </div>
        </Card>
      </Preview>

      <RelatedLinks
        items={[
          { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
          { label: 'STAT', to: '/primitives/stat', kind: 'primitive' },
          { label: 'FOCUS TIMER DISPLAY', to: '/patterns/focus-timer-display', kind: 'pattern' },
        ]}
      />
    </DocPage>
  );
}
