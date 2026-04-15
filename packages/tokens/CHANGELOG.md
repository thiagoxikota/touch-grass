# @touch-grass-ds/tokens

## 1.0.1

### Patch Changes

- 988ec2d: fix(tokens): add `muted` color token + correct stale Swift danger value
  - Adds `color.muted = #B3B3B3` — secondary / de-emphasized text. Contrast ratio >7:1 on black. Maps to `--color-muted`, `ColorMuted` (JS), `colorMuted` (Swift), and emits into the Tailwind `@theme` block and Figma W3C JSON.
  - Regenerates `TouchGrassTokens.swift` so that `colorDanger` and `borderDangerColor` finally match `color.json`. The v1.0.0 Swift output shipped stale values (`#FF3B3B`) while the source, CSS, Tailwind, JS, and Figma outputs all had `#FF6B6B`. iOS consumers via SPM were getting the wrong red. This reconciles the pipeline.

  fix(ds): `danger` variant of `Button`, `Badge`, and `PatternInterruptModal` now renders text in `text-black`

  `#FF6B6B` is light enough that white foreground fails WCAG AA at typical component sizes. Black on `#FF6B6B` is >9:1 and WCAG AAA clean. Visible change for anyone rendering a `<Button variant="danger">`, `<Badge variant="danger">`, or `<PatternInterruptModal>`: the text color flips from white to black. This is a contrast bug fix, not a design change — the brutalist rule is "foreground must be a real token with real contrast", and white-on-FF6B6B broke that rule.

  feat(ds): `Field` uses the new `muted` token for its description text

  `Field`'s secondary description line was previously `text-hairline`, which resolved to `#1A1A1A` — basically invisible on black. Now it's `text-muted` (`#B3B3B3`), which actually reads. The hairline token stays scoped to borders / dividers as intended.

## 1.0.0

### Minor Changes

- 8441a2b: First public release of the Touch Grass design system on npm.

  **@touch-grass-ds/tokens**
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

  **@touch-grass-ds/react**
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
