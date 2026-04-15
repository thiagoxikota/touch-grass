# @touch-grass-ds/react

React 19 components for [Touch Grass](https://github.com/thiagoxikota/touch-grass) — the open-source brutalist design system. Ten primitives and eight patterns. No rounded corners, no grey text, no motion, no exceptions.

## Install

```bash
npm install @touch-grass-ds/tokens @touch-grass-ds/react
# or
pnpm add @touch-grass-ds/tokens @touch-grass-ds/react
```

`@touch-grass-ds/tokens` is a required peer — the components read CSS variables it defines, so the tokens stylesheet has to be imported first.

## Usage

```css
/* your global stylesheet */
@import "@touch-grass-ds/tokens";
@import "@touch-grass-ds/react/styles/base.css";
```

```tsx
import { Button, Badge, Stat } from "@touch-grass-ds/react";

export function Dashboard() {
  return (
    <>
      <Stat label="STREAK" value="14" unit="DAYS" />
      <Badge variant="earned">NEW</Badge>
      <Button variant="primary">START</Button>
    </>
  );
}
```

## Components

### Primitives

| Component | What it is |
|---|---|
| **`Button`** | Uppercase mono button. 3 variants × 5 states. 48px tap target. Block-character loading state — never a spinner. |
| **`Input`** | Text input with hard-halo focus and uppercase mono label. Supports error state via `aria-invalid`. |
| **`Badge`** | Small inline tag for status (`neutral`, `earned`, `danger`). Non-interactive. |
| **`Card`** | Bordered container. No rounding, no shadow. Just a hairline and padding. |
| **`Tag`** | Like Badge but dismissible (`onDismiss` prop). Shows an `X` on hover. |
| **`Divider`** | Horizontal or vertical hairline. Optional label inset. |
| **`Stat`** | Numeric stat with uppercase label and optional unit. Tabular nums. |
| **`Timer`** | Countdown / count-up display. `HH:MM:SS` in mono, tabular, huge. |

### Patterns

Composed of primitives. App-level building blocks.

| Pattern | What it is |
|---|---|
| **`LeaderboardRow`** | Rank, avatar placeholder, name, handle, time, badge. For the Timeouts leaderboard, but re-usable anywhere you need a ranked row. |
| **`FocusTimerDisplay`** | Full-screen `Timer` + label + state-aware `Button`. Used for active focus sessions. |
| **`BeRealStamp`** | Timestamped "proof" card. Border, date, time, caption. |
| **`PatternInterruptModal`** | Full-bleed modal for breaking a scroll spiral. Uppercase headline, two-button CTA row. |
| **`SessionSummaryCard`** | Post-session recap: duration, earned amount, streak delta, badge list. |

## Conventions

Every component follows the same rules:

- **`forwardRef`** everywhere — no exceptions
- **`cn()` helper** for className merging
- **Token-only** — no hex codes, no raw pixel values
- **Uppercase mono** for any human-readable label (buttons, stats, headings)
- **48px minimum tap target** for anything interactive
- **Dashed border** for disabled state; **hard-halo** (`box-shadow: 0 0 0 2px var(--color-fg)`) for focus
- **Block-character** loading states (`█ ▓ ▒ ░`), never spinners

See [CONTRIBUTING.md](../../CONTRIBUTING.md) in the monorepo root for the full component-adding workflow.

## Docs

Each component has a live demo page in the docs site:

```bash
# from the repo root
corepack pnpm dev
# visit http://localhost:5173
```

Published docs at [`timeouts.app/touch-grass`](https://timeouts.app/touch-grass).

## License

[MIT](../../LICENSE) © Thiago Xikota
