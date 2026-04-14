# Touch Grass DS — Foundations Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the monorepo, the token pipeline, and a runnable docs site that renders all Touch Grass DS foundations (color, type, spacing, borders, grid, motion-rules) — producing a working artifact you can open in a browser before any component code is written.

**Architecture:** pnpm workspace monorepo with three packages — `tokens` (Style Dictionary, source of truth), `ds` (React + Tailwind v4 component library, currently empty shell), `docs-site` (Vite + React showcase that consumes both). Tokens are JSON in `packages/tokens/src/`, build script generates `tokens.css` (CSS variables) + `tailwind.theme.css` (`@theme` block) + `figma-tokens.json` (for future Figma sync). The `ds` package re-exports `tokens.css` so any consumer gets the variables for free. The docs site imports `ds` and renders foundation pages.

**Tech Stack:** pnpm workspaces, TypeScript, Vite, React 19, Tailwind CSS v4, Style Dictionary 4, Geist + Geist Mono (via `@fontsource`), Vitest, Playwright (visual snapshots).

**Spec:** [docs/superpowers/specs/2026-04-13-touch-grass-ds-design.md](../specs/2026-04-13-touch-grass-ds-design.md)

---

## File Structure

```
touch-grass/
├── .gitignore
├── .nvmrc
├── package.json                              # workspace root
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── packages/
│   ├── tokens/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── color.json                    # 6 colors (4 fill + 2 structural)
│   │   │   ├── type.json                     # 11 sizes, 4 weights, 2 families
│   │   │   ├── space.json                    # 4px-base scale
│   │   │   ├── border.json                   # 5 border variants
│   │   │   ├── grid.json                     # 12/8/4 col + breakpoints
│   │   │   └── motion.json                   # zero-duration tokens
│   │   ├── build.ts                          # Style Dictionary entry
│   │   ├── dist/                             # generated, gitignored
│   │   │   ├── tokens.css
│   │   │   ├── tailwind.theme.css
│   │   │   └── figma-tokens.json
│   │   └── tests/
│   │       └── build.test.ts                 # asserts each output exists + contains key tokens
│   ├── ds/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── index.ts                      # re-exports tokens.css + future components
│   │   │   ├── styles/
│   │   │   │   ├── base.css                  # global resets, font loading, body bg
│   │   │   │   └── tailwind.css              # @import tailwindcss + @import theme
│   │   │   └── lib/
│   │   │       └── cn.ts                     # className merge helper
│   │   └── tests/
│   │       └── tokens-resolved.test.ts       # asserts CSS vars resolve in jsdom
│   └── docs-site/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── index.html
│       └── src/
│           ├── main.tsx
│           ├── App.tsx
│           ├── layout/
│           │   ├── Shell.tsx                 # left nav + content area
│           │   └── Nav.tsx
│           └── pages/
│               ├── Index.tsx                 # landing / what is Touch Grass
│               └── foundations/
│                   ├── Color.tsx
│                   ├── Typography.tsx
│                   ├── Spacing.tsx
│                   ├── Borders.tsx
│                   ├── Grid.tsx
│                   ├── Motion.tsx
│                   └── States.tsx            # focus / disabled / loading / empty rules
```

---

## Chunk 1: Repo + workspace bootstrap

### Task 0: Initialize git and workspace skeleton

**Files:**
- Create: `.gitignore`
- Create: `.nvmrc`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `README.md`

- [ ] **Step 0.1: Init git**

```bash
cd /Users/thiagoxikota/Documents/touch-grass
git init
git branch -M main
```

Expected: `Initialized empty Git repository in .../touch-grass/.git/`

- [ ] **Step 0.2: Write `.gitignore`**

```
node_modules/
dist/
.DS_Store
*.log
.vite/
.turbo/
coverage/
.superpowers/brainstorm/
```

- [ ] **Step 0.3: Write `.nvmrc`**

```
22
```

- [ ] **Step 0.4: Write root `package.json`**

```json
{
  "name": "touch-grass",
  "private": true,
  "version": "0.0.0",
  "packageManager": "pnpm@9.12.0",
  "engines": { "node": ">=22" },
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "dev": "pnpm --filter @touch-grass/docs-site dev",
    "tokens": "pnpm --filter @touch-grass/tokens build"
  },
  "devDependencies": {
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 0.5: Write `pnpm-workspace.yaml`**

```yaml
packages:
  - 'packages/*'
```

- [ ] **Step 0.6: Write `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "noUncheckedIndexedAccess": true
  }
}
```

- [ ] **Step 0.7: Write minimal `README.md`**

```markdown
# Touch Grass

Brutalist design system for Timeouts.

See [docs/superpowers/specs/2026-04-13-touch-grass-ds-design.md](docs/superpowers/specs/2026-04-13-touch-grass-ds-design.md).
```

- [ ] **Step 0.8: Install pnpm + run install**

```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
pnpm install
```

Expected: `Done in <1s` (no packages yet beyond root TS).

- [ ] **Step 0.9: Commit**

```bash
git add .gitignore .nvmrc package.json pnpm-workspace.yaml tsconfig.base.json README.md docs/
git commit -m "chore: init pnpm workspace + spec/plan docs"
```

---

## Chunk 2: Token package (source of truth)

### Task 1: Token JSON sources

**Files:**
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/tsconfig.json`
- Create: `packages/tokens/src/color.json`
- Create: `packages/tokens/src/type.json`
- Create: `packages/tokens/src/space.json`
- Create: `packages/tokens/src/border.json`
- Create: `packages/tokens/src/grid.json`
- Create: `packages/tokens/src/motion.json`

