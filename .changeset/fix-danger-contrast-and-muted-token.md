---
"@touch-grass-ds/tokens": patch
"@touch-grass-ds/react": patch
---

fix(tokens): add `muted` color token + correct stale Swift danger value

- Adds `color.muted = #B3B3B3` — secondary / de-emphasized text. Contrast ratio >7:1 on black. Maps to `--color-muted`, `ColorMuted` (JS), `colorMuted` (Swift), and emits into the Tailwind `@theme` block and Figma W3C JSON.
- Regenerates `TouchGrassTokens.swift` so that `colorDanger` and `borderDangerColor` finally match `color.json`. The v1.0.0 Swift output shipped stale values (`#FF3B3B`) while the source, CSS, Tailwind, JS, and Figma outputs all had `#FF6B6B`. iOS consumers via SPM were getting the wrong red. This reconciles the pipeline.

fix(ds): `danger` variant of `Button`, `Badge`, and `PatternInterruptModal` now renders text in `text-black`

`#FF6B6B` is light enough that white foreground fails WCAG AA at typical component sizes. Black on `#FF6B6B` is >9:1 and WCAG AAA clean. Visible change for anyone rendering a `<Button variant="danger">`, `<Badge variant="danger">`, or `<PatternInterruptModal>`: the text color flips from white to black. This is a contrast bug fix, not a design change — the brutalist rule is "foreground must be a real token with real contrast", and white-on-FF6B6B broke that rule.

feat(ds): `Field` uses the new `muted` token for its description text

`Field`'s secondary description line was previously `text-hairline`, which resolved to `#1A1A1A` — basically invisible on black. Now it's `text-muted` (`#B3B3B3`), which actually reads. The hairline token stays scoped to borders / dividers as intended.
