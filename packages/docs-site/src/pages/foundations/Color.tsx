const swatches = [
  { token: '--color-bg',       hex: '#000000', role: 'BACKGROUND',     onLight: false },
  { token: '--color-fg',       hex: '#FFFFFF', role: 'TEXT (ALWAYS)',  onLight: true  },
  { token: '--color-earned',   hex: '#A6FF00', role: 'EARNED · SCARCE', onLight: true },
  { token: '--color-danger',   hex: '#FF3B3B', role: 'DANGER · BG ONLY', onLight: false },
  { token: '--color-hairline', hex: '#1A1A1A', role: 'BORDER · NEVER TEXT', onLight: false },
  { token: '--color-bg-alt',   hex: '#0A0A0A', role: 'INSET · NEVER TEXT', onLight: false },
];

export function Color() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / COLOR
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">FOUR COLORS. TWO STRUCTURAL.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Nothing else. No greys. No tertiary palette. No brand secondary. Hierarchy is built from size and weight, not from dimming.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-hairline)] border border-[var(--color-hairline)]">
        {swatches.map((s) => (
          <div key={s.token} style={{ background: s.hex }} className="p-8 min-h-[200px] flex flex-col justify-between">
            <div className={`font-mono text-[13px] font-black uppercase tracking-[0.12em] ${s.onLight ? 'text-black' : 'text-white'}`}>
              {s.role}
            </div>
            <div>
              <div className={`font-mono text-[24px] font-black ${s.onLight ? 'text-black' : 'text-white'}`}>{s.hex}</div>
              <div className={`font-mono text-[13px] font-black uppercase tracking-[0.12em] mt-1 ${s.onLight ? 'text-black' : 'text-white'}`}>
                {s.token}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">RULES</h2>
      <div className="border border-[var(--color-hairline)]">
        {[
          ['NO GREY TEXT',    'Hierarchy is size + weight. #666, #999, opacity tricks — banned.'],
          ['RED IS BG ONLY',  'Bare red text on black is banned. White text always sits on red.'],
          ['GREEN IS SCARCE', 'Max one green hit per component. Stacking greens is banned.'],
          ['REVERSE PAIRINGS','Black-on-green and white-on-red are the only allowed reverses.'],
        ].map(([rule, desc]) => (
          <div key={rule} className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)] last:border-b-0">
            <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">
              {rule}
            </div>
            <div className="p-4 text-[16px] font-mono font-semibold">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