- [ ] **Step 1.1: Write `packages/tokens/package.json`**

```json
{
  "name": "@touch-grass/tokens",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "./dist/tokens.css",
  "exports": {
    "./css": "./dist/tokens.css",
    "./tailwind": "./dist/tailwind.theme.css",
    "./figma": "./dist/figma-tokens.json"
  },
  "scripts": {
    "build": "tsx build.ts",
    "test": "vitest run"
  },
  "devDependencies": {
    "style-dictionary": "^4.2.0",
    "tsx": "^4.19.0",
    "vitest": "^2.1.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 1.2: Write `packages/tokens/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["build.ts", "tests/**/*", "src/**/*.json"]
}
```

- [ ] **Step 1.3: Write `packages/tokens/src/color.json`**

```json
{
  "color": {
    "bg":       { "value": "#000000",  "type": "color", "comment": "Background. Pure black." },
    "fg":       { "value": "#FFFFFF",  "type": "color", "comment": "All text. Always." },
    "earned":   { "value": "#A6FF00",  "type": "color", "comment": "Earned/success/active. Bloomberg lime." },
    "danger":   { "value": "#FF3B3B",  "type": "color", "comment": "Danger/loss. WCAG AA on black at 16px+." },
    "hairline": { "value": "#1A1A1A",  "type": "color", "comment": "Border, divider. Never text." },
    "bgAlt":    { "value": "#0A0A0A",  "type": "color", "comment": "Inset surface. Never text." }
  }
}
```

- [ ] **Step 1.4: Write `packages/tokens/src/type.json`**

```json
{
  "font": {
    "family": {
      "sans": { "value": "Geist, ui-sans-serif, system-ui, sans-serif", "type": "fontFamily" },
      "mono": { "value": "'Geist Mono', ui-monospace, 'SF Mono', monospace", "type": "fontFamily" }
    },
    "weight": {
      "600": { "value": "600", "type": "fontWeight" },
      "700": { "value": "700", "type": "fontWeight" },
      "800": { "value": "800", "type": "fontWeight" },
      "900": { "value": "900", "type": "fontWeight" }
    },
    "size": {
      "statXl":   { "value": "96px", "type": "fontSize", "comment": "Reserved for full-bleed hero only" },
      "statLg":   { "value": "80px", "type": "fontSize", "comment": "Default stat hero with seconds" },
      "statMd":   { "value": "64px", "type": "fontSize", "comment": "Mobile stat hero" },
      "display":  { "value": "56px", "type": "fontSize" },
      "h1":       { "value": "32px", "type": "fontSize" },
      "h2":       { "value": "24px", "type": "fontSize" },
      "h3":       { "value": "18px", "type": "fontSize" },
      "body":     { "value": "16px", "type": "fontSize", "comment": "Body floor" },
      "label":    { "value": "13px", "type": "fontSize", "comment": "Label floor (mono, uppercase)" },
      "rowNum":   { "value": "22px", "type": "fontSize" },
      "rowName":  { "value": "18px", "type": "fontSize" }
    },
    "tracking": {
      "tight":  { "value": "-0.04em", "type": "letterSpacing" },
      "normal": { "value": "0",        "type": "letterSpacing" },
      "wide":   { "value": "0.12em",  "type": "letterSpacing", "comment": "All uppercase labels" }
    }
  }
}
```

- [ ] **Step 1.5: Write `packages/tokens/src/space.json`**

```json
{
  "space": {
    "0":   { "value": "0",     "type": "spacing" },
    "1":   { "value": "4px",   "type": "spacing" },
    "2":   { "value": "8px",   "type": "spacing" },
    "3":   { "value": "12px",  "type": "spacing" },
    "4":   { "value": "16px",  "type": "spacing" },
    "5":   { "value": "20px",  "type": "spacing" },
    "6":   { "value": "24px",  "type": "spacing" },
    "8":   { "value": "32px",  "type": "spacing" },
    "12":  { "value": "48px",  "type": "spacing" },
    "16":  { "value": "64px",  "type": "spacing" },
    "24":  { "value": "96px",  "type": "spacing" },
    "32":  { "value": "128px", "type": "spacing" }
  }
}
```

- [ ] **Step 1.6: Write `packages/tokens/src/border.json`**

```json
{
  "border": {
    "hairline": {
      "width": { "value": "1px",       "type": "borderWidth" },
      "color": { "value": "{color.hairline.value}", "type": "color" },
      "style": { "value": "solid",     "type": "borderStyle" }
    },
    "strong": {
      "width": { "value": "2px",       "type": "borderWidth" },
      "color": { "value": "{color.fg.value}", "type": "color" },
      "style": { "value": "solid",     "type": "borderStyle" }
    },
    "active": {
      "width": { "value": "2px",       "type": "borderWidth" },
      "color": { "value": "{color.earned.value}", "type": "color" },
      "style": { "value": "solid",     "type": "borderStyle" }
    },
    "danger": {
      "width": { "value": "2px",       "type": "borderWidth" },
      "color": { "value": "{color.danger.value}", "type": "color" },
      "style": { "value": "solid",     "type": "borderStyle" }
    },
    "disabled": {
      "width": { "value": "2px",       "type": "borderWidth" },
      "color": { "value": "{color.fg.value}", "type": "color" },
      "style": { "value": "dashed",    "type": "borderStyle" }
    }
  },
  "radius": {
    "none": { "value": "0", "type": "borderRadius", "comment": "Only radius. Never changes." }
  }
}
```

- [ ] **Step 1.7: Write `packages/tokens/src/grid.json`**

```json
{
  "breakpoint": {
    "mobile":  { "value": "0px",     "type": "size" },
    "tablet":  { "value": "768px",   "type": "size" },
    "desktop": { "value": "1024px",  "type": "size" }
  },
  "grid": {
    "mobile":  { "cols": 4,  "gutter": "8px",  "margin": "16px", "max": "100%" },
    "tablet":  { "cols": 8,  "gutter": "12px", "margin": "24px", "max": "100%" },
    "desktop": { "cols": 12, "gutter": "16px", "margin": "32px", "max": "1280px" }
  }
}
```

- [ ] **Step 1.8: Write `packages/tokens/src/motion.json`**

```json
{
  "motion": {
    "duration": {
      "instant": { "value": "0ms", "type": "duration", "comment": "The only duration. There is no other." }
    },
    "easing": {
      "none": { "value": "linear", "type": "cubicBezier" }
    }
  }
}
```

- [ ] **Step 1.9: Commit**

```bash
git add packages/tokens/
git commit -m "feat(tokens): add token JSON source files"
```

### Task 2: Build script + Style Dictionary config

**Files:**
- Create: `packages/tokens/build.ts`
- Create: `packages/tokens/tests/build.test.ts`

- [ ] **Step 2.1: Write the failing test FIRST**

`packages/tokens/tests/build.test.ts`:

```ts
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { build } from '../build';

