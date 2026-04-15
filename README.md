<div align="center">

# Touch Grass

**Open-source brutalist design system.**
Zero rounded corners. Zero animation. Token-driven neutral hierarchy. Geist Mono everywhere it counts.

[![License: MIT](https://img.shields.io/badge/license-MIT-000000?style=flat-square&labelColor=a6ff00&color=000000)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A522-000000?style=flat-square&labelColor=a6ff00&color=000000)](./package.json)
[![CI](https://img.shields.io/github/actions/workflow/status/thiagoxikota/touch-grass/ci.yml?style=flat-square&labelColor=a6ff00&color=000000&label=ci)](./.github/workflows/ci.yml)
[![npm · react](https://img.shields.io/npm/v/@touch-grass-ds/react?style=flat-square&labelColor=a6ff00&color=000000&label=npm%20%C2%B7%20react)](https://www.npmjs.com/package/@touch-grass-ds/react)
[![npm · tokens](https://img.shields.io/npm/v/@touch-grass-ds/tokens?style=flat-square&labelColor=a6ff00&color=000000&label=npm%20%C2%B7%20tokens)](https://www.npmjs.com/package/@touch-grass-ds/tokens)
[![Figma Community](https://img.shields.io/badge/figma-community-000000?style=flat-square&labelColor=a6ff00&color=000000)](https://www.figma.com/community/file/1625695815996602388/touch-grass-ds)

**By [Thiago Xikota](https://thiagoxikota.com)** — product designer, DS lead, AI workflow engineer.
[Portfolio](https://thiagoxikota.com) · [Case study](https://thiagoxikota.com/projects/touch-grass) · [LinkedIn](https://br.linkedin.com/in/thiagoxikota) · [Timeouts.app](https://timeouts.app)

</div>

---

<p align="center">
  <img src=".github/assets/hero-home.png" alt="Touch Grass docs home — brutalist layout with lime accent on black background" width="100%" />
</p>

## Why

Most design systems apologize. They round the corners, soften the type, add a 150ms ease-out on every hover. They look like Figma files trying not to offend.

Touch Grass doesn't. It's built on a short list of hard rules:

- **No rounded corners.** `border-radius: 0` everywhere. Sharp is a feature.
- **No opacity hierarchy.** Text hierarchy uses neutral tokens (`fg`, `fg-muted`, `fg-subtle`) — never `opacity` or `rgba()` alpha.
- **No motion.** No transitions, no eased hovers, no micro-interactions. Hover is a color flip, not a slide.
- **Mono where it counts.** `Geist Mono`, uppercase, tracked, for headings, buttons, stats, and timers. `Geist Sans` for long-form copy.
- **Tokens only.** Components don't know about hex codes. Spacing, color, and size come from `@touch-grass-ds/tokens` or they don't ship.
- **48px minimum tap target.** No exceptions.

It's the system I wanted while building [Timeouts](https://timeouts.app) — a social gym for time off your phone — and couldn't find anywhere off the shelf.

## What's in here

<table>
<tr>
<td><strong><a href="./packages/tokens">@touch-grass-ds/tokens</a></strong></td>
<td>Style Dictionary source of truth. Emits <code>tokens.css</code> (CSS variables), <code>tailwind.theme.css</code> (Tailwind v4 <code>@theme</code> block), <code>figma-tokens.json</code> (W3C Design Tokens format), and Swift constants for iOS consumers via SPM.</td>
</tr>
<tr>
<td><strong><a href="./packages/ds">@touch-grass-ds/react</a></strong></td>
<td>React 19 component library. 10 primitives (Button, Input, Badge, Card, Tag, Divider, Stat, Timer, Checkbox, Switch) + 8 patterns (LeaderboardRow, FocusTimerDisplay, BeRealStamp, PatternInterruptModal, SessionSummaryCard, Field, Sparkline, Toast).</td>
</tr>
<tr>
<td><strong><a href="./packages/docs-site">packages/docs-site</a></strong></td>
<td>Vite + React 19 documentation site. Foundations, primitives, patterns. Runs at <code>localhost:5173</code>. Live at <a href="https://timeouts.app/touch-grass/"><code>timeouts.app/touch-grass</code></a>.</td>
</tr>
</table>

## Peek

<table>
<tr>
<td width="50%"><img src=".github/assets/foundations-color.png" alt="Foundations / Color — the 4-color brutalist palette" /></td>
<td width="50%"><img src=".github/assets/primitives-button.png" alt="Primitives / Button — full variant and state matrix" /></td>
</tr>
<tr>
<td width="50%"><strong>Foundations / Color</strong><br/>Nine tokens. Three text tiers. No opacity hierarchy.</td>
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
npm install @touch-grass-ds/tokens @touch-grass-ds/react

# or pnpm, or bun, or yarn
pnpm add @touch-grass-ds/tokens @touch-grass-ds/react
```

### Use the tokens

```css
/* app/globals.css */
@import "@touch-grass-ds/tokens";          /* or "@touch-grass-ds/tokens/tailwind" */
@import "@touch-grass-ds/react/styles/base.css";
```

### Use a component

```tsx
import { Button } from "@touch-grass-ds/react";

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

**Design system contract:** [`docs/contract.md`](./docs/contract.md) — the normative specification covering color rules, motion bans, state model, accessibility, typography, `asChild` semantics, and enforcement. Uses MUST/SHOULD/MAY language per RFC 2119.

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
│   ├── tokens/             @touch-grass-ds/tokens — design token source of truth
│   ├── ds/                 @touch-grass-ds/react — React component library
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

corepack pnpm tokens       # build @touch-grass-ds/tokens (CSS + JSON + Swift)
corepack pnpm dev          # start docs site at http://localhost:5173
corepack pnpm -r test      # run all package tests
corepack pnpm -r build     # build every package
```

pnpm is invoked through `corepack pnpm` to avoid PATH activation quirks on macOS. Bare `pnpm` works too if you've enabled it globally.

New to the codebase? Read [CONTRIBUTING.md](./CONTRIBUTING.md) first — especially the brutalist rules and the six-file lockstep for adding a component.

## Roadmap

- [x] **v0.1.x** — Tokens, 8 primitives, 5 patterns, docs site, Swift package
- [x] **v1.0.0** — Stable API, 10 primitives + 8 patterns, Checkbox/Switch/Toast/Sparkline/Field, Figma community library with Code Connect, public docs at `timeouts.app/touch-grass`, first npm release of `@touch-grass-ds/tokens` and `@touch-grass-ds/react`
- [ ] **v1.1.0** — Select / Combobox primitive, dark-on-black chart primitives (animation-free data viz), expanded foundations docs

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

## Author

**Thiago Xikota** — product designer, design system lead, and AI workflow engineer. Built Touch Grass DS from scratch in 48 hours using Claude Code as an operating system for product work, as the visual backbone for [Timeouts](https://timeouts.app).

- **Portfolio** — [thiagoxikota.com](https://thiagoxikota.com)
- **Case study (detail page)** — [thiagoxikota.com/projects/touch-grass](https://thiagoxikota.com/projects/touch-grass)
- **Case study (PT-BR long-form)** — [thiagoxikota.com/blog/construindo-touch-grass-com-claude-code](https://thiagoxikota.com/blog/construindo-touch-grass-com-claude-code)
- **LinkedIn** — [br.linkedin.com/in/thiagoxikota](https://br.linkedin.com/in/thiagoxikota)
- **GitHub** — [github.com/thiagoxikota](https://github.com/thiagoxikota)
- **X / Twitter** — [@thiagoxikota](https://x.com/thiagoxikota)

Touch Grass is distributed on:

- **npm** — [`@touch-grass-ds/react`](https://www.npmjs.com/package/@touch-grass-ds/react) · [`@touch-grass-ds/tokens`](https://www.npmjs.com/package/@touch-grass-ds/tokens)
- **Figma Community** — [Touch Grass DS](https://www.figma.com/community/file/1625695815996602388/touch-grass-ds)
- **Swift Package Manager** — [github.com/thiagoxikota/touch-grass](https://github.com/thiagoxikota/touch-grass)

## License

[MIT](./LICENSE) © [Thiago Xikota](https://thiagoxikota.com)
