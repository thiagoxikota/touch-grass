import type { ReactNode } from 'react';

/**
 * Signature motif: a 2px left rule for section headings.
 * Uses hairline-strong token for the rule, mono/uppercase for the label.
 * This is the repeatable "minimal brutal" marker across all recipes.
 */
export function SectionHeading({
  children,
  sub,
}: {
  children: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="border-l-2 border-[var(--color-hairline-strong)] pl-4 mb-6">
      <h3 className="font-mono text-[14px] font-black uppercase tracking-[0.12em] text-[var(--color-fg)]">
        {children}
      </h3>
      {sub && (
        <p className="font-mono text-[12px] font-semibold text-[var(--color-muted)] mt-1 tracking-[0.04em]">
          {sub}
        </p>
      )}
    </div>
  );
}
