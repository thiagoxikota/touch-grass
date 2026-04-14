# Contributing to Touch Grass

Thanks for the interest. Touch Grass is brutalist on purpose — contributions are welcome, but they need to stay inside the rules that make the system what it is.

## The rules, up front

Before touching anything, know that Touch Grass has a few non-negotiables:

- **Zero rounded corners.** No `border-radius`. No soft edges.
- **Zero grey text.** Foreground colors are resolved from tokens, never opacity or neutral greys.
- **Zero motion.** No transitions, no easing, no micro-animations. Hover is a color flip, not a slide.
- **Mono everywhere it counts.** Headings, buttons, stats, timers — `Geist Mono`, uppercase, tracked.
- **Tokens only.** No hex codes in components. No raw pixel values for spacing. Everything goes through `@touch-grass-ds/tokens`.
- **One primitive per concept.** If `Badge` exists, don't add `Tag` unless it's semantically different (it is — Tag is dismissible, Badge isn't).

If a contribution breaks any of these, it won't merge — not because the PR is bad, but because the system stops being what it is.

## Project layout

```
touch-grass/
├── packages/
│   ├── tokens/        @touch-grass-ds/tokens — Style Dictionary source of truth
│   ├── ds/            @touch-grass-ds/react — React component library
│   └── docs-site/     Vite + React 19 docs (private, not published)
├── brand/             Touch Grass own brand assets (icon, logo)
├── docs/              Specs and implementation plans
└── Package.swift      SPM entry point for iOS consumers
```

## Development

Requires Node 22+, pnpm via corepack, git.

```bash
corepack enable
corepack pnpm install
corepack pnpm tokens       # build token CSS/JSON/Swift
corepack pnpm dev          # docs site at http://localhost:5173
corepack pnpm -r test      # run all package tests
corepack pnpm -r build     # build everything
```

pnpm is invoked via `corepack pnpm` to avoid PATH activation quirks on macOS. Bare `pnpm` also works if you've enabled it globally.

## Adding a component

You don't need to manually scaffold files anymore. Rote-work is automated.
Run the CLI generator from the root:

```bash
pnpm run generate primitive ComponentName
# or
pnpm run generate pattern ComponentName
```

This will automatically create:
1. The brutalist component file (`packages/ds/src/...`)
2. The vitest test file (`packages/ds/tests/...`)
3. The Docs demo page (`packages/docs-site/src/pages/...`)

**Important:** You only need to manually export your new component in the barrel file (`packages/ds/src/index.ts`). The Docs site navigation and routing will automatically pick up your new page using `import.meta.glob`.

Component conventions:

- `forwardRef` always, even if you don't think you'll need it
- Props spread into the root element, `className` merged via `cn()`
- Uppercase mono for any human-readable label
- 48px minimum tap target for interactive elements
- Dashed border for `disabled` state, hard-halo (`box-shadow: 0 0 0 2px var(--color-fg)`) for focus
- Loading state uses block characters (`█ ▓ ▒ ░`), never spinners

Tests should cover every variant × state combination. Look at `packages/ds/tests/primitives/Button.test.tsx` for the reference pattern.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) with package scopes:

```
feat(ds): add Breadcrumb primitive
fix(tokens): correct contrast on --color-acid-hover
docs(docs-site): add Breadcrumb demo page
chore: bump to v0.2.0
```

## Pull requests

- One logical change per PR. If you're adding a primitive and a pattern, open two PRs.
- Include screenshots for any visual change. The docs site is at `localhost:5173` — crop just the demo area.
- Make sure `pnpm -r test` and `pnpm -r build` both pass locally. CI runs the same.
- If you're changing tokens, include a note about downstream impact (iOS consumers pull Swift via SPM tags — bumping a token forces a Swift package republish).

## Reporting bugs

Use the bug report template. If the bug is visual, a screenshot or Loom helps more than any description.

## Code of Conduct

This project follows the [Contributor Covenant v2.1](./CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
