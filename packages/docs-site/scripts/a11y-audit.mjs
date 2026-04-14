#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Run axe-core against every docs-site page. Emits a JSON report +
 * a human-readable summary to stdout. Prereq: dev server on localhost:5173.
 *
 * Run from packages/docs-site/:
 *   node scripts/a11y-audit.mjs
 */
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = join(ROOT, '.github', 'assets', 'a11y');
const BASE = process.env.BASE_URL || 'http://localhost:5173';

const PAGES = [
  ['home', '/'],
  ['foundations-color', '/foundations/color'],
  ['foundations-typography', '/foundations/typography'],
  ['foundations-spacing', '/foundations/spacing'],
  ['foundations-borders', '/foundations/borders'],
  ['foundations-grid', '/foundations/grid'],
  ['foundations-motion', '/foundations/motion'],
  ['foundations-states', '/foundations/states'],
  ['foundations-brand', '/foundations/brand'],
  ['foundations-accessibility', '/foundations/accessibility'],
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
  ['pattern-leaderboard-row', '/patterns/leaderboard-row'],
  ['pattern-focus-timer-display', '/patterns/focus-timer-display'],
  ['pattern-bereal-stamp', '/patterns/bereal-stamp'],
  ['pattern-pattern-interrupt-modal', '/patterns/pattern-interrupt-modal'],
  ['pattern-session-summary-card', '/patterns/session-summary-card'],
  ['pattern-sparkline', '/patterns/sparkline'],
  ['pattern-toast', '/patterns/toast'],
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });
  const page = await ctx.newPage();

  const report = {
    tool: 'axe-core',
    base: BASE,
    ranAt: new Date().toISOString(),
    pages: [],
    totals: { pages: 0, violations: 0, passes: 0 },
  };

  for (const [slug, path] of PAGES) {
    const url = BASE + path;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const row = {
        slug,
        path,
        violations: results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.length,
          targets: v.nodes.map((n) => ({
            selector: n.target?.[0] ?? '',
            summary: n.failureSummary,
            html: (n.html || '').slice(0, 200),
          })),
          helpUrl: v.helpUrl,
        })),
        passes: results.passes.length,
      };
      report.pages.push(row);
      report.totals.pages += 1;
      report.totals.violations += row.violations.length;
      report.totals.passes += row.passes;
      const mark = row.violations.length === 0 ? 'OK  ' : `FAIL`;
      const tally = row.violations.length === 0 ? '' : ` — ${row.violations.map((v) => `${v.id}(${v.nodes})`).join(', ')}`;
      console.log(`${mark} ${slug}${tally}`);
    } catch (err) {
      console.error(`ERROR ${slug} — ${err.message}`);
      report.pages.push({ slug, path, error: err.message });
    }
  }

  await ctx.close();
  await browser.close();

  const file = join(OUT_DIR, 'report.json');
  await writeFile(file, JSON.stringify(report, null, 2));
  console.log(`\nreport → ${file}`);
  console.log(`pages: ${report.totals.pages}  violations: ${report.totals.violations}  passes: ${report.totals.passes}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
