# Touch Grass DS — Primitives Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 8 brutalist primitives — Button, Input, Badge, Card, Stat, Timer, Tag, Divider — as React components in `@touch-grass/ds`, each with full state matrix coverage and a live demo page in the docs site.

**Architecture:** Each primitive is a single `.tsx` file under `packages/ds/src/primitives/`, exporting a typed React component that consumes CSS variables from `@touch-grass/tokens`. Components use the `cn()` helper for class composition and accept standard HTML element props via `React.ComponentProps`. Variants are passed as discriminated string unions, not class-based polymorphism. Each primitive gets a Vitest test (rendered output assertions, not snapshots) and a docs page rendering all variants × all states. The docs site adds a "Primitives" nav section.

**Tech Stack:** React 19, TypeScript, Tailwind v4 (utility classes for layout, CSS variables for colors), Vitest + @testing-library/react for component tests, jsdom environment.

**Spec:** [docs/superpowers/specs/2026-04-13-touch-grass-ds-design.md](../specs/2026-04-13-touch-grass-ds-design.md) (Section 10.1 Primitives, Section 5 State Matrix, Section 4 Foundations).

**Prerequisite:** Plan 1 (Foundations) shipped at tag `v0.0.1-foundations`. Tokens, base CSS, and docs site shell exist.

---

## Pre-flight: shared infrastructure

Before any primitive is built, install testing-library and add a Vitest config to the `ds` package so component tests can render React in jsdom.

### Task 0: Component testing setup

**Files:**
- Modify: `packages/ds/package.json` (add `@testing-library/react`, `@testing-library/jest-dom`, `@vitest/ui`)
- Create: `packages/ds/vitest.config.ts`
- Create: `packages/ds/tests/setup.ts`

- [ ] **Step 0.1: Add deps to `packages/ds/package.json`**

In `devDependencies`, add:
```json
"@testing-library/react": "^16.1.0",
"@testing-library/jest-dom": "^6.6.0",
"@vitest/ui": "^2.1.0"
```

- [ ] **Step 0.2: Create `packages/ds/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: false,
  },
});
```

Note: also needs `@vitejs/plugin-react` as a devDep. Add it.

- [ ] **Step 0.3: Create `packages/ds/tests/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 0.4: Install + verify existing tests still pass**

```bash
corepack pnpm install
corepack pnpm --filter @touch-grass/ds test
```

Expected: 4 existing tokens-resolved tests still pass under the new jsdom environment.

- [ ] **Step 0.5: Commit**

```bash
git add packages/ds/package.json packages/ds/vitest.config.ts packages/ds/tests/setup.ts pnpm-lock.yaml
git commit -m "chore(ds): add component testing infrastructure (testing-library + jsdom)"
```

---

## Chunk 1: Button (the canonical primitive)

Button is the largest and most state-heavy primitive. Once Button is correct, every other primitive follows the same pattern.

### Task 1: Button component

**Files:**
- Create: `packages/ds/src/primitives/Button.tsx`
- Create: `packages/ds/tests/primitives/Button.test.tsx`
- Modify: `packages/ds/src/index.ts` (export Button)

- [ ] **Step 1.1: Write the failing test**

`packages/ds/tests/primitives/Button.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../../src/primitives/Button';

