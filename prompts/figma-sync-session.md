# Figma sync session — ready to paste

Paste this into a fresh Claude Code session running in `~/Documents/touch-grass`.
Assumes you have the `claude.ai Figma` MCP server connected and your Figma desktop
app open with the Touch Grass DS file.

---

## The task

Sync the Touch Grass Figma DS file to reflect the v0.1.2 state of the repo. The
React code is the source of truth; Figma is downstream and must match 1:1.

The code is in `packages/ds/src/` (10 primitives, 8 patterns). Tokens live in
`packages/tokens/src/*.json`. Brand assets live in `brand/touch-grass/*.svg`.
The approved kit-de-consistência lives in `/BRAND.md` at the repo root — read it
first if you need context on the six quality laws or any rule I don't spell out
below.

## Non-negotiable: load skills before any `use_figma` call

1. Run the `touch-grass-figma-bridge` skill. It encodes the file key, the
   variable-binding model, the `createComponent + combineAsVariants` pattern,
   the SVG import + recolor pipeline, the page-rail prefix-code convention, and
   every Plugin API limitation I've hit in the past.
2. Run the `figma-use` skill. **Mandatory prereq** — you MUST invoke it before
   every single `use_figma` tool call. Skipping it causes hard-to-debug failures.

Do not proceed to any Figma write action before both are loaded.

## What to sync — in order

### 1. Variables (tokens)

Open the DS Figma file. For every token in `packages/tokens/src/*.json`, create
or update a Figma variable with:

- The **same name** as the CSS variable (`--color-fg` → `color/fg`).
- The **same value**, converted to the Figma format.
- A `WEB` code syntax entry pointing to the CSS variable (`var(--color-fg)`).
- For colors, map both dark and light modes (dark is canonical — `color.json`
  for dark, `color-light.json` for light).
- Token categories to handle: `color`, `font` (family / size / weight / tracking),
  `space`, `border` (width / color / style) + `radius.none`, `breakpoint`,
  `motion` (duration / easing).

Before writing anything, dump the existing variables and diff against the JSON
so the sync is additive where possible, not destructive. Report the diff before
committing.

### 2. Foundation pages

The docs-site has 9 foundations pages. For each, ensure the Figma file has a
matching page under a prefix code (`F1/Color`, `F2/Typography`, etc.). Use the
foundation-page template from the `touch-grass-figma-bridge` skill.

Content source: read the corresponding React file in
`packages/docs-site/src/pages/foundations/*.tsx` — each one is structured as
DocPage + Section blocks with all the copy you need.

Pages to create/update:
- F1 Color
- F2 Typography
- F3 Spacing
- F4 Borders
- F5 Grid
- F6 Motion
- F7 States
- F8 Brand
- F9 Accessibility

### 3. Primitive components

For each primitive, create a Figma component with variants matching the React
variant API exactly. Bind every fill/stroke/text-color to the corresponding
variable. Add a `WEB` code syntax entry pointing to `<ComponentName />`.

Primitives:
- Button (variants: primary/ghost/danger × default/hover/focus/disabled/loading)
- Input (variants: text/numeric × default/focus/error/disabled)
- Badge (variants: earned/neutral/danger × sm/md)
- Card (variants: default/inset, optional header)
- Stat (variants: hero/inline × sm/md/lg/xl)
- Checkbox (variants: default/checked/disabled/error)
- Switch (variants: off/on/disabled)
- Tag (variants: default/active)
- Divider (variants: hairline/strong × horizontal/vertical)
- Timer (variants: static/live × sm/md/lg/xl)

Use `createComponent + combineAsVariants` from the skill. Do **not** create
a separate component per variant — one component with a variant property.

### 4. Pattern components

Build these as compound components instantiating the primitives above. Do not
rebuild primitive internals inside the pattern — always reference.

- LeaderboardRow (variants: default/top1/you)
- FocusTimerDisplay
- BeRealStamp
- PatternInterruptModal
- SessionSummaryCard
- Sparkline
- Toast (variants: default/danger/success)

### 5. Code Connect mappings

For the 5 hero components — Button, Stat, LeaderboardRow, FocusTimerDisplay,
BeRealStamp — add Code Connect mappings pointing to the corresponding React
components in `packages/ds/src/`. Use the `figma-code-connect-components` skill
to walk the add/map flow.

### 6. Cover page

Update the file's cover page (page 1) to feature the manifesto in 5 bullets
plus the 5 hero components rendered at scale. Use the cover template from
the `touch-grass-figma-bridge` skill.

## Verification

Before declaring the sync done:

1. Capture a screenshot of each page via `get_screenshot` and save under
   `.github/assets/figma-v2/<page-slug>.png`.
2. Diff the Figma variables against `packages/tokens/src/*.json` one more time.
3. List any component whose variant API in Figma does not match the React
   variant API — those are bugs.
4. Report all created/modified nodes with their node IDs so I can link to them
   from the docs-site's "View in Figma" cross-links.

## Rules of engagement

- Read-first. Dump current state before overwriting anything.
- Additive by default. If the sync is destructive (removing/renaming an
  existing variable or component), stop and ask me first.
- One logical change per transaction. Don't bundle variables + components +
  Code Connect into one giant commit.
- If the Plugin API hits a limitation documented in the
  `touch-grass-figma-bridge` skill (cross-page reactions, document rename,
  screenshot framing artifacts, font loading order), apply the documented
  workaround. Do not invent a new one.
- If anything isn't in BRAND.md or one of the skills above, stop and ask me.
  Don't improvise DS decisions.
