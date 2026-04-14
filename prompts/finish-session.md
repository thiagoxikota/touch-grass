# Finish the Touch Grass + Timeouts + Portfolio session

Paste this into a **fresh Claude Code session** running in `~/Documents/touch-grass`.
The previous session did the heavy design/refactor work. This session finishes
deployment, fixes the last ugly landing, and verifies every surface is live.

---

## Current state (read this first)

### What's done and already committed

- `BRAND.md` at repo root — the kit de consistência. Read §1 (six laws),
  §2 (tokens), §3 (voice), §5 (surface contracts) before touching anything.
- 26 docs-site pages refactored onto a shared `DocPage` template
  (`packages/docs-site/src/ui/DocPage.tsx`) — 9 foundations, 10 primitives,
  7 patterns, Home.
- `packages/docs-site/scripts/docs-screenshots.mjs` — playwright script that
  captures 81 PNGs across 27 pages × 3 viewports. Already committed with the
  current artifacts in `packages/docs-site/.github/assets/docs-v2/`.
- `packages/docs-site/scripts/a11y-audit.mjs` — axe-core + playwright audit.
  **Current state: 27 pages, 0 violations, 687 passes** (WCAG AA clean).
  Report at `packages/docs-site/.github/assets/a11y/report.json`.
- Package rename + v1.0.0 release done by another agent:
  - `@touch-grass-ds/tokens@1.0.0`
  - `@touch-grass-ds/react@1.0.0` (was `@touch-grass/ds`)
- Two ready-to-paste prompts for the heavier interactive work:
  - `prompts/figma-sync-session.md` — Figma DS file sync (variables, components,
    Code Connect)
  - `prompts/timeouts-web-scaffold-session.md` — Astro landing scaffold (only
    relevant if you decide to build a separate landing; see task 3 below)

### What's committed locally but NOT pushed yet

In the `touch-grass` repo, `git log --oneline main..origin/main` shows **4
local-only commits** ahead of origin:

```
7183a31 chore(docs-site): add screenshot + a11y audit scripts + session prompts
9f3f2b3 feat(docs-site): finish DocPage template + BRAND kit de consistência
e7485c0 chore(release): version tokens and react at 1.0.0
c41264e chore: rename packages to @touch-grass-ds scope for first npm release
```

**Until these are pushed, the live `timeouts.app/touch-grass` site still shows
the PRE-REFRESH docs.** That is the primary reason the user thinks it's "feio".
The new version is committed locally but not deployed.

### What's staged but NOT committed (portfolio)

In `~/Documents/meu-portfolio` the Touch Grass case study work is staged but
the pre-commit hook (`husky → lint-staged`) was failing because
`node_modules/lint-staged` was broken. A background `npm install` completed
successfully, so the hook should work now on retry. Staged files:

- `src/pages/projects/touch-grass.tsx` — detail page (new)
- `src/content/posts/construindo-touch-grass-com-claude-code.mdx` — long-form
  PT-BR case study (new, ~2,300 words)
- `src/data/projects.ts` — `touch-grass` entry flagged `featured: true`
- `src/locales/{pt,en}/translation.json` — `projects.items.touch-grass.*` keys
  (blocks for `touch-grass` only; other parallel diffs in these files come from
  unrelated "book" page work already in the working tree)
- `public/assets/projects/touch-grass/*.png` — 11 hero screenshots (home,
  button, color, typography, leaderboard, focus-timer, bereal, stat, motion,
  interrupt, input)

### Parallel work that is NOT yours — do NOT touch

Another agent is actively working on these paths. Leave them alone in all
diffs, commits, and edits:

- `packages/ds/src/primitives/*.tsx` (Button, Badge, Checkbox, etc.)
- `packages/ds/src/patterns/*.tsx` (Field, PatternInterruptModal, etc.)
- `packages/ds/package.json`
- `packages/tokens/**`
- `packages/eslint-plugin-touch-grass/**`
- `pnpm-lock.yaml`

If you see uncommitted changes in any of those, stash or ignore — they are not
yours to commit.

---

## Known-live URLs and their sources

| URL | What it is | Source repo (known?) |
|---|---|---|
| `https://timeouts.app/touch-grass` | Docs-site — the 26 refined pages live here once you push the 4 pending commits. | `~/Documents/touch-grass/packages/docs-site` |
| `https://timeouts.app/` (root) | Product landing with nav, hero, how-it-works, AI coach, open-source sections. User says it's "feio". **Source location unknown to us.** | **Unknown — you must find it. See task 3.** |
| `https://thiagoxikota.com/projects/touch-grass` | Portfolio detail page. Goes live once you commit + push the staged portfolio work. | `~/Documents/meu-portfolio` |
| `https://thiagoxikota.com/blog/construindo-touch-grass-com-claude-code` | MDX case study. Goes live with the same portfolio push. | `~/Documents/meu-portfolio` |

