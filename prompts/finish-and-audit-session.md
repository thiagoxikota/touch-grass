# Finish + Audit session — Touch Grass DS, Timeouts, portfolio

> Drop this into a fresh Claude Code session in `~/Documents/touch-grass`.
> Goal: close every loose end from the v1.0.0 launch and run a hard consistency
> audit across every surface that mentions Touch Grass or Timeouts.

---

## Part 0 — Where we left off

`@touch-grass-ds/tokens@1.0.0` and `@touch-grass-ds/react@1.0.0` are
published to npm. GitHub Releases exist for both. CI + Release workflows are
green on `main`. The docs site landing page advertises v1.0.0 with copy-paste
install instructions. NPM_TOKEN is in repo secrets. The repo is pinned on
the GitHub profile.

Recent commits to ground yourself:
- `922ac67` docs(site): wire 1.0.0 install instructions on Index hero
- `e988dc7` ci(release): unblock CI + tag pushes after 1.0.0 publish
- `b78ad2e` ci(release): wire changesets/action for safe auto-publish

Memory index lives at `/Users/thiagoxikota/.claude/projects/-Users-thiagoxikota-Documents-touch-grass/memory/`.
Read it first.

---

## Part 1 — Working-tree triage (do this before anything else)

There are 11+ uncommitted files sitting in the working tree from prior
sessions. They were deliberately left alone during the 1.0.0 launch because
they were unrelated to CI work and needed individual review. Now they need
homes.

Run `git status --short` and for each modified file, decide one of:
1. **Commit** — if the change is finished and adds value
2. **Revert** — if it's experimental rot and HEAD is the truth
3. **Stash with a label** — if it's real but needs a dedicated session

Specifically the known items:

- **`packages/tokens/src/color.json`** has uncommitted changes: adds a `muted`
  color (`#B3B3B3`) and renames `bgAlt → bg-alt`. The rename is a **breaking
  change** for any code that imports `bgAlt`. Decision needed:
  - Ship `muted` in v1.1.0 as a `minor` changeset? (Probably yes — it's a
    pure addition, no breakage.)
  - Ship the `bgAlt → bg-alt` rename? If yes, it's a `major` (v2.0.0) because
    consumers' code breaks. If you ship it as minor it'll silently break
    anyone who upgraded. **Do not ship the rename without a changeset that
    flags it as breaking and a migration note.**
- **`packages/tokens/Sources/TouchGrassTokens/TouchGrassTokens.swift`** —
  this is auto-generated. Check if it's stale vs. the current `color.json`
  source. If stale, regenerate via the build pipeline rather than editing.
- **`packages/eslint-plugin-touch-grass/`** — `index.js` and `package.json`
  modified. Currently `private: true`. Decide: rename to
  `@touch-grass-ds/eslint-plugin`, add README, ship in v1.1.0? Or keep
  private until brutalist rules are stable?
- **`packages/ds/src/primitives/{Badge,Button,Checkbox}.tsx`** and
  **`packages/ds/src/patterns/{Field,PatternInterruptModal}.tsx`** —
  read each diff, figure out what was being attempted, finish or revert.
- **`packages/ds/package.json`** and root **`.gitignore`** — small, just
  decide and commit.
- **`prompts/finish-session.md`** — untracked, decide if it's still relevant.

Once everything has a home, working tree should be clean.

---

## Part 2 — Unfinished tasks from the launch session

### 2.1 Trigger timeouts.app re-deploy
The docs site code on `main` includes the new INSTALL section and v1.0.0
hero, but the live site at `timeouts.app` may not have picked it up. Find
how it deploys (`grep -r "deploy\|netlify\|vercel" .github/ packages/docs-site/`)
and either confirm auto-deploy fired, or trigger one manually. Verify by
fetching `https://timeouts.app` and grep for `v1.0.0` or `INSTALL`.

