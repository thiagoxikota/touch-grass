export function Grid() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / GRID
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">12 / 8 / 4.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        12-col desktop. 8-col tablet. 4-col mobile. 4px gutter base.
      </p>

      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] mb-2 text-white">DESKTOP · 12 COL · 16PX GUTTER · 1280 MAX</div>
      <div className="grid grid-cols-12 gap-4 border border-[var(--color-hairline)] p-4 mb-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-16 border-2 border-[var(--color-earned)] bg-[rgba(166,255,0,0.08)] flex items-center justify-center font-mono text-[13px] font-black text-[var(--color-earned)]">{i + 1}</div>
        ))}
      </div>

      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] mb-2 text-white">TABLET · 8 COL · 12PX GUTTER</div>
      <div className="grid grid-cols-8 gap-3 border border-[var(--color-hairline)] p-3 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 border-2 border-[var(--color-earned)] bg-[rgba(166,255,0,0.08)] flex items-center justify-center font-mono text-[13px] font-black text-[var(--color-earned)]">{i + 1}</div>
        ))}
      </div>

      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] mb-2 text-white">MOBILE · 4 COL · 8PX GUTTER</div>
      <div className="grid grid-cols-4 gap-2 border border-[var(--color-hairline)] p-2 max-w-[375px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 border-2 border-[var(--color-earned)] bg-[rgba(166,255,0,0.08)] flex items-center justify-center font-mono text-[13px] font-black text-[var(--color-earned)]">{i + 1}</div>
        ))}
      </div>
    </div>
  );
}
