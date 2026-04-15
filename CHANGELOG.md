# Changelog

All notable changes to Touch Grass are documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **TouchGrassUI (SwiftUI)** — New SPM product and target with iOS-first primitives (`TGButton`, `TGCard`, `TGBadge`, `TGStat`, `TGTimer`), social patterns (`TGLeaderboardRow`, `TGFriendChallengeCard`, `TGWeeklyRankChange`, `TGStreakProofCard`), and a state-ready `TGCompetitionLoopScreen` (`loading`, `offline`, `empty`, `content`).
- **iOS previews + snapshot tests** — Added DEBUG SwiftUI previews for primitive and competition states plus rendered leaderboard snapshot-hash coverage for tied-rank/current-user cases.

### Changed

- **Swift token generation** — `TouchGrassTokens.swift` now includes non-color design tokens (spacing, border widths, font sizes, type weight, breakpoints, motion, radius) via a custom Style Dictionary Swift formatter.
- **Accessibility + token wiring in TouchGrassUI** — Components now use non-color token values for layout/typography and ship stronger VoiceOver labels/values across leaderboard and social-proof patterns.
- **Package platform compatibility** — Restored `.macOS(.v12)` in `Package.swift` alongside iOS support.
- **Golden snapshot fixture flow** — Added fixture-backed rendered hash assertions and `UPDATE_TG_GOLDENS=1` workflow for refreshing leaderboard golden hashes.

## [0.1.1] — 2026-04-13

### Changed

- **`packages/docs-site`** — Build now supports serving under a subpath. Vite `base` is `/touch-grass/` in production and `/` in dev. React Router picks up the base via `import.meta.env.BASE_URL` so deep links work when hosted at `timeouts.app/touch-grass`. Override with `DOCS_BASE` env var.

## [0.1.0] — 2026-04-13

First public release.

### Added

- **`@touch-grass-ds/tokens`** — Style Dictionary 4 source of truth. Emits:
  - `tokens.css` — CSS custom properties
  - `tailwind.theme.css` — Tailwind v4 `@theme` block
  - `figma-tokens.json` — W3C Design Tokens format for Figma
  - `Sources/TouchGrassTokens/TouchGrassTokens.swift` — Swift constants for iOS consumers via SPM
- **`@touch-grass-ds/react`** — React 19 component library:
  - 8 primitives: `Button`, `Input`, `Badge`, `Card`, `Stat`, `Timer`, `Tag`, `Divider`
  - 5 patterns: `LeaderboardRow`, `FocusTimerDisplay`, `BeRealStamp`, `PatternInterruptModal`, `SessionSummaryCard`
  - Base styles, `cn()` helper, forwardRef throughout
- **Docs site** — Vite + React 19 with foundations, primitives, and patterns pages
- **Package.swift** at root — SPM entry point so iOS apps can consume tokens via `https://github.com/thiagoxikota/touch-grass` directly
- OSS boilerplate: MIT license, contributing guide, code of conduct, security policy, CI workflow, issue and PR templates

[0.1.1]: https://github.com/thiagoxikota/touch-grass/releases/tag/v0.1.1
[0.1.0]: https://github.com/thiagoxikota/touch-grass/releases/tag/v0.1.0