### 2.2 Switch component perceptibility (memory #5880)
Read `packages/ds/src/primitives/Switch.tsx` and the test. Current state:
- OFF: white thumb on black track → fine
- ON: lime thumb on lime border → **invisible without position**

Tests pass because axe doesn't measure same-color UI elements. This is a
real perceptibility issue that should be fixed before v1.1.0. Two options:
- **A**: Keep checked thumb white (white on lime is high contrast)
- **B**: Make checked thumb black (black on lime is also high contrast and
  more brutalist)

Recommend B (more on-brand). Make the change, update the test if needed,
add a changeset.

### 2.3 LinkedIn launch post
Draft is at `prompts/launch-post-linkedin.md`. User said "no need to post
now" — leave it alone unless explicitly asked. Just confirm it still exists
and the version/install command in it match reality.

### 2.4 Node 20 deprecation in GitHub Actions
Both `ci.yml` and `release.yml` use `actions/checkout@v4` and
`actions/setup-node@v4` which run on Node 20 (deprecated Sep 2026). Bump
to `@v5` for both. Trivial change, separate small commit. Verify CI green
after.

### 2.5 Tooling debt
- `~/.claude/scripts/groq.py` has a circular import bug (script named
  `groq.py` shadows the `groq` package). Either rename the script or fix
  the import. Verify with: `python3 ~/.claude/scripts/groq.py "test"`
- `~/.claude/scripts/gemini.py` hit free-tier quota — note this in user
  memory so future sessions know to fall back to groq once it's fixed.

---

## Part 3 — Consistency audit (the main event)

Touch Grass DS, Timeouts, the GitHub repo, the Figma file, and the portfolio
case study all describe the **same product**. They drift independently. Your
job is to find every inconsistency and produce a punch list before fixing
anything. **Do not start fixing until the audit is complete and the user
has approved the punch list** — some "inconsistencies" are intentional (e.g.,
Portuguese vs. English copy by audience).

### 3.1 Sources to cross-reference

| Source | Where | What to extract |
|---|---|---|
| **npm** | `npmjs.com/package/@touch-grass-ds/{tokens,react}` | Version, README content, exported API |
| **GitHub repo** | `github.com/thiagoxikota/touch-grass` | Top-level README, repo description, topics, pinned status |
| **GitHub Releases** | `gh release list` | Tag versions, release note copy |
| **Docs site code** | `packages/docs-site/src/pages/Index.tsx` + every primitive/pattern page | Version eyebrow, hero copy, install command, component counts, tenets |
| **Docs site live** | `https://timeouts.app` | Same as above, after deploy |
| **Token files** | `packages/tokens/src/*.json` | Color values, scale, naming |
| **Token outputs** | `packages/tokens/dist/` (regenerate fresh) | CSS, Tailwind theme, Figma JSON, Swift |
| **DS source** | `packages/ds/src/{primitives,patterns}/` | Actual exported primitives/patterns count |
| **Brand kit** | `BRAND.md`, `brand/timeouts/` | Brand names, taglines, logo files |
| **Figma file** | DS file key in memory `touch-grass-figma-bridge` | Pages, component count, version label, variable values |
| **Portfolio case study** | `meu-portfolio` repo, `src/data/projects.ts`, `src/locales/{en,pt}/translation.json` | Project description, metrics, links, screenshots |
| **Portfolio live** | `https://thiagoxikota.com/blog/construindo-touch-grass-com-claude-code` | Same as above |
| **Memory index** | `~/.claude/projects/.../memory/MEMORY.md` | What we believe is true |
| **Linkedin draft** | `prompts/launch-post-linkedin.md` | Hand-written copy |

### 3.2 Audit checklist — find every drift

For each row below, list every place where the value appears, then flag any
mismatches. **One row → one table in your audit report.**

1. **Version number.** `v1.0.0` is the truth. Where does anything still say
   `v0.1.x` or `v0.2.x`? Search: `git grep -E "v?[01]\.[0-9]+\.[0-9]+"`
