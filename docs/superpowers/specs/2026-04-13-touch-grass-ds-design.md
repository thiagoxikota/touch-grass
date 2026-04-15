# Touch Grass DS — Design Spec

**Date:** 2026-04-13
**Project:** Timeouts (anti-wellness habit tracker)
**Design system:** Touch Grass DS
**Status:** Approved (brainstorming → spec)

---

## 1. Goals

Build the **Touch Grass DS** — a brutalist, terminal-flex design system for the Timeouts app. The DS must:

- Encode the "competitive, high-stakes, anti-wellness" brand into reusable primitives so every Timeouts screen looks unmistakably itself.
- Ship as a Figma library AND a runnable React + Tailwind v4 component library, kept in sync.
- Cover enough surface area that Timeouts v1 can be assembled entirely from DS components without one-off CSS.
- Refuse softness on contact: zero rounded corners, zero grey text, zero decorative motion. Every default fights iOS HIG instincts.

**Non-goals (v1):**
- Light theme. Touch Grass is dark-only on principle.
- Animation library beyond instant state changes.
- Internationalization beyond English/Portuguese (RTL deferred).
- Assembled screen templates (deferred to v2 once primitives are proven).
- Accessibility audit beyond contrast and focus states (full a11y pass deferred to v1.1).

## 2. Scope

Three deliverable layers:

**Layer A — Foundations**
Tokens for color, type, spacing, radius, borders, motion (the absence of it), iconography, grid. Documentation page.

**Layer B — Primitives** (~8 components)
Button, Input, Badge, Card, Stat, Timer, Tag, Divider.

**Layer C — App-specific patterns** (~5 components)
LeaderboardRow, FocusTimerDisplay, BeRealStamp (overlay system), PatternInterruptModal, SessionSummaryCard.

Each layer ships as both Figma library entries and React components with shared design tokens.

## 3. Stack

**Code:**
- **React 19** + **TypeScript**
- **Tailwind CSS v4** with `@theme` directive for token definition
- **CSS variables** as the source of truth (Tailwind reads them, Figma variables mirror them)
- **Vite + React** for the showcase/docs site
- **Lucide React** icons at 1.5px stroke
- **Geist** + **Geist Mono** loaded via `next/font` or `@fontsource`

**Figma:**
- One library file: `Touch Grass DS`
- Variables organized in three collections: `primitive`, `semantic`, `component`
- Component variants for state (default/hover/focus/disabled/loading)
- Naming convention mirrors code: `Button/Primary`, `LeaderboardRow/Top1`, etc.

**Sync strategy:**
- CSS variables are the source of truth for token names and values
- Figma variables are imported from the same JSON via a token-sync script (Style Dictionary → Figma Variables REST API)
- Components are built twice (once in Figma, once in code) but variants and naming are kept identical so handoff is 1:1
- Token changes flow CSS → JSON → Figma. Component changes flow human → both, manually, with PR review.

## 4. Foundations

### 4.1 Color

**Four fill/text colors. Two structural colors. Nothing else.**

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#000000` | Background. Pure black. |
| `--color-fg` | `#FFFFFF` | All text. Always. |
| `--color-earned` | `#A6FF00` | Earned/success/active. Bloomberg lime. |
| `--color-danger` | `#FF6B6B` | Danger/loss. Brightened from #E10600 for WCAG AAA on black. |
| `--color-hairline` | `#1a1a1a` | Border, divider. Never text. |
| `--color-bg-alt` | `#0a0a0a` | Inset/recessed surfaces. Never text. |

**Hard rules:**

1. **No grey text. Ever.** Hierarchy comes from size + weight, not from dimming. `#666`, `#999`, `#444`, `rgba(255,255,255,0.6)` and similar are banned.
2. **Red is structural, not textual.** Red exists only as background or border. Black text always sits on red. Bare red text on black is banned.
3. **Green is earned and scarce.** Max **one green hit per component instance**. Stacking green (e.g., green border + green text + green badge on the same row) is banned.
4. **Black-on-green and black-on-red** are the only allowed reverse pairings.
5. **No opacity for hierarchy.** `rgba` is allowed only for the `you` row highlight on leaderboards (`rgba(166,255,0,0.06)`) and similar background tints — never on text.

