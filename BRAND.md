---
name: Touch Grass — Kit de Consistência
description: Single source of truth for every surface that uses the Touch Grass DS. Docs, Figma, Timeouts landing, portfolio case study — all derive from this file. If a rule conflicts with this doc, this doc wins.
version: 0.1.2
owner: Thiago Xikota
last-reviewed: 2026-04-14
---

# BRAND.md — Touch Grass

> The DS is the product's spine. Timeouts is the first app built on top. The portfolio case study tells the story. All three must feel like they came from the same mind, on the same day, in the same editor.

---

## 0. The one-sentence manifesto

**Brutalist, mono-first, tokens-only. Zero radius, zero motion, zero grey text. Built to fight iOS softness.**

If an edit softens any of those three zeros, revert it.

---

## 1. The six laws of "lindo" (quality bar)

Every surface ships against these six criteria. Fail any one → not ready.

| # | Law | What it means in practice |
|---|---|---|
| 1 | **Densidade intencional** | Every section has a real number, a real component, or a real dataset. No lorem ipsum. No "coming soon" without a date. No decorative placeholders. |
| 2 | **4-layer typographic rhythm** | Every page has all four: `stat/display` (≥56px) → `h1` (32px) → `eyebrow/label` (13px mono uppercase) → `body` (16px). If a page only has 2, it's unfinished. |
| 3 | **Assimetria controlada** | Never all 3-col, never all centered. Break the grid on purpose: 2/3 + 1/3, full-bleed alternating with contained, stat panels that bleed into the hairline. |
| 4 | **Inventive hover/focus** | No motion → the interaction has to be structural: color-flip (bg↔fg), border-inversion, text-replacement, block-halo. Every interactive element has a memorable "trick". |
| 5 | **Cross-linking explícito** | Docs page → "used in Timeouts at [screen]" + "in Figma at [node]". Timeouts landing → "built on [DS page]". Case study → "see it live at [docs page]". Circular. |
| 6 | **Prova social honesta** | Where there's no real metric, use repo facts: commit count, test count, token count, current version, last release date. Numbers from `git log` and `wc -l` are prova. |

---

## 2. Tokens (authoritative)

All values live in `packages/tokens/src/*.json` and compile to CSS variables. **Never hardcode.** If you need a value that doesn't exist, add a token.

### 2.1 Color

| Token | Value (dark) | Use | CSS var |
|---|---|---|---|
| `color.bg` | `#000000` | Background. Pure black. | `--color-bg` |
| `color.fg` | `#FFFFFF` | All text. Always. | `--color-fg` |
| `color.earned` | `#A6FF00` | Earned / active / success. Bloomberg lime. | `--color-earned` |
| `color.danger` | `#FF3B3B` | Danger / loss. WCAG AA on black @ 16px+. | `--color-danger` |
| `color.hairline` | `#1A1A1A` | Borders, dividers. **Never text.** | `--color-hairline` |
| `color.bg-alt` | `#0A0A0A` | Inset surface. **Never text.** | `--color-bg-alt` |

Light mode exists (`color-light.json`) but the primary canonical experience is dark. All screenshots for portfolio and Figma hero shots must be dark mode.

**Forbidden colors:** anything grey-on-black for text, any shade of blue, any radius-implying gradient, any drop shadow.

### 2.2 Typography

| Role | Size | Family | Weight | Tracking | Uppercase? |
|---|---|---|---|---|---|
| `statXl` | 96px | Sans | 900 | tight | no |
| `statLg` | 80px | Sans | 900 | tight | no |
| `display` | 56px | Sans | 900 | tight | no |
| `h1` | 32px | Sans | 800 | tight | no |
| `h2` | 24px | Sans | 800 | normal | no |
| `h3` | 18px | Sans | 700 | normal | no |
| `body` | 16px | Sans *or* Mono | 500–700 | normal | no |
| `label` | 13px | **Mono** | 800 | wide (0.12em) | **yes** |
| `rowNum` | 22px | Mono | 900 | tight | no |

**Rules:**
- Labels, eyebrows, and metadata: **always** Geist Mono, uppercase, 0.12em tracking, `font-black` (900).
- Prefix every eyebrow with `// ` (two slashes + space). That's the DS's signature punctuation.
- Body copy: max width 60ch. Never full-bleed prose.
- Headlines: leading-none, tracking-[-0.04em].

### 2.3 Spacing

