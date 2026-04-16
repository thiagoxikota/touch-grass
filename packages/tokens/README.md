# @touch-grass-ds/tokens

Design tokens for [Touch Grass](https://github.com/thiagoxikota/touch-grass) — the open-source brutalist design system. Built on [Style Dictionary 4](https://styledictionary.com/), emits one set of primitive tokens across four targets so web, Figma, and iOS stay in lockstep.

```
src/*.json                                       (source of truth, JSON)
         │
         ▼  style-dictionary
    ┌─────────────────────────────────────────┐
    │  dist/tokens.css           CSS variables │
    │  dist/tailwind.theme.css   Tailwind v4   │
    │  dist/figma-tokens.json    W3C format    │
    │  Sources/TouchGrassTokens/*.swift        │
    └─────────────────────────────────────────┘
```

## Install

```bash
npm install @touch-grass-ds/tokens
# or
pnpm add @touch-grass-ds/tokens
```

## Usage

### Plain CSS

```css
@import "@touch-grass-ds/tokens";

.card {
  background: var(--color-bg);
  color: var(--color-fg);
  padding: var(--space-4);
  border: 1px solid var(--color-hairline);
}
```

### Tailwind CSS v4

```css
@import "tailwindcss";
@import "@touch-grass-ds/tokens/tailwind";
```

Then use token-named utilities in your markup: `bg-bg`, `text-ink`, `border-hairline`, `p-4`, etc. Tailwind reads the `@theme` block from the imported CSS.

### Figma

```bash
# generate once
pnpm --filter @touch-grass-ds/tokens build
# import dist/figma-tokens.json into the Figma variables panel
```

The JSON follows the W3C Design Tokens Community Group format — any tool that understands `$value` / `$type` / `$description` will consume it.

### iOS / Swift (SPM)

`Package.swift` at the repo root exposes the Swift constants as a package. Add the repo URL to your Xcode project as a Swift Package Manager dependency:

```
https://github.com/thiagoxikota/touch-grass
```

Then:

```swift
import TouchGrassTokens

let accent = TouchGrassTokens.Color.earned     // "#a6ff00"
let spacing = TouchGrassTokens.Space.space4    // 16
```

The Swift source is regenerated every time you run `pnpm --filter @touch-grass-ds/tokens build`.

## Token categories

| Category | What it covers |
|---|---|
| `color` | 3 text tiers (`fg`, `fg-muted`, `fg-subtle`) + 2 accents (`earned`, `danger`) + 2 borders (`hairline`, `hairline-strong`) + 2 surfaces (`bg`, `bg-alt`) |
| `space` | `0, 1, 2, 3, 4, 6, 8, 12, 16` — no speculative scale, just what's used |
| `size` | Fixed sizes (tap target 48, icon 16/20/24, hairline 1/2) |
| `radius` | Exactly one token: `0`. Intentional. |
| `font` | `geist-mono` + `geist-sans` families, weight scale `400/600/700/800/900` |
| `type` | Role-based type tokens (`label`, `body`, `heading`, `stat`, `timer`) |

## Development

```bash
pnpm --filter @touch-grass-ds/tokens build    # regenerate all outputs
pnpm --filter @touch-grass-ds/tokens test     # verify output integrity
```

Token sources live in `src/*.json`. Edit those, then rebuild. Never hand-edit `dist/` or `Sources/`.
The test suite includes a contrast contract check that blocks white-on-earned accent pairings so low-contrast regressions fail CI.

## License

[MIT](../../LICENSE) © Thiago Xikota
