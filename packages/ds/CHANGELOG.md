# @touch-grass-ds/react

## 1.1.0

### Minor Changes

- f0047cc: feat(ds): `asChild` prop on `Button` and `Badge` via Radix Slot

  Both `Button` and `Badge` accept an optional `asChild` boolean that renders the component's classes and forwarded props onto their single child instead of the default `<button>` / `<span>`. Powered by `@radix-ui/react-slot`, which is already a runtime dependency of `@touch-grass-ds/react`.

  This unblocks the common "styled anchor" / "styled router link" pattern without having to wrap the component in a parent or re-implement every class list:

  ```tsx
  // before — wrapper anchor, Button becomes non-clickable styling
  <a href="/primitives/button">
    <Button variant="ghost">BROWSE PRIMITIVES ↗</Button>
  </a>

  // after — the anchor IS the button, one element, one focus ring
  <Button asChild variant="ghost">
    <a href="/primitives/button">BROWSE PRIMITIVES ↗</a>
  </Button>
  ```

  Same shape for `Badge`, useful when a badge needs to be a link:

  ```tsx
  <Badge asChild variant="earned">
    <a href="https://www.npmjs.com/package/@touch-grass-ds/react">v1.0.1 ↗</a>
  </Badge>
  ```

  Implementation notes:
  - `Button` is a native `<button>` by default and supports the HTML `disabled` attribute. When `asChild` is true the rendered element is arbitrary (commonly `<a>`, which has no `disabled`), so `disabled` is translated to `aria-disabled="true"` plus a `pointer-events-none` class on the composed className. Keyboard handling remains the consumer's responsibility for non-button elements.
  - Both components now use `forwardRef` end-to-end, so refs reach the rendered element whether or not `asChild` is set.
  - No API break: existing `<Button>` / `<Badge>` call sites continue to work unchanged. Props, variants, and class output are identical when `asChild` is falsy.

- a7e9ba1: fix(ds): spacing tier overhaul — lock the 4/8/12/16/20/24/32 contract across primitives

  Every interactive primitive shared the same vocabulary (border-2, uppercase mono, bold) so spacing was the only tier signal — and the spacing was too close. Buttons read as squares on short labels, Tag and Button were near-siblings, Input text floated off-center, Checkbox and Switch failed their own 48px tap-target rule.

  This is a visual-only refinement. Public APIs are unchanged — every primitive accepts the same props as before. But every component that renders a control has new dimensions, so consumers should expect visible layout shifts.

  **The new tier table (all values snap to `space.json`):**

  | Tier     | Role           | Height                           | Padding-X | Padding-Y | Text | Border |
  | -------- | -------------- | -------------------------------- | --------- | --------- | ---- | ------ |
  | Button   | Primary action | `min-h-12` (48) `min-w-32` (128) | `px-6`    | `py-3`    | 14px | 2px    |
  | Input    | Text entry     | `min-h-12` (48)                  | `px-5`    | `py-3`    | 15px | 2px    |
  | Tag      | Filter chip    | `min-h-8` (32) + 48px hit area   | `px-3`    | `py-2`    | 12px | 1px    |
  | Badge md | Static label   | `min-h-6` (24)                   | `px-2`    | `py-1`    | 11px | 2px    |
  | Badge sm | Static label   | `min-h-4` (16)                   | `px-2`    | `py-1`    | 10px | 2px    |

  **What this fixes:**
  - **Button** — `min-w-32` ends the "square button" problem on short labels like `GO` / `OK`. `leading-none` + `gap-2` align text and any future icon children. `px-6` gives the CTA real horizontal authority.
  - **Input** — `text-15 leading-none` centers the caret inside the 48px box (was floating high). `px-5` gives the placeholder room to breathe.
  - **Tag** — drops to a 32px chip with **1px** border so it visibly de-escalates from Button's 2px. WCAG 2.5.5 still satisfied via an invisible 48px hit area on the `:before` pseudo-element (32 + 8 + 8 = 48). Tags now read as chips, not as second-class buttons.
  - **Badge** — tighter sizes, explicit `min-h` floor. `md=24px`, `sm=16px`. Clearly decorative, never confused with a Tag.
  - **Checkbox** — visible 24px box stays, but the wrapping `<label>` gains `min-h-12` so the entire row is a 48px tap target. Also: `stroke="black"` on the X-check SVG → `currentColor` (token discipline — the only hardcoded color in primitives is now gone).
  - **Switch** — same treatment: 56×32 visual control, 48px tap row via `min-h-12` on the wrapping label.
  - **Card** — header padding unified to `p-6` to match the body. Was `px-5 py-4` / `p-6` mismatch.
  - **Stat** — random `mb-3 mt-6 pt-5 mt-1` magic numbers snapped to the scale (`mb-4 mt-6 pt-6 mt-2`).

  **Locked in via:**
  - New regression tests on Button / Input / Tag / Badge asserting the exact contract (min-h, min-w, px, leading-none, border weight, hit-area pseudo).
  - A new `TIERS` table on the Spacing foundation page that publishes the contract — every future primitive must snap to one of those rows. Includes a footnote explaining the Tag/Badge sub-48 carve-out (Tag has a hit-area pseudo; Badge is non-interactive).
  - `VariantsMatrix` cell padding bumped from `p-4` → `p-6` so demo grids breathe and don't squeeze the new component sizes.
  - Stale `tapTarget` metadata on TagPage (`36px`) and CheckboxPage (`24px + 12px gap`) updated to reflect the real contract.

  Token violations fixed in the same pass:
  - `Checkbox.tsx` — removed the hardcoded `stroke="black"` (was the only remaining hex outside the `#000` allowance for hover box-shadows).

  No API changes. No new dependencies. All 77 vitest tests passing (4 new contract tests added).

