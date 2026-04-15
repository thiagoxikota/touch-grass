import { useState } from 'react';
import { Switch } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'SWITCH';

const PROPS = [
  { name: 'checked', type: 'boolean', default: 'false', description: 'Controlled on state.' },
  { name: 'label', type: 'string', default: '—', description: 'Uppercase mono label, rendered inline next to the switch.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Dashed border, no events.' },
  { name: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', default: '—', description: 'Native change handler.' },
];

const CODE = `import { Switch } from '@touch-grass-ds/react';

const [notifications, setNotifications] = useState(false);

<Switch
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
  label="NOTIFICATIONS"
/>`;

export function SwitchPage() {
  const [on, setOn] = useState(false);

  return (
    <DocPage
      eyebrow="PRIMITIVES / SWITCH"
      title="SWITCH"
      kicker="Binary toggle. The thumb jumps — it doesn't slide. Zero motion across the track. Native input with role=switch and standard keyboard support."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'switch',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="INTERACTIVE" title="TOGGLE IT">
        <Preview>
          <Switch
            checked={on}
            onChange={(e) => setOn(e.target.checked)}
            label="NOTIFICATIONS"
          />
        </Preview>
      </Section>

      <Section eyebrow="STATES" title="FOUR STATES">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Preview label="OFF">
            <Switch label="NOTIFICATIONS" />
          </Preview>
          <Preview label="ON">
            <Switch checked readOnly label="NOTIFICATIONS" />
          </Preview>
          <Preview label="DISABLED · OFF">
            <Switch disabled label="LOCKED OFF" />
          </Preview>
          <Preview label="DISABLED · ON">
            <Switch disabled checked label="LOCKED ON" />
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
          { label: 'CHECKBOX', to: '/primitives/checkbox', kind: 'primitive' },
          { label: 'INPUT', to: '/primitives/input', kind: 'primitive' },
          { label: 'MOTION', to: '/foundations/motion', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
