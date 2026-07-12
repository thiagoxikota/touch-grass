# Quickstart: Vite + React + Touch Grass DS

Get a brutal design system running in under 2 minutes.

## 1. Create a Vite React app

```bash
pnpm create vite my-app --template react-ts
cd my-app
```

## 2. Install Touch Grass packages

```bash
pnpm add @touch-grass-ds/react @touch-grass-ds/tokens
```

## 3. Import styles

In your `src/main.tsx` (or `src/index.tsx`), add the token CSS **before** your app styles:

```tsx
import '@touch-grass-ds/tokens/dist/tokens.css';
import '@touch-grass-ds/react/styles/base.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

> **Note:** `base.css` loads Geist fonts, sets `border-radius: 0 !important` globally,
> and kills all transitions/animations. This is the brutalist baseline.

## 4. Use a component

Replace `src/App.tsx` with:

```tsx
import { Button, Stat, Divider } from '@touch-grass-ds/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] p-12">
      <div className="max-w-[66ch]">
        <div className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-earned)] mb-4">
          // TOUCH GRASS DS / QUICKSTART
        </div>

        <h1 className="text-[56px] font-black leading-none tracking-[-0.04em] mb-6">
          HELLO, BRUTAL<span className="text-[var(--color-earned)]">.</span>
        </h1>

        <p className="font-mono text-[15px] font-semibold text-[var(--color-muted)] leading-relaxed mb-8">
          You are now running Touch Grass DS with Vite + React.
          No rounded corners. No motion. Tokens only.
        </p>

        <div className="flex gap-4 mb-12">
          <Button>EARN IT</Button>
          <Button variant="ghost">DOCS ↗</Button>
        </div>

        <Divider variant="strong" className="my-8" />

        <Stat
          label="TIME OFFLINE"
          value="00:00:00"
          meta={[
            { k: 'STREAK', v: '0d' },
            { k: 'SESSIONS', v: '0' },
          ]}
        />
      </div>
    </div>
  );
}
```

## 5. Run it

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173). You should see a brutalist page
with a headline, two buttons, a divider, and a stat block, all powered by Touch Grass tokens.

## What's included

| Package | What it gives you |
|---|---|
| `@touch-grass-ds/tokens` | CSS variables for color, spacing, type, borders. Dark theme by default. |
| `@touch-grass-ds/react` | React 19 components: Button, Input, Card, Stat, Timer, Divider, Badge, Tag, Checkbox, Switch, and composed patterns. |

## Optional: Light theme

To add light mode support, import the light theme CSS:

```tsx
import '@touch-grass-ds/tokens/dist/light.css';
```

Then toggle by setting `data-theme="light"` on `<html>`:

```tsx
document.documentElement.dataset.theme = 'light';
```

## Optional: Tailwind v4 integration

If you're using Tailwind CSS v4, import the theme file:

```css
@import 'tailwindcss';
@import '@touch-grass-ds/tokens/light';
@import '@touch-grass-ds/tokens/tailwind';
@import '@touch-grass-ds/react/styles/base.css';
```

This maps all Touch Grass tokens to Tailwind utility classes.

## Core constraints

These are non-negotiable in Touch Grass:

- **Radius = 0**: No rounded corners, ever.
- **No motion**: No transitions, no animations.
- **Tokens only**: Every color, size, border uses `var(--*)`.
- **48px tap targets**: All interactive controls meet WCAG 2.5.5.
- **Mono discipline**: Geist Mono for labels, buttons, stats. Geist Sans for body text.