const dist = join(__dirname, '..', 'dist');

describe('token build', () => {
  beforeAll(async () => {
    await build();
  });

  it('emits tokens.css with all six color variables', () => {
    const css = readFileSync(join(dist, 'tokens.css'), 'utf8');
    expect(css).toContain('--color-bg: #000000');
    expect(css).toContain('--color-fg: #FFFFFF');
    expect(css).toContain('--color-earned: #A6FF00');
    expect(css).toContain('--color-danger: #FF3B3B');
    expect(css).toContain('--color-hairline: #1A1A1A');
    expect(css).toContain('--color-bg-alt: #0A0A0A');
  });

  it('emits tokens.css with type scale', () => {
    const css = readFileSync(join(dist, 'tokens.css'), 'utf8');
    expect(css).toContain('--font-size-stat-lg: 80px');
    expect(css).toContain('--font-size-body: 16px');
    expect(css).toContain('--font-size-label: 13px');
  });

  it('emits tokens.css with spacing scale', () => {
    const css = readFileSync(join(dist, 'tokens.css'), 'utf8');
    expect(css).toContain('--space-1: 4px');
    expect(css).toContain('--space-32: 128px');
  });

  it('emits tailwind.theme.css with @theme block', () => {
    const css = readFileSync(join(dist, 'tailwind.theme.css'), 'utf8');
    expect(css).toContain('@theme {');
    expect(css).toContain('--color-earned: #A6FF00');
  });

  it('emits figma-tokens.json with W3C-format tokens', () => {
    expect(existsSync(join(dist, 'figma-tokens.json'))).toBe(true);
    const json = JSON.parse(readFileSync(join(dist, 'figma-tokens.json'), 'utf8'));
    expect(json.color.earned.$value).toBe('#A6FF00');
  });
});
```

- [ ] **Step 2.2: Run test — confirm it fails**

```bash
cd packages/tokens
pnpm install
pnpm test
```

Expected: FAIL — `Cannot find module '../build'`.

- [ ] **Step 2.3: Write `build.ts`**

```ts
import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function build() {
  const sd = new StyleDictionary({
    source: [join(__dirname, 'src/**/*.json')],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: join(__dirname, 'dist/'),
        files: [{
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root' }
        }]
      },
      tailwind: {
        transformGroup: 'css',
        buildPath: join(__dirname, 'dist/'),
        files: [{
          destination: 'tailwind.theme.css',
          format: 'css/variables',
          options: { selector: '@theme' }
        }]
      },
      figma: {
        transformGroup: 'js',
        buildPath: join(__dirname, 'dist/'),
        files: [{
          destination: 'figma-tokens.json',
          format: 'json/nested'
        }]
      }
    }
  });

  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}

