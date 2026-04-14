---
"@touch-grass-ds/react": patch
---

fix(ds): `Switch` checked thumb is now visibly distinct from the checked track

The v1.0.0 `Switch` rendered its thumb as `bg-earned` sitting inside a `border-earned` track when checked. Both were the same lime, so position was the only affordance — and anyone with reduced motion sensitivity, color anomalies, or simply low attention couldn't tell ON from OFF at a glance. axe didn't catch it because axe doesn't measure same-color UI elements against each other.

The fix flips the checked thumb to `bg-black border-earned`: a black rectangle with a 2px lime border, 9.1:1 against the lime track border. OFF state is unchanged (white thumb, left side, white-bordered track). The two states are now unambiguous regardless of position, color vision, or motion.

No API change. Purely a visual / contrast fix inside the component's internal thumb element.
