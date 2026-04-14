export function Motion() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / MOTION
      </div>
      <h1 className="text-[80px] font-black tracking-[-0.04em] mb-8 leading-[0.9]">
        ZERO.<br />
        <span className="text-[var(--color-earned)]">ANIMATION.</span>
      </h1>
      <p className="text-[18px] font-mono font-bold max-w-[60ch] leading-relaxed">
        Instant state changes. No fades. No slides. No easing. No stagger.
        The product's emotional register is discipline, not delight.
      </p>
      <div className="mt-16 border border-[var(--color-hairline)]">
        <div className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)]">
          <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">DURATION</div>
          <div className="p-4 font-mono text-[16px] font-bold">0ms · the only duration that exists</div>
        </div>
        <div className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)]">
          <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">EASING</div>
          <div className="p-4 font-mono text-[16px] font-bold">linear · also irrelevant because duration is 0</div>
        </div>
        <div className="grid grid-cols-[200px_1fr]">
          <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">EXCEPTION</div>
          <div className="p-4 font-mono text-[16px] font-bold">BeReal capture flow may use a 2-frame hard cut. No easing.</div>
        </div>
      </div>
    </div>
  );
}
