---
"@touch-grass-ds/react": minor
---

feat(ds): `asChild` prop on `Button` and `Badge` via Radix Slot

Both `Button` and `Badge` accept an optional `asChild` boolean that renders the component's classes and forwarded props onto their single child instead of the default `<button>` / `<span>`. Powered by `@radix-ui/react-slot`, which is already a runtime dependency of `@touch-grass-ds/react`.

This unblocks the common "styled anchor" / "styled router link" pattern without having to wrap the component in a parent or re-implement every class list:

```tsx
// before — wrapper anchor, Button becomes non-clickable styling
<a href="/primitives/button">
  <Button variant="ghost">BROWSE PRIMITIVES ↗</Button>
</a>

// after — the anchor IS the button, one element, one focus ring
<Button asChild variant="ghost">
  <a href="/primitives/button">BROWSE PRIMITIVES ↗</a>
</Button>
```

Same shape for `Badge`, useful when a badge needs to be a link:

```tsx
<Badge asChild variant="earned">
  <a href="https://www.npmjs.com/package/@touch-grass-ds/react">v1.0.1 ↗</a>
</Badge>
```

Implementation notes:

- `Button` is a native `<button>` by default and supports the HTML `disabled` attribute. When `asChild` is true the rendered element is arbitrary (commonly `<a>`, which has no `disabled`), so `disabled` is translated to `aria-disabled="true"` plus a `pointer-events-none` class on the composed className. Keyboard handling remains the consumer's responsibility for non-button elements.
- Both components now use `forwardRef` end-to-end, so refs reach the rendered element whether or not `asChild` is set.
- No API break: existing `<Button>` / `<Badge>` call sites continue to work unchanged. Props, variants, and class output are identical when `asChild` is falsy.
