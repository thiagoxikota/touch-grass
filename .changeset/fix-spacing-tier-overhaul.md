---
"@touch-grass-ds/react": minor
---

fix(ds): spacing tier overhaul — lock the 4/8/12/16/20/24/32 contract across primitives

Every interactive primitive shared the same vocabulary (border-2, uppercase mono, bold) so spacing was the only tier signal — and the spacing was too close. Buttons read as squares on short labels, Tag and Button were near-siblings, Input text floated off-center, Checkbox and Switch failed their own 48px tap-target rule.

This is a visual-only refinement. Public APIs are unchanged — every primitive accepts the same props as before. But every component that renders a control has new dimensions, so consumers should expect visible layout shifts.

**The new tier table (all values snap to `space.json`):**

| Tier     | Role           | Height                          | Padding-X | Padding-Y | Text  | Border |
| -------- | -------------- | ------------------------------- | --------- | --------- | ----- | ------ |
| Button   | Primary action | `min-h-12` (48) `min-w-32` (128)| `px-6`    | `py-3`    | 14px  | 2px    |
| Input    | Text entry     | `min-h-12` (48)                 | `px-5`    | `py-3`    | 15px  | 2px    |
| Tag      | Filter chip    | `min-h-8` (32) + 48px hit area  | `px-3`    | `py-2`    | 12px  | 1px    |
| Badge md | Static label   | `min-h-6` (24)                  | `px-2`    | `py-1`    | 11px  | 2px    |
| Badge sm | Static label   | `min-h-4` (16)                  | `px-2`    | `py-1`    | 10px  | 2px    |

**What this fixes:**

- **Button** — `min-w-32` ends the "square button" problem on short labels like `GO` / `OK`. `leading-none` + `gap-2` align text and any future icon children. `px-6` gives the CTA real horizontal authority.
- **Input** — `text-15 leading-none` centers the caret inside the 48px box (was floating high). `px-5` gives the placeholder room to breathe.
- **Tag** — drops to a 32px chip with **1px** border so it visibly de-escalates from Button's 2px. WCAG 2.5.5 still satisfied via an invisible 48px hit area on the `:before` pseudo-element (32 + 8 + 8 = 48). Tags now read as chips, not as second-class buttons.
- **Badge** — tighter sizes, explicit `min-h` floor. `md=24px`, `sm=16px`. Clearly decorative, never confused with a Tag.
- **Checkbox** — visible 24px box stays, but the wrapping `<label>` gains `min-h-12` so the entire row is a 48px tap target. Also: `stroke="black"` on the X-check SVG → `currentColor` (token discipline — the only hardcoded color in primitives is now gone).
- **Switch** — same treatment: 56×32 visual control, 48px tap row via `min-h-12` on the wrapping label.
- **Card** — header padding unified to `p-6` to match the body. Was `px-5 py-4` / `p-6` mismatch.
- **Stat** — random `mb-3 mt-6 pt-5 mt-1` magic numbers snapped to the scale (`mb-4 mt-6 pt-6 mt-2`).

**Locked in via:**

- New regression tests on Button / Input / Tag / Badge asserting the exact contract (min-h, min-w, px, leading-none, border weight, hit-area pseudo).
- A new `TIERS` table on the Spacing foundation page that publishes the contract — every future primitive must snap to one of those rows. Includes a footnote explaining the Tag/Badge sub-48 carve-out (Tag has a hit-area pseudo; Badge is non-interactive).
- `VariantsMatrix` cell padding bumped from `p-4` → `p-6` so demo grids breathe and don't squeeze the new component sizes.
- Stale `tapTarget` metadata on TagPage (`36px`) and CheckboxPage (`24px + 12px gap`) updated to reflect the real contract.

Token violations fixed in the same pass:

- `Checkbox.tsx` — removed the hardcoded `stroke="black"` (was the only remaining hex outside the `#000` allowance for hover box-shadows).

No API changes. No new dependencies. All 77 vitest tests passing (4 new contract tests added).