### Patch Changes

- 161b712: chore(ds): expose `package.json` in the package exports map

  Adds `"./package.json": "./package.json"` to `@touch-grass-ds/react`'s exports so downstream tooling can read the version at build time:

  ```ts
  import pkg from "@touch-grass-ds/react/package.json" with { type: "json" };
  console.log(pkg.version); // "1.0.0"
  ```

  The Touch Grass docs site uses this to derive its `DS_VERSION` constant from the published package, so the version badge in the nav rail and the per-component meta rows can never drift from what's actually on npm.

  Pure additive change — no public API impact for consumers who don't opt in.

- 988ec2d: fix(tokens): add `muted` color token + correct stale Swift danger value
  - Adds `color.muted = #B3B3B3` — secondary / de-emphasized text. Contrast ratio >7:1 on black. Maps to `--color-muted`, `ColorMuted` (JS), `colorMuted` (Swift), and emits into the Tailwind `@theme` block and Figma W3C JSON.
  - Regenerates `TouchGrassTokens.swift` so that `colorDanger` and `borderDangerColor` finally match `color.json`. The v1.0.0 Swift output shipped stale values (`#FF3B3B`) while the source, CSS, Tailwind, JS, and Figma outputs all had `#FF6B6B`. iOS consumers via SPM were getting the wrong red. This reconciles the pipeline.

  fix(ds): `danger` variant of `Button`, `Badge`, and `PatternInterruptModal` now renders text in `text-black`

  `#FF6B6B` is light enough that white foreground fails WCAG AA at typical component sizes. Black on `#FF6B6B` is >9:1 and WCAG AAA clean. Visible change for anyone rendering a `<Button variant="danger">`, `<Badge variant="danger">`, or `<PatternInterruptModal>`: the text color flips from white to black. This is a contrast bug fix, not a design change — the brutalist rule is "foreground must be a real token with real contrast", and white-on-FF6B6B broke that rule.

  feat(ds): `Field` uses the new `muted` token for its description text

  `Field`'s secondary description line was previously `text-hairline`, which resolved to `#1A1A1A` — basically invisible on black. Now it's `text-muted` (`#B3B3B3`), which actually reads. The hairline token stays scoped to borders / dividers as intended.

- 7a647c3: fix(ds): `Switch` checked thumb is now visibly distinct from the checked track

  The v1.0.0 `Switch` rendered its thumb as `bg-earned` sitting inside a `border-earned` track when checked. Both were the same lime, so position was the only affordance — and anyone with reduced motion sensitivity, color anomalies, or simply low attention couldn't tell ON from OFF at a glance. axe didn't catch it because axe doesn't measure same-color UI elements against each other.

  The fix flips the checked thumb to `bg-black border-earned`: a black rectangle with a 2px lime border, 9.1:1 against the lime track border. OFF state is unchanged (white thumb, left side, white-bordered track). The two states are now unambiguous regardless of position, color vision, or motion.

  No API change. Purely a visual / contrast fix inside the component's internal thumb element.

- Updated dependencies [988ec2d]
  - @touch-grass-ds/tokens@1.0.1

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

### Patch Changes

- Updated dependencies [8441a2b]
  - @touch-grass-ds/tokens@1.0.0