### 4.2 Typography

**Two families. No third ever.**

| Family | Usage | Source |
|---|---|---|
| **Geist** | All interface copy, headings, names, prose | Vercel, OFL |
| **Geist Mono** | All numbers, timers, data, labels, tables, code-like UI chrome | Vercel, OFL |

**Type scale** (Geist sans, unless tagged `mono`):

| Token | Size | Weight | Usage |
|---|---|---|---|
| `text-stat-xl` (mono) | 96px | 900 | Reserved (full-bleed hero only) |
| `text-stat-lg` (mono) | 80px | 900 | Default stat hero (timer with seconds) |
| `text-stat-md` (mono) | 64px | 900 | Mobile stat hero |
| `text-display` | 56px | 900 | Pattern interrupt headline |
| `text-h1` | 32px | 900 | Page title |
| `text-h2` | 24px | 800 | Section title |
| `text-h3` | 18px | 700 | Component title, leaderboard name |
| `text-body` | 16px | 600 | Body copy floor |
| `text-label` (mono) | 13px | 800 | Label/caption floor (uppercase, +0.12em tracking) |
| `text-row-num` (mono) | 22px | 900 | Leaderboard hours |
| `text-row-name` | 18px | 700 | Leaderboard name |
| `text-row-handle` (mono) | 13px | 600 | Leaderboard @handle |

**Floors:**
- Body text: **16px minimum**
- Labels: **13px minimum** in Geist Mono
- Tap targets: **48px height minimum**

**Weights used:** 600, 700, 800, 900. Never below 600. Never thin/light weights.

### 4.3 Spacing

**Base 4px. Scale:**
`4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128`

Off-grid values are banned. Density is part of the brand — outer padding floors at 16px on mobile, 24px on desktop.

### 4.4 Radius

**Zero. Everywhere. No exceptions.**

This includes avatars (which become square ID-badge style), modals, buttons, inputs, cards, badges, chips, tags. The square avatar is a brand signature.

`--radius-none: 0` is the only radius token. It exists so component code can reference a token rather than literal `0`, but its value never changes.

### 4.5 Borders

| Token | Width | Color | Usage |
|---|---|---|---|
| `--border-hairline` | 1px | `#1a1a1a` | Default structure (panels, dividers, table rows) |
| `--border-strong` | 2px | `#FFFFFF` | Important boundaries (inputs, secondary buttons, avatars, ctx blocks) |
| `--border-active` | 2px | `#A6FF00` | Active/selected state, focused row left-border |
| `--border-danger` | 2px | `#FF6B6B` | Danger surfaces (interrupt modal frame) |
| `--border-disabled` | 2px dashed | `#FFFFFF` | Disabled buttons (dashed = honestly broken) |

### 4.6 Motion

**Zero animation by default.** Instant state changes everywhere.

The only allowed transitions:
- `border-color 0ms` (instant)
- `background-color 0ms` (instant)

No fades, no slides, no easing curves, no stagger, no decorative motion of any kind. The product's emotional register is *discipline*, not delight.

**One exception:** the BeReal capture flow may use a 2-frame hard cut (no easing) when the photo is captured and stamped — to make the "stamping" feel mechanical, not animated.

### 4.7 Iconography

**Lucide React, 1.5px stroke, 16px/20px/24px sizes only.**

Icons inherit `currentColor`. No multi-color icons, no filled icons mixed with outline. Use sparingly — text labels are preferred where space allows.

### 4.8 Grid

| Breakpoint | Columns | Gutter | Outer margin | Max content |
|---|---|---|---|---|
| Desktop (≥1024px) | 12 | 16px | 32px | 1280px |
| Tablet (≥768px) | 8 | 12px | 24px | — |
| Mobile (<768px) | 4 | 8px | 16px | — |

## 5. State Matrix

Every interactive component must define **all five** states. No implicit fallbacks.

