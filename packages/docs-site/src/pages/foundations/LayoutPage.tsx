import { Divider } from '@touch-grass-ds/react';
import { DocPage, Section, CodeBlock } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'LAYOUT';

export function LayoutPage() {
  return (
    <DocPage
      eyebrow="FOUNDATIONS / LAYOUT"
      title="LAYOUT"
      kicker="Reading width, vertical rhythm, and sectioning rules. The editorial contract that makes Touch Grass pages feel intentional, not just unstyled."
      meta={{ status: 'stable', version: '1.1.0' }}
    >
      <Section eyebrow="READING WIDTH" title="MAX 60–72CH">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Body copy should never exceed 72 characters per line">
            THE RULE
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Long-form body text uses <code>max-w-[66ch]</code> (approximately 60–72 characters
            depending on font). This prevents the eye from losing its place at line breaks —
            especially important with mono, which has uniform character width.
          </p>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-muted)] leading-relaxed">
            Headlines, stats, and data grids are exempt — they use the full container width.
            Only prose, descriptions, and helper copy get the reading width constraint.
          </p>
        </div>

        <div className="mt-8">
          <CodeBlock
            code={`{/* Apply reading width to prose containers */}
<div className="max-w-[66ch]">
  <p>Your body copy goes here. The 66ch max-width ensures
  comfortable reading length for mono and sans text.</p>
</div>

{/* Full-width is fine for data and stats */}
<div className="grid grid-cols-4 border border-[var(--color-hairline)]">
  <Stat label="TOTAL" value="42h" size="sm" />
</div>`}
          />
        </div>
      </Section>

      <Section eyebrow="VERTICAL RHYTHM" title="3 CANONICAL STACK GAPS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Tight, Standard, and Section — the only three you need">
            THE SCALE
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Touch Grass uses three canonical stack gaps. Picking from three values
            (not an open scale) creates consistent rhythm without decision fatigue.
          </p>
        </div>

        <div className="mt-8 border border-[var(--color-hairline)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-mono text-[13px]">
              <thead>
                <tr className="border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
                  <th className="text-left p-5 font-black uppercase tracking-[0.14em] text-[var(--color-earned)] text-[11px]">
                    // GAP
                  </th>
                  <th className="text-left p-5 font-black uppercase tracking-[0.14em] text-[var(--color-earned)] text-[11px]">
                    // TOKEN
                  </th>
                  <th className="text-left p-5 font-black uppercase tracking-[0.14em] text-[var(--color-earned)] text-[11px]">
                    // VALUE
                  </th>
                  <th className="text-left p-5 font-black uppercase tracking-[0.14em] text-[var(--color-earned)] text-[11px]">
                    // USE CASE
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--color-hairline)]">
                  <td className="p-5 font-black text-[var(--color-fg)]">TIGHT</td>
                  <td className="p-5 text-[var(--color-earned)]">space-2</td>
                  <td className="p-5 text-[var(--color-fg)]">8px</td>
                  <td className="p-5 text-[var(--color-muted)] max-w-[30ch]">
                    Label → input, label → value, tight field groups
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-hairline)]">
                  <td className="p-5 font-black text-[var(--color-fg)]">STANDARD</td>
                  <td className="p-5 text-[var(--color-earned)]">space-4</td>
                  <td className="p-5 text-[var(--color-fg)]">16px</td>
                  <td className="p-5 text-[var(--color-muted)] max-w-[30ch]">
                    Between form fields, list rows, paragraph stacks
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-black text-[var(--color-fg)]">SECTION</td>
                  <td className="p-5 text-[var(--color-earned)]">space-8</td>
                  <td className="p-5 text-[var(--color-fg)]">32px</td>
                  <td className="p-5 text-[var(--color-muted)] max-w-[30ch]">
                    Between major content sections, before/after dividers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 max-w-[66ch]">
          <p className="font-mono text-[14px] font-semibold text-[var(--color-muted)] leading-relaxed">
            When in doubt, use Standard (16px). Tight is for closely related pairs.
            Section is for structural breaks between distinct content blocks.
          </p>
        </div>
      </Section>

      <Section eyebrow="SECTIONING" title="DIVIDER + SPACING RULES">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Always use Divider + space tokens between major sections">
            THE RULE
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Never rely on ad-hoc margins for structural separation. Use the Divider
            component with consistent spacing tokens above and below.
          </p>
        </div>

        <div className="mt-8 border border-[var(--color-hairline)] p-8">
          <div className="max-w-[480px]">
            <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-4">
              <div className="font-mono text-[14px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)]">
                SECTION ONE
              </div>
              <p className="font-mono text-[12px] font-semibold text-[var(--color-subtle)] mt-1">
                Content block with left-rule heading
              </p>
            </div>
            <p className="font-mono text-[13px] font-semibold text-[var(--color-fg)] leading-relaxed mb-4">
              Content for the first section. Uses standard stack gap (16px) between elements.
            </p>

            <Divider variant="strong" className="my-8" />

            <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-4">
              <div className="font-mono text-[14px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)]">
                SECTION TWO
              </div>
              <p className="font-mono text-[12px] font-semibold text-[var(--color-subtle)] mt-1">
                Another content block, separated by strong divider
              </p>
            </div>
            <p className="font-mono text-[13px] font-semibold text-[var(--color-fg)] leading-relaxed">
              Content for the second section. Section gap (32px) above and below the divider.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <CodeBlock
            code={`import { Divider } from '@touch-grass-ds/react';

{/* Section separation pattern */}
<div>
  <SectionHeading>SECTION ONE</SectionHeading>
  <p>Content for section one...</p>

  <Divider variant="strong" className="my-8" />  {/* Section gap = 32px */}

  <SectionHeading>SECTION TWO</SectionHeading>
  <p>Content for section two...</p>
</div>

{/* Hairline vs Strong dividers */}
<Divider />                   {/* hairline — between rows */}
<Divider variant="strong" />  {/* strong — between sections */}`}
          />
        </div>
      </Section>

      <Section eyebrow="DENSITY" title="TWO MODES">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Default for product UI, Dense for tables and settings">
            DEFAULT + DENSE
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Touch Grass defines exactly two density modes. They remap CSS variables
            on a container — no prop changes needed. Components that reference density
            tokens automatically adapt.
          </p>
        </div>

        <div className="mt-8 border border-[var(--color-hairline)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-mono text-[13px]">
              <thead>
                <tr className="border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
                  <th className="text-left p-5 font-black uppercase tracking-[0.14em] text-[var(--color-earned)] text-[11px]">// VARIABLE</th>
                  <th className="text-left p-5 font-black uppercase tracking-[0.14em] text-[var(--color-earned)] text-[11px]">// DEFAULT</th>
                  <th className="text-left p-5 font-black uppercase tracking-[0.14em] text-[var(--color-earned)] text-[11px]">// DENSE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--color-hairline)]">
                  <td className="p-5 text-[var(--color-fg)]">--density-cell-py</td>
                  <td className="p-5 text-[var(--color-fg)]">16px (space-4)</td>
                  <td className="p-5 text-[var(--color-fg)]">8px (space-2)</td>
                </tr>
                <tr className="border-b border-[var(--color-hairline)]">
                  <td className="p-5 text-[var(--color-fg)]">--density-cell-px</td>
                  <td className="p-5 text-[var(--color-fg)]">20px (space-5)</td>
                  <td className="p-5 text-[var(--color-fg)]">12px (space-3)</td>
                </tr>
                <tr className="border-b border-[var(--color-hairline)]">
                  <td className="p-5 text-[var(--color-fg)]">--density-stack</td>
                  <td className="p-5 text-[var(--color-fg)]">16px (space-4)</td>
                  <td className="p-5 text-[var(--color-fg)]">8px (space-2)</td>
                </tr>
                <tr>
                  <td className="p-5 text-[var(--color-fg)]">--density-row-min-h</td>
                  <td className="p-5 text-[var(--color-fg)]">48px</td>
                  <td className="p-5 text-[var(--color-fg)]">36px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <CodeBlock
            code={`{/* Default density — applied automatically via :root */}
<div>
  <SettingsRow label="PUSH ALERTS" description="...">
    <Switch />
  </SettingsRow>
</div>

{/* Dense mode — add the class to a container */}
<div className="tg-density-dense">
  <SettingsRow label="PUSH ALERTS" description="...">
    <Switch />
  </SettingsRow>
</div>

{/* Density tokens in custom components */}
<div style={{
  padding: 'var(--density-cell-py) var(--density-cell-px)',
  minHeight: 'var(--density-row-min-h)'
}}>
  Custom row content
</div>`}
          />
        </div>
      </Section>
    </DocPage>
  );
}