// Run when invoked directly
if (import.meta.url === `file://${process.argv[1]}`) {
  build().then(() => console.log('✓ tokens built'));
}
```

- [ ] **Step 2.4: Run test — confirm it passes**

```bash
pnpm test
```

Expected: PASS — all 5 assertions green.

If the `figma-tokens.json` test fails because Style Dictionary v4 emits `value` not `$value`, add a custom format. Replace the figma platform with:

```ts
figma: {
  transformGroup: 'js',
  buildPath: join(__dirname, 'dist/'),
  files: [{
    destination: 'figma-tokens.json',
    format: 'json/w3c'
  }]
}
```

If `json/w3c` doesn't exist in your installed Style Dictionary version, register a custom format:

```ts
sd.registerFormat({
  name: 'json/w3c',
  format: ({ dictionary }) => {
    const out: Record<string, unknown> = {};
    for (const token of dictionary.allTokens) {
      let cursor = out;
      const path = token.path;
      for (let i = 0; i < path.length - 1; i++) {
        cursor[path[i]!] ??= {};
        cursor = cursor[path[i]!] as Record<string, unknown>;
      }
      cursor[path[path.length - 1]!] = { $value: token.value, $type: token.type };
    }
    return JSON.stringify(out, null, 2);
  }
});
```

Re-run `pnpm test` until green.

- [ ] **Step 2.5: Commit**

```bash
git add packages/tokens/build.ts packages/tokens/tests/
git commit -m "feat(tokens): add Style Dictionary build pipeline + tests"
```

---

## Chunk 3: DS package shell

### Task 3: DS package with token re-export + base CSS

**Files:**
- Create: `packages/ds/package.json`
- Create: `packages/ds/tsconfig.json`
- Create: `packages/ds/src/index.ts`
- Create: `packages/ds/src/styles/base.css`
- Create: `packages/ds/src/styles/tailwind.css`
- Create: `packages/ds/src/lib/cn.ts`
- Create: `packages/ds/tests/tokens-resolved.test.ts`

- [ ] **Step 3.1: Write `packages/ds/package.json`**

```json
{
  "name": "@touch-grass/ds",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./styles/base.css": "./src/styles/base.css",
    "./styles/tailwind.css": "./src/styles/tailwind.css",
    "./tokens.css": "./node_modules/@touch-grass/tokens/dist/tokens.css"
  },
  "scripts": {
    "build": "echo 'shell — no build yet'",
    "test": "vitest run"
  },
  "dependencies": {
    "@touch-grass/tokens": "workspace:*",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",
    "@fontsource/geist-sans": "^5.1.0",
    "@fontsource/geist-mono": "^5.1.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "vitest": "^2.1.0",
    "jsdom": "^25.0.0",
    "typescript": "^5.6.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

- [ ] **Step 3.2: Write `packages/ds/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*", "tests/**/*"]
}
```

- [ ] **Step 3.3: Write `packages/ds/src/lib/cn.ts`**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3.4: Write `packages/ds/src/styles/base.css`**

```css
@import '@fontsource/geist-sans/400.css';
@import '@fontsource/geist-sans/600.css';
@import '@fontsource/geist-sans/700.css';
@import '@fontsource/geist-sans/800.css';
@import '@fontsource/geist-sans/900.css';
@import '@fontsource/geist-mono/600.css';
@import '@fontsource/geist-mono/700.css';
@import '@fontsource/geist-mono/800.css';
@import '@fontsource/geist-mono/900.css';

@import '@touch-grass/tokens/css';

*, *::before, *::after {
  box-sizing: border-box;
  border-radius: 0 !important;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
  font-size: var(--font-size-body);
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

button { font: inherit; cursor: pointer; }
button:disabled { cursor: not-allowed; }

/* Hard halo focus — never glow */
:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 3px;
}

/* No motion. Ever. */
*, *::before, *::after {
  transition-duration: 0ms !important;
  animation-duration: 0ms !important;
}
```

- [ ] **Step 3.5: Write `packages/ds/src/styles/tailwind.css`**

```css
@import 'tailwindcss';
@import '@touch-grass/tokens/tailwind';
@import './base.css';
```

- [ ] **Step 3.6: Write `packages/ds/src/index.ts`**

```ts
export { cn } from './lib/cn';
// Components will be exported here as primitives are added in Plan 2.
```

- [ ] **Step 3.7: Write the failing token-resolution test**

`packages/ds/tests/tokens-resolved.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('ds token integration', () => {
  it('re-exports tokens.css from @touch-grass/tokens', () => {
    const tokensCss = readFileSync(
      resolve(__dirname, '../node_modules/@touch-grass/tokens/dist/tokens.css'),
      'utf8'
    );
    expect(tokensCss).toContain('--color-earned: #A6FF00');
  });

  it('base.css references tokens via var()', () => {
    const baseCss = readFileSync(
      resolve(__dirname, '../src/styles/base.css'),
      'utf8'
    );
    expect(baseCss).toContain('var(--color-bg)');
    expect(baseCss).toContain('var(--color-fg)');
  });

  it('base.css enforces zero radius globally', () => {
    const baseCss = readFileSync(
      resolve(__dirname, '../src/styles/base.css'),
      'utf8'
    );
    expect(baseCss).toContain('border-radius: 0 !important');
  });

  it('base.css kills all transitions', () => {
    const baseCss = readFileSync(
      resolve(__dirname, '../src/styles/base.css'),
      'utf8'
    );
    expect(baseCss).toContain('transition-duration: 0ms !important');
  });
});
```

- [ ] **Step 3.8: Install + build tokens + run test**

```bash
cd /Users/thiagoxikota/Documents/touch-grass
pnpm install
pnpm --filter @touch-grass/tokens build
pnpm --filter @touch-grass/ds test
```

Expected: PASS — all four assertions green.

- [ ] **Step 3.9: Commit**

```bash
git add packages/ds/
git commit -m "feat(ds): add package shell, base CSS, token integration tests"
```

---

## Chunk 4: Docs site with foundation pages

### Task 4: Vite + React docs site scaffold

**Files:**
- Create: `packages/docs-site/package.json`
- Create: `packages/docs-site/tsconfig.json`
- Create: `packages/docs-site/vite.config.ts`
- Create: `packages/docs-site/index.html`
- Create: `packages/docs-site/src/main.tsx`
- Create: `packages/docs-site/src/App.tsx`
- Create: `packages/docs-site/src/layout/Shell.tsx`
- Create: `packages/docs-site/src/layout/Nav.tsx`
- Create: `packages/docs-site/src/pages/Index.tsx`

- [ ] **Step 4.1: Write `packages/docs-site/package.json`**

```json
{
  "name": "@touch-grass/docs-site",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@touch-grass/ds": "workspace:*",
    "@touch-grass/tokens": "workspace:*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "vite": "^6.0.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 4.2: Write `packages/docs-site/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*", "vite.config.ts"]
}
```

- [ ] **Step 4.3: Write `packages/docs-site/vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, host: true }
});
```

- [ ] **Step 4.4: Write `packages/docs-site/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Touch Grass DS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4.5: Write `packages/docs-site/src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@touch-grass/ds/styles/tailwind.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

- [ ] **Step 4.6: Write `packages/docs-site/src/App.tsx`**

```tsx
import { Routes, Route } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { Index } from './pages/Index';
import { Color } from './pages/foundations/Color';
import { Typography } from './pages/foundations/Typography';
import { Spacing } from './pages/foundations/Spacing';
import { Borders } from './pages/foundations/Borders';
import { Grid } from './pages/foundations/Grid';
import { Motion } from './pages/foundations/Motion';
import { States } from './pages/foundations/States';