| State | Visual rule |
|---|---|
| **Default** | Component's primary appearance. |
| **Hover** | `box-shadow: inset 0 0 0 2px #000` — looks like a 2px black bevel cut into the button. Instant, no fade. |
| **Focus (keyboard)** | `outline: 2px solid #FFF; outline-offset: 3px`. Hard halo, never glow. |
| **Disabled** | 2px **dashed** white border, black bg, white text, `cursor: not-allowed`. Looks broken on purpose. Never grey, never opacity-reduced. |
| **Loading** | 2px solid white border, black bg, label changes to verb-ing form, prepended with block character `█▌ `. No spinner, ever. Block characters are the loading affordance. |

## 6. Empty + Loading Patterns

### Loading
**Block-character skeletons.** Replace data values with `██` of equivalent character width, in the same monospace, same size, same grid position. The shape of the data is preserved; the values are redacted. No animation, no shimmer, no pulse.

Example (leaderboard row):
```
██  ██  ████████        ██:██:██  +██:██
```

### Empty
- `[ ∅ ]` glyph at 48px Geist Mono
- Uppercase headline, 18px Geist Mono, weight 900
- One-line sub at 14px Geist Mono, max 32ch
- Single CTA button (primary)
- **No illustrations, ever.** Touch Grass has no mascots.

## 7. Truncation Rules

| Field | Rule | Example |
|---|---|---|
| **Rank** | Up to 4 digits. Past 9999, format as `9999+`. | `#1247` |
| **Name** | Truncate to 16 chars + `…` (three dots, monospace). | `Lorem ipsum dol…` |
| **Handle** | Truncate to 14 chars + `…`. Always uppercase. | `@LONGUSERNAME…` |
| **Hours (desktop)** | `HH:MM:SS` up to 99h. Past 99h: `DD:HH` format (e.g. `12D:14H`). | `62:14:08` |
| **Hours (mobile)** | `HH:MM` (drop seconds). Tap row to reveal full precision. | `62:14` |
| **Delta** | Sign + `HH:MM`. Drop seconds. Past 99h delta: `MAX`. | `+04:22` |

## 8. Mobile Rules

- **Stat hero:** `text-stat-lg` (80px) → `text-stat-md` (64px). Still dominant.
- **Leaderboard:** 5 columns → 4 columns. Delta column drops; tap row to reveal.
- **Hours:** strip seconds on mobile; tap to reveal.
- **Buttons:** full-width.
- **Tap targets:** 48px height minimum.
- **Padding:** 24px desktop → 16px mobile. 4px base preserved.

## 9. Copy Rules (DS-enforced)

These are part of the design system because brutalism is as much voice as visual.

- **Pattern interrupt headlines:** maximum **8 words**. The headline IS the message — no subtext paragraph.
- **Labels:** ALL CAPS, Geist Mono, +0.12em letter-spacing.
- **Headers:** No fake shell-script aesthetics (`.sh`, `.exe`, etc.). Use `INTERRUPT · {time}` style or plain uppercase labels.
- **Numbers:** always monospace, always with their unit visible (`12 DAYS`, not `12`).
- **Time format:** 24-hour. ISO date format `YYYY-MM-DD`. No `am/pm`.

## 10. Component Inventory

### 10.1 Primitives (Layer B)

| Component | Variants | Purpose |
|---|---|---|
| `Button` | Primary / Ghost / Danger × {default, hover, focus, disabled, loading} | All actions |
| `Input` | Default / Focus / Error / Disabled | Text entry. Mono font for numeric inputs. |
| `Badge` | Earned / Neutral / Danger × {sm, md} | Inline status indicator |
| `Card` | Default / Inset | Container with hairline border + panel-head |
| `Stat` | Hero / Inline × {sm, md, lg, xl} | Number display with optional label + meta |
| `Timer` | Static / Live | Mono digital timer, supports HH:MM:SS or DD:HH |
| `Tag` | Default / Active | Filter chip, square, mono, uppercase |
| `Divider` | Hairline / Strong | 1px or 2px horizontal/vertical rule |

### 10.2 App-specific patterns (Layer C)

