import { FocusTimerDisplay, Stat, Divider } from '@touch-grass-ds/react';
import { Breadcrumb, Eyebrow, Section, CodeBlock, Preview } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'FOCUS TIMER SCREEN';

export function FocusTimerScreenPage() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / FOCUS TIMER SCREEN</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          FOCUS TIMER<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)]">
          Full-screen focus session with timer, meta stats, and contextual info.
          The screen a user stares at while earning their streak.
        </p>
      </header>

      <Section eyebrow="PREVIEW" title="LIVE COMPOSITION">
        <Preview label="FOCUS TIMER SCREEN — ACTIVE SESSION">
          <div className="max-w-[520px] mx-auto">
            <FocusTimerDisplay
              header="// FOCUS"
              sessionLabel="SESSION 03"
              label="UNTETHERED"
              value="01:24:08"
              meta={[
                { k: 'GOAL', v: '02:00:00' },
                { k: 'STREAK', v: '12d' },
              ]}
              ctaLabel="EXTEND +15M"
            />

            <Divider className="my-6" />

            <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-6">
              <h3 className="font-mono text-[14px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)]">
                SESSION CONTEXT
              </h3>
              <p className="font-mono text-[12px] font-semibold text-[var(--color-subtle)] mt-1">
                Real-time session metadata
              </p>
            </div>

            <div className="grid grid-cols-3 gap-0 border border-[var(--color-hairline)]">
              <div className="p-4 border-r border-[var(--color-hairline)]">
                <Stat label="STARTED" value="14:02" size="sm" />
              </div>
              <div className="p-4 border-r border-[var(--color-hairline)]">
                <Stat label="LOCATION" value="SP" size="sm" />
              </div>
              <div className="p-4">
                <Stat label="RANK" value="#03" size="sm" />
              </div>
            </div>

            <div className="mt-6 px-4 py-3 border border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
              <p className="font-mono text-[12px] font-semibold text-[var(--color-muted)] leading-relaxed">
                // YOUR PHONE IS OFF. YOUR STREAK IS ALIVE. KEEP GOING.
              </p>
            </div>
          </div>
        </Preview>
      </Section>

      <Section eyebrow="RATIONALE" title="WHY IT WORKS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Timer is the hero — everything else supports it">
            FOCUS HIERARCHY
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            The FocusTimerDisplay pattern is the center of attention. It uses the Card pattern
            with a hero-sized Stat. Below it, secondary context (start time, location, rank)
            uses smaller stats. The motivational line uses muted — present but not competing.
          </p>

          <SectionHeading sub="Left-rule headings segment the screen into logical zones">
            SECTION RHYTHM
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            A hairline divider separates the timer from context. The &ldquo;SESSION CONTEXT&rdquo;
            heading uses the 2px left-rule motif. The motivational bar uses bg-alt + hairline border
            to sit visually below everything else.
          </p>
        </div>
      </Section>

      <Section eyebrow="CODE" title="COPY / PASTE">
        <CodeBlock
          code={`import { FocusTimerDisplay, Stat, Divider } from '@touch-grass-ds/react';

function FocusTimerScreen() {
  return (
    <div className="max-w-[520px] mx-auto">
      <FocusTimerDisplay
        header="// FOCUS"
        sessionLabel="SESSION 03"
        label="UNTETHERED"
        value="01:24:08"
        meta={[
          { k: 'GOAL', v: '02:00:00' },
          { k: 'STREAK', v: '12d' },
        ]}
        ctaLabel="EXTEND +15M"
      />

      <Divider className="my-6" />

      <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-6">
        <h3 className="font-mono text-[14px] font-black uppercase tracking-[0.12em]">
          SESSION CONTEXT
        </h3>
      </div>

      <div className="grid grid-cols-3 border border-[var(--color-hairline)]">
        <div className="p-4 border-r border-[var(--color-hairline)]">
          <Stat label="STARTED" value="14:02" size="sm" />
        </div>
        <div className="p-4 border-r border-[var(--color-hairline)]">
          <Stat label="LOCATION" value="SP" size="sm" />
        </div>
        <div className="p-4">
          <Stat label="RANK" value="#03" size="sm" />
        </div>
      </div>
    </div>
  );
}`}
        />
      </Section>
    </div>
  );
}
