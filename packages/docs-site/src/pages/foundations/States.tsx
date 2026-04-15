import { Button } from '@touch-grass-ds/react';
import { DocPage, Section, RelatedLinks, Preview } from '../../ui/DocPage';
import { DS_VERSION } from '../../lib/version';

export const title = 'STATES';

interface StateRow {
  name: string;
  cls: string;
  desc: string;
}

const STATES: StateRow[] = [
  {
    name: 'DEFAULT',
    cls: 'text-[var(--color-earned)]',
    desc: 'Solid earned fill, black text, 2px earned border. The "on" signal.',
  },
  {
    name: 'HOVER',
    cls: 'text-[var(--color-earned)]',
    desc: 'Inset 2px black bevel cut into the button. No color change. Instant.',
  },
  {
    name: 'FOCUS',
    cls: 'text-[var(--color-earned)]',
    desc: '2px fg outline at 3px offset. Hard halo. Never a glow. Appears on :focus-visible only.',
  },
  {
    name: 'ACTIVE',
    cls: 'text-[var(--color-earned)]',
    desc: 'Mouse-down / touch. Stronger inset or border-weight shift. Instant. No easing.',
  },
  {
    name: 'SELECTED',
    cls: 'text-[var(--color-earned)]',
    desc: 'Toggled on / checked. Earned accent via border-left, fill, or checkmark. Required for Checkbox, Switch, Tag.',
  },
  {
    name: 'DISABLED',
    cls: 'text-[var(--color-danger)]',
    desc: '2px DASHED fg border, bg black, text fg. cursor: not-allowed. Looks broken on purpose — dashed is honesty.',
  },
  {
    name: 'LOADING',
    cls: 'text-[var(--color-earned)]',
    desc: 'Label replaced with "█▌ VERB-ING". 2px solid fg border. aria-busy="true". No spinner.',
  },
];

export function States() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / STATES"
      title="SEVEN STATES"
      kicker="Every interactive component must define all applicable states, explicitly. No implicit opacity tricks, no default fallbacks. If a component doesn't define its disabled state, it doesn't ship. See docs/contract.md §3."
      meta={{
        status: 'stable',
        version: DS_VERSION,
        role: 'interaction-contract',
      }}
    >
      <Section eyebrow="CONTRACT" title="THE SEVEN STATES AND THEIR SIGNALS">
        <div className="border border-[var(--color-hairline)]">
          {STATES.map((s, i) => (
            <div
              key={s.name}
              className={`grid grid-cols-[120px_1fr] md:grid-cols-[220px_1fr] ${
                i < STATES.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
              }`}
            >
              <div
                className={`p-5 font-mono text-[12px] md:text-[13px] font-black uppercase tracking-[0.12em] border-r border-[var(--color-hairline)] ${s.cls}`}
              >
                // {s.name}
              </div>
              <div className="p-5 font-mono text-[13px] md:text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="LIVE" title="BUTTON AS THE CANONICAL EXAMPLE">
        <Preview label="PRIMITIVE / BUTTON · FIVE STATES">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {(['DEFAULT', 'HOVER', 'FOCUS', 'DISABLED', 'LOADING'] as const).map((st) => (
              <div key={st}>
                <div className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
                  // {st}
                </div>
                {st === 'DISABLED' ? (
                  <Button disabled>START</Button>
                ) : st === 'LOADING' ? (
                  <Button loading loadingLabel="SYNCING">START</Button>
                ) : st === 'FOCUS' ? (
                  <Button className="outline outline-2 outline-[var(--color-fg)] [outline-offset:3px]">
                    START
                  </Button>
                ) : st === 'HOVER' ? (
                  <Button className="[box-shadow:inset_0_0_0_2px_var(--color-bg)]">START</Button>
                ) : (
                  <Button>START</Button>
                )}
              </div>
            ))}
          </div>
        </Preview>
      </Section>

      <RelatedLinks
        items={[
          { label: 'MOTION', to: '/foundations/motion', kind: 'foundation' },
          { label: 'BORDERS', to: '/foundations/borders', kind: 'foundation' },
          { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
        ]}
      />
    </DocPage>
  );
}