describe('Button', () => {
  it('renders children as label', () => {
    render(<Button>START FOCUS</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('START FOCUS');
  });

  it('defaults to primary variant', () => {
    render(<Button>x</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[var(--color-earned)]');
    expect(btn.className).toContain('text-black');
  });

  it('applies ghost variant', () => {
    render(<Button variant="ghost">x</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-black');
    expect(btn.className).toContain('text-white');
    expect(btn.className).toContain('border-white');
  });

  it('applies danger variant', () => {
    render(<Button variant="danger">x</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[var(--color-danger)]');
    expect(btn.className).toContain('text-white');
  });

  it('shows loading state with verb-ing label and block prefix', () => {
    render(<Button loading loadingLabel="SYNCING">START FOCUS</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent('█▌ SYNCING');
    expect(btn).toBeDisabled();
  });

  it('disabled state uses dashed border', () => {
    render(<Button disabled>x</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-dashed');
    expect(btn).toBeDisabled();
  });

  it('forwards ref to button element', () => {
    let ref: HTMLButtonElement | null = null;
    render(<Button ref={(el) => { ref = el; }}>x</Button>);
    expect(ref).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards arbitrary HTML props', () => {
    render(<Button data-testid="x" type="submit">x</Button>);
    expect(screen.getByTestId('x')).toHaveAttribute('type', 'submit');
  });
});
```

- [ ] **Step 1.2: Run — confirm fail**

```bash
corepack pnpm --filter @touch-grass/ds test
```

Expected: FAIL — `Cannot find module '../../src/primitives/Button'`.

- [ ] **Step 1.3: Write `Button.tsx`**

```tsx
import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../lib/cn';

type ButtonVariant = 'primary' | 'ghost' | 'danger';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  loading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center min-h-[48px] px-4 py-3 ' +
  'font-mono text-[15px] font-black uppercase tracking-[0.1em] ' +
  'border-2 cursor-pointer ' +
  'disabled:cursor-not-allowed ' +
  'hover:[box-shadow:inset_0_0_0_2px_#000] ' +
  'focus-visible:outline-2 focus-visible:outline-white focus-visible:[outline-offset:3px]';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-earned)] text-black border-[var(--color-earned)] ' +
    'disabled:bg-black disabled:text-white disabled:border-white disabled:border-dashed disabled:hover:shadow-none',
  ghost:
    'bg-black text-white border-white ' +
    'disabled:border-dashed disabled:hover:shadow-none',
  danger:
    'bg-[var(--color-danger)] text-white border-[var(--color-danger)] ' +
    'disabled:bg-black disabled:text-white disabled:border-white disabled:border-dashed disabled:hover:shadow-none',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', loading, loadingLabel, children, className, disabled, ...rest },
  ref
) {
  const isDisabled = disabled || loading;
  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {loading ? `█▌ ${loadingLabel ?? 'LOADING'}` : children}
    </button>
  );
});
```

- [ ] **Step 1.4: Update `packages/ds/src/index.ts`**

```ts
export { cn } from './lib/cn';
export { Button, type ButtonProps } from './primitives/Button';
```

- [ ] **Step 1.5: Run — confirm pass**

```bash
corepack pnpm --filter @touch-grass/ds test
```

Expected: PASS — 8 Button tests + 4 token tests = 12/12.

- [ ] **Step 1.6: Commit**

```bash
git add packages/ds/src/primitives/Button.tsx packages/ds/src/index.ts packages/ds/tests/primitives/Button.test.tsx
git commit -m "feat(ds): add Button primitive with full state matrix"
```

### Task 2: Button docs page

**Files:**
- Create: `packages/docs-site/src/pages/primitives/ButtonPage.tsx`
- Modify: `packages/docs-site/src/App.tsx` (add route)
- Modify: `packages/docs-site/src/layout/Nav.tsx` (add nav item)

- [ ] **Step 2.1: Write `ButtonPage.tsx`**

```tsx
import { Button } from '@touch-grass/ds';

const VARIANTS = ['primary', 'ghost', 'danger'] as const;

export function ButtonPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / BUTTON
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">BUTTON.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Three variants. Five states. 48px tap target floor. Loading uses block characters, never spinners.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">VARIANTS × STATES</h2>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] border border-[var(--color-hairline)]">
        <div className="p-4 border-r border-b border-[var(--color-hairline)] font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]"></div>
        {['DEFAULT', 'HOVER', 'FOCUS', 'DISABLED', 'LOADING'].map((s) => (
          <div key={s} className="p-4 border-r border-b border-[var(--color-hairline)] last:border-r-0 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">{s}</div>
        ))}
        {VARIANTS.map((v) => (
          <>
            <div key={`${v}-label`} className="p-4 border-r border-b border-[var(--color-hairline)] font-mono text-[13px] font-black uppercase tracking-[0.12em] text-white">{v}</div>
            <div key={`${v}-default`} className="p-4 border-r border-b border-[var(--color-hairline)] flex items-center"><Button variant={v}>START</Button></div>
            <div key={`${v}-hover`} className="p-4 border-r border-b border-[var(--color-hairline)] flex items-center"><Button variant={v} className="[box-shadow:inset_0_0_0_2px_#000]">START</Button></div>
            <div key={`${v}-focus`} className="p-4 border-r border-b border-[var(--color-hairline)] flex items-center"><Button variant={v} className="outline-2 outline-white [outline-offset:3px] outline-solid">START</Button></div>
            <div key={`${v}-disabled`} className="p-4 border-r border-b border-[var(--color-hairline)] flex items-center"><Button variant={v} disabled>START</Button></div>
            <div key={`${v}-loading`} className="p-4 border-b border-[var(--color-hairline)] flex items-center"><Button variant={v} loading loadingLabel="SYNCING">START</Button></div>
          </>
        ))}
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">USAGE</h2>
      <pre className="border border-[var(--color-hairline)] p-6 font-mono text-[13px] text-white overflow-x-auto">{`import { Button } from '@touch-grass/ds';

<Button>START FOCUS</Button>
<Button variant="ghost">CANCEL</Button>
<Button variant="danger">END SESSION</Button>
<Button loading loadingLabel="SYNCING">START FOCUS</Button>
<Button disabled>START FOCUS</Button>`}</pre>
    </div>
  );
}
```

- [ ] **Step 2.2: Update `App.tsx` to register the route**

Add the import:
```tsx
import { ButtonPage } from './pages/primitives/ButtonPage';
```

Add the route inside `<Routes>`:
```tsx
<Route path="/primitives/button" element={<ButtonPage />} />
```

- [ ] **Step 2.3: Update `Nav.tsx` to add a Primitives section**

Replace the `items` array with two arrays + render two sections:

```tsx
const foundations = [
  { label: 'OVERVIEW',  href: '/' },
  { label: 'COLOR',     href: '/foundations/color' },
  { label: 'TYPE',      href: '/foundations/typography' },
  { label: 'SPACING',   href: '/foundations/spacing' },
  { label: 'BORDERS',   href: '/foundations/borders' },
  { label: 'GRID',      href: '/foundations/grid' },
  { label: 'MOTION',    href: '/foundations/motion' },
  { label: 'STATES',    href: '/foundations/states' },
];

