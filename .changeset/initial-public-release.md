---
"@touch-grass/tokens": minor
"@touch-grass/ds": minor
---

First public release of the Touch Grass design system on npm.

**@touch-grass/tokens**
- Six core color tokens (bg, fg, earned, danger, hairline, bg-alt) as CSS
  variables, Tailwind v4 theme, W3C Figma tokens, and auto-generated Swift
  constants via Style Dictionary.
- Spacing scale (0, 1, 2, 3, 4, 5, 6, 8, 12, 16, 24, 32 @ 4px base),
  type scale (Stat XL/LG/MD, Display, H1–H3, Body, Label), border widths
  (1px hairline, 2px strong), breakpoints, motion (zero).
- Export paths: `.` and `/css` for tokens.css, `/light` for dark→light mode
  override, `/tailwind` for the v4 @theme block, `/figma` for W3C JSON,
  `/js` and `/preset` for Tailwind preset consumption.
- SPM package at the repo root for iOS/macOS consumers.

**@touch-grass/ds**
- Eight brutalist primitives: Button (3×5 matrix), Input, Badge (3×2),
  Card, Tag, Divider, Stat, Timer, Checkbox, Switch — all `forwardRef`,
  token-only colors via the Tailwind preset, 48px tap targets, hard-halo
  focus, dashed disabled, block-character loading.
- Five patterns: LeaderboardRow, FocusTimerDisplay, BeRealStamp,
  PatternInterruptModal, SessionSummaryCard, Field, Sparkline, Toast.
- Typography is Geist + Geist Mono via `@fontsource`.
- 74 unit tests (vitest + RTL + vitest-axe) covering rendering,
  variants, states, prop forwarding, and accessibility.
- Brutal lint enforced via `prebuild`: zero rounded corners, zero
  motion utilities, zero raw hex codes in the ds source.
- Generator CLI: `pnpm run generate <primitive|pattern> <Name>` creates
  the component + test + docs-page from templates.

This release marks the transition from "v0.0.x private dev" to the first
version third parties can install.
