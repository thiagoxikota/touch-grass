import { Sparkline } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'SPARKLINE';

const WEEK = [12, 45, 80, 20, 110, 50, 95];
const MONTH = [30, 45, 60, 40, 55, 70, 90, 60, 80, 100, 85, 95, 70, 60, 40, 55, 75, 90, 105, 80, 65, 50, 35, 45, 60, 80, 95, 110, 100, 85];

const PROPS = [
  { name: 'data', type: 'number[]', required: true, default: '—', description: 'Raw values. Bars auto-scale against the max.' },
  { name: 'dangerThreshold', type: 'number', default: '—', description: 'Optional threshold — values >= it paint in danger instead of earned.' },
  { name: 'height', type: 'number', default: '64', description: 'Max bar height in pixels. The container fixes to this height.' },
];

const CODE = `import { Sparkline } from '@touch-grass-ds/react';

const week = [12, 45, 80, 20, 110, 50, 95];

<Sparkline data={week} />
<Sparkline data={week} dangerThreshold={90} />`;

export function SparklinePage() {
  return (
    <DocPage
      eyebrow="PATTERNS / SPARKLINE"
      title="SPARKLINE"
      kicker="Brutalist data-viz. No SVG paths, no animated strokes — pure DOM blocks scaling linearly against the max. Paint danger values above an optional threshold."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'img',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="LIVE" title="WEEKLY + MONTHLY">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Preview label="// WEEKLY FOCUS (MINUTES)">
            <div className="border border-[var(--color-hairline)] p-4 bg-[var(--color-bg)]">
              <Sparkline data={WEEK} />
            </div>
          </Preview>
          <Preview label="// WITH DANGER THRESHOLD · 90">
            <div className="border border-[var(--color-hairline)] p-4 bg-[var(--color-bg)]">
              <Sparkline data={WEEK} dangerThreshold={90} />
            </div>
          </Preview>
        </div>
        <div className="mt-6">
          <Preview label="// MONTHLY · 30 BARS">
            <div className="border border-[var(--color-hairline)] p-4 bg-[var(--color-bg)]">
              <Sparkline data={MONTH} height={96} />
            </div>
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
          { label: 'STAT', to: '/primitives/stat', kind: 'primitive' },
          { label: 'COLOR', to: '/foundations/color', kind: 'foundation' },
          { label: 'MOTION', to: '/foundations/motion', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