export function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/foundations/color" element={<Color />} />
        <Route path="/foundations/typography" element={<Typography />} />
        <Route path="/foundations/spacing" element={<Spacing />} />
        <Route path="/foundations/borders" element={<Borders />} />
        <Route path="/foundations/grid" element={<Grid />} />
        <Route path="/foundations/motion" element={<Motion />} />
        <Route path="/foundations/states" element={<States />} />
      </Routes>
    </Shell>
  );
}
```

- [ ] **Step 4.7: Write `packages/docs-site/src/layout/Nav.tsx`**

```tsx
import { NavLink } from 'react-router-dom';

const items = [
  { label: 'OVERVIEW',  href: '/' },
  { label: 'COLOR',     href: '/foundations/color' },
  { label: 'TYPE',      href: '/foundations/typography' },
  { label: 'SPACING',   href: '/foundations/spacing' },
  { label: 'BORDERS',   href: '/foundations/borders' },
  { label: 'GRID',      href: '/foundations/grid' },
  { label: 'MOTION',    href: '/foundations/motion' },
  { label: 'STATES',    href: '/foundations/states' },
];

export function Nav() {
  return (
    <nav className="border-r border-[var(--color-hairline)] w-[240px] flex-shrink-0">
      <div className="p-6 border-b border-[var(--color-hairline)] font-mono text-[13px] font-black uppercase tracking-[0.12em]">
        TOUCH GRASS DS<br />
        <span className="text-[var(--color-earned)]">// V0.0.1</span>
      </div>
      <ul className="list-none m-0 p-0">
        {items.map(({ label, href }) => (
          <li key={href}>
            <NavLink
              to={href}
              end
              className={({ isActive }) =>
                `block px-6 py-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] border-b border-[var(--color-hairline)] ${
                  isActive ? 'bg-[var(--color-earned)] text-black' : 'text-white hover:bg-[var(--color-bg-alt)]'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4.8: Write `packages/docs-site/src/layout/Shell.tsx`**

```tsx
import type { ReactNode } from 'react';
import { Nav } from './Nav';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <Nav />
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto p-12">{children}</div>
      </main>
    </div>
  );
}
```

- [ ] **Step 4.9: Write `packages/docs-site/src/pages/Index.tsx`**

```tsx
export function Index() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // TOUCH GRASS DS / OVERVIEW
      </div>
      <h1 className="text-[80px] font-black leading-none tracking-[-0.04em] mb-8">
        BRUTALIST.<br />NO MERCY.<br />
        <span className="text-[var(--color-earned)]">TOUCH&nbsp;GRASS.</span>
      </h1>
      <p className="text-[18px] font-mono font-bold max-w-[60ch] leading-relaxed">
        Design system for Timeouts. Zero rounded corners. Zero grey text.
        Zero animation. Geist Mono everywhere it counts. Built to fight iOS softness.
      </p>
    </div>
  );
}
```

- [ ] **Step 4.10: Run dev server smoke test**

```bash
cd /Users/thiagoxikota/Documents/touch-grass
pnpm install
pnpm --filter @touch-grass/tokens build
pnpm dev
```

Expected: Vite serves at `http://localhost:5173`. Open in browser. Verify:
- Page loads on pure black background
- Geist sans renders the headline
- Green Touch Grass accent visible
- Left nav visible with all 8 nav items, square (no rounded corners)
- Clicking a nav item navigates (page renders blank for now — pages don't exist yet)

If anything is broken, fix it before continuing. Commit only when the smoke test passes.

- [ ] **Step 4.11: Commit**

```bash
git add packages/docs-site/
git commit -m "feat(docs-site): scaffold Vite + React shell with nav and overview page"
```

### Task 5: Foundation page — Color

**Files:**
- Create: `packages/docs-site/src/pages/foundations/Color.tsx`

- [ ] **Step 5.1: Write the page**

```tsx
const swatches = [
  { token: '--color-bg',       hex: '#000000', role: 'BACKGROUND',     onLight: false },
  { token: '--color-fg',       hex: '#FFFFFF', role: 'TEXT (ALWAYS)',  onLight: true  },
  { token: '--color-earned',   hex: '#A6FF00', role: 'EARNED · SCARCE', onLight: true },
  { token: '--color-danger',   hex: '#FF3B3B', role: 'DANGER · BG ONLY', onLight: false },
  { token: '--color-hairline', hex: '#1A1A1A', role: 'BORDER · NEVER TEXT', onLight: false },
  { token: '--color-bg-alt',   hex: '#0A0A0A', role: 'INSET · NEVER TEXT', onLight: false },
];

export function Color() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / COLOR
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">FOUR COLORS. TWO STRUCTURAL.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Nothing else. No greys. No tertiary palette. No brand secondary. Hierarchy is built from size and weight, not from dimming.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-hairline)] border border-[var(--color-hairline)]">
        {swatches.map((s) => (
          <div key={s.token} style={{ background: s.hex }} className="p-8 min-h-[200px] flex flex-col justify-between">
            <div className={`font-mono text-[13px] font-black uppercase tracking-[0.12em] ${s.onLight ? 'text-black' : 'text-white'}`}>
              {s.role}
            </div>
            <div>
              <div className={`font-mono text-[24px] font-black ${s.onLight ? 'text-black' : 'text-white'}`}>{s.hex}</div>
              <div className={`font-mono text-[13px] font-black uppercase tracking-[0.12em] mt-1 ${s.onLight ? 'text-black' : 'text-white'}`}>
                {s.token}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">RULES</h2>
      <div className="border border-[var(--color-hairline)]">
        {[
          ['NO GREY TEXT',    'Hierarchy is size + weight. #666, #999, opacity tricks — banned.'],
          ['RED IS BG ONLY',  'Bare red text on black is banned. White text always sits on red.'],
          ['GREEN IS SCARCE', 'Max one green hit per component. Stacking greens is banned.'],
          ['REVERSE PAIRINGS','Black-on-green and white-on-red are the only allowed reverses.'],
        ].map(([rule, desc]) => (
          <div key={rule} className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)] last:border-b-0">
            <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">
              {rule}
            </div>
            <div className="p-4 text-[16px] font-mono font-semibold">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5.2: Verify in browser**

Run dev server (if not running). Navigate to `/foundations/color`. Verify:
- 6 swatches render in 2-col grid
- All hex labels readable (no contrast failures)
- Rules table renders with green left column
- Page padding matches other pages

- [ ] **Step 5.3: Commit**

```bash
git add packages/docs-site/src/pages/foundations/Color.tsx
git commit -m "feat(docs-site): add color foundation page"
```

### Task 6: Foundation page — Typography

**Files:**
- Create: `packages/docs-site/src/pages/foundations/Typography.tsx`

- [ ] **Step 6.1: Write the page**

```tsx
const sizes = [
  { token: 'stat-lg',  size: 80, family: 'mono', sample: '04:32:18' },
  { token: 'stat-md',  size: 64, family: 'mono', sample: '04:32:18' },
  { token: 'display',  size: 56, family: 'sans', sample: '47 minutes wasted.' },
  { token: 'h1',       size: 32, family: 'sans', sample: 'Page title' },
  { token: 'h2',       size: 24, family: 'sans', sample: 'Section title' },
  { token: 'h3',       size: 18, family: 'sans', sample: 'Component title' },
  { token: 'row-num',  size: 22, family: 'mono', sample: '62:14:08' },
  { token: 'row-name', size: 18, family: 'sans', sample: 'David H.' },
  { token: 'body',     size: 16, family: 'sans', sample: 'Body floor — never smaller.' },
  { token: 'label',    size: 13, family: 'mono', sample: 'UNTETHERED TODAY' },
];

export function Typography() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / TYPOGRAPHY
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">GEIST + GEIST MONO.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Two families. Numbers always mono. Body floors at 16px. Labels at 13px mono uppercase.
      </p>

      <div className="border border-[var(--color-hairline)]">
        {sizes.map((s) => (
          <div key={s.token} className="grid grid-cols-[180px_1fr] border-b border-[var(--color-hairline)] last:border-b-0 items-center">
            <div className="p-4 border-r border-[var(--color-hairline)]">
              <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">{s.token}</div>
              <div className="font-mono text-[13px] font-black mt-1">{s.size}px · {s.family.toUpperCase()}</div>
            </div>
            <div
              className="p-6"
              style={{
                fontSize: `${s.size}px`,
                fontFamily: s.family === 'mono' ? "'Geist Mono', monospace" : "Geist, sans-serif",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: s.size > 40 ? '-0.04em' : s.token === 'label' ? '0.12em' : '0',
                textTransform: s.token === 'label' ? 'uppercase' : 'none',
              }}
            >
              {s.sample}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">WEIGHTS</h2>
      <div className="grid grid-cols-4 gap-4">
        {[600, 700, 800, 900].map((w) => (
          <div key={w} className="border border-[var(--color-hairline)] p-6">
            <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">WEIGHT {w}</div>
            <div style={{ fontWeight: w, fontSize: 32 }}>Aa Bb Cc</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 6.2: Verify in browser**

Navigate to `/foundations/typography`. Verify:
- All 10 type sizes render with correct family/weight
- 80px monospace `04:32:18` dominates visually
- Label row shows uppercase tracking
- Weight grid shows clear difference between 600 → 900

- [ ] **Step 6.3: Commit**

```bash
git add packages/docs-site/src/pages/foundations/Typography.tsx
git commit -m "feat(docs-site): add typography foundation page"
```

### Task 7: Remaining foundation pages — Spacing, Borders, Grid, Motion, States

These five pages follow the same shape as Color and Typography. Each is a small focused screen — write them in one task to avoid commit churn, then commit together.

**Files:**
- Create: `packages/docs-site/src/pages/foundations/Spacing.tsx`
- Create: `packages/docs-site/src/pages/foundations/Borders.tsx`
- Create: `packages/docs-site/src/pages/foundations/Grid.tsx`
- Create: `packages/docs-site/src/pages/foundations/Motion.tsx`
- Create: `packages/docs-site/src/pages/foundations/States.tsx`

- [ ] **Step 7.1: Write `Spacing.tsx`**

```tsx
const scale = [
  { token: 'space-1',  px: 4   },
  { token: 'space-2',  px: 8   },
  { token: 'space-3',  px: 12  },
  { token: 'space-4',  px: 16  },
  { token: 'space-5',  px: 20  },
  { token: 'space-6',  px: 24  },
  { token: 'space-8',  px: 32  },
  { token: 'space-12', px: 48  },
  { token: 'space-16', px: 64  },
  { token: 'space-24', px: 96  },
  { token: 'space-32', px: 128 },
];

export function Spacing() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / SPACING
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">4PX BASE. NO OFF-GRID.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Density is the brand. Outer padding floors at 16px mobile, 24px desktop.
      </p>
      <div className="border border-[var(--color-hairline)]">
        {scale.map((s) => (
          <div key={s.token} className="grid grid-cols-[180px_120px_1fr] border-b border-[var(--color-hairline)] last:border-b-0 items-center">
            <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">{s.token}</div>
            <div className="p-4 font-mono text-[16px] font-black border-r border-[var(--color-hairline)]">{s.px}px</div>
            <div className="p-4">
              <div style={{ width: s.px, height: 24, background: 'var(--color-earned)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7.2: Write `Borders.tsx`**

```tsx
const borders = [
  { token: 'hairline', class: 'border border-[var(--color-hairline)]', desc: '1px #1a1a1a · default structure' },
  { token: 'strong',   class: 'border-2 border-white',                   desc: '2px white · important boundaries' },
  { token: 'active',   class: 'border-2 border-[var(--color-earned)]',   desc: '2px green · active/selected' },
  { token: 'danger',   class: 'border-2 border-[var(--color-danger)]',   desc: '2px red · danger surface' },
  { token: 'disabled', class: 'border-2 border-dashed border-white',     desc: '2px DASHED white · honestly broken' },
];

export function Borders() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / BORDERS
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">FIVE BORDERS. NO ROUNDING.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Radius is locked at zero everywhere. Including avatars. The square avatar is a brand signature.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {borders.map((b) => (
          <div key={b.token} className={`p-6 ${b.class}`}>
            <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">{b.token}</div>
            <div className="font-mono text-[16px] font-bold mt-2">{b.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7.3: Write `Grid.tsx`**

```tsx
export function Grid() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / GRID
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">12 / 8 / 4.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        12-col desktop. 8-col tablet. 4-col mobile. 4px gutter base.
      </p>

      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] mb-2 text-white">DESKTOP · 12 COL · 16PX GUTTER · 1280 MAX</div>
      <div className="grid grid-cols-12 gap-4 border border-[var(--color-hairline)] p-4 mb-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-16 border-2 border-[var(--color-earned)] bg-[rgba(166,255,0,0.08)] flex items-center justify-center font-mono text-[13px] font-black text-[var(--color-earned)]">{i + 1}</div>
        ))}
      </div>

      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] mb-2 text-white">TABLET · 8 COL · 12PX GUTTER</div>
      <div className="grid grid-cols-8 gap-3 border border-[var(--color-hairline)] p-3 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 border-2 border-[var(--color-earned)] bg-[rgba(166,255,0,0.08)] flex items-center justify-center font-mono text-[13px] font-black text-[var(--color-earned)]">{i + 1}</div>
        ))}
      </div>

      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] mb-2 text-white">MOBILE · 4 COL · 8PX GUTTER</div>
      <div className="grid grid-cols-4 gap-2 border border-[var(--color-hairline)] p-2 max-w-[375px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 border-2 border-[var(--color-earned)] bg-[rgba(166,255,0,0.08)] flex items-center justify-center font-mono text-[13px] font-black text-[var(--color-earned)]">{i + 1}</div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7.4: Write `Motion.tsx`**

```tsx
export function Motion() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / MOTION
      </div>
      <h1 className="text-[80px] font-black tracking-[-0.04em] mb-8 leading-[0.9]">
        ZERO.<br />
        <span className="text-[var(--color-earned)]">ANIMATION.</span>
      </h1>
      <p className="text-[18px] font-mono font-bold max-w-[60ch] leading-relaxed">
        Instant state changes. No fades. No slides. No easing. No stagger.
        The product's emotional register is discipline, not delight.
      </p>
      <div className="mt-16 border border-[var(--color-hairline)]">
        <div className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)]">
          <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">DURATION</div>
          <div className="p-4 font-mono text-[16px] font-bold">0ms · the only duration that exists</div>
        </div>
        <div className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)]">
          <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">EASING</div>
          <div className="p-4 font-mono text-[16px] font-bold">linear · also irrelevant because duration is 0</div>
        </div>
        <div className="grid grid-cols-[200px_1fr]">
          <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">EXCEPTION</div>
          <div className="p-4 font-mono text-[16px] font-bold">BeReal capture flow may use a 2-frame hard cut. No easing.</div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7.5: Write `States.tsx`**

```tsx
const states = [
  { name: 'DEFAULT',  desc: 'Solid neon fill, black text, 2px neon border.' },
  { name: 'HOVER',    desc: 'Inset 2px black bevel cut into the button. Instant.' },
  { name: 'FOCUS',    desc: '2px white outline at 3px offset. Hard halo, never glow.' },
  { name: 'DISABLED', desc: '2px DASHED white border, black bg, white text. Looks broken on purpose.' },
  { name: 'LOADING',  desc: '2px solid white border, label changes to verb-ing form, prepended with █▌. No spinner.' },
];

export function States() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / STATES
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">FIVE STATES. NO IMPLICITS.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Every interactive component must define all five. No fallbacks.
      </p>
      <div className="border border-[var(--color-hairline)]">
        {states.map((s) => (
          <div key={s.name} className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)] last:border-b-0">
            <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">{s.name}</div>
            <div className="p-4 text-[16px] font-mono font-semibold">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7.6: Verify all five pages in browser**

Run dev server. Click each nav item: SPACING, BORDERS, GRID, MOTION, STATES. Each page should render cleanly with no console errors. Visual sanity check — every page has the same shell and follows the spec rules.

- [ ] **Step 7.7: Commit**

```bash
git add packages/docs-site/src/pages/foundations/
git commit -m "feat(docs-site): add spacing, borders, grid, motion, states foundation pages"
```

---

## Chunk 5: Wire-up + final smoke test

### Task 8: End-to-end build + visual snapshot baseline

**Files:**
- Modify: root `package.json` (add `test:visual` script — optional)

- [ ] **Step 8.1: Run the full build from scratch**

```bash
cd /Users/thiagoxikota/Documents/touch-grass
rm -rf node_modules packages/*/node_modules packages/*/dist
pnpm install
pnpm --filter @touch-grass/tokens build
pnpm --filter @touch-grass/tokens test
pnpm --filter @touch-grass/ds test
pnpm --filter @touch-grass/docs-site build
```

Expected: All four commands succeed.
- Token tests pass (5 assertions)
- DS tests pass (4 assertions)
- Docs site builds to `packages/docs-site/dist/`

If anything fails, fix and re-run from `pnpm install`. Do not commit until clean.

- [ ] **Step 8.2: Manual visual smoke test**

```bash
pnpm dev
```

Open `http://localhost:5173` and verify each route:

| Route | Pass criteria |
|---|---|
| `/` | Headline visible, green accent, no console errors |
| `/foundations/color` | 6 swatches in grid, contrast rule table |
| `/foundations/typography` | 10 size rows + 4 weight cards |
| `/foundations/spacing` | 11 spacing rows with green bars |
| `/foundations/borders` | 5 border samples in grid |
| `/foundations/grid` | 12-col, 8-col, 4-col grids stacked |
| `/foundations/motion` | Big "ZERO ANIMATION" headline + duration table |
| `/foundations/states` | 5 state rules in table |

**Key checks across all pages:**
- No rounded corners anywhere (inspect any element — `border-radius: 0`)
- No grey text (all visible text is `#FFFFFF`, `#A6FF00`, or `#000000` on green/red bg)
- No transitions firing (hover a nav item — color flips instantly, no fade)
- Geist + Geist Mono fonts loaded (check Network tab — `.woff2` files served)

If anything fails, fix before committing. The smoke test IS the gate.

- [ ] **Step 8.3: Commit final state**

```bash
git add -A
git commit -m "chore: end-to-end build smoke test passes"
```

- [ ] **Step 8.4: Tag v0.0.1**

```bash
git tag -a v0.0.1-foundations -m "Touch Grass DS — foundations only"
```

---

## What ships when this plan is done

A working, runnable artifact at `pnpm dev` showing:
- Pure-black brutalist docs site
- All 6 colors, 10 type sizes, 11 spacing values, 5 borders, 3 grid breakpoints documented
- All 5 component states defined as rules
- Token pipeline emitting CSS variables, Tailwind theme, and Figma JSON
- Tests gating the build at every layer

**Out of scope for this plan (intentionally):**
- Any actual React components (Button, Input, etc.) — that's Plan 2
- LeaderboardRow, FocusTimerDisplay, BeRealStamp, PatternInterruptModal, SessionSummaryCard — that's Plan 3
- Figma library + token sync script — that's Plan 4
- A11y audit beyond focus states
- Light theme (will never exist)

## Open questions for follow-up plans

These were flagged in the spec and don't block this plan, but should be answered before Plan 2:

1. **Avatar fallback glyph** — `??` proposed, needs sign-off
2. **Token sync direction** — manual Figma maintenance in v1, automated sync deferred to Plan 4
3. **Dark-only stake-in-the-ground** — should be documented as a principle in `Index.tsx` overview, not just in the spec