2. **Package names.** `@touch-grass-ds/tokens`, `@touch-grass-ds/react`.
   Anywhere still saying `@touch-grass/*` or `touch-grass-react`?
3. **Component counts.** Index page says "10 PRIMITIVES, 08 PATTERNS, 17
   VITEST SUITES". Count actual files in `packages/ds/src/primitives/`,
   `packages/ds/src/patterns/`, and `packages/ds/tests/`. Update the page
   if reality has moved.
4. **Color values.** `danger` is `#FF6B6B` (what shipped to npm 1.0.0). Is
   that what `color.json`, `tokens.css`, `TouchGrassTokens.swift`, the Figma
   variables, and the docs site all show?
5. **The five tenets / manifesto.** Index page lists 5 laws. Do they match
   what's in `BRAND.md`, the Figma cover page, and the README?
6. **Tagline + product framing.** "Brutalist design system. Zero rounded
   corners, zero motion, zero hex codes, zero grey text." Is the wording
   identical across README, Index hero, GitHub repo description, Figma cover,
   portfolio case, and the LinkedIn draft? Decide on a canonical phrasing
   and propagate it.
7. **Timeouts framing.** Per memory `project_timeouts_core_concept.md`:
   "social gym for time off the phone. Strava/gym-rats for time OFF the
   phone. NOT a focus timer. NEVER frame as 'earn screen time' or 'block
   apps'." Search every source for "focus timer", "screen time", "block
   apps", "earn screen time", "screen time blocker" — flag every occurrence
   that uses the wrong framing.
8. **Repo separation.** Per memory `project_timeouts_product.md` and
   `project_repo_strategy.md`: touch-grass is the OSS DS, Timeouts is the
   product, they're separate concerns. Anywhere the docs/portfolio conflate
   them ("Touch Grass is an app", "Timeouts is a design system") needs
   fixing.
9. **Tokens absolute rule.** Per memory `feedback_ds_tokens_absolute.md`:
   every color/spacing in code or assets must be `var(--*)` token, SVGs use
   `currentColor`. Search `git grep -E "#[0-9a-fA-F]{3,6}"` in
   `packages/ds/src/`, `packages/docs-site/src/`, and `brand/`. Any literal
   hex outside `packages/tokens/src/` is a violation. Run `pnpm lint:brutal`
   to confirm.
10. **Repo description + topics on GitHub.** `gh repo view --json
    description,topics`. Should mention "brutalist", "design system",
    "react", "open source", and link Timeouts. Update via `gh repo edit` if
    drifted.
11. **GitHub README.** `cat README.md` (or wherever it lives). Does it
    advertise v1.0.0, link npm, link the docs site, link Timeouts, show
    the install command, and show a hero screenshot? Cross-check against
    docs site Index.
12. **Portfolio case study metrics.** Per memory `#5908`, the portfolio
    case study at `meu-portfolio/src/data/projects.ts` was updated with
    "final metrics" today. Open it and confirm the metrics still match
    reality (component counts, version, ship date). Same for the i18n
    strings in `src/locales/{en,pt}/translation.json`.
13. **Figma file health.** Per memory `touch-grass-figma-bridge`:
    - File should be named "Touch Grass DS — v1.0.0" (was "Untitled" — user
      may have renamed manually by now, verify)
    - Cover page (00 COVER) should show v1.0.0
    - GETTING STARTED page (01) should show the npm install command
    - Variables should match the published 1.0.0 token values exactly
    - Component count on cover should match reality
    Use the `figma-use` skill (mandatory before any `use_figma` call) to
    inspect.
14. **Screenshot freshness.** Per memory `#5905`, there's a screenshot script
    at `packages/docs-site/scripts/docs-screenshots.mjs`. Run it. Compare
    output against any screenshots referenced in README, portfolio case,
    or Figma cover. Flag stale ones.
