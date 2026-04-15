# iOS vs Web parity matrix

This file tracks intentionally-shipped parity and known gaps between `@touch-grass-ds/react` and `TouchGrassUI`.

## Primitives

| Primitive | Web (`@touch-grass-ds/react`) | iOS (`TouchGrassUI`) | Status |
|---|---|---|---|
| Button | ✅ | ✅ (`TGButton`) | In parity |
| Input | ✅ | ❌ | Gap |
| Badge | ✅ | ✅ (`TGBadge`) | In parity |
| Card | ✅ | ✅ (`TGCard`) | In parity |
| Stat | ✅ | ✅ (`TGStat`) | In parity |
| Timer | ✅ | ✅ (`TGTimer`) | In parity |
| Tag | ✅ | ❌ | Gap |
| Divider | ✅ | ❌ | Gap |
| Checkbox | ✅ | ❌ | Gap |
| Switch | ✅ | ❌ | Gap |

## Social patterns

| Pattern | Web | iOS | Status |
|---|---|---|---|
| LeaderboardRow | ✅ | ✅ (`TGLeaderboardRow`) | In parity |
| FocusTimerDisplay | ✅ | ⚠️ (covered by `TGTimer` + screen composition) | Partial |
| SessionSummaryCard | ✅ | ⚠️ (`TGStreakProofCard`) | Partial |
| Interrupt modal | ✅ | ❌ | Gap |

## Rules for future work

1. New web primitives/patterns should either add iOS parity in the same milestone or explicitly document a gap here.
2. A gap is acceptable only if there is a product reason (not implementation convenience).
3. This file must be updated in every release touching DS components.
