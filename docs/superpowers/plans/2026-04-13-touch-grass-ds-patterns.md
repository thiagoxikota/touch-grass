# Touch Grass DS — App Patterns Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan.

**Goal:** Build the 5 Timeouts app-specific patterns — `LeaderboardRow`, `FocusTimerDisplay`, `BeRealStamp`, `PatternInterruptModal`, `SessionSummaryCard` — composing the 8 primitives shipped in v0.0.2. Each lives in `packages/ds/src/patterns/` with a docs page rendering all variants.

**Architecture:** Patterns are composed components — they import primitives from `../primitives/*` and apply layout + business semantics (e.g., LeaderboardRow knows about `top1` styling). Patterns DO NOT define new tokens or new state matrices; they wire primitives together. Each pattern is one `.tsx` file, one test file, one docs page.

**Tech Stack:** Same as Plan 2 — React 19, TypeScript, Tailwind v4 utility classes, Vitest + @testing-library/react.

**Spec:** [docs/superpowers/specs/2026-04-13-touch-grass-ds-design.md](../specs/2026-04-13-touch-grass-ds-design.md) (Section 10.2 App-specific patterns).

**Prerequisite:** Plan 2 (Primitives) shipped at `v0.0.2-primitives`.

---

## File Structure

```
packages/ds/src/patterns/
├── LeaderboardRow.tsx
├── FocusTimerDisplay.tsx
├── BeRealStamp.tsx
├── PatternInterruptModal.tsx
└── SessionSummaryCard.tsx

packages/ds/tests/patterns/
├── LeaderboardRow.test.tsx
├── FocusTimerDisplay.test.tsx
├── BeRealStamp.test.tsx
├── PatternInterruptModal.test.tsx
└── SessionSummaryCard.test.tsx

packages/docs-site/src/pages/patterns/
├── LeaderboardRowPage.tsx
├── FocusTimerDisplayPage.tsx
├── BeRealStampPage.tsx
├── PatternInterruptModalPage.tsx
└── SessionSummaryCardPage.tsx
```

Modified at the end:
- `packages/ds/src/index.ts` — export all 5 patterns
- `packages/docs-site/src/App.tsx` — register 5 routes
- `packages/docs-site/src/layout/Nav.tsx` — add PATTERNS section

---

## Chunk 1: LeaderboardRow

The most data-dense pattern. Composes Badge + delta chip + name/handle + hours. Variants: `top1`, `default`, `you`.

### Task 1: LeaderboardRow

**Files:**
- Create: `packages/ds/src/patterns/LeaderboardRow.tsx`
- Create: `packages/ds/tests/patterns/LeaderboardRow.test.tsx`
- Create: `packages/docs-site/src/pages/patterns/LeaderboardRowPage.tsx`

**Spec rules:**
- 5-column grid: rank | avatar (square 40px) | name + @handle | hours | delta-or-badge
- `top1`: hours render in `--color-earned`, badge slot shows `KING` Badge (earned variant)
- `default`: hours white, delta slot shows neutral white-bordered delta chip
- `you`: row has `border-l-4 border-[var(--color-earned)]` and faint green bg tint
- Avatar: 40×40 square, 2px white border, mono initials inside
- Names truncate at 16 chars, handles at 14 chars (per spec section 7)

- [ ] **Step 1.1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LeaderboardRow } from '../../src/patterns/LeaderboardRow';

