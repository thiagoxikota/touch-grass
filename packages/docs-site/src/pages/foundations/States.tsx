const states = [
  { name: 'DEFAULT',  desc: 'Solid neon fill, black text, 2px neon border.' },
  { name: 'HOVER',    desc: 'Inset 2px black bevel cut into the button. Instant.' },
  { name: 'FOCUS',    desc: '2px white outline at 3px offset. Hard halo, never glow.' },
  { name: 'DISABLED', desc: '2px DASHED white border, black bg, white text. Looks broken on purpose.' },
  { name: 'LOADING',  desc: '2px solid white border, label changes to verb-ing form, prepended with █▌. No spinner.' },
];

export function States() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / STATES
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">FIVE STATES. NO IMPLICITS.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Every interactive component must define all five. No fallbacks.
      </p>
      <div className="border border-[var(--color-hairline)]">
        {states.map((s) => (
          <div key={s.name} className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)] last:border-b-0">
            <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">{s.name}</div>
            <div className="p-4 text-[16px] font-mono font-semibold">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
