import { Badge } from '@touch-grass/ds';

const VARIANTS = ['earned', 'neutral', 'danger'] as const;
const SIZES = ['sm', 'md'] as const;

export function BadgePage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / BADGE
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">BADGE.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Inline status indicator. Three variants, two sizes. Use earned for KING / TOP / WIN. Neutral by default.
      </p>

      <div className="grid grid-cols-[120px_1fr_1fr] border border-[var(--color-hairline)]">
        <div className="p-4 border-r border-b border-[var(--color-hairline)]" />
        {SIZES.map((s) => (
          <div key={s} className="p-4 border-r border-b border-[var(--color-hairline)] last:border-r-0 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">{s.toUpperCase()}</div>
        ))}
        {VARIANTS.map((v) => [
          <div key={`${v}-l`} className="p-4 border-r border-b border-[var(--color-hairline)] font-mono text-[13px] font-black uppercase tracking-[0.12em] text-white">{v}</div>,
          ...SIZES.map((s) => (
            <div key={`${v}-${s}`} className="p-4 border-r border-b border-[var(--color-hairline)] last:border-r-0 flex items-center"><Badge variant={v} size={s}>KING</Badge></div>
          )),
        ])}
      </div>
    </div>
  );
}
