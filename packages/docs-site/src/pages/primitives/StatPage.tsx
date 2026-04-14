import { Stat } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'STAT';

const PROPS = [
  { name: 'variant', type: "'hero' | 'inline'", default: "'hero'", description: 'Hero is the display block. Inline renders as a small mono span.' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'lg'", description: 'Maps to type tokens: 24/64/80/96px.' },
  { name: 'label', type: 'ReactNode', default: '—', description: 'Eyebrow label. Rendered as uppercase mono above the value.' },
  { name: 'value', type: 'ReactNode', required: true, default: '—', description: 'The number or string itself. Geist Mono. earned color on hero.' },
  { name: 'meta', type: 'StatMeta[]', default: '—', description: 'Optional meta row shown below the value, separated by hairline.' },
];

const CODE = `import { Stat } from '@touch-grass-ds/react';

<Stat
  label="UNTETHERED TODAY"
  value="04:32:18"
  meta={[
    { k: 'VS YESTERDAY', v: '+47%' },
    { k: 'STREAK', v: '12 DAYS' },
    { k: 'RANK', v: '#17' },
  ]}
/>`;

export function StatPage() {
  return (
    <DocPage
      eyebrow="PRIMITIVES / STAT"
      title="STAT"
      kicker="The headline number — the typographic flex of the DS. Four sizes: sm (inline) through xl (full-bleed hero). The number itself is always Geist Mono and always earned-colored on hero."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'display',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="HERO + META" title="THE FULL STAT">
        <Preview>
          <Stat
            label="UNTETHERED TODAY"
            value="04:32:18"
            meta={[
              { k: 'VS YESTERDAY', v: '+47%' },
              { k: 'STREAK', v: '12 DAYS' },
              { k: 'RANK', v: '#17' },
            ]}
          />
        </Preview>
      </Section>

      <Section eyebrow="SIZES" title="FOUR STEPS ON THE HERO LADDER">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Preview label="XL · 96PX">
            <Stat label="FULL BLEED" value="04:32" size="xl" />
          </Preview>
          <Preview label="LG · 80PX">
            <Stat label="DEFAULT" value="04:32:18" size="lg" />
          </Preview>
          <Preview label="MD · 64PX">
            <Stat label="MOBILE" value="04:32:18" size="md" />
          </Preview>
        </div>
      </Section>

      <Section eyebrow="INLINE" title="STAT AS A SPAN">
        <Preview>
          <p className="font-mono text-[16px] font-semibold text-[var(--color-fg)]">
            You are <Stat variant="inline" value="#17" /> on a{' '}
            <Stat variant="inline" value="12D" /> streak.
          </p>
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
          { label: 'TIMER', to: '/primitives/timer', kind: 'primitive' },
          { label: 'TYPOGRAPHY', to: '/foundations/typography', kind: 'foundation' },
          { label: 'FOCUS TIMER DISPLAY', to: '/patterns/focus-timer-display', kind: 'pattern' },
        ]}
      />
    </DocPage>
  );
}