---

## The tasks — do them in this order

### Task 0 — Skill load-out

Before touching anything, load these skills:

1. `using-superpowers` (always, establishes baseline)
2. `emil-design-eng` (for any visual polish on the landing in task 3)
3. `a11y-audit` (for verification after every deploy-affecting change)
4. `touch-grass-figma-bridge` (only if you proceed with task 5)
5. `figma-use` (only if you proceed with task 5; mandatory prereq for `use_figma`)

### Task 1 — Finish the portfolio commit and push (unblocked now)

```bash
cd ~/Documents/meu-portfolio
git status --short | grep -E "(touch-grass|construindo-touch-grass|translation\.json|projects\.ts)"
```

Verify the staged files match the list above under "What's staged but NOT
committed". Then commit with the message already drafted:

```bash
git commit -m "feat(projects): add Touch Grass case study — detail page, MDX, i18n, assets

Adds the full case study for the Touch Grass DS project:

- src/pages/projects/touch-grass.tsx: detail page with ProjectHero,
  ProjectOverview, ImageGalleryGrid (10 images), LearningsSection,
  OtherProjectsLinks, ImageLightbox with Escape key handler. Full
  SEO: OG meta, Twitter card, CreativeWork JSON-LD including
  codeRepository + license + inLanguage, BreadcrumbList JSON-LD.
- src/content/posts/construindo-touch-grass-com-claude-code.mdx:
  long-form PT-BR case study walking through the brainstorm to plan
  to TDD to code review loop, skills, persistent memory, parallel
  subagents, and what product design continues to mean with AI.
- src/data/projects.ts: touch-grass entry flagged featured, with
  honest metrics (48h / 18 primitives+patterns / 4 platforms).
- src/locales/{pt,en}/translation.json: projects.items.touch-grass.*
  keys for title, role, description, challenge, solution, results,
  learning in PT and EN.
- public/assets/projects/touch-grass/*.png: 11 hero screenshots
  captured from the docs-site at 1440px dark mode.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

If the hook still fails:

1. **Do not** use `--no-verify` (forbidden unless the user explicitly asks).
2. Investigate: `cat node_modules/.bin/lint-staged | head -3` (should be a node
   shebang and a JS import). If it's broken, `rm -rf node_modules package-lock.json && npm install`
   and retry. Report the root cause in the final summary.

Then:

```bash
git push origin main
```

Wait for the deploy (Vercel or whatever the portfolio uses — check `vercel.json`,
`netlify.toml`, or the deploy URL in `next.config.js`). Verify
`https://thiagoxikota.com/projects/touch-grass` loads the new detail page and
`https://thiagoxikota.com/blog/construindo-touch-grass-com-claude-code` renders
the MDX.

### Task 2 — Push the 4 touch-grass commits so docs goes live

```bash
cd ~/Documents/touch-grass
git log --oneline main..@{u} 2>/dev/null; git log --oneline @{u}..main
git push origin main
```

The commits from `c41264e` onward carry the package rename, the v1.0.0 release,
BRAND.md, the shared DocPage template, and the a11y/screenshot scripts.

After the push, watch the deploy target. The docs-site likely ships from a
workflow at `.github/workflows/` — inspect it so you know how to track the
build. Typical Cloudflare Pages deploy takes 60–120s.

Verify `https://timeouts.app/touch-grass` once it's rebuilt:

1. Home has the hero `BRUTALIST. NO MERCY. TOUCH GRASS.` and a stats grid with
   `10 / 08 / 07 / 17`.
2. Sidebar shows counts per section: `// FOUNDATIONS 10`, `// PRIMITIVES 10`,
   `// PATTERNS 07`.
3. Border-left accent shows on the active nav item.
4. Footer is a 4-column dense grid (DS / Product / Repo / Author) + copyright.
5. Open `/foundations/color` — swatches should be copy-on-click with real
   contrast ratios. No color-contrast axe violations.
6. Open `/primitives/button` — variants × states matrix renders live buttons.

### Task 3 — Find and fix the `timeouts.app/` root landing

This is the fuzzy one. The user says `timeouts.app/` (the root, not
`/touch-grass`) is **feio** and wants it refreshed. We don't know where its
source lives. You must find it first.

**Discovery — try in this order:**