const primitives = [
  { label: 'BUTTON',   href: '/primitives/button' },
];
```

Render two `<ul>` blocks under section headers:

```tsx
<div className="px-6 py-3 border-b border-[var(--color-hairline)] font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">FOUNDATIONS</div>
<ul className="list-none m-0 p-0">
  {foundations.map(/* same render as before */)}
</ul>
<div className="px-6 py-3 border-b border-[var(--color-hairline)] font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)]">PRIMITIVES</div>
<ul className="list-none m-0 p-0">
  {primitives.map(/* same render */)}
</ul>
```

- [ ] **Step 2.4: Verify in browser**

```bash
corepack pnpm dev
```

Open `http://localhost:5173/primitives/button`. Verify:
- Variants × states grid renders 3 rows × 5 columns
- Primary buttons are neon green with black text
- Ghost buttons are black bg / white text / white border
- Danger buttons are red bg / white text
- Disabled buttons have dashed white border
- Loading buttons show `█▌ SYNCING`
- Nav shows two sections: FOUNDATIONS and PRIMITIVES

- [ ] **Step 2.5: Commit**

```bash
git add packages/docs-site/src/pages/primitives/ButtonPage.tsx packages/docs-site/src/App.tsx packages/docs-site/src/layout/Nav.tsx
git commit -m "feat(docs-site): add Button primitive page + primitives nav section"
```

---

## Chunk 2: Input + Badge + Card + Tag + Divider (data-light primitives)

These five primitives are smaller than Button and follow the same pattern. Each gets one task that bundles component + test + docs page + nav update. Bundling is justified because each is ~40 lines of component code and the nav has to be updated 5 times anyway.

### Task 3: Input primitive

