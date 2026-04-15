import { Button } from '@touch-grass-ds/react';
import { Breadcrumb, Eyebrow, Section, CodeBlock, Preview } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'EMPTY STATE';

export function EmptyStatePage() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / EMPTY STATE</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          EMPTY STATE<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)]">
          When there is nothing to show — make the void intentional. A brutalist
          empty state is not apologetic; it is a call to action.
        </p>
      </header>

      <Section eyebrow="PREVIEW" title="LIVE COMPOSITION">
        <Preview label="EMPTY STATE — NO SESSIONS">
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-[400px]">
              <div className="font-mono text-[64px] font-black leading-none text-[var(--color-hairline-strong)] mb-6">
                00
              </div>
              <h3 className="font-mono text-[18px] font-black uppercase tracking-[0.08em] text-[var(--color-fg)] mb-3">
                NO SESSIONS YET
              </h3>
              <p className="font-mono text-[13px] font-semibold text-[var(--color-muted)] leading-relaxed mb-8">
                Put down your phone and start your first offline session.
                Your streak begins now.
              </p>
              <Button>START SESSION</Button>
            </div>
          </div>
        </Preview>

        <div className="mt-4" />

        <Preview label="EMPTY STATE — NO FRIENDS">
          <div className="flex items-center justify-center py-20">
            <div className="max-w-[480px]">
              <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4">
                <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-subtle)] mb-2">
                  // LEADERBOARD
                </div>
                <h3 className="font-mono text-[18px] font-black uppercase tracking-[0.08em] text-[var(--color-fg)] mb-2">
                  NO ONE HERE YET
                </h3>
                <p className="font-mono text-[13px] font-semibold text-[var(--color-muted)] leading-relaxed mb-6">
                  Invite friends to see who can stay offline the longest.
                  Competition makes the streak real.
                </p>
                <div className="flex gap-4">
                  <Button>INVITE FRIENDS</Button>
                  <Button variant="ghost">SKIP FOR NOW</Button>
                </div>
              </div>
            </div>
          </div>
        </Preview>
      </Section>

      <Section eyebrow="RATIONALE" title="WHY IT WORKS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Big zero + heading + muted body + CTA">
            HIERARCHY
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            The oversized &ldquo;00&rdquo; uses hairline-strong color — visible but not loud.
            The heading uses fg, body uses muted, and the CTA is earned (primary).
            The void is acknowledged, not hidden.
          </p>

          <SectionHeading sub="Two patterns: centered and left-rule">
            VARIANTS
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Centered works for full-page empties. The left-rule variant works inside
            panels or sections. Both use the same hierarchy pattern.
          </p>
        </div>
      </Section>

      <Section eyebrow="CODE" title="COPY / PASTE">
        <CodeBlock
          code={`import { Button } from '@touch-grass-ds/react';

function EmptyState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-[400px]">
        <div className="font-mono text-[64px] font-black text-[var(--color-hairline-strong)] mb-6">
          00
        </div>
        <h3 className="font-mono text-[18px] font-black uppercase tracking-[0.08em] mb-3">
          NO SESSIONS YET
        </h3>
        <p className="font-mono text-[13px] text-[var(--color-muted)] leading-relaxed mb-8">
          Put down your phone and start your first offline session.
        </p>
        <Button>START SESSION</Button>
      </div>
    </div>
  );
}`}
        />
      </Section>
    </div>
  );
}