| Component | Composes | Purpose |
|---|---|---|
| `LeaderboardRow` | Avatar + Stat + Badge + Delta chip | One row in the ranking. Variants: `Top1`, `Default`, `You`. |
| `FocusTimerDisplay` | Stat (hero) + meta strip + Button | The home screen's primary surface. |
| `BeRealStamp` | Three overlay layers (verify badge / timestamp / hours block) | Composable image overlay system. |
| `PatternInterruptModal` | Header + Display headline + ctx block + Button row | The bullying notification surface. |
| `SessionSummaryCard` | Card + Stat + meta | Post-session result for the social feed. |

## 11. File Structure

```
touch-grass/
├── docs/superpowers/specs/2026-04-13-touch-grass-ds-design.md   (this file)
├── packages/
│   ├── tokens/                      # Style Dictionary source
│   │   ├── color.json
│   │   ├── type.json
│   │   ├── space.json
│   │   └── build.ts                 # → CSS vars + Tailwind theme + Figma JSON
│   ├── ds/                          # React component library
│   │   ├── src/
│   │   │   ├── primitives/          # Button, Input, Badge, Card, Stat, Timer, Tag, Divider
│   │   │   ├── patterns/            # LeaderboardRow, FocusTimerDisplay, BeRealStamp, PatternInterruptModal, SessionSummaryCard
│   │   │   └── tokens.css           # Generated, do not edit
│   │   └── package.json
│   └── docs-site/                   # Vite + React showcase
│       └── src/
│           ├── pages/foundations/
│           ├── pages/primitives/
│           └── pages/patterns/
└── figma/
    └── touch-grass-ds.figma         # Manually maintained, variables synced from tokens/build.ts
```

## 12. Testing Strategy

- **Visual:** Each component gets a story in the docs site showing all variants × all states. Manual visual review.
- **Contrast:** Automated WCAG AA check on every text/bg color combination via `axe-core` in CI.
- **Mobile:** Each component renders correctly at 375px, 768px, 1024px, 1280px. Snapshot tests at each breakpoint.
- **Interaction:** Keyboard navigation works on every interactive component (Tab, Enter, Esc). Focus states are visible.
- **Token sync:** A diff job in CI compares `tokens/*.json` against the Figma variables export and fails if they drift.

## 13. Open Questions

1. **Token sync direction for v1:** Do we ship the Figma → CSS sync script in v1, or hand-maintain Figma during v1 and automate in v1.1? Recommendation: hand-maintain in v1, automate after the token surface stabilizes.
2. **Avatar fallback:** What renders when there's no initial available (empty string handle)? Current proposal: literal `??` in white. Needs sign-off.
3. **Dark-only forever, or eventual light theme?** Recommendation: dark-only forever. Brutalism + screen discipline thematically forbids a "light meditation" mode. But this should be a written stake-in-the-ground.
4. **Does Timeouts have any non-mono numbers anywhere?** I assert no — every number is mono. If there's a counter-example in the product (e.g., onboarding form field, settings), we revisit.

## 14. Approved Decisions Log

All decisions below were made during brainstorming on 2026-04-13.

| # | Decision | Choice |
|---|---|---|
| 1 | Where DS lives | Figma library + matching code, kept in sync |
| 2 | Scope | Foundations + primitives + app-specific patterns (Layer A+B+C) |
| 3 | Code stack | React + Tailwind v4 + CSS variables |
| 4 | Color palette | Bloomberg Trader: `#A6FF00` / `#FF6B6B` / `#FFF` / `#000` |
| 5 | Typography | Geist + Geist Mono |
| 6a | Spacing base | 4px |
| 6b | Radius | Zero everywhere, including avatars |
| 6c | Borders | 1px `#1a1a1a` hairline + 2px white/active variants |
| 6d | Motion | Zero animation |
| 6e | Iconography | Lucide React, 1.5px stroke |
| 7 | Contrast/size feedback | No grey text. 16px body floor, 13px label floor. Red brightened to `#FF6B6B`, demoted from text to background/border. |
| 8 | Critique fixes | Max one green hit per component; neutral delta chips; honest LIVE label dropped; 80px stat hero with seconds; 6-word interrupt headlines; full state matrix; block-character loading; truncation rules; 12/8/4 grid. |