**Files:**
- Create: `packages/ds/src/primitives/Input.tsx`
- Create: `packages/ds/tests/primitives/Input.test.tsx`
- Create: `packages/docs-site/src/pages/primitives/InputPage.tsx`
- Modify: `packages/ds/src/index.ts`
- Modify: `packages/docs-site/src/App.tsx`
- Modify: `packages/docs-site/src/layout/Nav.tsx`

- [ ] **Step 3.1: Write the failing test**

`packages/ds/tests/primitives/Input.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../../src/primitives/Input';

describe('Input', () => {
  it('renders an HTML input with given placeholder', () => {
    render(<Input placeholder="@HANDLE" />);
    expect(screen.getByPlaceholderText('@HANDLE')).toBeInTheDocument();
  });

  it('defaults to text variant (sans font)', () => {
    render(<Input placeholder="x" />);
    const input = screen.getByPlaceholderText('x');
    expect(input.className).toContain('font-sans');
    expect(input.className).not.toContain('font-mono');
  });

  it('numeric variant uses mono font', () => {
    render(<Input variant="numeric" placeholder="0" />);
    const input = screen.getByPlaceholderText('0');
    expect(input.className).toContain('font-mono');
  });

  it('error state has 2px red border', () => {
    render(<Input error placeholder="x" />);
    const input = screen.getByPlaceholderText('x');
    expect(input.className).toContain('border-[var(--color-danger)]');
  });

  it('disabled state has dashed border', () => {
    render(<Input disabled placeholder="x" />);
    const input = screen.getByPlaceholderText('x');
    expect(input.className).toContain('border-dashed');
    expect(input).toBeDisabled();
  });

  it('forwards ref', () => {
    let ref: HTMLInputElement | null = null;
    render(<Input ref={(el) => { ref = el; }} />);
    expect(ref).toBeInstanceOf(HTMLInputElement);
  });
});
```

- [ ] **Step 3.2: Run — confirm fail**

- [ ] **Step 3.3: Write `Input.tsx`**

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface InputProps extends ComponentProps<'input'> {
  variant?: 'text' | 'numeric';
  error?: boolean;
}

const base =
  'block w-full bg-black text-white text-[16px] font-semibold ' +
  'px-4 py-3 min-h-[48px] border-2 border-white ' +
  'placeholder:text-white placeholder:font-mono placeholder:uppercase placeholder:tracking-[0.08em] ' +
  'focus-visible:outline-2 focus-visible:outline-[var(--color-earned)] focus-visible:[outline-offset:3px] ' +
  'disabled:cursor-not-allowed disabled:border-dashed';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = 'text', error, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        base,
        variant === 'numeric' ? 'font-mono' : 'font-sans',
        error && 'border-[var(--color-danger)]',
        className
      )}
      {...rest}
    />
  );
});
```

- [ ] **Step 3.4: Write `InputPage.tsx`**

```tsx
import { Input } from '@touch-grass/ds';

export function InputPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / INPUT
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">INPUT.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Text or numeric (mono). 2px white border default. Green hard-halo on focus. Dashed when disabled. Red border for error.
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-[700px]">
        <div>
          <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">DEFAULT (TEXT)</div>
          <Input placeholder="@HANDLE" />
        </div>
        <div>
          <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">NUMERIC</div>
          <Input variant="numeric" placeholder="00:00:00" />
        </div>
        <div>
          <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">ERROR</div>
          <Input error placeholder="@HANDLE" defaultValue="invalid" />
        </div>
        <div>
          <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">DISABLED</div>
          <Input disabled placeholder="@HANDLE" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3.5: Wire up exports + nav + route**

`packages/ds/src/index.ts`:
```ts
export { Input, type InputProps } from './primitives/Input';
```

`App.tsx`:
```tsx
import { InputPage } from './pages/primitives/InputPage';
// inside <Routes>:
<Route path="/primitives/input" element={<InputPage />} />
```

`Nav.tsx` `primitives` array:
```ts
{ label: 'INPUT', href: '/primitives/input' },
```

- [ ] **Step 3.6: Test + verify in browser + commit**

```bash
corepack pnpm --filter @touch-grass/ds test
corepack pnpm dev  # check /primitives/input
```

Expected: tests pass (12 → 18 passing), browser shows 4 input states.