describe('LeaderboardRow', () => {
  const base = {
    rank: 17,
    name: 'You',
    handle: 'thiagoxikota',
    initials: 'TX',
    hours: '22:48:33',
    delta: '−08:16',
  };

  it('renders rank, name, handle, hours', () => {
    render(<LeaderboardRow {...base} />);
    expect(screen.getByText('17')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('@THIAGOXIKOTA')).toBeInTheDocument();
    expect(screen.getByText('22:48:33')).toBeInTheDocument();
  });

  it('renders delta chip in default variant', () => {
    render(<LeaderboardRow {...base} />);
    expect(screen.getByText('−08:16')).toBeInTheDocument();
  });

  it('top1 variant renders KING badge instead of delta', () => {
    render(<LeaderboardRow {...base} variant="top1" rank={1} />);
    expect(screen.getByText('KING')).toBeInTheDocument();
    expect(screen.queryByText('−08:16')).not.toBeInTheDocument();
  });

  it('top1 hours use earned color', () => {
    render(<LeaderboardRow {...base} variant="top1" rank={1} hours="62:14:08" />);
    const hours = screen.getByText('62:14:08');
    expect(hours.className).toContain('text-[var(--color-earned)]');
  });

  it('you variant has green left border', () => {
    render(<LeaderboardRow {...base} variant="you" data-testid="row" />);
    expect(screen.getByTestId('row').className).toContain('border-l-4');
    expect(screen.getByTestId('row').className).toContain('border-[var(--color-earned)]');
  });

  it('truncates names longer than 16 chars', () => {
    render(<LeaderboardRow {...base} name="This is a very long display name" />);
    expect(screen.getByText(/This is a very l…/)).toBeInTheDocument();
  });

  it('truncates handles longer than 14 chars', () => {
    render(<LeaderboardRow {...base} handle="averylonghandle12345" />);
    expect(screen.getByText('@AVERYLONGHANDL…')).toBeInTheDocument();
  });

  it('uppercases the handle', () => {
    render(<LeaderboardRow {...base} handle="dhh" />);
    expect(screen.getByText('@DHH')).toBeInTheDocument();
  });

  it('formats rank with leading zero up to 99', () => {
    render(<LeaderboardRow {...base} rank={4} />);
    expect(screen.getByText('04')).toBeInTheDocument();
  });
});
```

- [ ] **Step 1.2: Run — confirm fail**

```bash
corepack pnpm --filter @touch-grass/ds test
```

Expected: FAIL — `Cannot find module '../../src/patterns/LeaderboardRow'`.

- [ ] **Step 1.3: Write `LeaderboardRow.tsx`**

```tsx
import type { ComponentProps } from 'react';
import { cn } from '../lib/cn';
import { Badge } from '../primitives/Badge';

export type LeaderboardRowVariant = 'default' | 'top1' | 'you';

export interface LeaderboardRowProps extends Omit<ComponentProps<'div'>, 'children'> {
  rank: number;
  name: string;
  handle: string;
  initials: string;
  hours: string;
  delta?: string;
  variant?: LeaderboardRowVariant;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max) + '…';
}

function formatRank(n: number): string {
  if (n < 100) return String(n).padStart(2, '0');
  if (n <= 9999) return String(n);
  return '9999+';
}

