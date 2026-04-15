import { Switch, Divider } from '@touch-grass-ds/react';
import { Breadcrumb, Eyebrow, Section, CodeBlock, Preview } from '../../ui/DocPage';
import { SectionHeading } from '../../ui/SectionHeading';

export const title = 'SETTINGS PANEL';

function SettingsRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-[var(--density-cell-py)] px-[var(--density-cell-px)]">
      <div>
        <div className="font-mono text-[14px] font-black uppercase tracking-[0.1em] text-[var(--color-fg)]">
          {label}
        </div>
        <div className="font-mono text-[12px] font-semibold text-[var(--color-subtle)] mt-1 tracking-[0.04em]">
          {description}
        </div>
      </div>
      {children}
    </div>
  );
}

export function SettingsPanelPage() {
  return (
    <div>
      <Breadcrumb />
      <header className="mb-16">
        <div className="mb-4">
          <Eyebrow>RECIPES / SETTINGS PANEL</Eyebrow>
        </div>
        <h1 className="text-[56px] sm:text-[80px] font-black leading-none tracking-[-0.04em] mb-6">
          SETTINGS<span className="text-[var(--color-earned)]">.</span>
        </h1>
        <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed text-[var(--color-fg)]">
          Dense but readable settings panel. Labels in fg, descriptions in fg-subtle,
          controls right-aligned. Dividers separate groups.
        </p>
      </header>

      <Section eyebrow="PREVIEW" title="LIVE COMPOSITION">
        <Preview label="SETTINGS PANEL">
          <div className="max-w-[600px] border border-[var(--color-hairline)]">
            <div className="px-5 py-4 border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
                // NOTIFICATIONS
              </div>
            </div>
            <SettingsRow label="PUSH ALERTS" description="Get notified when your session ends">
              <Switch defaultChecked />
            </SettingsRow>
            <Divider />
            <SettingsRow label="STREAK REMINDERS" description="Daily reminder to keep your streak alive">
              <Switch />
            </SettingsRow>
            <Divider />
            <SettingsRow label="LEADERBOARD UPDATES" description="Weekly summary of your rank changes">
              <Switch defaultChecked />
            </SettingsRow>
            <Divider variant="strong" />
            <div className="px-5 py-4 border-b border-[var(--color-hairline)] bg-[var(--color-bg-alt)]">
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">
                // PRIVACY
              </div>
            </div>
            <SettingsRow label="PUBLIC PROFILE" description="Show your stats on the leaderboard">
              <Switch defaultChecked />
            </SettingsRow>
            <Divider />
            <SettingsRow label="SHARE SESSIONS" description="Allow friends to see your session history">
              <Switch />
            </SettingsRow>
          </div>
        </Preview>
      </Section>

      <Section eyebrow="RATIONALE" title="WHY IT WORKS">
        <div className="max-w-[66ch] space-y-6">
          <SectionHeading sub="Labels in fg, descriptions in fg-subtle for clear hierarchy">
            NEUTRAL TIERS
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Setting labels use <code>fg</code> (primary). Descriptions use{' '}
            <code className="text-[var(--color-subtle)]">fg-subtle</code> (metadata only).
            This creates two-level hierarchy without size changes — just token-driven color.
          </p>

          <SectionHeading sub="Divider + section headers create scannable groups">
            STRUCTURE
          </SectionHeading>
          <p className="font-mono text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
            Hairline dividers between rows, strong dividers between groups. Section headers use
            bg-alt background with earned-color eyebrow. Density tokens control padding.
          </p>
        </div>
      </Section>

      <Section eyebrow="CODE" title="COPY / PASTE">
        <CodeBlock
          code={`import { Switch, Divider } from '@touch-grass-ds/react';

function SettingsRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between py-[var(--density-cell-py)] px-[var(--density-cell-px)]">
      <div>
        <div className="font-mono text-[14px] font-black uppercase tracking-[0.1em] text-[var(--color-fg)]">
          {label}
        </div>
        <div className="font-mono text-[12px] font-semibold text-[var(--color-subtle)] mt-1">
          {description}
        </div>
      </div>
      {children}
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="border border-[var(--color-hairline)]">
      <SettingsRow label="PUSH ALERTS" description="Get notified when session ends">
        <Switch defaultChecked />
      </SettingsRow>
      <Divider />
      <SettingsRow label="STREAK REMINDERS" description="Daily reminder">
        <Switch />
      </SettingsRow>
    </div>
  );
}`}
        />
      </Section>
    </div>
  );
}
