import { ToastProvider, useToast, Button } from '@touch-grass-ds/react';
import {
  DocPage,
  Section,
  CodeBlock,
  PropsTable,
  RelatedLinks,
  Preview,
} from '../../ui/DocPage';

export const title = 'TOAST';

const PROPS = [
  { name: 'message', type: 'string', required: true, default: '—', description: 'Toast text. Uppercase mono will render it in all caps.' },
  { name: 'type', type: "'default' | 'danger' | 'success'", default: "'default'", description: 'default uses hairline border. danger uses danger. success uses earned.' },
];

const CODE = `import { ToastProvider, useToast, Button } from '@touch-grass-ds/react';

function Demo() {
  const { toast } = useToast();
  return <Button onClick={() => toast('ACTION COMPLETED', 'success')}>FIRE</Button>;
}

<ToastProvider>
  <Demo />
</ToastProvider>`;

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast('ACTION COMPLETED', 'success')}>SUCCESS</Button>
      <Button variant="danger" onClick={() => toast('SYSTEM FAILURE', 'danger')}>
        DANGER
      </Button>
      <Button variant="ghost" onClick={() => toast('STANDARD NOTIFICATION', 'default')}>
        DEFAULT
      </Button>
    </div>
  );
}

export function ToastPage() {
  return (
    <ToastProvider>
      <DocPage
        eyebrow="PATTERNS / TOAST"
        title="TOAST"
        kicker="Brutalist notification system. Pop-in and pop-out are instant — zero animation on the track. Three variants: default (hairline), danger (red), success (earned). Auto-dismiss after 3 seconds."
        meta={{
          status: 'stable',
          version: 'v0.1.2',
          role: 'status / alert',
          importPath: '@touch-grass-ds/react',
        }}
      >
        <Section eyebrow="LIVE" title="TRIGGER IT">
          <Preview label="// CLICK A BUTTON — TOAST APPEARS TOP-RIGHT">
            <ToastDemo />
          </Preview>
        </Section>

        <Section eyebrow="ACCESSIBILITY" title="WHAT TOAST GUARANTEES">
          <ul className="border border-[var(--color-hairline)]">
            {[
              ['ROLE MAPPING', 'default = role=status + aria-live=polite. danger/success = role=alert + aria-live=assertive.'],
              ['3S AUTO-DISMISS', 'Instant removal after 3 seconds. No fade, no slide. User can still read during the window.'],
              ['NO FOCUS STEAL', 'Toasts never steal focus or interrupt navigation. They announce and disappear.'],
              ['STACK ORDER', 'Multiple toasts stack top-down. New ones append to the end of the list.'],
            ].map(([k, v], i, arr) => (
              <li
                key={k}
                className={`grid grid-cols-[140px_1fr] md:grid-cols-[240px_1fr] ${
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

        <Section eyebrow="USAGE" title="CODE">
          <CodeBlock code={CODE} />
        </Section>

        <Section eyebrow="API" title="PROPS">
          <PropsTable rows={PROPS} />
        </Section>

        <RelatedLinks
          items={[
            { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
            { label: 'INTERRUPT', to: '/patterns/pattern-interrupt-modal', kind: 'pattern' },
            { label: 'MOTION', to: '/foundations/motion', kind: 'foundation' },
          ]}
        />
      </DocPage>
    </ToastProvider>
  );
}
