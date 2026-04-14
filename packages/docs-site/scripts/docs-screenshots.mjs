#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Capture screenshots of every docs-site page at 3 viewports.
 * Run via: cd packages/ds && node ../../scripts/docs-screenshots.mjs
 *
 * Prereqs: dev server running at http://localhost:5173
 * Output: .github/assets/docs-v2/<viewport>/<slug>.png
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = join(ROOT, '.github', 'assets', 'docs-v2');

const BASE = process.env.BASE_URL || 'http://localhost:5173';

const PAGES = [
  ['home', '/'],
  // Foundations
  ['foundations-color', '/foundations/color'],
  ['foundations-typography', '/foundations/typography'],
  ['foundations-spacing', '/foundations/spacing'],
  ['foundations-borders', '/foundations/borders'],
  ['foundations-grid', '/foundations/grid'],
  ['foundations-motion', '/foundations/motion'],
  ['foundations-states', '/foundations/states'],
  ['foundations-brand', '/foundations/brand'],
  ['foundations-accessibility', '/foundations/accessibility'],
  // Primitives
  ['primitive-button', '/primitives/button'],
  ['primitive-input', '/primitives/input'],
  ['primitive-badge', '/primitives/badge'],
  ['primitive-card', '/primitives/card'],
  ['primitive-stat', '/primitives/stat'],
  ['primitive-checkbox', '/primitives/checkbox'],
  ['primitive-switch', '/primitives/switch'],
  ['primitive-tag', '/primitives/tag'],
  ['primitive-divider', '/primitives/divider'],
  ['primitive-timer', '/primitives/timer'],
  // Patterns
  ['pattern-leaderboard-row', '/patterns/leaderboard-row'],
  ['pattern-focus-timer-display', '/patterns/focus-timer-display'],
  ['pattern-bereal-stamp', '/patterns/bereal-stamp'],
  ['pattern-pattern-interrupt-modal', '/patterns/pattern-interrupt-modal'],
  ['pattern-session-summary-card', '/patterns/session-summary-card'],
  ['pattern-sparkline', '/patterns/sparkline'],
  ['pattern-toast', '/patterns/toast'],
];

const VIEWPORTS = [
  { name: '390', width: 390, height: 844 }, // iPhone 14 Pro
  { name: '768', width: 768, height: 1024 }, // iPad portrait
  { name: '1440', width: 1440, height: 900 }, // Desktop
];

async function main() {
  console.log(`[screenshots] BASE=${BASE}`);
  console.log(`[screenshots] OUT=${OUT}`);

  for (const vp of VIEWPORTS) {
    await mkdir(join(OUT, vp.name), { recursive: true });
  }

  const browser = await chromium.launch();
  try {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
        colorScheme: 'dark',
      });
      const page = await ctx.newPage();

      for (const [slug, path] of PAGES) {
        const url = BASE + path;
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
          // Small settle — not for animation (there is none) but to let fonts paint.
          await page.waitForLoadState('domcontentloaded');
          const file = join(OUT, vp.name, `${slug}.png`);
          await page.screenshot({ path: file, fullPage: true });
          console.log(`[ok]   ${vp.name} ${slug}`);
        } catch (err) {
          console.error(`[FAIL] ${vp.name} ${slug} — ${err.message}`);
        }
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
  console.log('[screenshots] done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