Scale: `0, 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128`. No in-between values.

**Defaults:**
- Section vertical rhythm: `space.12` (48px) mobile, `space.16` (64px) desktop.
- Page gutter: `space.6` (24px) mobile, `space.12` (48px) desktop.
- Content max-width: 1280px. Don't bleed past it except for full-bleed hero bars.

### 2.4 Borders & radius

| Token | Width | Color | Style |
|---|---|---|---|
| `border.hairline` | 1px | `hairline` | solid |
| `border.strong` | 2px | `fg` | solid |
| `border.active` | 2px | `earned` | solid |
| `border.danger` | 2px | `danger` | solid |
| `border.disabled` | 2px | `fg` | **dashed** |

**Radius: `0`. The only radius. Forever.** If you see a rounded corner in any surface, it's a bug.

### 2.5 Motion

**Duration: `0ms`. Easing: `linear`. That's it.** No transitions, no hover fades, no scroll animations. Interaction feedback is structural (state flip), not temporal.

The only exception: the focus ring appears instantly — no fade-in.

### 2.6 Grid / breakpoints

| Name | Min | Use |
|---|---|---|
| `mobile` | 0 | Single column, 24px gutter. |
| `tablet` | 768px | 2 column optional, 32px gutter. |
| `desktop` | 1024px | Full grid, 48px gutter. |

---

## 3. Voice

**English** for: DS component APIs, code, Figma component names, docs-site (international audience).
**Portuguese (PT-BR)** for: portfolio case study, LinkedIn newsletter, Timeouts app UI copy (Brazilian launch first).
**Mono English for labels even in PT-BR surfaces** — `// SESSÃO` is wrong, `// SESSION` is right. Labels are metadata, not content.

**Tone:**
- Terse. One idea per sentence.
- Opinionated. Never "we recommend" — use "do X, don't do Y".
- Technical credibility > marketing warmth. Cite commits, test counts, WCAG ratios, not adjectives.
- Anti-enterprise. Never "leverage", "synergy", "seamless", "delightful", "empower". Ban list lives in the humanizer skill.
- No emojis. Ever. Anywhere.

**Signature devices:**
- `// EYEBROW` — uppercase mono prefix for section headers.
- `N.NNs` — times shown to millisecond in mono, right-aligned.
- `→` (U+2192) — only arrow used, never `>` or `»` or `➝`.
- Numbers dominate over verbs. A hero with `24h 03m` beats one with "Yesterday's streak".

---

## 4. The five hero components

These five appear on **every** surface as proof-of-system. They are the face of the DS:

| Component | Where it lives | What it proves |
|---|---|---|
| `<Button>` | `packages/ds/src/primitives/Button.tsx` | The interaction primitive. Halo-focus, dashed-disabled, block-loading. |
| `<Stat>` | `packages/ds/src/primitives/Stat.tsx` | Display-size numeric rendering. The typographic flex. |
| `<LeaderboardRow>` | `packages/ds/src/patterns/LeaderboardRow.tsx` | The pattern that carries Timeouts' core social loop. |
| `<FocusTimerDisplay>` | `packages/ds/src/patterns/FocusTimerDisplay.tsx` | The product hero — huge mono number, the thing users stare at. |
| `<BeRealStamp>` | `packages/ds/src/patterns/BeRealStamp.tsx` | Social proof primitive. The "this is a real product" marker. |

**Rule:** any new surface (landing page, case study, Figma cover, slide deck) must feature at least 3 of these 5 components rendered live, not as images.

---

## 5. Surface contracts

### 5.1 `timeouts.app/touch-grass` (docs-site)

**Purpose:** technical proof. Convince an engineer or a design-ops lead that the DS is production-ready.

**Every page must have:**
1. Breadcrumb row: `TOUCH GRASS / CATEGORY / PAGE NAME` in mono.
2. Eyebrow + title block at the top.
3. At least one live component preview (not a screenshot).
4. A copy-on-click code snippet.
5. Cross-link to Figma node + link to "used in Timeouts at …".
6. "Related" footer linking to 2–3 sibling components.

**Nav:** sidebar with counts per section (`FOUNDATIONS / 9`, `PRIMITIVES / 10`, `PATTERNS / 8`) and an active-page border-left indicator (`border-l-2 border-earned`).

### 5.2 `timeouts.app` (landing)

**Purpose:** product pitch. Convince a user to join the waitlist / download the app.

