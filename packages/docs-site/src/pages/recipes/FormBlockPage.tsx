import { Button, Input, Field } from '@touch-grass-ds/react';
import { Breadcrumb, Eyebrow, Section, CodeBlock, Preview } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'FORM BLOCK';

export function FormBlockPage() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / FORM BLOCK</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          FORM BLOCK<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)]">
          Field + Input + error/help states. Clean form layout with consistent
          label hierarchy and validation feedback.
        </p>
      </header>

      <Section eyebrow="PREVIEW" title="LIVE COMPOSITION">
        <Preview label="FORM BLOCK — SIGN UP">
          <div className="max-w-[480px] space-y-6">
            <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-8">
              <h3 className="font-mono text-[18px] font-black uppercase tracking-[0.08em] text-[var(--color-fg)]">
                JOIN THE WAITLIST
              </h3>
              <p className="font-mono text-[13px] font-semibold text-[var(--color-muted)] mt-2 leading-relaxed">
                Get early access to Timeouts — the social gym for time off the phone.
              </p>
            </div>

            <Field label="DISPLAY NAME" description="How you'll appear on the leaderboard.">
              <Input placeholder="THIAGO XIKOTA" />
            </Field>

            <Field label="EMAIL" description="We'll send your invite here.">
              <Input type="email" placeholder="YOU@EXAMPLE.COM" />
            </Field>

            <Field label="HANDLE" error="Handle already taken. Try another.">
              <Input placeholder="@YOURHANDLE" defaultValue="@thiagoxikota" />
            </Field>

            <div className="pt-4 flex gap-4">
              <Button>JOIN WAITLIST</Button>
              <Button variant="ghost">CANCEL</Button>
            </div>
          </div>
        </Preview>
      </Section>

      <Section eyebrow="RATIONALE" title="WHY IT WORKS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Label → description → input → error, top to bottom">
            FIELD ANATOMY
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Each field follows a strict vertical stack: label (mono, uppercase, fg),
            description (sans, muted), input (2px border), and error (mono, danger).
            The Field pattern handles aria-describedby automatically.
          </p>

          <SectionHeading sub="2px left rule groups the form with a heading + description">
            SIGNATURE MOTIF
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            The hairline-strong left rule marks the form section heading. This is the
            consistent &ldquo;minimal brutal&rdquo; motif — a 2px rule that signals
            &ldquo;section start&rdquo; across all recipes.
          </p>
        </div>
      </Section>

      <Section eyebrow="CODE" title="COPY / PASTE">
        <CodeBlock
          code={`import { Button, Input, Field } from '@touch-grass-ds/react';

function SignUpForm() {
  return (
    <div className="max-w-[480px] space-y-6">
      <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-8">
        <h3 className="font-mono text-[18px] font-black uppercase tracking-[0.08em]">
          JOIN THE WAITLIST
        </h3>
        <p className="font-mono text-[13px] font-semibold text-[var(--color-muted)] mt-2">
          Get early access to Timeouts.
        </p>
      </div>

      <Field label="DISPLAY NAME" description="How you'll appear.">
        <Input placeholder="YOUR NAME" />
      </Field>

      <Field label="EMAIL">
        <Input type="email" placeholder="YOU@EXAMPLE.COM" />
      </Field>

      <Field label="HANDLE" error="Handle already taken.">
        <Input placeholder="@HANDLE" />
      </Field>

      <div className="pt-4 flex gap-4">
        <Button>JOIN WAITLIST</Button>
        <Button variant="ghost">CANCEL</Button>
      </div>
    </div>
  );
}`}
        />
      </Section>
    </div>
  );
}
