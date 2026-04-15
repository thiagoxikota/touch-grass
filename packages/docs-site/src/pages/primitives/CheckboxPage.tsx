import { useState } from 'react';
import { Checkbox } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'CHECKBOX';

const PROPS = [
  { name: 'checked', type: 'boolean', default: 'false', description: 'Controlled checked state.' },
  { name: 'label', type: 'string', default: '—', description: 'Uppercase mono label, rendered inline next to the box.' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Danger border + aria-invalid.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Dashed border, no events.' },
  { name: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', default: '—', description: 'Native change handler.' },
];

const CODE = `import { Checkbox } from '@touch-grass-ds/react';

const [agreed, setAgreed] = useState(false);

<Checkbox
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  label="AGREE TO TERMS"
/>`;

export function CheckboxPage() {
  const [checked, setChecked] = useState(false);

  return (
    <DocPage
      eyebrow="PRIMITIVES / CHECKBOX"
      title="CHECKBOX"
      kicker="Hard SVG path check. No rounded corners, no hover fades. Native input wrapped in a label for free keyboard + focus semantics."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        tapTarget: '24px box + 48px row',
        role: 'checkbox',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="INTERACTIVE" title="CLICK IT">
        <Preview>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label="AGREE TO TERMS"
          />
        </Preview>
      </Section>

      <Section eyebrow="STATES" title="FOUR STATES">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Preview label="DEFAULT / UNCHECKED">
            <Checkbox label="TERMS" />
          </Preview>
          <Preview label="CHECKED">
            <Checkbox checked readOnly label="TERMS" />
          </Preview>
          <Preview label="DISABLED">
            <Checkbox disabled label="UNAVAILABLE" />
          </Preview>
          <Preview label="ERROR">
            <Checkbox error label="REQUIRED FIELD" />
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
          { label: 'SWITCH', to: '/primitives/switch', kind: 'primitive' },
          { label: 'INPUT', to: '/primitives/input', kind: 'primitive' },
          { label: 'STATES', to: '/foundations/states', kind: 'foundation' },
        ]}
      />
    </DocPage>
  );
}
