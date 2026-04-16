import { Link } from 'react-router-dom';
import {
  Button,
  LeaderboardRow,
  FocusTimerDisplay,
  BeRealStamp,
  Stat,
} from '@touch-grass-ds/react';
import {
  Breadcrumb,
  Eyebrow,
  Section,
  Preview,
  StatGrid,
  RelatedLinks,
} from '../ui/DocPage';
import { DS_VERSION } from '../lib/version';

/* ------------------------------------------------------------------ *
 * Home — the docs-site hero. First thing a recruiter / designer
 * sees. Must be dense, opinionated, and load-bearing on real numbers.
 * ------------------------------------------------------------------ */

const MANIFESTO = [
  { i: '01', t: 'ZERO RADIUS', d: 'No rounded corners. Anywhere. Ever. The edges are the design.' },
  { i: '02', t: 'ZERO MOTION', d: 'No transitions, no scroll anims. Interaction is structural, not temporal.' },
  { i: '03', t: 'ZERO GREY TEXT', d: 'fg or earned or danger. "Muted" means not shown.' },
  { i: '04', t: 'MONO FOR METADATA', d: 'Geist Mono, 0.12em, font-black, uppercase. Signature: prefix with //.' },
  { i: '05', t: 'TOKENS ONLY', d: 'Every color, size, border is var(--*). No hex in components. No exceptions.' },
];

const HERO_COMPONENTS: { to: string; label: string; kind: string }[] = [
  { to: '/primitives/button', label: 'BUTTON', kind: 'PRIMITIVE' },
  { to: '/primitives/stat', label: 'STAT', kind: 'PRIMITIVE' },
  { to: '/patterns/leaderboard-row', label: 'LEADERBOARD ROW', kind: 'PATTERN' },
  { to: '/patterns/focus-timer-display', label: 'FOCUS TIMER DISPLAY', kind: 'PATTERN' },
  { to: '/patterns/bereal-stamp', label: 'BEREAL STAMP', kind: 'PATTERN' },
];