15. **Brand assets.** `BRAND.md` and `brand/timeouts/`. Are the logo files
    there token-compliant (`currentColor`, no inline hex)? Are the favicons
    + OG images current with v1.0.0 branding? Per memory
    `touch-grass-brand-asset`.
16. **Cross-links.** Every source that mentions Touch Grass should link to
    the npm package. Every source that mentions Timeouts should link to
    timeouts.app. Every README/cover/case should link to the GitHub repo.
    Build a link matrix: rows = sources, columns = npm/repo/docs/portfolio,
    fill in missing.

### 3.3 Output format for the audit

Produce a markdown report with these sections:

```
# Consistency Audit — touch-grass v1.0.0
## 1. Critical drifts (fix before any new work)
## 2. Cosmetic drifts (fix in this session)
## 3. Decisions needed (user must choose)
## 4. Already consistent (sanity-check column)
## 5. Suggested fix order
```

For each drift, give:
- **Where** — file:line or source URL
- **Says** — the current value
- **Should say** — the canonical value
- **Why** — which source is the truth and why
- **Risk** — what breaks if not fixed

**Stop here and present the report. Do not start fixing until the user
approves the punch list.** Some drifts are intentional and you cannot tell
which ones until you ask.

---

## Part 4 — After approval, the fix pass

Once the user signs off on the punch list:

1. Group fixes by surface (one commit per surface — tokens, ds, docs-site,
   repo settings, Figma, portfolio).
2. For each group: fix → verify locally (`pnpm lint:brutal`, `pnpm -r test`,
   `pnpm -r build`) → commit with a message that links the audit item
   numbers.
3. For Figma changes: use `figma-use` skill first (mandatory).
4. For portfolio changes: those live in the `meu-portfolio` repo, not this
   one — `cd` there, make changes, separate commit + push.
5. After all surfaces are fixed: re-run the audit pass to confirm zero
   drift remaining.
6. Final commit: bump CHANGELOG, write a changeset for any token or DS
   changes, and decide if this warrants a v1.0.1 patch publish.

---

## Part 5 — Constraints (read these before starting)

- **Do not invent values.** If a number, version, or color value isn't in
  one of the sources, ask. Don't make one up to "be consistent".
- **Memory may be stale.** Always verify file paths and current values
  before recommending. The memory snapshot is from earlier today but the
  working tree has moved.
- **The user prefers terse, direct responses.** No preamble, no
  "Here's what I'm going to do", no trailing summaries unless asked.
- **No emojis.** Anywhere.
- **The bg-alt rename is a trap.** If you find it during the audit and
  someone wants to "just fix it everywhere", that's a breaking change
  that needs a major version bump, not a patch. Flag it loud.
- **The published 1.0.0 packages on npm are the immovable truth.** If git
  has drifted from what's published, git is wrong, not npm. Anyone who ran
  `pnpm add @touch-grass-ds/react` today has the npm version on disk.
- **Use the `superpowers:systematic-debugging` skill** if anything weird
  comes up (silent file rewrites, ghost edits, tool failures). Don't
  retry the same thing hoping it works.
- **Use the `superpowers:verification-before-completion` skill** before
  claiming any fix is done. Run the verification command, look at the
  output, then claim success.

---

## Part 6 — Definition of done

Session is done when:
- [ ] Working tree is clean (every modified file has been committed or
  reverted with intent)
- [ ] The unfinished tasks in Part 2 are each either resolved or moved to
  a dated next-session prompt
- [ ] Every drift in the Part 3 audit is either fixed, intentionally
  accepted (with a one-line note in MEMORY.md saying why), or scheduled
  for a separate session
- [ ] `pnpm lint:brutal` passes
- [ ] `pnpm -r test` passes
- [ ] `pnpm -r build` passes
- [ ] Both CI and Release workflows are green on the latest commit
- [ ] timeouts.app live HTML matches `packages/docs-site/src/pages/Index.tsx`
- [ ] Memory index has been updated with anything surprising or
  non-obvious learned during the audit

Everything else is scope creep. End the session.
