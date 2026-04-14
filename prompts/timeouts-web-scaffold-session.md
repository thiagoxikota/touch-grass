# timeouts.app landing scaffold — ready to paste

Paste this into a fresh Claude Code session running in `~/Documents/timeouts-web`.
The repo is currently **empty** — only a `.git/` folder exists. This session
creates the entire landing from scratch.

---

## The task

Build the `timeouts.app` landing page from zero using Astro + Tailwind v4 +
Islands, consuming `@touch-grass-ds/react` via a build-time pinned version. Dark mode
only. Every component rendered live (not as image). Brutalist to the bone.

## Non-negotiable: read BRAND.md first

The Touch Grass DS repo at `~/Documents/touch-grass/BRAND.md` is the single
source of truth for every visual decision. Read it before touching a file.
Specifically §5.2 (the contract for this exact landing) defines the 8 sections
and the order they must appear in. Do not invent sections. Do not reorder.

Also read `~/Documents/touch-grass/packages/ds/src/index.ts` to see the
available component exports so you know what you can consume.

## Load skills before any edit

1. `emil-design-eng` — for polish, density, and non-motion interaction patterns.
2. `frontend-design:frontend-design` — for the general "build distinctive
   production-grade frontend" workflow.
3. `adapt` — for responsive end-to-end work across 390/768/1440.
4. `harden` — for i18n, error states, text overflow, edge cases.
5. `polish` — for the final pass before each commit.
6. `a11y-audit` — run per section before committing it.

Load each one up front, even the ones you think you won't need. It's cheaper
to have them resident than to reload.

## Stack

- **Astro 4+** — islands architecture, zero JS by default
- **Tailwind v4** — via `@astrojs/tailwind` or the vite plugin
- **`@touch-grass-ds/react`** — imported as build-time dependency, pinned to `v0.1.2`
- **React 19** — only for the islands that need the DS components
- **`@touch-grass-ds/tokens`** — CSS variables + Tailwind theme extension
- **TypeScript** — strict mode on
- **Cloudflare Pages** — deploy target, wrangler.toml from the start
- **No animation libraries.** No framer-motion, no GSAP, no AOS. The DS forbids
  motion — don't bring it back through a third-party.

## Initialize

```bash
# inside ~/Documents/timeouts-web
pnpm create astro@latest . --template minimal --typescript strict --no-install --no-git
pnpm add astro @astrojs/react @astrojs/tailwind tailwindcss @tailwindcss/vite
pnpm add react@19 react-dom@19
pnpm add @touch-grass-ds/react@0.1.2 @touch-grass-ds/tokens@0.1.2
pnpm add -D @types/react @types/react-dom
```

Then configure `astro.config.mjs` with the React + Tailwind integrations, set
`output: 'static'`, and configure `@touch-grass-ds/react/styles/base.css` to be
imported globally from `src/styles/global.css`.

## Sections — in this order (BRAND.md §5.2)

Each section lives in its own `.astro` file under `src/components/sections/`
so we can commit per section and review independently.

### 1. Hero

- A live-updating dominant number: "community minutes touched today", counted
  since midnight São Paulo time. Mock the number for now with a client-side
  interval (islands), but render it with the `<Stat>` primitive from the DS.
- H1 in `display` (56px+): tese do produto em 3 linhas.
- Eyebrow mono above.
- Primary CTA (Button primary): "JOIN WAITLIST".
- Secondary CTA (Button ghost): "BROWSE DS" → links to `timeouts.app/touch-grass`.
- No hero image — the number **is** the hero.

### 2. Manifesto

Five tenets, visually distinct from each other. Use the pattern from the docs
home page (`packages/docs-site/src/pages/Index.tsx` MANIFESTO array) as a
template, but rewrite the copy in Portuguese for the Brazilian launch:

1. Não é focus timer. É academia social pra tempo fora do celular.
2. Prova por foto, não por honra.
3. Leaderboard com seus amigos, não com desconhecidos.
4. AI coach que olha seus padrões, não que te envergonha.
5. Open source, brutalist, e deliberately offline.

### 3. Live component demo

Two-column layout: `<LeaderboardRow>` com 5 linhas reais mockadas (usa os
nomes do docs home) ao lado de `<FocusTimerDisplay>` com contagem live.