```bash
git add packages/ds/src/primitives/Input.tsx packages/ds/src/index.ts packages/ds/tests/primitives/Input.test.tsx packages/docs-site/src/pages/primitives/InputPage.tsx packages/docs-site/src/App.tsx packages/docs-site/src/layout/Nav.tsx
git commit -m "feat(ds): add Input primitive (text + numeric variants)"
```

### Task 4: Badge primitive

**Files:**
- Create: `packages/ds/src/primitives/Badge.tsx`
- Create: `packages/ds/tests/primitives/Badge.test.tsx`
- Create: `packages/docs-site/src/pages/primitives/BadgePage.tsx`
- Modify: `packages/ds/src/index.ts`, `App.tsx`, `Nav.tsx`

Spec: Earned (green bg / black text), Neutral (black bg / white text / white border), Danger (red bg / white text). Sizes: sm (font 11px, padding 4×6px), md (font 13px, padding 6×10px).

- [ ] **Step 4.1: Test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../src/primitives/Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>KING</Badge>);
    expect(screen.getByText('KING')).toBeInTheDocument();
  });
  it('defaults to neutral md', () => {
    render(<Badge>x</Badge>);
    const el = screen.getByText('x');
    expect(el.className).toContain('bg-black');
    expect(el.className).toContain('border-white');
    expect(el.className).toContain('text-[13px]');
  });
  it('earned variant uses green bg + black text', () => {
    render(<Badge variant="earned">x</Badge>);
    const el = screen.getByText('x');
    expect(el.className).toContain('bg-[var(--color-earned)]');
    expect(el.className).toContain('text-black');
  });
  it('danger variant uses red bg + white text', () => {
    render(<Badge variant="danger">x</Badge>);
    const el = screen.getByText('x');
    expect(el.className).toContain('bg-[var(--color-danger)]');
  });
  it('sm size uses 11px', () => {
    render(<Badge size="sm">x</Badge>);
    const el = screen.getByText('x');
    expect(el.className).toContain('text-[11px]');
  });
});
```

- [ ] **Step 4.2: Component**

```tsx
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface BadgeProps {
  variant?: 'earned' | 'neutral' | 'danger';
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

const base = 'inline-flex items-center font-mono font-black uppercase tracking-[0.1em] border-2';

const variants = {
  earned:  'bg-[var(--color-earned)] text-black border-[var(--color-earned)]',
  neutral: 'bg-black text-white border-white',
  danger:  'bg-[var(--color-danger)] text-white border-[var(--color-danger)]',
};

const sizes = {
  sm: 'text-[11px] px-1.5 py-1',
  md: 'text-[13px] px-2.5 py-1.5',
};

export function Badge({ variant = 'neutral', size = 'md', children, className }: BadgeProps) {
  return <span className={cn(base, variants[variant], sizes[size], className)}>{children}</span>;
}
```

- [ ] **Step 4.3: Docs page (pattern: 3 variants × 2 sizes grid). Wire up exports/route/nav. Test. Commit.**

```bash
git commit -m "feat(ds): add Badge primitive (earned/neutral/danger × sm/md)"
```

### Task 5: Card primitive

Spec: Container with hairline border, optional `panel-head` slot, `default` and `inset` variants. `inset` uses `--color-bg-alt` background.

**Files:** same pattern as Tasks 3–4.

- [ ] **Step 5.1: Test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../../src/primitives/Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>body</Card>);
    expect(screen.getByText('body')).toBeInTheDocument();
  });
  it('default variant uses black bg', () => {
    render(<Card data-testid="c">x</Card>);
    expect(screen.getByTestId('c').className).toContain('bg-black');
    expect(screen.getByTestId('c').className).toContain('border-[var(--color-hairline)]');
  });
  it('inset variant uses alt bg', () => {
    render(<Card variant="inset" data-testid="c">x</Card>);
    expect(screen.getByTestId('c').className).toContain('bg-[var(--color-bg-alt)]');
  });
  it('renders header slot when provided', () => {
    render(<Card header={<span>HEAD</span>}>body</Card>);
    expect(screen.getByText('HEAD')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5.2: Component**

```tsx
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface CardProps extends ComponentProps<'div'> {
  variant?: 'default' | 'inset';
  header?: ReactNode;
}

export function Card({ variant = 'default', header, children, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'border border-[var(--color-hairline)]',
        variant === 'inset' ? 'bg-[var(--color-bg-alt)]' : 'bg-black',
        className
      )}
      {...rest}
    >
      {header && (
        <div className="px-5 py-4 border-b border-[var(--color-hairline)] font-mono text-[13px] font-black uppercase tracking-[0.12em] text-white">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
```

- [ ] **Step 5.3: Docs page renders 2 cards (default + inset, one with header). Wire up. Test. Commit.**

```bash
git commit -m "feat(ds): add Card primitive (default + inset, optional header slot)"
```

### Task 6: Tag primitive

Spec: Filter chip. `default` (white border, white text) vs `active` (green bg, black text). Uppercase mono.

- [ ] **Step 6.1: Test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tag } from '../../src/primitives/Tag';

describe('Tag', () => {
  it('renders default state with white border', () => {
    render(<Tag>WEEKLY</Tag>);
    const el = screen.getByText('WEEKLY');
    expect(el.className).toContain('border-white');
    expect(el.className).toContain('text-white');
  });
  it('active state uses green bg + black text', () => {
    render(<Tag active>WEEKLY</Tag>);
    const el = screen.getByText('WEEKLY');
    expect(el.className).toContain('bg-[var(--color-earned)]');
    expect(el.className).toContain('text-black');
  });
});
```

- [ ] **Step 6.2: Component**

```tsx
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface TagProps extends ComponentProps<'button'> {
  active?: boolean;
  children: ReactNode;
}

export function Tag({ active, children, className, ...rest }: TagProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center px-3 py-2 min-h-[36px] font-mono text-[13px] font-black uppercase tracking-[0.1em] border-2 cursor-pointer',
        active ? 'bg-[var(--color-earned)] text-black border-[var(--color-earned)]' : 'bg-black text-white border-white',
        'focus-visible:outline-2 focus-visible:outline-white focus-visible:[outline-offset:3px]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 6.3: Docs page. Wire up. Test. Commit.**

```bash
git commit -m "feat(ds): add Tag primitive (filter chip)"
```

### Task 7: Divider primitive

Spec: 1px hairline OR 2px strong (white). Horizontal or vertical.

- [ ] **Step 7.1: Test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from '../../src/primitives/Divider';

describe('Divider', () => {
  it('default is hairline horizontal', () => {
    render(<Divider data-testid="d" />);
    const el = screen.getByTestId('d');
    expect(el.className).toContain('border-t');
    expect(el.className).toContain('border-[var(--color-hairline)]');
  });
  it('strong variant uses white 2px', () => {
    render(<Divider variant="strong" data-testid="d" />);
    const el = screen.getByTestId('d');
    expect(el.className).toContain('border-t-2');
    expect(el.className).toContain('border-white');
  });
  it('vertical orientation uses border-l', () => {
    render(<Divider orientation="vertical" data-testid="d" />);
    const el = screen.getByTestId('d');
    expect(el.className).toContain('border-l');
  });
});
```

- [ ] **Step 7.2: Component**

```tsx
import type { ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface DividerProps extends ComponentProps<'div'> {
  variant?: 'hairline' | 'strong';
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ variant = 'hairline', orientation = 'horizontal', className, ...rest }: DividerProps) {
  const isStrong = variant === 'strong';
  const isV = orientation === 'vertical';
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        isV
          ? isStrong ? 'border-l-2 border-white h-full w-0' : 'border-l border-[var(--color-hairline)] h-full w-0'
          : isStrong ? 'border-t-2 border-white w-full h-0' : 'border-t border-[var(--color-hairline)] w-full h-0',
        className
      )}
      {...rest}
    />
  );
}
```

- [ ] **Step 7.3: Docs page. Wire up. Test. Commit.**

```bash
git commit -m "feat(ds): add Divider primitive (hairline/strong × horizontal/vertical)"
```

---

## Chunk 3: Stat + Timer (number-heavy primitives)

These two primitives are where the brand lives — they render the headline numbers. Both deserve their own tasks because they have multiple sub-elements (label, value, meta strip).

### Task 8: Stat primitive

Spec: `Hero` (full label/value/meta) and `Inline` (just value with optional label) variants. Sizes `sm/md/lg/xl` map to type tokens.

**Files:** standard pattern.

- [ ] **Step 8.1: Test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stat } from '../../src/primitives/Stat';

describe('Stat', () => {
  it('hero variant renders label + value', () => {
    render(<Stat variant="hero" label="UNTETHERED TODAY" value="04:32:18" />);
    expect(screen.getByText('UNTETHERED TODAY')).toBeInTheDocument();
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
  });
  it('hero value uses earned color and 80px (lg default)', () => {
    render(<Stat variant="hero" label="x" value="00:00" />);
    const v = screen.getByText('00:00');
    expect(v.className).toContain('text-[var(--color-earned)]');
    expect(v.className).toContain('text-[80px]');
  });
  it('hero size md uses 64px', () => {
    render(<Stat variant="hero" label="x" value="00:00" size="md" />);
    const v = screen.getByText('00:00');
    expect(v.className).toContain('text-[64px]');
  });
  it('inline variant has no label container', () => {
    render(<Stat variant="inline" value="12D" />);
    expect(screen.getByText('12D')).toBeInTheDocument();
  });
  it('hero renders meta items when provided', () => {
    render(
      <Stat variant="hero" label="x" value="00:00" meta={[
        { k: 'STREAK', v: '12D' },
        { k: 'RANK', v: '#17' },
      ]} />
    );
    expect(screen.getByText('STREAK')).toBeInTheDocument();
    expect(screen.getByText('12D')).toBeInTheDocument();
    expect(screen.getByText('RANK')).toBeInTheDocument();
  });
});
```

- [ ] **Step 8.2: Component**

```tsx
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

type StatVariant = 'hero' | 'inline';
type StatSize = 'sm' | 'md' | 'lg' | 'xl';

export interface StatMeta {
  k: string;
  v: string;
}

export interface StatProps {
  variant?: StatVariant;
  size?: StatSize;
  label?: ReactNode;
  value: ReactNode;
  meta?: StatMeta[];
  className?: string;
}

const sizeClasses: Record<StatSize, string> = {
  sm: 'text-[24px]',
  md: 'text-[64px]',
  lg: 'text-[80px]',
  xl: 'text-[96px]',
};

export function Stat({ variant = 'hero', size = 'lg', label, value, meta, className }: StatProps) {
  if (variant === 'inline') {
    return (
      <span className={cn('font-mono font-black text-white', sizeClasses[size === 'lg' ? 'sm' : size], className)}>
        {value}
      </span>
    );
  }
  return (
    <div className={cn('block', className)}>
      {label && (
        <div className="font-mono text-[13px] font-black uppercase tracking-[0.14em] text-white mb-3">
          {label}
        </div>
      )}
      <div className={cn('font-mono font-black leading-[0.9] tracking-[-0.04em] text-[var(--color-earned)]', sizeClasses[size])}>
        {value}
      </div>
      {meta && meta.length > 0 && (
        <div className="flex gap-4 mt-6 pt-5 border-t border-[var(--color-hairline)]">
          {meta.map((m) => (
            <div key={m.k} className="flex-1">
              <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-white">{m.k}</div>
              <div className="font-mono text-[22px] font-black text-white mt-1">{m.v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 8.3: Docs page renders hero (lg + md), inline, and one with meta. Wire up. Test. Commit.**

```bash
git commit -m "feat(ds): add Stat primitive (hero/inline × sm/md/lg/xl)"
```

### Task 9: Timer primitive

Spec: Static (just renders given value) and Live (re-renders every second from a `start` Date). Both use Stat under the hood — Timer composes Stat. **Live variant uses React state, not animation** — the value re-renders, the digits don't tween.

- [ ] **Step 9.1: Test**

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Timer } from '../../src/primitives/Timer';

describe('Timer', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('static variant renders the given value', () => {
    render(<Timer variant="static" value="04:32:18" />);
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
  });

  it('live variant computes elapsed from start', () => {
    const start = new Date('2026-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2026-01-01T01:23:45Z'));
    render(<Timer variant="live" start={start} />);
    expect(screen.getByText('01:23:45')).toBeInTheDocument();
  });

  it('live variant re-renders each second', () => {
    const start = new Date('2026-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2026-01-01T00:00:01Z'));
    render(<Timer variant="live" start={start} />);
    expect(screen.getByText('00:00:01')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByText('00:00:03')).toBeInTheDocument();
  });
});
```

- [ ] **Step 9.2: Component**

```tsx
import { useEffect, useState } from 'react';
import { Stat } from './Stat';

type TimerVariant = 'static' | 'live';

export interface TimerProps {
  variant?: TimerVariant;
  /** Required when variant === 'static' */
  value?: string;
  /** Required when variant === 'live'. Timer computes elapsed = now - start. */
  start?: Date;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

function formatElapsed(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function Timer({ variant = 'static', value, start, label, size = 'lg', className }: TimerProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (variant !== 'live') return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [variant]);

  const display = variant === 'live' && start
    ? formatElapsed(now - start.getTime())
    : (value ?? '00:00:00');

  return <Stat variant="hero" label={label} value={display} size={size} className={className} />;
}
```

- [ ] **Step 9.3: Docs page renders static + live. Wire up. Test. Commit.**

```bash
git commit -m "feat(ds): add Timer primitive (static + live with 1s tick)"
```

---

## Chunk 4: Wire-up + final smoke test

### Task 10: End-to-end build + smoke test

- [ ] **Step 10.1: Run full build from scratch**

```bash
cd /Users/thiagoxikota/Documents/touch-grass
corepack pnpm install
corepack pnpm --filter @touch-grass/tokens build
corepack pnpm -r test
corepack pnpm --filter @touch-grass/docs-site build
```

Expected:
- All primitive tests pass (~30 component tests across 8 files + 4 token integration tests + 5 token build tests = ~39 passing)
- Docs site builds clean

- [ ] **Step 10.2: Visual smoke test**

```bash
corepack pnpm dev
```

Open `http://localhost:5173`. Verify:

| Route | Pass criteria |
|---|---|
| `/primitives/button` | 3×5 grid, all variants render correctly |
| `/primitives/input` | 4 input states |
| `/primitives/badge` | 3 variants × 2 sizes |
| `/primitives/card` | default + inset + with header |
| `/primitives/tag` | default + active |
| `/primitives/divider` | hairline, strong, vertical samples |
| `/primitives/stat` | hero (lg + md) + inline + with meta |
| `/primitives/timer` | static + live ticking each second |

Foundation pages from Plan 1 still work. Nav has both FOUNDATIONS and PRIMITIVES sections.

- [ ] **Step 10.3: Tag v0.0.2**

```bash
git tag -a v0.0.2-primitives -m "Touch Grass DS — 8 primitives"
```

---

## What ships when this plan is done

- 8 React primitives importable from `@touch-grass/ds`: `Button`, `Input`, `Badge`, `Card`, `Tag`, `Divider`, `Stat`, `Timer`
- 8 docs pages under `/primitives/*` rendering all variants × all states
- ~30 component tests, all using @testing-library/react against jsdom
- `Nav` updated with FOUNDATIONS + PRIMITIVES sections

## Out of scope for this plan

- App-specific patterns (LeaderboardRow, FocusTimerDisplay, BeRealStamp, PatternInterruptModal, SessionSummaryCard) — Plan 3
- Figma library + token sync — Plan 4
- Storybook (we have a docs site already)
- Visual regression / snapshot tests
- `axe-core` accessibility CI

## Open questions

1. **Stat `inline` variant size mapping** — currently `sm` is 24px. If consumers want small inline numbers (e.g., 16px to match body), should `inline` get its own size scale? Defer until a real consumer asks.
2. **Timer drift on tab background** — `setInterval` drifts when tab is backgrounded. Acceptable for v1; revisit if Timeouts needs precise cumulative tracking.
3. **Card `header` slot vs subcomponent** — currently a `header` prop. If it grows complex, refactor to `<Card.Header>` subcomponent. Defer.
