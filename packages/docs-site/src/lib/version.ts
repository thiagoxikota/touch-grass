/**
 * Single source of truth for the DS version shown in the docs site.
 *
 * Read from @touch-grass-ds/react's package.json at build time so the on-page
 * `version` meta and the Nav rail badge can never drift from the actually
 * published package. Bumping the package via changesets automatically updates
 * every reference here on the next build.
 *
 * Vite resolves the JSON import statically — no runtime cost.
 */
import pkg from '@touch-grass-ds/react/package.json' with { type: 'json' };

export const DS_VERSION = `v${pkg.version}`;