**Must include (in this order):**
1. Hero with a live-updating dominant number (community minutes touched).
2. Manifesto: 5 tenets, mono, visually distinct from each other.
3. Live component demo section (LeaderboardRow + FocusTimerDisplay).
4. How it works: 3 iOS mockups with mono annotations.
5. Social proof: BeRealStamp grid with honest placeholders.
6. AI coach section with a real prompt example.
7. Dual CTA: App Store button + newsletter form.
8. Footer: 4 columns (product / docs / company / social).

### 5.3 Portfolio case study (`meu-portfolio`)

**Purpose:** recruiter / staff-designer convincer. Sells me as an AI-workflow-native product designer.

**Must include:**
1. Long-form MDX post: `construindo-touch-grass-com-claude-code.mdx` (PT-BR, ~2300 words, already drafted).
2. Dedicated project detail page at `/projects/touch-grass` with 6+ screenshots.
3. Entry in `src/data/projects.ts` marked `featured: true`, with role "Product Designer, DS Lead, AI Workflow Engineer", metric "48h / 59 tests / 4 surfaces".
4. i18n strings in `src/locales/{pt,en}/projects.json`.
5. Screenshots stored under `public/assets/projects/touch-grass/`: `hero.png`, `components-grid.png`, `figma.png`, `code-snippet.png`, `landing.png`, `case-study-cover.png`.
6. Cross-link from the docs home and from timeouts.app footer back to `thiagoxikota.com/blog/construindo-touch-grass-com-claude-code`.

### 5.4 Touch Grass DS Figma file

**Purpose:** design leadership convincer. Proves this isn't a hack, it's a real DS.

**Must include:**
- Cover page with the manifesto + 5 hero components rendered at scale.
- Variables bound 1:1 to CSS tokens (same names, same values).
- Component variants matching the React variant API exactly.
- One "Foundations" page per token category, mirroring docs-site structure.
- Code Connect mappings for the 5 hero components.

---

## 6. The cross-link graph (wire it up, don't just say it)

```
           ┌──────────────────────┐
           │ portfolio case study │
           │  /blog/…             │
           └──────┬────────┬──────┘
                  │        │
         reads    ▼        ▼    embeds
  ┌─────────────┐    ┌──────────────┐
  │ docs-site   │◄──►│ timeouts.app │
  │ /touch-grass│    │ landing      │
  └──────┬──────┘    └──────┬───────┘
         │                  │
         ▼                  ▼
  ┌──────────────────────────┐
  │ Touch Grass Figma file   │
  │ (variables + components) │
  └──────────────────────────┘
```

Every node links to every other node at least once. No dead ends.

---

## 7. Verification checklist (run before calling any surface "done")

- [ ] Every color, spacing, size, border is a token (`var(--*)` in CSS, token name in Figma).
- [ ] Zero `border-radius` > 0. Zero `transition-*`. Zero `animate-*`.
- [ ] Every page has all 4 typographic layers present.
- [ ] Every interactive element has a memorable non-motion hover/focus state.
- [ ] Every section has a real number, component, or dataset.
- [ ] WCAG AA passes via `a11y-audit` skill.
- [ ] Responsive works at 390, 768, 1440. No horizontal scroll at any width.
- [ ] Every surface links to at least 2 of the other 3 surfaces.
- [ ] Screenshots captured in dark mode at the 3 viewports and committed under `.github/assets/`.
- [ ] `humanizer` skill reviewed any PT-BR prose for AI tells.

---

## 8. What NOT to do (anti-pattern ledger)

- **Don't** add a "delightful" animation because "just this one won't hurt". It will.
- **Don't** soften a hairline to "look cleaner". The edges are the design.
- **Don't** add a grey `text-muted` class. Muted = not shown.
- **Don't** invent a new radius for "the illustrations folder". The illustrations also have 0 radius.
- **Don't** add decorative emoji in headings "for scan-ability". The mono label IS the scan-ability.
- **Don't** write copy that says the word "beautiful", "modern", "clean", "intuitive". Show, don't adjective.
- **Don't** ship a surface without at least one of the 5 hero components rendered live.
- **Don't** let Figma and code drift. If they drift, the code wins and Figma gets synced within the same session.

---

*Maintainer note: if you're about to edit this file to loosen a rule, first spend 10 minutes looking at what the loosened rule actually fixes. 90% of the time the right edit is to the code, not to the doc.*
