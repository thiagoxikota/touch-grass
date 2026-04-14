import { useMemo } from 'react';
import { Timer } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'TIMER';

const PROPS = [
  { name: 'variant', type: "'static' | 'live'", default: "'static'", description: 'static renders a fixed value. live ticks every second from a start Date.' },
  { name: 'value', type: 'string', default: "'00:00:00'", description: 'Required for static variant. HH:MM:SS format.' },
  { name: 'start', type: 'Date', default: '—', description: 'Required for live variant. Timer computes now - start every second.' },
  { name: 'label', type: 'string', default: '—', description: 'Optional uppercase mono label above the number.' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'lg'", description: 'Passes through to Stat. xl for full-bleed hero.' },
];

const CODE = `import { Timer } from '@touch-grass-ds/react';

// Static value
<Timer variant="static" value="04:32:18" label="UNTETHERED TODAY" />

// Live ticking from a start Date
const start = useMemo(() => new Date(), []);
<Timer variant="live" start={start} label="ELAPSED" />`;

export function TimerPage() {
  const start = useMemo(() => new Date(), []);

  return (
    <DocPage
      eyebrow="PRIMITIVES / TIMER"
      title="TIMER"
      kicker="Static or live. Composes Stat under the hood. The digits don't tween — they jump. No animation. Pair with the live variant when you want the number to count up in real time."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        role: 'timer',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="STATIC" title="FIXED VALUE">
        <Preview>
          <Timer variant="static" value="04:32:18" label="UNTETHERED TODAY" />
        </Preview>
      </Section>

      <Section eyebrow="LIVE" title="TICKING FROM PAGE LOAD">
        <Preview label="LIVE · COUNTS UP EVERY SECOND">
          <Timer variant="live" start={start} label="ELAPSED THIS SESSION" />
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
          { label: 'STAT', to: '/primitives/stat', kind: 'primitive' },
          { label: 'FOCUS TIMER DISPLAY', to: '/patterns/focus-timer-display', kind: 'pattern' },
          { label: 'MOTION', to: '/foundations/motion', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
