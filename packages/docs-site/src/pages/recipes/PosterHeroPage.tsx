import { Button } from '@touch-grass-ds/react';
import { Breadcrumb, Eyebrow, Section, CodeBlock, Preview } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'POSTER HERO';

export function PosterHeroPage() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / POSTER HERO</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          POSTER HERO<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)]">
          Big mono headline, muted subcopy, one brutal CTA. The hero block that
          makes people stop scrolling and pay attention.
        </p>
      </header>

      <Section eyebrow="PREVIEW" title="LIVE COMPOSITION">
        <Preview label="POSTER HERO">
          <div className="py-16 px-8 max-w-[720px]">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-6">
              // TOUCH GRASS DS / V1.1.0 / MIT
            </div>
            <h2 className="text-[48px] sm:text-[72px] font-black leading-[0.9] tracking-[-0.04em] text-[var(--color-fg)] mb-6">
              STOP SCROLLING.
              <br />
              <span className="text-[var(--color-earned)]">EARN IT.</span>
            </h2>
            <p className="font-mono text-[15px] font-semibold text-[var(--color-muted)] max-w-[48ch] leading-relaxed mb-10">
              A brutalist design system for people who ship. No rounded corners.
              No grey text hacks. No animation. Just structure.
            </p>
            <div className="flex gap-4">
              <Button>GET STARTED</Button>
              <Button variant="ghost">VIEW DOCS</Button>
            </div>
          </div>
        </Preview>
      </Section>

      <Section eyebrow="RATIONALE" title="WHY IT WORKS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="3-level hierarchy using size + weight + color tokens">
            HIERARCHY
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            The poster hero uses three clear levels: <strong className="text-[var(--color-earned)]">eyebrow</strong> (11px mono, earned color),{' '}
            <strong>headline</strong> (72px, fg), and <strong className="text-[var(--color-muted)]">subcopy</strong> (15px, muted).
            No opacity tricks — hierarchy comes from size, weight, and token-driven color.
          </p>

          <SectionHeading sub="Vertical space creates breathing room between levels">
            SPACING
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Gap between eyebrow→headline is 24px (space-6). Headline→subcopy is 24px.
            Subcopy→CTA is 40px (space-10). This increasing cadence draws the eye downward.
          </p>

          <SectionHeading sub="muted for body, earned for emphasis, fg for headlines">
            NEUTRAL TIERS
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Body copy uses <code className="text-[var(--color-muted)]">fg-muted</code> so the headline dominates.
            The CTA pair uses primary (earned bg) and ghost (fg border) to create a clear action hierarchy.
          </p>
        </div>
      </Section>

      <Section eyebrow="CODE" title="COPY / PASTE">
        <CodeBlock
          code={`import { Button } from '@touch-grass-ds/react';

function PosterHero() {
  return (
    <div className="py-16 px-8 max-w-[720px]">
      <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-6">
        // TOUCH GRASS DS / V1.1.0 / MIT
      </div>
      <h2 className="text-[48px] sm:text-[72px] font-black leading-[0.9] tracking-[-0.04em] text-[var(--color-fg)] mb-6">
        STOP SCROLLING.
        <br />
        <span className="text-[var(--color-earned)]">EARN IT.</span>
      </h2>
      <p className="font-mono text-[15px] font-semibold text-[var(--color-muted)] max-w-[48ch] leading-relaxed mb-10">
        A brutalist design system for people who ship. No rounded corners.
        No grey text hacks. No animation. Just structure.
      </p>
      <div className="flex gap-4">
        <Button>GET STARTED</Button>
        <Button variant="ghost">VIEW DOCS</Button>
      </div>
    </div>
  );
}`}
        />
      </Section>
    </div>
  );
}
