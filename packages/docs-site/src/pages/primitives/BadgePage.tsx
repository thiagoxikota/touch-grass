import { Badge } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  VariantsMatrix,
  Preview,
} from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'BADGE';

const VARIANTS = ['earned', 'neutral', 'danger'] as const;
const SIZES = ['sm', 'md'] as const;

const PROPS = [
  { name: 'variant', type: "'earned' | 'neutral' | 'danger'", default: "'neutral'", description: 'earned for KING/TOP/WIN. Neutral for default status. Danger for errors.' },
  { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'sm for inline/tight contexts. md for rows and cards.' },
  { name: 'children', type: 'ReactNode', default: '—', required: true, description: 'Uppercase label. Keep under 8 characters.' },
];

const CODE = `import { Badge } from '@touch-grass-ds/react';

<Badge variant="earned" size="md">KING</Badge>
<Badge variant="neutral" size="md">MEMBER</Badge>
<Badge variant="danger" size="sm">BROKEN</Badge>`;

export function BadgePage() {
  return (
    <DocPage
      eyebrow="PRIMITIVES / BADGE"
      title="BADGE"
      kicker="Inline status indicator. Three variants, two sizes. earned is scarce — one per row or card, never stacked."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'status',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="VARIANTS × SIZES" title="SIX COMBINATIONS">
        <VariantsMatrix
          variants={VARIANTS}
          states={SIZES}
          renderCell={(v, s) => (
            <Badge variant={v} size={s}>
              {v === 'earned' ? 'KING' : v === 'danger' ? 'BROKEN' : 'MEMBER'}
            </Badge>
          )}
          variantLabel="VARIANT"
        />
      </Section>

      <Section eyebrow="USAGE" title="CODE">
        <CodeBlock code={CODE} />
      </Section>

      <Section eyebrow="API" title="PROPS">
        <PropsTable rows={PROPS} />
      </Section>

      <Preview label="LIVE CONTEXT · LEADERBOARD ROW">
        <div className="flex flex-wrap gap-3 items-center">
          <Badge variant="earned">KING</Badge>
          <Badge variant="neutral">+2H</Badge>
          <Badge variant="danger">BROKEN</Badge>
          <Badge variant="earned" size="sm">
            TOP
          </Badge>
          <Badge variant="neutral" size="sm">
            NEW
          </Badge>
        </div>
      </Preview>

      <RelatedLinks
        items={[
          { label: 'TAG', to: '/primitives/tag', kind: 'primitive' },
          { label: 'LEADERBOARD ROW', to: '/patterns/leaderboard-row', kind: 'pattern' },
          { label: 'COLOR', to: '/foundations/color', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
