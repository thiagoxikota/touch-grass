import { useState } from 'react';
import { Tag } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'TAG';

const FILTERS = ['DAILY', 'WEEKLY', 'MONTHLY', 'ALL TIME'];

const PROPS = [
  { name: 'active', type: 'boolean', default: 'false', description: 'Toggled on state. Renders earned fill + black text.' },
  { name: 'children', type: 'ReactNode', required: true, default: '—', description: 'Uppercase label. Keep under 12 characters.' },
  { name: 'onClick', type: '(e: MouseEvent<HTMLButtonElement>) => void', default: '—', description: 'Click handler. Pair with state setter for controlled filters.' },
];

const CODE = `import { Tag } from '@touch-grass-ds/react';

const [range, setRange] = useState('WEEKLY');

{['DAILY', 'WEEKLY', 'MONTHLY'].map((r) => (
  <Tag key={r} active={range === r} onClick={() => setRange(r)}>
    {r}
  </Tag>
))}`;

export function TagPage() {
  const [active, setActive] = useState('WEEKLY');

  return (
    <DocPage
      eyebrow="PRIMITIVES / TAG"
      title="TAG"
      kicker="Filter chip. Aria-pressed when active. Used for time ranges, categories, and toggle groups. 36px tap target — smaller than Button because tags usually come in groups."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        tapTarget: '36px',
        role: 'button',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="INTERACTIVE" title="FILTER GROUP">
        <Preview>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Tag key={f} active={active === f} onClick={() => setActive(f)}>
                {f}
              </Tag>
            ))}
          </div>
        </Preview>
      </Section>

      <Section eyebrow="STATES" title="TWO STATES">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Preview label="DEFAULT">
            <Tag>DEFAULT</Tag>
          </Preview>
          <Preview label="ACTIVE">
            <Tag active>ACTIVE</Tag>
          </Preview>
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
          { label: 'BADGE', to: '/primitives/badge', kind: 'primitive' },
          { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
          { label: 'STATES', to: '/foundations/states', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