### 4. How it works

Three iOS mockups. Since you don't have the actual iOS screens yet, use
brutalist ASCII-art-ish wireframes built from DS primitives (Card + Stat +
Button + divider). Annotate each with a short mono label on the side.

### 5. Social proof

Grid de `<BeRealStamp>`. Sem fotos reais ainda — placeholders honestos com
`// PHOTO PLACEHOLDER` no lugar, data real (`2026-04-13 19:42`), horas
variadas. Ao redor, 2-3 quotes de desenvolvedores / designers que poderiam
estar na waitlist (placeholder curation; leave `TODO: real quotes` comment).

### 6. Leaderboard mockado ao vivo

Uma tabela completa usando `<LeaderboardRow>` em ordem descendente. Cinco a
oito linhas. Uma delas com variant `you` destacando o visitante simulado.

### 7. AI coach feature

Uma única `<Card>` grande com:
- Eyebrow "// AI COACH"
- Exemplo real de prompt entrada → resposta do coach
- `<Button>` "VER EXEMPLO COMPLETO" que abre um segundo card com mais conteúdo
  (sem modal — inline expansion, zero motion).

### 8. Dual CTA

Lado a lado:
- App Store badge (SVG estático, brutalizado pra caber no sistema)
- Newsletter form usando `<Input>` + `<Button>` do DS, com honeypot e validação
  de email client-side. POST target: um endpoint no Cloudflare Workers (pode
  ser TODO por enquanto).

### 9. Footer brutalista denso

Quatro colunas, mesmo padrão do footer do docs-site (`Shell.tsx`):
- PRODUTO: Features, Waitlist, Roadmap
- RECURSOS: Docs (→ timeouts.app/touch-grass), Changelog, Status
- EMPRESA: Manifesto, Privacidade, Termos
- SOCIAL: Twitter, LinkedIn, Instagram

## Commit strategy

- One commit per section. Nine commits total (hero → footer). Plus one initial
  scaffold commit at the start.
- Each commit includes: the new section file, the addition to `index.astro`,
  the updated types, and the playwright validation screenshot under
  `.github/assets/sections/<N>-<name>.png`.
- Run `pnpm build` before each commit. Fix errors, don't commit if it's red.

## Validation per section

Before committing any section:

1. Run `pnpm dev`.
2. Use playwright to screenshot the section at 390, 768, 1440. Save under
   `.github/assets/sections/`.
3. Run `a11y-audit` skill on the route. Must be WCAG AA clean.
4. Check horizontal scroll at 390 — if any, fix before commit.
5. Open in the browser and scroll. Does it feel intentional, dense, branded?
   If not, iterate before commit.

## Final pass

After section 9 is in:

1. Run the `polish` skill for micro-spacing and alignment fixes.
2. Run the `harden` skill for i18n placeholders, overflow, empty states.
3. Run `a11y-audit` on the full landing one more time.
4. Create `wrangler.toml` for Cloudflare Pages deploy.
5. Push to a new branch `initial-scaffold`. Don't merge to main — open a PR so
   I can review before deploy.

## Rules of engagement

- **Tokens only.** Zero hex values in any file. If you need a color that isn't
  a token, add the token to the Touch Grass repo first, release, and consume.
- **Zero radius.** If you catch yourself writing `rounded-*`, stop and revert.
- **Zero motion.** No `transition-*`, no `animate-*`, no `data-motion`.
- **Dark mode only.** Don't add a light theme toggle. That's §1 of BRAND.md.
- **Copy is PT-BR.** User-facing strings in Portuguese. Mono labels stay in
  uppercase English (see BRAND.md §3 — that's the signature).
- **No `lorem ipsum`.** If you don't know what to put, put a real placeholder
  that admits it's a placeholder.
- **No fake testimonials.** Either real quotes with permission or clear
  "Coming soon" states.

## Deliverables to report back

- Branch name + PR URL (do not merge).
- Screenshot grid of all 9 sections at 3 viewports (27 images).
- a11y audit report (JSON + summary).
- List of any known issues or TODOs remaining.
- Bundle size report from `pnpm build`.
