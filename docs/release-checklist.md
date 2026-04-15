# Release checklist

Use this checklist when shipping token/DS updates.

## 1) Validation

Run from repo root:

```bash
corepack pnpm validate:all
```

## 2) iOS snapshot fixtures (when UI changed)

Run on an iOS-capable machine/runner:

```bash
UPDATE_TG_GOLDENS=1 swift test
swift test
```

Then commit `packages/ios/Tests/TouchGrassUITests/Fixtures/leaderboard-snapshot-hashes.json`.

## 3) Parity and docs

1. Update `docs/ios-parity.md` for any component additions/removals.
2. Update `CHANGELOG.md`.
3. Confirm README examples still compile.

## 4) Publish / downstream sync

Follow existing token/component release flow and downstream sync requirements before tagging.
