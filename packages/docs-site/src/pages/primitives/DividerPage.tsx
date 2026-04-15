import { Divider } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'DIVIDER';

const PROPS = [
  { name: 'variant', type: "'hairline' | 'strong'", default: "'hairline'", description: 'hairline is 1px hairline token. strong is 2px fg.' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Horizontal renders as a full-width border-top. Vertical as border-left.' },
];

const CODE = `import { Divider } from '@touch-grass-ds/react';

<Divider />
<Divider variant="strong" />
<Divider orientation="vertical" />
<Divider variant="strong" orientation="vertical" />`;

export function DividerPage() {
  return (
    <DocPage
      eyebrow="PRIMITIVES / DIVIDER"
      title="DIVIDER"
      kicker="Quiet structure. 1px hairline by default, 2px strong when the separation is important. Horizontal or vertical. Accessible as role=separator."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'separator',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="HORIZONTAL" title="HAIRLINE AND STRONG">
        <Preview label="HAIRLINE">
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] mb-4">
            Above the line.
          </p>
          <Divider />
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] mt-4">
            Below the line.
          </p>
        </Preview>
        <div className="mt-6" />
        <Preview label="STRONG">
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] mb-4">
            Above the line.
          </p>
          <Divider variant="strong" />
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] mt-4">
            Below the line.
          </p>
        </Preview>
      </Section>

      <Section eyebrow="VERTICAL" title="SIDE BY SIDE">
        <Preview>
          <div className="flex items-stretch gap-6 h-20">
            <span className="font-mono text-[14px] font-bold text-[var(--color-fg)] flex items-center">
              LEFT
            </span>
            <Divider orientation="vertical" />
            <span className="font-mono text-[14px] font-bold text-[var(--color-fg)] flex items-center">
              CENTER
            </span>
            <Divider variant="strong" orientation="vertical" />
            <span className="font-mono text-[14px] font-bold text-[var(--color-fg)] flex items-center">
              RIGHT
            </span>
          </div>
        </Preview>
      </Section>

      <Section eyebrow="USAGE" title="CODE">
        <CodeBlock code={CODE} />
      </Section>

      <Section eyebrow="API" title="PROPS">
        <PropsTable rows={PROPS} />
      </Section>

      <RelatedLinks
        items={[
          { label: 'BORDERS', to: '/foundations/borders', kind: 'foundation' },
          { label: 'SPACING', to: '/foundations/spacing', kind: 'foundation' },
          { label: 'CARD', to: '/primitives/card', kind: 'primitive' },
        ]}
      />
    </DocPage>
  );
}