export function Index() {
  return (
    <div>
      <Breadcrumb />

      {/* Hero */}
      <header className="mb-20">
        <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-8 border border-[var(--color-hairline)]">
          <div className="p-7 md:p-10">
            <div className="mb-4">
              <Eyebrow>TOUCH GRASS DS / {DS_VERSION} / MIT / ON NPM</Eyebrow>
            </div>
            <h1 className="font-black leading-[0.9] tracking-[-0.04em] mb-8 text-[56px] sm:text-[88px] md:text-[112px]">
              BRUTALIST.
              <br />
              NO&nbsp;MERCY.
              <br />
              <span className="text-[var(--color-earned)]">TOUCH&nbsp;GRASS.</span>
            </h1>
            <p className="text-[18px] font-mono font-bold max-w-[62ch] leading-relaxed mb-10">
              Open-source brutalist design system. Zero rounded corners. Zero grey text.
              Zero animation. Geist Mono everywhere it counts. Built to fight iOS softness —
              and to ship <strong className="text-[var(--color-earned)]">Timeouts.app</strong>,
              the social gym for time off the phone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/primitives/button">
                <Button>BROWSE PRIMITIVES</Button>
              </Link>
              <a
                href="https://github.com/thiagoxikota/touch-grass"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button variant="ghost">GITHUB ↗</Button>
              </a>
            </div>
          </div>
          <aside className="border-t xl:border-t-0 xl:border-l border-[var(--color-hairline)] bg-[var(--color-bg-alt)] p-6 md:p-8 flex flex-col">
            <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] mb-4">
              // VISUAL BOARD
            </div>
            <div className="border border-[var(--color-hairline)] overflow-hidden mb-5">
              <img
                src="/og-image.png"
                alt="Touch Grass design system visual board"
                className="block w-full h-[240px] md:h-[280px] object-cover"
                loading="eager"
              />
            </div>
            <ul className="space-y-3 mb-5">
              {[
                'JOIN WAITLIST FROM PRODUCT LANDING',
                'LEARN THE BRAND + INSTALL PATH FAST',
                'VERIFY REAL COMPONENT QUALITY IN DOCS',
              ].map((line) => (
                <li key={line} className="font-mono text-[12px] font-black uppercase tracking-[0.1em] text-[var(--color-fg)]">
                  {line}
                </li>
              ))}
            </ul>
            <a
              href="https://timeouts.app#waitlist"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-auto font-mono text-[11px] font-black uppercase tracking-[0.14em] border border-[var(--color-hairline)] px-3 py-2 text-[var(--color-fg)] hover:bg-[var(--color-earned)] hover:text-[var(--color-on-earned)] text-center"
            >
              OPEN WAITLIST ↗
            </a>
          </aside>
        </div>
      </header>

      {/* Install */}
      <Section eyebrow="INSTALL" title="ONE COMMAND. NO SETUP.">
        <div className="border border-[var(--color-hairline)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 border-b md:border-b-0 md:border-r border-[var(--color-hairline)]">
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
                // 01 — INSTALL
              </div>
              <pre className="font-mono text-[14px] font-black text-[var(--color-fg)] whitespace-pre-wrap">
{`pnpm add \\
  @touch-grass-ds/react \\
  @touch-grass-ds/tokens`}
              </pre>
            </div>
            <div className="p-6">
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
                // 02 — IMPORT
              </div>
              <pre className="font-mono text-[14px] font-black text-[var(--color-fg)] whitespace-pre-wrap">
{`import '@touch-grass-ds/tokens/dist/tokens.css';
import { Button } from '@touch-grass-ds/react';

<Button>EARN IT</Button>`}
              </pre>
            </div>
          </div>
        </div>
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] mt-4">
          // REACT 19 · ESM ONLY · TREE-SHAKEABLE · MIT
        </p>
      </Section>

      {/* Stats */}
      <Section eyebrow="BY THE NUMBERS" title="REAL COUNTS FROM THE REPO">
        <StatGrid
          items={[
            { label: 'PRIMITIVES', value: '10', sub: 'REACT 19 · FORWARDREF · TOKENS ONLY' },
            { label: 'PATTERNS', value: '08', sub: 'COMPOSED FROM PRIMITIVES' },
            { label: 'TOKEN FILES', value: '07', sub: 'COLOR · TYPE · SPACE · BORDER · GRID · MOTION' },
            { label: 'VITEST SUITES', value: '19', sub: 'REACT TESTING LIBRARY + PLAYWRIGHT CT' },
          ]}
        />
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-fg)] mt-4">
          // ALL COUNTS DERIVED FROM `ls packages/ds/src/*` — RUN IT YOURSELF.
        </p>
      </Section>

      {/* Manifesto */}
      <Section eyebrow="TENETS" title="THE FIVE LAWS">
        <ol className="border border-[var(--color-hairline)]">
          {MANIFESTO.map((m, i) => (
            <li
              key={m.i}
              className={`grid grid-cols-[72px_1fr] md:grid-cols-[96px_200px_1fr] items-start ${
                i < MANIFESTO.length - 1 ? 'border-b border-[var(--color-hairline)]' : ''
              }`}
            >
              <div className="p-5 border-r border-[var(--color-hairline)] font-black text-[32px] md:text-[40px] leading-none text-[var(--color-earned)]">
                {m.i}
              </div>
              <div className="p-5 border-r-0 md:border-r border-[var(--color-hairline)] font-mono text-[13px] md:text-[15px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)]">
                {m.t}
              </div>
              <div className="col-span-2 md:col-span-1 p-5 border-t md:border-t-0 border-[var(--color-hairline)] font-mono text-[13px] md:text-[14px] font-semibold text-[var(--color-fg)] leading-relaxed">
                {m.d}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Live hero components — at least 3 of the 5 rendered */}
      <Section eyebrow="LIVE COMPONENTS" title="THE 5 HERO PIECES">
        <p className="font-mono text-[13px] font-semibold max-w-[62ch] mb-8 text-[var(--color-fg)]">
          Every surface that uses this DS must render at least three of these five
          components live. They are the proof-of-system. Click any to open its page.
        </p>

        {/* Focus Timer + Leaderboard two-up */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0 border border-[var(--color-hairline)]">
          <Preview label="PATTERN / FOCUS TIMER DISPLAY">
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
          </Preview>
          <Preview label="PATTERN / LEADERBOARD ROW" className="!p-0">
            <div className="bg-[var(--color-bg)]">
              <LeaderboardRow
                rank={1}
                name="BIA CORRE"
                handle="bcorre"
                initials="BC"
                hours="18h 42m"
                variant="top1"
              />
              <LeaderboardRow
                rank={2}
                name="RAFA SANTOS"
                handle="rafas"
                initials="RS"
                hours="16h 09m"
                delta="+2h"
              />
              <LeaderboardRow
                rank={3}
                name="THIAGO XIKOTA"
                handle="thiagoxikota"
                initials="TX"
                hours="14h 51m"
                delta="+0h"
                variant="you"
              />
              <LeaderboardRow
                rank={4}
                name="MAYA R."
                handle="mayar"
                initials="MR"
                hours="12h 03m"
              />
            </div>
          </Preview>
        </div>

        {/* Stat + BeReal two-up */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] mt-0 border border-[var(--color-hairline)] border-t-0">
          <Preview label="PRIMITIVE / STAT">
            <Stat
              label="COMMUNITY TIME OFFLINE TODAY"
              value="02:41:22"
              meta={[
                { k: 'SESSIONS', v: '1,204' },
                { k: 'PEAK', v: '14:02' },
                { k: 'STREAK', v: '47d' },
              ]}
            />
          </Preview>
          <Preview label="PATTERN / BEREAL STAMP">
            <BeRealStamp timestamp="14:02 · SÃO PAULO" hours="02:41">
              <img
                src="/og-image.png"
                alt="Timeouts product visual"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </BeRealStamp>
          </Preview>
        </div>
      </Section>

      {/* Component index — link grid to every primitive/pattern */}
      <Section eyebrow="INDEX" title="EVERY COMPONENT">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-[var(--color-hairline)]">
          {HERO_COMPONENTS.map((c, i) => (
            <Link
              key={c.to}
              to={c.to}
              className={[
                'block p-6 border-[var(--color-hairline)] hover:bg-[var(--color-earned)] hover:text-[var(--color-on-earned)]',
                (i + 1) % 2 !== 0 ? 'border-r' : '',
                i < (Math.ceil(HERO_COMPONENTS.length / 2) - 1) * 2 ? 'border-b' : '',
                (i + 1) % 4 !== 0 ? 'md:border-r' : 'md:border-r-0',
                i < (Math.ceil(HERO_COMPONENTS.length / 4) - 1) * 4 ? 'md:border-b' : 'md:border-b-0',
              ].join(' ')}
            >
              <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-3">
                // {c.kind}
              </div>
              <div className="font-mono text-[15px] font-black uppercase tracking-[0.02em]">
                {c.label} →
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Author — who built this, where to find them */}
      <Section eyebrow="// AUTHOR" title="BUILT BY THIAGO XIKOTA.">
        <div className="border border-[var(--color-hairline)] grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <div className="border-b md:border-b-0 md:border-r border-[var(--color-hairline)] p-0 bg-[var(--color-bg-alt)]">
            <img
              src="/thiagoxikota.png"
              alt="Thiago Xikota — product designer and creator of Touch Grass DS"
              className="block w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col gap-5">
            <p className="font-mono text-[14px] font-semibold leading-relaxed text-[var(--color-fg)] max-w-[60ch]">
              <strong className="text-[var(--color-earned)]">Thiago Xikota</strong> — product designer,
              design system lead, AI workflow engineer. Built Touch Grass DS from scratch in 48 hours
              with Claude Code. Shipping <strong className="text-[var(--color-earned)]">Timeouts</strong>,
              the social gym for time off the phone.
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {[
                { label: 'PORTFOLIO', href: 'https://thiagoxikota.com' },
                { label: 'CASE STUDY', href: 'https://thiagoxikota.com/projects/touch-grass' },
                { label: 'LINKEDIN', href: 'https://br.linkedin.com/in/thiagoxikota' },
                { label: 'GITHUB', href: 'https://github.com/thiagoxikota' },
                { label: 'FIGMA COMMUNITY', href: 'https://www.figma.com/community/file/1625695815996602388/touch-grass-ds' },
                { label: 'TIMEOUTS.APP', href: 'https://timeouts.app' },
              ].map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[12px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)] hover:bg-[var(--color-earned)] hover:text-[var(--color-bg)] inline-block px-1 -mx-1"
                  >
                    {it.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <RelatedLinks
        title="ELSEWHERE"
        items={[
          { label: 'TIMEOUTS.APP', to: 'https://timeouts.app', kind: 'external' },
          { label: 'GITHUB REPO', to: 'https://github.com/thiagoxikota/touch-grass', kind: 'external' },
          { label: 'NPM · REACT', to: 'https://www.npmjs.com/package/@touch-grass-ds/react', kind: 'external' },
          { label: 'NPM · TOKENS', to: 'https://www.npmjs.com/package/@touch-grass-ds/tokens', kind: 'external' },
          { label: 'FIGMA COMMUNITY', to: 'https://www.figma.com/community/file/1625695815996602388/touch-grass-ds', kind: 'external' },
          { label: 'CASE STUDY (PT-BR)', to: 'https://thiagoxikota.com/blog/construindo-touch-grass-com-claude-code', kind: 'external' },
          { label: 'PORTFOLIO', to: 'https://thiagoxikota.com', kind: 'external' },
          { label: 'LINKEDIN', to: 'https://br.linkedin.com/in/thiagoxikota', kind: 'external' },
        ]}
      />
    </div>
  );
}
