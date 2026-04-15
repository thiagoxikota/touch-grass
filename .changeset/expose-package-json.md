---
"@touch-grass-ds/react": patch
---

chore(ds): expose `package.json` in the package exports map

Adds `"./package.json": "./package.json"` to `@touch-grass-ds/react`'s exports so downstream tooling can read the version at build time:

```ts
import pkg from '@touch-grass-ds/react/package.json' with { type: 'json' };
console.log(pkg.version); // "1.0.0"
```

The Touch Grass docs site uses this to derive its `DS_VERSION` constant from the published package, so the version badge in the nav rail and the per-component meta rows can never drift from what's actually on npm.

Pure additive change — no public API impact for consumers who don't opt in.
