import { PatternInterruptModal } from '@touch-grass-ds/react';
import { Breadcrumb, Eyebrow, Section, CodeBlock, Preview } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'INTERRUPT FLOW';

export function InterruptFlowPage() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / INTERRUPT FLOW</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          INTERRUPT<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)]">
          Modal interrupt with two-button row, brutal emphasis. When the user
          is about to break their session — make them feel it.
        </p>
      </header>

      <Section eyebrow="PREVIEW" title="LIVE COMPOSITION">
        <Preview label="INTERRUPT FLOW — SESSION END WARNING">
          <div className="max-w-[520px] mx-auto">
            <PatternInterruptModal
              headline="YOU'RE ABOUT TO BREAK YOUR STREAK."
              time="01:58:42"
              status="ACTIVE"
              context={[
                { k: 'STREAK', v: '12d' },
                { k: 'SESSION', v: '#47' },
                { k: 'RANK', v: '#03' },
              ]}
              primaryLabel="KEEP GOING"
              secondaryLabel="END IT"
            />
          </div>
        </Preview>
      </Section>

      <Section eyebrow="RATIONALE" title="WHY IT WORKS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Danger color creates urgency without motion">
            TENSION WITHOUT MOTION
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            The danger-colored header bar and 2px border create visual tension entirely
            through color and structure. No shake animation, no pulse — just red.
            The user knows this is serious.
          </p>

          <SectionHeading sub="Primary CTA is 2× wider than secondary">
            BUTTON HIERARCHY
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            The &ldquo;KEEP GOING&rdquo; button is flex-2 (earned/primary), making it the obvious choice.
            The &ldquo;END IT&rdquo; button is flex-1 (danger variant), smaller and secondary.
            This is intentional friction — the right choice should be easier to hit.
          </p>

          <SectionHeading sub="Context row gives the user stakes">
            DATA CONTEXT
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Streak, session count, and rank are shown inline so the user sees what
            they&apos;re about to lose. The 2px white border around the context block
            makes it feel like a data readout — structural, not decorative.
          </p>
        </div>
      </Section>

      <Section eyebrow="CODE" title="COPY / PASTE">
        <CodeBlock
          code={`import { PatternInterruptModal } from '@touch-grass-ds/react';

function InterruptFlow() {
  return (
    <PatternInterruptModal
      headline="YOU'RE ABOUT TO BREAK YOUR STREAK."
      time="01:58:42"
      status="ACTIVE"
      context={[
        { k: 'STREAK', v: '12d' },
        { k: 'SESSION', v: '#47' },
        { k: 'RANK', v: '#03' },
      ]}
      primaryLabel="KEEP GOING"
      secondaryLabel="END IT"
      onPrimary={() => console.log('continue')}
      onSecondary={() => console.log('end')}
    />
  );
}`}
        />
      </Section>
    </div>
  );
}
