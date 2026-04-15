import { Stat, Divider } from '@touch-grass-ds/react';
import { Breadcrumb, Eyebrow, Section, CodeBlock, Preview } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'STATS DASHBOARD';

export function StatsDashboardPage() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / STATS DASHBOARD</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          STATS<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)]">
          Stat + Divider rhythm. Tabular numbers, clear label hierarchy, and
          intentional spacing create a dashboard that reads like a scoreboard.
        </p>
      </header>

      <Section eyebrow="PREVIEW" title="LIVE COMPOSITION">
        <Preview label="STATS DASHBOARD — WEEKLY OVERVIEW">
          <div className="max-w-[720px]">
            <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-8">
              <h3 className="font-mono text-[14px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)]">
                WEEKLY OVERVIEW
              </h3>
              <p className="font-mono text-[12px] font-semibold text-[var(--color-subtle)] mt-1">
                APR 07 – APR 13, 2026
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[var(--color-hairline)]">
              <div className="p-6 border-r border-b border-[var(--color-hairline)]">
                <Stat label="TOTAL OFFLINE" value="42h 18m" size="sm" />
              </div>
              <div className="p-6 border-b border-[var(--color-hairline)] md:border-r">
                <Stat label="SESSIONS" value="23" size="sm" />
              </div>
              <div className="p-6 border-r border-b border-[var(--color-hairline)]">
                <Stat label="AVG / SESSION" value="01:50" size="sm" />
              </div>
              <div className="p-6 border-b border-[var(--color-hairline)]">
                <Stat label="STREAK" value="12d" size="sm" />
              </div>
            </div>

            <Divider variant="strong" className="my-8" />

            <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-6">
              <h3 className="font-mono text-[14px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)]">
                DAILY BREAKDOWN
              </h3>
            </div>

            <div className="border border-[var(--color-hairline)]">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => {
                const hours = ['06:12', '05:48', '07:01', '06:30', '05:15', '04:22', '07:10'];
                const sessions = [4, 3, 4, 3, 3, 2, 4];
                return (
                  <div
                    key={day}
                    className={`grid grid-cols-[80px_1fr_100px] items-center px-5 py-3 ${
                      i < 6 ? 'border-b border-[var(--color-hairline)]' : ''
                    }`}
                  >
                    <span className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-subtle)]">
                      {day}
                    </span>
                    <span className="font-mono text-[18px] font-black text-[var(--color-fg)]">
                      {hours[i]}
                    </span>
                    <span className="font-mono text-[12px] font-semibold text-[var(--color-muted)] text-right">
                      {sessions[i]} SESSIONS
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Preview>
      </Section>

      <Section eyebrow="RATIONALE" title="WHY IT WORKS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Stats grid + daily rows use different density">
            DENSITY RHYTHM
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            The top grid uses generous padding (space-6) for hero-level stats.
            The daily breakdown uses tighter rows (space-3 vertical) for scannable data.
            A strong divider separates the two density zones.
          </p>

          <SectionHeading sub="subtle for day labels, muted for session counts, fg for hours">
            NEUTRAL TIERS
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Day labels use <code className="text-[var(--color-subtle)]">fg-subtle</code> (metadata).
            Session counts use <code className="text-[var(--color-muted)]">fg-muted</code> (secondary).
            Hours — the primary data — use <code>fg</code>. Three tiers, no opacity.
          </p>
        </div>
      </Section>

      <Section eyebrow="CODE" title="COPY / PASTE">
        <CodeBlock
          code={`import { Stat, Divider } from '@touch-grass-ds/react';

function StatsDashboard() {
  return (
    <div className="max-w-[720px]">
      <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-8">
        <h3 className="font-mono text-[14px] font-black uppercase tracking-[0.12em]">
          WEEKLY OVERVIEW
        </h3>
        <p className="font-mono text-[12px] text-[var(--color-subtle)] mt-1">
          APR 07 – APR 13, 2026
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border border-[var(--color-hairline)]">
        <div className="p-6 border-r border-b border-[var(--color-hairline)]">
          <Stat label="TOTAL OFFLINE" value="42h 18m" size="sm" />
        </div>
        {/* ... more stat cells */}
      </div>

      <Divider variant="strong" className="my-8" />

      {/* Daily rows */}
      <div className="border border-[var(--color-hairline)]">
        {days.map((day) => (
          <div key={day} className="grid grid-cols-[80px_1fr_100px] px-5 py-3 border-b border-[var(--color-hairline)]">
            <span className="text-[var(--color-subtle)]">{day}</span>
            <span className="text-[var(--color-fg)]">{hours}</span>
            <span className="text-[var(--color-muted)]">{sessions} SESSIONS</span>
          </div>
        ))}
      </div>
    </div>
  );
}`}
        />
      </Section>
    </div>
  );
}