export function LeaderboardRow({
  rank,
  name,
  handle,
  initials,
  hours,
  delta,
  variant = 'default',
  className,
  ...rest
}: LeaderboardRowProps) {
  const isTop1 = variant === 'top1';
  const isYou = variant === 'you';

  return (
    <div
      className={cn(
        'grid grid-cols-[56px_44px_1fr_140px_100px] gap-4 px-5 py-4 border-b border-[var(--color-hairline)] items-center font-mono',
        isYou && 'bg-[rgba(166,255,0,0.06)] border-l-4 border-[var(--color-earned)]',
        className
      )}
      {...rest}
    >
      <div className={cn('font-black', isTop1 ? 'text-[22px] text-[var(--color-earned)]' : 'text-[18px] text-white')}>
        {formatRank(rank)}
      </div>
      <div className="w-10 h-10 bg-black border-2 border-white flex items-center justify-center text-[14px] font-black text-white">
        {initials.slice(0, 2).toUpperCase()}
      </div>
      <div className="leading-tight">
        <div className="text-[18px] font-bold text-white" style={{ fontFamily: 'Geist, sans-serif' }}>
          {truncate(name, 16)}
        </div>
        <div className="text-[13px] font-semibold text-white uppercase tracking-[0.08em] mt-1">
          @{truncate(handle.toUpperCase(), 14)}
        </div>
      </div>
      <div className={cn('text-right text-[22px] font-black', isTop1 ? 'text-[var(--color-earned)]' : 'text-white')}>
        {hours}
      </div>
      <div className="flex justify-end">
        {isTop1 ? (
          <Badge variant="earned" size="md">KING</Badge>
        ) : delta ? (
          <span className="inline-flex items-center px-2.5 py-1 text-[13px] font-black text-white border-2 border-white">
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
```

- [ ] **Step 1.4: Run — confirm pass**

```bash
corepack pnpm --filter @touch-grass/ds test
```

Expected: 9 LeaderboardRow tests pass. Total: 49/49.

- [ ] **Step 1.5: Write the docs page**

`packages/docs-site/src/pages/patterns/LeaderboardRowPage.tsx`:

```tsx
import { LeaderboardRow } from '@touch-grass/ds';

export function LeaderboardRowPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / LEADERBOARDROW
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">LEADERBOARDROW.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        One row in the ranking. Three variants: top1 (KING badge + green hours), default (delta chip), you (green left border + tint). Names truncate at 16 chars, handles at 14.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">FULL LEADERBOARD</h2>
      <div className="border border-[var(--color-hairline)]">
        <LeaderboardRow variant="top1" rank={1}  name="David H."     handle="dhh"           initials="DH" hours="62:14:08" />
        <LeaderboardRow              rank={2}  name="Pieter Levels" handle="levelsio"      initials="PL" hours="58:09:41" delta="+02:11" />
        <LeaderboardRow              rank={3}  name="Naval R."      handle="naval"         initials="NR" hours="51:33:17" delta="+01:08" />
        <LeaderboardRow              rank={4}  name="Sam Corcos"    handle="samcorcos"     initials="SC" hours="44:21:52" delta="−00:42" />
        <LeaderboardRow variant="you" rank={17} name="You"           handle="thiagoxikota"  initials="TX" hours="22:48:33" delta="−08:16" />
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">EDGE CASES</h2>
      <div className="border border-[var(--color-hairline)]">
        <LeaderboardRow rank={1247} name="Long ranking number"        handle="longrank"          initials="LR" hours="12:00:00" delta="+00:01" />
        <LeaderboardRow rank={42}   name="Display name truncates here" handle="reallylonghandle" initials="DN" hours="08:30:00" delta="−00:15" />
      </div>
    </div>
  );
}
```

- [ ] **Step 1.6: Commit (component + test + page; route wire-up at the end of plan)**

```bash
git add packages/ds/src/patterns/LeaderboardRow.tsx packages/ds/tests/patterns/LeaderboardRow.test.tsx packages/docs-site/src/pages/patterns/LeaderboardRowPage.tsx
git commit -m "feat(ds): add LeaderboardRow pattern (top1/default/you variants)"
```

---

## Chunk 2: FocusTimerDisplay + SessionSummaryCard

These two patterns wrap the Stat/Timer primitives in a Card with action buttons. Smaller than LeaderboardRow.

### Task 2: FocusTimerDisplay

**Files:**
- Create: `packages/ds/src/patterns/FocusTimerDisplay.tsx`
- Create: `packages/ds/tests/patterns/FocusTimerDisplay.test.tsx`
- Create: `packages/docs-site/src/pages/patterns/FocusTimerDisplayPage.tsx`

The home screen primary surface. Card + Stat + meta + Button.

- [ ] **Step 2.1: Test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FocusTimerDisplay } from '../../src/patterns/FocusTimerDisplay';

describe('FocusTimerDisplay', () => {
  it('renders header label, stat value, and CTA', () => {
    render(
      <FocusTimerDisplay
        header="FOCUS / TODAY"
        sessionLabel="SESSION 04"
        label="UNTETHERED TODAY"
        value="04:32:18"
        meta={[
          { k: 'VS YESTERDAY', v: '+47%' },
          { k: 'STREAK', v: '12 DAYS' },
          { k: 'RANK', v: '#17' },
        ]}
        ctaLabel="START FOCUS"
      />
    );
    expect(screen.getByText('FOCUS / TODAY')).toBeInTheDocument();
    expect(screen.getByText('SESSION 04')).toBeInTheDocument();
    expect(screen.getByText('UNTETHERED TODAY')).toBeInTheDocument();
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
    expect(screen.getByText('VS YESTERDAY')).toBeInTheDocument();
    expect(screen.getByText('STREAK')).toBeInTheDocument();
    expect(screen.getByText('12 DAYS')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /START FOCUS/i })).toBeInTheDocument();
  });

  it('CTA fires onCtaClick', () => {
    let clicked = 0;
    render(
      <FocusTimerDisplay
        header="X"
        label="Y"
        value="00:00"
        ctaLabel="GO"
        onCtaClick={() => { clicked += 1; }}
      />
    );
    screen.getByRole('button', { name: /GO/i }).click();
    expect(clicked).toBe(1);
  });

  it('omits sessionLabel when not provided', () => {
    render(<FocusTimerDisplay header="X" label="Y" value="00:00" ctaLabel="GO" />);
    // Header still renders
    expect(screen.getByText('X')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2.2: Component**

```tsx
import type { ReactNode } from 'react';
import { Card } from '../primitives/Card';
import { Stat, type StatMeta } from '../primitives/Stat';
import { Button } from '../primitives/Button';

export interface FocusTimerDisplayProps {
  header: ReactNode;
  sessionLabel?: ReactNode;
  label: ReactNode;
  value: ReactNode;
  meta?: StatMeta[];
  ctaLabel: ReactNode;
  onCtaClick?: () => void;
  className?: string;
}

export function FocusTimerDisplay({
  header,
  sessionLabel,
  label,
  value,
  meta,
  ctaLabel,
  onCtaClick,
  className,
}: FocusTimerDisplayProps) {
  return (
    <Card
      className={className}
      header={
        <div className="flex justify-between items-center w-full">
          <span>{header}</span>
          {sessionLabel && <span>{sessionLabel}</span>}
        </div>
      }
    >
      <Stat label={label} value={value} meta={meta} />
      <div className="mt-6">
        <Button onClick={onCtaClick} className="w-full">{ctaLabel}</Button>
      </div>
    </Card>
  );
}
```

- [ ] **Step 2.3: Docs page**

```tsx
import { FocusTimerDisplay } from '@touch-grass/ds';

export function FocusTimerDisplayPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / FOCUSTIMERDISPLAY
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">FOCUSTIMERDISPLAY.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        The home screen's primary surface. Card + Stat + meta strip + full-width Button. Composes three primitives.
      </p>

      <div className="max-w-[640px]">
        <FocusTimerDisplay
          header="FOCUS / TODAY"
          sessionLabel="SESSION 04"
          label="UNTETHERED TODAY"
          value="04:32:18"
          meta={[
            { k: 'VS YESTERDAY', v: '+47%' },
            { k: 'STREAK', v: '12 DAYS' },
            { k: 'RANK', v: '#17' },
          ]}
          ctaLabel="START FOCUS"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2.4: Run tests + commit**

```bash
corepack pnpm --filter @touch-grass/ds test
git add packages/ds/src/patterns/FocusTimerDisplay.tsx packages/ds/tests/patterns/FocusTimerDisplay.test.tsx packages/docs-site/src/pages/patterns/FocusTimerDisplayPage.tsx
git commit -m "feat(ds): add FocusTimerDisplay pattern"
```

### Task 3: SessionSummaryCard

A retrospective card for the social feed: shows finished session result. Card + Stat + secondary stats grid.

**Files:** standard pattern.

- [ ] **Step 3.1: Test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SessionSummaryCard } from '../../src/patterns/SessionSummaryCard';

describe('SessionSummaryCard', () => {
  it('renders header, headline duration, and stats grid', () => {
    render(
      <SessionSummaryCard
        date="2026-04-13"
        duration="04:32:18"
        stats={[
          { k: 'GOAL', v: 'SHIP V1' },
          { k: 'BLOCKS', v: '4' },
          { k: 'RANK', v: '#17' },
        ]}
      />
    );
    expect(screen.getByText('SESSION SUMMARY')).toBeInTheDocument();
    expect(screen.getByText('2026-04-13')).toBeInTheDocument();
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
    expect(screen.getByText('GOAL')).toBeInTheDocument();
    expect(screen.getByText('SHIP V1')).toBeInTheDocument();
    expect(screen.getByText('BLOCKS')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3.2: Component**

```tsx
import { Card } from '../primitives/Card';
import { Stat, type StatMeta } from '../primitives/Stat';

export interface SessionSummaryCardProps {
  date: string;
  duration: string;
  stats: StatMeta[];
  className?: string;
}

export function SessionSummaryCard({ date, duration, stats, className }: SessionSummaryCardProps) {
  return (
    <Card
      className={className}
      header={
        <div className="flex justify-between items-center w-full">
          <span>SESSION SUMMARY</span>
          <span>{date}</span>
        </div>
      }
    >
      <Stat label="UNTETHERED" value={duration} size="md" meta={stats} />
    </Card>
  );
}
```

- [ ] **Step 3.3: Docs page**

```tsx
import { SessionSummaryCard } from '@touch-grass/ds';

export function SessionSummaryCardPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / SESSIONSUMMARYCARD
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">SESSIONSUMMARYCARD.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Post-session retro for the social feed. Card + Stat (md) + meta grid. Composes two primitives.
      </p>

      <div className="max-w-[640px]">
        <SessionSummaryCard
          date="2026-04-13"
          duration="04:32:18"
          stats={[
            { k: 'GOAL', v: 'SHIP V1' },
            { k: 'BLOCKS', v: '4' },
            { k: 'RANK', v: '#17' },
          ]}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3.4: Test + commit**

```bash
corepack pnpm --filter @touch-grass/ds test
git add packages/ds/src/patterns/SessionSummaryCard.tsx packages/ds/tests/patterns/SessionSummaryCard.test.tsx packages/docs-site/src/pages/patterns/SessionSummaryCardPage.tsx
git commit -m "feat(ds): add SessionSummaryCard pattern"
```

---

## Chunk 3: BeRealStamp + PatternInterruptModal (signature components)

These are the two patterns that most define the brand. Both deserve careful styling.

### Task 4: BeRealStamp

**Spec:** Three overlay layers on top of a photo:
- TL: `// VERIFIED OFFLINE` chip — neon green border, mono uppercase, black bg
- BL: ISO timestamp — white border chip, black bg
- BR: Solid neon block with hours + "UNTETHERED" sub-label

The component takes the photo as a `src` (URL) or as a child `ReactNode` (e.g., a placeholder div for the docs).

**Files:**
- Create: `packages/ds/src/patterns/BeRealStamp.tsx`
- Create: `packages/ds/tests/patterns/BeRealStamp.test.tsx`
- Create: `packages/docs-site/src/pages/patterns/BeRealStampPage.tsx`

- [ ] **Step 4.1: Test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BeRealStamp } from '../../src/patterns/BeRealStamp';

describe('BeRealStamp', () => {
  it('renders verify badge, timestamp, and hours block', () => {
    render(
      <BeRealStamp
        timestamp="2026-04-13 19:42"
        hours="04:32:18"
      />
    );
    expect(screen.getByText('// VERIFIED OFFLINE')).toBeInTheDocument();
    expect(screen.getByText('2026-04-13 19:42')).toBeInTheDocument();
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
    expect(screen.getByText('UNTETHERED')).toBeInTheDocument();
  });

  it('renders an img when src is provided', () => {
    render(<BeRealStamp src="/photo.jpg" alt="grass" timestamp="x" hours="00:00" />);
    const img = screen.getByAltText('grass') as HTMLImageElement;
    expect(img.tagName).toBe('IMG');
    expect(img.src).toContain('/photo.jpg');
  });

  it('renders custom content when no src is provided', () => {
    render(
      <BeRealStamp timestamp="x" hours="00:00">
        <div data-testid="placeholder">PHOTO</div>
      </BeRealStamp>
    );
    expect(screen.getByTestId('placeholder')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4.2: Component**

```tsx
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface BeRealStampProps {
  timestamp: string;
  hours: string;
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
}

export function BeRealStamp({ timestamp, hours, src, alt, children, className }: BeRealStampProps) {
  return (
    <div className={cn('relative aspect-square bg-[var(--color-bg-alt)] border border-[var(--color-hairline)] overflow-hidden', className)}>
      {src ? (
        <img src={src} alt={alt ?? ''} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        children
      )}
      {/* TL: verify badge */}
      <div className="absolute top-4 left-4 px-3 py-2 bg-black border-2 border-[var(--color-earned)] font-mono text-[13px] font-black text-[var(--color-earned)] uppercase tracking-[0.12em]">
        // VERIFIED OFFLINE
      </div>
      {/* BL: timestamp */}
      <div className="absolute bottom-4 left-4 px-3 py-2 bg-black border-2 border-white font-mono text-[13px] font-black text-white uppercase tracking-[0.1em]">
        {timestamp}
      </div>
      {/* BR: hours flex block */}
      <div className="absolute bottom-4 right-4 px-4 py-3 bg-[var(--color-earned)] text-black font-mono font-black leading-none">
        <div className="text-[28px]">{hours}</div>
        <div className="text-[11px] font-black mt-1.5 tracking-[0.1em]">UNTETHERED</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4.3: Docs page**

```tsx
import { BeRealStamp } from '@touch-grass/ds';

export function BeRealStampPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / BEREALSTAMP
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">BEREALSTAMP.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Three-layer overlay system for raw photos. TL: verify badge. BL: ISO timestamp. BR: hours flex block. The hours block is the part the eye sees first.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px]">
        <BeRealStamp timestamp="2026-04-13 19:42" hours="04:32:18">
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[14px] font-bold text-white tracking-[0.2em] opacity-30">PHOTO PLACEHOLDER</div>
        </BeRealStamp>
        <BeRealStamp timestamp="2026-04-13 06:11" hours="08:14:02">
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[14px] font-bold text-white tracking-[0.2em] opacity-30">PHOTO PLACEHOLDER</div>
        </BeRealStamp>
      </div>
    </div>
  );
}
```

- [ ] **Step 4.4: Test + commit**

```bash
corepack pnpm --filter @touch-grass/ds test
git add packages/ds/src/patterns/BeRealStamp.tsx packages/ds/tests/patterns/BeRealStamp.test.tsx packages/docs-site/src/pages/patterns/BeRealStampPage.tsx
git commit -m "feat(ds): add BeRealStamp pattern (3-layer photo overlay)"
```

### Task 5: PatternInterruptModal

The bullying notification surface. **Spec rules:**
- 2px red border around the whole modal
- Header bar: solid red bg, white text, mono uppercase, format `INTERRUPT · {time}` left, `YOU ARE LOSING` (or similar status) right
- Body: 56px display headline (max 8 words enforced as a runtime warning, not error), context block (3 columns: GOAL / DAYS LEFT / RANK), two buttons (primary "PUT IT DOWN" and danger "5 MORE MIN")
- The context block has a 2px white border, 3 columns
- Designed as a self-contained block — can be wrapped in a real modal portal later. For now it's just a styled `<div>`.

**Files:**
- Create: `packages/ds/src/patterns/PatternInterruptModal.tsx`
- Create: `packages/ds/tests/patterns/PatternInterruptModal.test.tsx`
- Create: `packages/docs-site/src/pages/patterns/PatternInterruptModalPage.tsx`

- [ ] **Step 5.1: Test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PatternInterruptModal } from '../../src/patterns/PatternInterruptModal';

describe('PatternInterruptModal', () => {
  const base = {
    headline: '47 minutes wasted. Put it down.',
    time: '03:42 AM',
    status: 'YOU ARE LOSING',
    context: [
      { k: 'YOUR GOAL', v: 'SHIP TIMEOUTS V1' },
      { k: 'DAYS LEFT', v: '23' },
      { k: 'RANK', v: '#17 / 2418' },
    ],
    primaryLabel: 'PUT IT DOWN. START FOCUS.',
    secondaryLabel: '5 MORE MIN',
  };

  it('renders headline, header, context, and buttons', () => {
    render(<PatternInterruptModal {...base} />);
    expect(screen.getByText('47 minutes wasted. Put it down.')).toBeInTheDocument();
    expect(screen.getByText(/INTERRUPT/)).toBeInTheDocument();
    expect(screen.getByText('YOU ARE LOSING')).toBeInTheDocument();
    expect(screen.getByText('YOUR GOAL')).toBeInTheDocument();
    expect(screen.getByText('SHIP TIMEOUTS V1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /PUT IT DOWN/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /5 MORE MIN/i })).toBeInTheDocument();
  });

  it('fires primary and secondary callbacks', () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(<PatternInterruptModal {...base} onPrimary={onPrimary} onSecondary={onSecondary} />);
    screen.getByRole('button', { name: /PUT IT DOWN/i }).click();
    screen.getByRole('button', { name: /5 MORE MIN/i }).click();
    expect(onPrimary).toHaveBeenCalledOnce();
    expect(onSecondary).toHaveBeenCalledOnce();
  });

  it('warns in console when headline exceeds 8 words', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<PatternInterruptModal {...base} headline="one two three four five six seven eight nine" />);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
```

- [ ] **Step 5.2: Component**

```tsx
import { useEffect } from 'react';
import { Button } from '../primitives/Button';
import { cn } from '../lib/cn';

export interface PatternInterruptContextItem {
  k: string;
  v: string;
}

export interface PatternInterruptModalProps {
  headline: string;
  time: string;
  status: string;
  context: PatternInterruptContextItem[];
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  className?: string;
}

export function PatternInterruptModal({
  headline,
  time,
  status,
  context,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  className,
}: PatternInterruptModalProps) {
  useEffect(() => {
    const wordCount = headline.trim().split(/\s+/).length;
    if (wordCount > 8) {
      console.warn(
        `[PatternInterruptModal] Headline exceeds 8 words (got ${wordCount}). ` +
        `Brutalism is reduction. Cut it.`
      );
    }
  }, [headline]);

  return (
    <div className={cn('border-2 border-[var(--color-danger)] bg-black', className)}>
      <div className="flex justify-between items-center px-5 py-3 bg-[var(--color-danger)] font-mono text-[14px] font-black text-white uppercase tracking-[0.14em]">
        <span>INTERRUPT · {time}</span>
        <span>{status}</span>
      </div>
      <div className="px-8 py-10">
        <h3 className="text-[56px] font-black leading-[1.0] tracking-[-0.025em] text-white mb-6 max-w-[14ch]">
          {headline}
        </h3>
        <div className="grid grid-cols-3 gap-8 px-6 py-5 border-2 border-white mb-7">
          {context.map((c) => (
            <div key={c.k}>
              <div className="font-mono text-[13px] font-black uppercase tracking-[0.14em] text-white">{c.k}</div>
              <div className="font-mono text-[20px] font-black text-white mt-2 leading-none">{c.v}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={onPrimary} className="flex-[2]">{primaryLabel}</Button>
          <Button variant="danger" onClick={onSecondary} className="flex-1">{secondaryLabel}</Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5.3: Docs page**

```tsx
import { PatternInterruptModal } from '@touch-grass/ds';

export function PatternInterruptModalPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / PATTERNINTERRUPTMODAL
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">PATTERNINTERRUPTMODAL.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        The bullying notification. 56px display headline (max 8 words — enforced via console.warn). Red header bar, white-bordered context block, two-button row. Self-contained block; wrap in a real modal portal at app integration time.
      </p>

      <div className="max-w-[800px]">
        <PatternInterruptModal
          headline="47 minutes wasted. Put it down."
          time="03:42 AM"
          status="YOU ARE LOSING"
          context={[
            { k: 'YOUR GOAL', v: 'SHIP TIMEOUTS V1' },
            { k: 'DAYS LEFT', v: '23' },
            { k: 'RANK', v: '#17 / 2418' },
          ]}
          primaryLabel="PUT IT DOWN. START FOCUS."
          secondaryLabel="5 MORE MIN"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 5.4: Test + commit**

```bash
corepack pnpm --filter @touch-grass/ds test
git add packages/ds/src/patterns/PatternInterruptModal.tsx packages/ds/tests/patterns/PatternInterruptModal.test.tsx packages/docs-site/src/pages/patterns/PatternInterruptModalPage.tsx
git commit -m "feat(ds): add PatternInterruptModal pattern (with 8-word headline warning)"
```

---

## Chunk 4: Wire-up + final smoke

### Task 6: Wire all 5 patterns through index/App/Nav, build, smoke, tag

**Files:**
- Modify: `packages/ds/src/index.ts` (export all 5 patterns)
- Modify: `packages/docs-site/src/App.tsx` (add 5 routes)
- Modify: `packages/docs-site/src/layout/Nav.tsx` (add PATTERNS section + bump version to v0.0.3)

- [ ] **Step 6.1: Update `packages/ds/src/index.ts`**

Append:
```ts
export { LeaderboardRow, type LeaderboardRowProps, type LeaderboardRowVariant } from './patterns/LeaderboardRow';
export { FocusTimerDisplay, type FocusTimerDisplayProps } from './patterns/FocusTimerDisplay';
export { BeRealStamp, type BeRealStampProps } from './patterns/BeRealStamp';
export { PatternInterruptModal, type PatternInterruptModalProps, type PatternInterruptContextItem } from './patterns/PatternInterruptModal';
export { SessionSummaryCard, type SessionSummaryCardProps } from './patterns/SessionSummaryCard';
```

- [ ] **Step 6.2: Update `App.tsx`**

Add imports and routes for `LeaderboardRowPage`, `FocusTimerDisplayPage`, `BeRealStampPage`, `PatternInterruptModalPage`, `SessionSummaryCardPage`. Routes at `/patterns/leaderboard-row`, etc.

- [ ] **Step 6.3: Update `Nav.tsx`**

Add `patterns` array:
```ts
const patterns = [
  { label: 'LEADERBOARD ROW', href: '/patterns/leaderboard-row' },
  { label: 'FOCUS TIMER',     href: '/patterns/focus-timer-display' },
  { label: 'BEREAL STAMP',    href: '/patterns/bereal-stamp' },
  { label: 'INTERRUPT',       href: '/patterns/pattern-interrupt-modal' },
  { label: 'SESSION SUMMARY', href: '/patterns/session-summary-card' },
];
```

Add a third `<div>` section header `PATTERNS` and a third `<ul>` rendering them. Bump `// V0.0.2` → `// V0.0.3`.

- [ ] **Step 6.4: Run all tests**

```bash
corepack pnpm -r test
```

Expected: tokens (5) + ds tokens-resolved (4) + button (8) + input (6) + badge (5) + card (4) + tag (2) + divider (3) + stat (5) + timer (3) + LeaderboardRow (9) + FocusTimerDisplay (3) + SessionSummaryCard (1) + BeRealStamp (3) + PatternInterruptModal (3) = **64 tests passing**.

- [ ] **Step 6.5: Build + dev smoke**

```bash
corepack pnpm --filter @touch-grass/docs-site build
corepack pnpm dev
```

Open `http://localhost:5173/patterns/leaderboard-row`, then click through the 4 other pattern routes. Verify:
- Leaderboard renders 5 rows, top1 has KING badge in green, you row has green left border
- FocusTimerDisplay renders header + 80px stat + meta strip + button
- BeRealStamp renders 2 cards with the 3 stamps positioned correctly
- PatternInterruptModal renders red border + red header bar + 56px headline + context block + 2 buttons
- SessionSummaryCard renders a smaller version of FocusTimerDisplay
- Nav has THREE sections: FOUNDATIONS, PRIMITIVES, PATTERNS

- [ ] **Step 6.6: Commit + tag**

```bash
git add packages/ds/src/index.ts packages/docs-site/src/App.tsx packages/docs-site/src/layout/Nav.tsx
git commit -m "feat(docs-site): wire 5 patterns + add PATTERNS nav section, bump to v0.0.3"
git tag -a v0.0.3-patterns -m "Touch Grass DS — 5 app-specific patterns shipped"
```

---

## What ships when this plan is done

- 5 React patterns importable from `@touch-grass/ds`: `LeaderboardRow`, `FocusTimerDisplay`, `BeRealStamp`, `PatternInterruptModal`, `SessionSummaryCard`
- 5 docs pages under `/patterns/*`
- ~19 new tests (total ~64)
- Nav has FOUNDATIONS + PRIMITIVES + PATTERNS sections
- `v0.0.3-patterns` tag

## Out of scope

- A real modal portal/overlay system (the modal is a styled block; integration with react-aria or radix is deferred to the app)
- Photo upload / camera flow for BeReal (the component just stamps a given src)
- Real-time leaderboard data fetching (props only)
- Plan 4: Figma library + token sync script

## Open questions

1. **PatternInterruptModal portal vs block.** Currently it's a styled block. The Timeouts app will need to wrap it in a focus-trapping modal. Defer to the app integration.
2. **LeaderboardRow's `you` highlight** uses `rgba(166,255,0,0.06)` which is technically a 4th color. This is the one approved exception per spec section 4.1 ("opacity allowed only for the you-row highlight").
3. **8-word headline rule** is enforced via `console.warn`, not a runtime error. Strict enforcement (throw) would break legitimate edge cases. Acceptable.
