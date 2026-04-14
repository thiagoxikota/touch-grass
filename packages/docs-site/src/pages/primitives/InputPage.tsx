import { Input } from '@touch-grass-ds/react';
import { DocPage, Section, Preview, CodeBlock, PropsTable, RelatedLinks } from '../../ui/DocPage';

export const title = 'INPUT';

const PROPS = [
  { name: 'variant', type: "'text' | 'numeric'", default: "'text'", description: 'Numeric switches the font to Geist Mono for tabular alignment.' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Danger border + aria-invalid. Error message should live in a sibling <Field>.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Dashed border, cursor-not-allowed, no events.' },
  { name: 'placeholder', type: 'string', default: '—', description: 'Uppercase mono placeholder. Keep it short. Prefer // EXAMPLE form.' },
];

const CODE = `import { Input } from '@touch-grass-ds/react';

<Input placeholder="@HANDLE" />
<Input variant="numeric" placeholder="00:00:00" />
<Input error defaultValue="invalid" />
<Input disabled placeholder="@HANDLE" />`;

export function InputPage() {
  return (
    <DocPage
      eyebrow="PRIMITIVES / INPUT"
      title="INPUT"
      kicker="Text or numeric. 2px fg border default. Earned hard-halo on focus. Dashed when disabled. Danger border on error. Placeholders are uppercase mono."
      meta={{
        status: 'stable',
        version: 'v0.1.2',
        tapTarget: '48px',
        role: 'textbox',
        importPath: '@touch-grass-ds/react',
      }}
    >
      <Section eyebrow="VARIANTS × STATES" title="FOUR STATES, TWO VARIANTS">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[720px]">
          <label className="block">
            <span className="block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
              // DEFAULT
            </span>
            <Input placeholder="@HANDLE" aria-label="Default input example" />
          </label>
          <label className="block">
            <span className="block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
              // NUMERIC
            </span>
            <Input variant="numeric" placeholder="00:00:00" aria-label="Numeric input example" />
          </label>
          <label className="block">
            <span className="block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
              // ERROR
            </span>
            <Input error defaultValue="invalid" aria-label="Error input example" />
          </label>
          <label className="block">
            <span className="block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-2">
              // DISABLED
            </span>
            <Input disabled placeholder="@HANDLE" aria-label="Disabled input example" />
          </label>
        </div>
      </Section>

      <Section eyebrow="USAGE" title="CODE">
        <CodeBlock code={CODE} />
      </Section>

      <Section eyebrow="API" title="PROPS">
        <PropsTable rows={PROPS} />
      </Section>

      <Section eyebrow="ACCESSIBILITY" title="WHAT INPUT GUARANTEES">
        <ul className="border border-[var(--color-hairline)]">
          {[
            ['NATIVE ELEMENT', 'Renders a real <input>. Labels must be provided via <Field> or wrapping <label>.'],
            ['TAP TARGET ≥ 48PX', 'min-h-[48px] floor. Meets WCAG 2.5.5 AAA target size.'],
            ['ARIA-INVALID', 'Set automatically when error prop is true. Paired with visible danger border.'],
            ['FOCUS RING', 'Earned-colored 2px outline at 3px offset on focus-visible.'],
          ].map(([k, v], i, arr) => (
            <li
              key={k}
              className={`grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] ${
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

      <RelatedLinks
        items={[
          { label: 'BUTTON', to: '/primitives/button', kind: 'primitive' },
          { label: 'CHECKBOX', to: '/primitives/checkbox', kind: 'primitive' },
          { label: 'SWITCH', to: '/primitives/switch', kind: 'primitive' },
        ]}
      />
    </DocPage>
  );
}
