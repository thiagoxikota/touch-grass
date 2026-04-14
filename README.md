<div align="center">

# Touch Grass

**Open-source brutalist design system.**
Zero rounded corners. Zero grey text. Zero animation. Geist Mono everywhere it counts.

[![License: MIT](https://img.shields.io/badge/license-MIT-000000?style=flat-square&labelColor=a6ff00&color=000000)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A522-000000?style=flat-square&labelColor=a6ff00&color=000000)](./package.json)
[![CI](https://img.shields.io/github/actions/workflow/status/thiagoxikota/touch-grass/ci.yml?style=flat-square&labelColor=a6ff00&color=000000&label=ci)](./.github/workflows/ci.yml)
[![Made with pnpm](https://img.shields.io/badge/pnpm-9-000000?style=flat-square&labelColor=a6ff00&color=000000)](https://pnpm.io)

</div>

---

<p align="center">
  <img src=".github/assets/hero-home.png" alt="Touch Grass docs home — brutalist layout with lime accent on black background" width="100%" />
</p>

## Why

Most design systems apologize. They round the corners, soften the type, add a 150ms ease-out on every hover. They look like Figma files trying not to offend.

Touch Grass doesn't. It's built on a short list of hard rules:

- **No rounded corners.** `border-radius: 0` everywhere. Sharp is a feature.
- **No grey text.** Foreground colors resolve to tokens — never opacity, never neutrals.
- **No motion.** No transitions, no eased hovers, no micro-interactions. Hover is a color flip, not a slide.
- **Mono where it counts.** `Geist Mono`, uppercase, tracked, for headings, buttons, stats, and timers. `Geist Sans` for long-form copy.
- **Tokens only.** Components don't know about hex codes. Spacing, color, and size come from `@touch-grass/tokens` or they don't ship.
- **48px minimum tap target.** No exceptions.

It's the system I wanted while building [Timeouts](https://timeouts.app) — a social gym for time off your phone — and couldn't find anywhere off the shelf.

## What's in here

<table>
<tr>
<td><strong><a href="./packages/tokens">@touch-grass/tokens</a></strong></td>
<td>Style Dictionary source of truth. Emits <code>tokens.css</code> (CSS variables), <code>tailwind.theme.css</code> (Tailwind v4 <code>@theme</code> block), <code>figma-tokens.json</code> (W3C Design Tokens format), and Swift constants for iOS consumers via SPM.</td>
</tr>
<tr>
<td><strong><a href="./packages/ds">@touch-grass/ds</a></strong></td>
<td>React 19 component library. 8 primitives (Button, Input, Badge, Card, Tag, Divider, Stat, Timer) + 5 patterns (LeaderboardRow, FocusTimerDisplay, BeRealStamp, PatternInterruptModal, SessionSummaryCard).</td>
</tr>
<tr>
<td><strong><a href="./packages/docs-site">packages/docs-site</a></strong></td>
<td>Vite + React 19 documentation site. Foundations, primitives, patterns. Runs at <code>localhost:5173</code>. Will ship at <code>timeouts.app/touch-grass</code>.</td>
</tr>
</table>

## Peek

<table>
<tr>
<td width="50%"><img src=".github/assets/foundations-color.png" alt="Foundations / Color — the 4-color brutalist palette" /></td>
<td width="50%"><img src=".github/assets/primitives-button.png" alt="Primitives / Button — full variant and state matrix" /></td>
</tr>
<tr>
<td width="50%"><strong>Foundations / Color</strong><br/>Four colors. Two structural. No greys.</td>
<td width="50%"><strong>Primitives / Button</strong><br/>3 variants × 5 states. Uppercase mono. 48px tap target.</td>
</tr>
<tr>
<td colspan="2"><img src=".github/assets/patterns-leaderboard.png" alt="Patterns / LeaderboardRow — composed of primitives" /></td>
</tr>
<tr>
<td colspan="2"><strong>Patterns / LeaderboardRow</strong> — app-level composition. Primitives do the heavy lifting.</td>
</tr>
</table>

## Quick start

### Install

```bash
# web / React
npm install @touch-grass/tokens @touch-grass/ds

# or pnpm, or bun, or yarn
pnpm add @touch-grass/tokens @touch-grass/ds
```

### Use the tokens

```css
/* app/globals.css */
@import "@touch-grass/tokens";          /* or "@touch-grass/tokens/tailwind" */
@import "@touch-grass/ds/styles/base.css";
```

### Use a component

```tsx
import { Button } from "@touch-grass/ds";

export function Home() {
  return (
    <Button variant="primary" onClick={() => alert("hi")}>
      START
    </Button>
  );
}
```

### iOS / Swift

Touch Grass ships tokens as a Swift package for iOS consumers. Add it to your Xcode project via SPM:

```
https://github.com/thiagoxikota/touch-grass
```

Then import:

```swift
import TouchGrassTokens

let accent = TouchGrassTokens.Color.earned
```

## Documentation

Full docs: [**timeouts.app/touch-grass**](https://timeouts.app/touch-grass) *(coming soon)*

Until then, run the docs site locally:

```bash
corepack enable
corepack pnpm install
corepack pnpm tokens       # build tokens first
corepack pnpm dev          # http://localhost:5173
```

## Repo layout

```text
touch-grass/
├── packages/
│   ├── tokens/             @touch-grass/tokens — design token source of truth
│   ├── ds/                 @touch-grass/ds — React component library
│   └── docs-site/          Vite + React 19 docs (not published to npm)
├── brand/
│   └── touch-grass/        DS brand assets (icon, logo)
├── docs/
│   └── superpowers/        Specs and implementation plans
├── .github/
│   ├── assets/             Screenshots for this README
│   ├── ISSUE_TEMPLATE/     Bug and feature templates
│   └── workflows/          CI
├── Package.swift           SPM entry point for iOS token consumers
├── package.json            pnpm workspace root
└── pnpm-workspace.yaml
```

## Development

Touch Grass is a pnpm workspace. Requires Node 22+.

```bash
corepack enable
corepack pnpm install

corepack pnpm tokens       # build @touch-grass/tokens (CSS + JSON + Swift)
corepack pnpm dev          # start docs site at http://localhost:5173
corepack pnpm -r test      # run all package tests
corepack pnpm -r build     # build every package
```

pnpm is invoked through `corepack pnpm` to avoid PATH activation quirks on macOS. Bare `pnpm` works too if you've enabled it globally.

New to the codebase? Read [CONTRIBUTING.md](./CONTRIBUTING.md) first — especially the brutalist rules and the six-file lockstep for adding a component.

## Roadmap

- [x] **v0.1.0** — Tokens, 8 primitives, 5 patterns, docs site, Swift package
- [ ] **v0.2.0** — Figma library with Code Connect, more primitives (Checkbox, Switch, Select)
- [ ] **v0.3.0** — Dark-on-black chart primitives, animation-free data viz
- [ ] **v1.0.0** — API stability, public docs at `timeouts.app/touch-grass`, first npm release

See [CHANGELOG.md](./CHANGELOG.md) for released versions.

## Who's using it

- **[Timeouts](https://timeouts.app)** — iOS app. Consumes tokens via SPM.

Building something with Touch Grass? Open a PR adding yourself to the list.

## Credits

Standing on the shoulders of:

- **[Style Dictionary](https://styledictionary.com/)** — token pipeline
- **[Tailwind CSS v4](https://tailwindcss.com/)** — `@theme` consumption
- **[Geist](https://vercel.com/font)** — mono and sans
- **[Vite](https://vitejs.dev/)** + **[React 19](https://react.dev/)** — docs site
- **[Vitest](https://vitest.dev/)** + **[Testing Library](https://testing-library.com/)** — tests

## License

[MIT](./LICENSE) © Thiago Xikota