1. `find ~/Documents -maxdepth 3 -type d -name "*timeout*"`. Ignore
   `timeouts-web` (it's an empty git repo) and `timeouts-app` (iOS project).
   There may be a `timeouts-web-broken` — check if it has a full source tree
   now.
2. `grep -rln "JOIN THE WAITLIST\|Willpower fails" ~/Documents --include="*.{html,tsx,astro,vue,js,ts,md,mdx}" 2>/dev/null | head`
3. If neither works, check the deploy target: `curl -I https://timeouts.app/`
   and look at `x-served-by` / `server` / `cf-ray` headers. Cloudflare Pages
   usually means the source is in a GitHub repo connected to a project named
   similarly.
4. `gh api user/repos --jq '.[].full_name' | grep -i timeout` if the user has
   the `gh` CLI authenticated.
5. If all of the above fail, stop and ask the user: "Where does timeouts.app
   root deploy from? Repo URL or local path." Do not try to rebuild blind.

**Once the source is located:**

Read `BRAND.md` §5.2 (the contract for this exact landing) and compare it to
what's actually rendered at `https://timeouts.app/`. The user already has a
page with: nav, hero, how-it-works, "not a solo sport", AI coach, open-source.
That covers roughly sections 1, 2, 4, 5, 7 of the BRAND.md contract.

What's likely missing or wrong, based on the user's "feio" complaint:

- Density is too low — long copy blocks without intentional numbers or
  components nearby.
- No live component demo section — the landing should consume
  `@touch-grass-ds/react` and render `<LeaderboardRow>`, `<FocusTimerDisplay>`,
  `<Stat>`, `<BeRealStamp>` live. Not images.
- No live-updating hero number (community minutes touched today).
- Footer is probably thin compared to the 4-column dense grid in
  `packages/docs-site/src/layout/Shell.tsx` (use it as reference).
- Typography may only have 2 layers instead of the required 4
  (`stat`/`display` → `h1` → `label` eyebrow → `body`).
- Responsiveness untested at 390 / 768 / 1440.

**Fix it in place** (in whatever stack the existing landing uses — don't port
to Astro unless the user asks). For each change:

1. Use `emil-design-eng` skill before visual edits.
2. One commit per section. Never bundle 3 sections into one commit.
3. Before each commit: screenshot at 390 / 768 / 1440 via playwright, save
   under `.github/assets/landing-v2/<section>.png`, and run `a11y-audit` skill
   on the page. Must pass WCAG AA.
4. Do not introduce `rounded-*`, `transition-*`, `animate-*`, hex values, or
   any non-token color. If you catch yourself, revert.
5. Import DS components from `@touch-grass-ds/react@1.0.0`. If the landing
   isn't pinned yet, pin it.

Push when done. Verify live. Report screenshots.

### Task 4 — Verification pass across all surfaces

After tasks 1–3 are deployed, do one full sweep:

```bash
cd ~/Documents/touch-grass/packages/docs-site
BASE_URL=https://timeouts.app/touch-grass node scripts/a11y-audit.mjs
BASE_URL=https://timeouts.app/touch-grass node scripts/docs-screenshots.mjs
```

Then:

- Lighthouse mobile (Chrome DevTools) on `timeouts.app/`, `timeouts.app/touch-grass`,
  and `thiagoxikota.com/projects/touch-grass`. Record Performance, Accessibility,
  Best Practices, SEO scores. Flag anything below 90.
- Confirm the cross-link graph (BRAND.md §6) is complete:
  - docs footer → timeouts.app + GitHub + portfolio case study ✓ (already coded)
  - portfolio detail page → GitHub + docs + MDX ✓ (already coded)
  - landing → docs + GitHub + portfolio (task 3 must include this)
  - MDX case study → docs + landing + GitHub ✓ (already coded)

### Task 5 — OPTIONAL: Figma DS sync

Only proceed if tasks 1–4 are all green and the user has time/appetite. This
is a separate long workflow that needs the Figma MCP active.

Load `touch-grass-figma-bridge` + `figma-use` skills, then follow
`prompts/figma-sync-session.md` exactly. It's self-contained.

---

## Rules of engagement

- **Never** skip git hooks (`--no-verify`, `--no-gpg-sign`). If a hook fails,
  investigate root cause and fix it.
- **Never** commit changes to `packages/ds/**`, `packages/tokens/**`,
  `packages/eslint-plugin-touch-grass/**`, or `pnpm-lock.yaml` in this session.
  Another agent owns those.
- **Never** use em-dashes when a comma or period will do. Ban list: "leverage",
  "seamless", "delightful", "empower", "synergy". No emojis anywhere.
- **Never** invent metrics. Honest numbers only. If something isn't measurable,
  say so or omit it.
- Every new surface gets three viewport screenshots + a passing a11y audit
  BEFORE you commit. Evidence before assertion, always.
- One commit per logical change. Not "fix everything" bundles.
- Stop and ask only when genuinely stuck. The user says "faça o que achar melhor"
  — they want decisions made, not endless questions. But escalate if a
  destructive operation is on the table or if the timeouts.app root source
  can't be found.

## Deliverables to report back

At the end of the session, post a single summary with:

1. Commits created (SHAs + repos).
2. URLs verified live + their before/after screenshots at 1440.
3. `a11y-audit` result for each surface (pages / violations / passes).
4. Lighthouse scores for the three key URLs.
5. Any TODOs deferred to another session, with the reason.
6. The Figma sync status (done / skipped / deferred).
