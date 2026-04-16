# Touch Grass Design System — Normative Contract

> Version 1.0.0 · Effective immediately · This document is the enforceable specification.
> If implementation conflicts with this contract, fix the implementation.

This contract uses **MUST**, **SHOULD**, and **MAY** per [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

---

## 1. Color

### 1.1 Token palette

| Token | Value (dark) | CSS var | Use |
|---|---|---|---|
| `color.bg` | `#000000` | `--color-bg` | Background surface. |
| `color.fg` | `#FFFFFF` | `--color-fg` | Primary text. Default for all text nodes. |
| `color.earned` | `#A6FF00` | `--color-earned` | Earned / active / success accent. Bloomberg lime. |
| `color.danger` | `#FF6B6B` | `--color-danger` | Danger / loss / error. WCAG AAA on black (7.57:1). |
| `color.muted` | `#B3B3B3` | `--color-muted` | Secondary text hierarchy. WCAG AAA on black (10.02:1). |
| `color.hairline` | `#1A1A1A` | `--color-hairline` | Borders, dividers. MUST NOT be used for text. |
| `color.bgAlt` | `#0A0A0A` | `--color-bg-alt` | Inset surface. MUST NOT be used for text. |

### 1.2 "No grey text" rule — clarified

The rule bans **arbitrary greys**. It does NOT ban the `--color-muted` token.

**MUST:**
- All text MUST use a design token (`--color-fg`, `--color-muted`, `--color-earned`, `--color-danger`, or `--color-bg` for reverse pairings).
- Opacity-based text dimming (e.g. `text-white/50`, `opacity-60` on text) MUST NOT be used in shipped components.
- Arbitrary hex greys (e.g. `#666`, `#999`, `#aaa`) MUST NOT appear in component source.
- `--color-hairline` and `--color-bg-alt` MUST NOT be used as text color.

**SHOULD:**
- Text hierarchy SHOULD be expressed through size, weight, casing, and tracking first. Use `--color-muted` only when structural hierarchy alone is insufficient.
- `--color-muted` SHOULD be limited to: secondary metadata, helper text, timestamps, placeholder text, and de-emphasized labels.

**MAY:**
- `--color-muted` MAY be used in docs-site educational contexts (e.g. contrast ratio labels, secondary descriptions) where full `--color-fg` would create false emphasis.

### 1.3 Color usage rules

- `--color-earned` MUST appear at most once per component instance (scarcity rule).
- Filled `--color-earned` surfaces MUST use the theme's darkest foreground token for text (`--color-bg` in dark mode, `--color-fg` in light mode). White text on earned is forbidden.
- `--color-danger` on dark backgrounds MUST be paired with black (`--color-bg`) text when used as a background fill. White text on danger background fails WCAG at body size.
- Only two reverse pairings are allowed: black-on-earned and black-on-danger.

---

## 2. Motion

### 2.1 "No motion" rule

**MUST:**
- All CSS `transition-duration` values MUST be `0ms`.
- All CSS `animation-duration` values MUST be `0ms`.
- Tailwind transition utilities (except `transition-none`) MUST NOT be used.
- Tailwind `duration-*`, `ease-*`, `animate-*` utilities MUST NOT be used.
- No `@keyframes` declarations in component source.

**MUST (base.css enforcement):**
- `base.css` MUST include the global kill switch: `transition-duration: 0ms !important; animation-duration: 0ms !important` on `*, *::before, *::after`.

### 2.2 Acceptable instantaneous state changes

Interaction feedback MUST be structural, not temporal:
- **Color flip** — background and foreground swap instantly on hover/active.
- **Border inversion** — border color/style changes instantly.
- **Text replacement** — label text changes (e.g. loading state: `█▌ VERB-ING`).
- **Outline appearance** — focus ring appears instantly with no fade.
- **Inset shadow** — `box-shadow: inset` appears instantly for hover bevel.

---

## 3. State model

Every interactive primitive MUST define visual treatment for all applicable states. No implicit fallbacks.

### 3.1 Seven canonical states

| State | Trigger | Visual signal | Required for |
|---|---|---|---|
| **DEFAULT** | Idle | Component at rest with its variant styling. | All interactive primitives |
| **HOVER** | Mouse enter | Inset 2px black bevel (`box-shadow: inset 0 0 0 2px var(--color-bg)`). Instant. No color change. | Button, Input, Checkbox, Switch, Tag |
| **FOCUS** | Keyboard focus (`focus-visible`) | 2px `--color-fg` outline at 3px offset. Hard halo. Never a glow. | All interactive primitives |
| **ACTIVE** | Mouse down / touch | Visual depression via stronger inset or border-weight shift. Instant. | Button, Checkbox, Switch |
| **SELECTED** | Toggled on / checked | `--color-earned` accent (border-left, fill, or checkmark). | Checkbox, Switch, Tag |
| **DISABLED** | `disabled` attribute or `aria-disabled` | 2px DASHED `--color-fg` border, `--color-bg` background, `--color-fg` text. `cursor: not-allowed`. | All interactive primitives |
| **LOADING** | `loading` prop | Label replaced with `█▌ VERB-ING`. 2px solid `--color-fg` border. `aria-busy="true"`. | Button |

### 3.2 Rules

- Components MUST NOT ship without defining at least: DEFAULT, HOVER (if mouse-interactive), FOCUS, and DISABLED.
- LOADING state is REQUIRED for Button. Other primitives MAY implement it.
- SELECTED state is REQUIRED for Checkbox, Switch, and Tag.
- Disabled interactive elements MUST use `cursor: not-allowed` and suppress hover effects.
- `aria-disabled="true"` MUST be set when the element is disabled but rendered via `asChild` (since non-button elements lack a native `disabled` attribute).

---

## 4. Accessibility

### 4.1 Contrast

- Text on `--color-bg` MUST meet WCAG 2.1 AAA (7.0:1 minimum).
- `--color-fg` on `--color-bg`: 21:1 — AAA.
- `--color-muted` on `--color-bg`: 10.02:1 — AAA.
- `--color-earned` on `--color-bg`: 16.93:1 — AAA.
- `--color-danger` on `--color-bg`: 7.57:1 — AAA.
- Large text (≥18px bold or ≥24px) on danger backgrounds MAY use `--color-bg` text at AA Large (4.5:1 minimum).

### 4.2 Focus-visible

- Every interactive element MUST show a focus indicator on `:focus-visible`.
- The indicator MUST be: `outline: 2px solid var(--color-fg); outline-offset: 3px`.
- Focus indicators MUST NOT be suppressed, overridden, or faded.
- Focus appearance MUST be instantaneous (no transition).

### 4.3 Tap target

- All interactive elements MUST have a minimum touch target of **48×48 CSS pixels** (`min-h-12` in Tailwind).
- This applies to: Button, Input, Checkbox, Switch, and any clickable pattern.
- No exceptions for "small" or "compact" variants.

### 4.4 Disabled semantics

- Native `<button>` and `<input>` elements: use the HTML `disabled` attribute.
- Non-native elements (via `asChild`): set `aria-disabled="true"` and apply `pointer-events-none`.
- Disabled elements MUST remain visible (no `display:none` or `visibility:hidden`).
- Disabled elements MUST use the dashed border treatment (2px dashed `--color-fg`).

### 4.5 Keyboard interaction

| Primitive | Key | Action |
|---|---|---|
| Button | `Enter`, `Space` | Activate the button. |
| Input | Standard | Native text input behavior. |
| Checkbox | `Space` | Toggle checked state. |
| Switch | `Space`, `Enter` | Toggle on/off state. |
| Tag | `Enter`, `Space` | Activate if interactive. |
| Modal | `Escape` | Close the modal. |
| Toast | — | Auto-dismiss or manual close. Not keyboard-focusable by default. |

### 4.6 ARIA expectations

- Form inputs MUST use `aria-describedby` linked to error messages.
- Form labels MUST use `htmlFor` (React) / `for` (HTML) to bind to inputs.
- Decorative SVGs MUST use `aria-hidden="true"`.
- Loading states MUST set `aria-busy="true"`.
- Invalid states MUST set `aria-invalid="true"`.

---

## 5. Typography

### 5.1 Two families

| Family | CSS | Use |
|---|---|---|
| **Geist Sans** | `font-family: 'Geist'` | Body copy, headings (h1–h3), stat numbers. |
| **Geist Mono** | `font-family: 'Geist Mono'` | Labels, eyebrows, metadata, buttons, timers, code, row numbers. |

### 5.2 Usage rules

**MUST:**
- Labels, eyebrows, and metadata MUST use Geist Mono, uppercase, `letter-spacing: 0.12em`, `font-weight: 900`.
- Eyebrows MUST be prefixed with `// ` (two slashes + space). This is the system's signature punctuation.
- Body copy MUST NOT be smaller than 16px (`--font-size-body`).
- Body copy MUST be constrained to `max-width: 60ch`.
- Numeric data ≥18px MUST use Geist Mono.

**SHOULD:**
- Headlines SHOULD use `leading-none` and `tracking-[-0.04em]`.
- Every page SHOULD exhibit all four typographic layers: stat/display (≥56px) → heading (18–32px) → label (13px mono) → body (16px).

### 5.3 Weight scale

| Weight | Token | Use |
|---|---|---|
| 400 | `regular` | Never in components. Reserved for long-form body in docs. |
| 600 | `semibold` | Body baseline. Default `html` weight. |
| 700 | `bold` | h3, body emphasis. |
| 800 | `extrabold` | h1, h2, labels. |
| 900 | `black` | Stats, display, buttons, eyebrows. |

---

## 6. Borders and radius

- The only `border-radius` value is `0`. MUST be enforced globally via `border-radius: 0 !important` in `base.css`.
- Border tokens: hairline (1px solid), strong (2px solid fg), active (2px solid earned), danger (2px solid danger), disabled (2px dashed fg).
- Dashed borders are exclusively reserved for the disabled state. Using dashed borders for any other purpose is a violation.

---

## 7. `asChild` semantics

### 7.1 What it does

`asChild` (via Radix `Slot`) renders the component's styling and props onto its single child element instead of rendering a default `<button>`. This enables anchor-as-button, router-link-as-button, etc.

### 7.2 Rules

**MUST:**
- When `asChild` is true and the element is disabled, MUST set `aria-disabled="true"` (not the HTML `disabled` attribute, which only works on form elements).
- When `asChild` is true and the element is disabled, MUST apply `pointer-events-none` to prevent interaction.
- When `asChild` is true, keyboard behavior is the consumer's responsibility. The DS does NOT inject `onKeyDown` handlers — the rendered element must be natively interactive (e.g. `<a>`, `<Link>`) or the consumer must handle keyboard events.

**SHOULD:**
- Components SHOULD document which props are forwarded when `asChild` is true.
- Consumers SHOULD prefer native elements (real `<a>` tags over `<div onClick>`) to inherit keyboard behavior for free.

---

## 8. Enforcement

### 8.1 Lint checks (CI-blocking)

| Check | Tool | What it catches |
|---|---|---|
| Rounded corners | ESLint plugin + `lint-brutal.mjs` | `rounded-*` utilities (except `rounded-none`). |
| Transitions | ESLint plugin + `lint-brutal.mjs` | `transition-*` (except `transition-none`), `duration-*`, `ease-*`. |
| Animations | ESLint plugin + `lint-brutal.mjs` | `animate-*` utilities. |
| Hardcoded hex | ESLint plugin + `lint-brutal.mjs` | Any `#RRGGBB` or `#RGB` in component source. |
| Opacity text | ESLint plugin + `lint-brutal.mjs` | `text-*/*` opacity patterns and `opacity-*` on text elements. |

### 8.2 Unit tests (CI-blocking)

- Token integration tests verify: `tokens.css` emits all 7 color tokens, `base.css` enforces zero radius and zero motion, focus ring is defined.
- Token source tests verify WCAG contrast pairings for accent fills, including the explicit ban on white text over earned backgrounds.
- Component tests verify: correct ARIA attributes, disabled behavior, loading state, variant classes, 48px tap target (`min-h-12`).

### 8.3 Accessibility auditing

- The docs-site includes an axe-based a11y audit capability.
- `vitest-axe` is used in component tests where applicable.
- WCAG 2.1 AAA is the target, with AA Large as the minimum acceptable for large text on colored backgrounds.

---

## 9. Exceptions

| Exception | Scope | Rationale |
|---|---|---|
| Hard cut (2-frame) | BeReal capture flow only | Camera shutter metaphor requires a binary visual flip. No easing. |
| Inline hex in docs-site | `packages/docs-site/` only | Educational color swatches need to display hex values. ESLint/lint-brutal excludes docs-site. |
| `opacity-60` in docs-site | Copy button "COPY" label | Minor UI affordance in docs only. Not in shipped components. |

---

*This contract is maintained at `docs/contract.md`. Changes to this file require updating BRAND.md, the docs-site foundations pages, and the enforcement tooling in the same commit.*
