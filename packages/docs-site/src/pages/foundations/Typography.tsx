const sizes = [
  { token: 'stat-lg',  size: 80, family: 'mono', sample: '04:32:18' },
  { token: 'stat-md',  size: 64, family: 'mono', sample: '04:32:18' },
  { token: 'display',  size: 56, family: 'sans', sample: '47 minutes wasted.' },
  { token: 'h1',       size: 32, family: 'sans', sample: 'Page title' },
  { token: 'h2',       size: 24, family: 'sans', sample: 'Section title' },
  { token: 'h3',       size: 18, family: 'sans', sample: 'Component title' },
  { token: 'row-num',  size: 22, family: 'mono', sample: '62:14:08' },
  { token: 'row-name', size: 18, family: 'sans', sample: 'David H.' },
  { token: 'body',     size: 16, family: 'sans', sample: 'Body floor — never smaller.' },
  { token: 'label',    size: 13, family: 'mono', sample: 'UNTETHERED TODAY' },
];

export function Typography() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / TYPOGRAPHY
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">GEIST + GEIST MONO.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Two families. Numbers always mono. Body floors at 16px. Labels at 13px mono uppercase.
      </p>

      <div className="border border-[var(--color-hairline)]">
        {sizes.map((s) => (
          <div key={s.token} className="grid grid-cols-[180px_1fr] border-b border-[var(--color-hairline)] last:border-b-0 items-center">
            <div className="p-4 border-r border-[var(--color-hairline)]">
              <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">{s.token}</div>
              <div className="font-mono text-[13px] font-black mt-1">{s.size}px · {s.family.toUpperCase()}</div>
            </div>
            <div
              className="p-6"
              style={{
                fontSize: `${s.size}px`,
                fontFamily: s.family === 'mono' ? "'Geist Mono', monospace" : "Geist, sans-serif",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: s.size > 40 ? '-0.04em' : s.token === 'label' ? '0.12em' : '0',
                textTransform: s.token === 'label' ? 'uppercase' : 'none',
              }}
            >
              {s.sample}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">WEIGHTS</h2>
      <div className="grid grid-cols-4 gap-4">
        {[600, 700, 800, 900].map((w) => (
          <div key={w} className="border border-[var(--color-hairline)] p-6">
            <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">WEIGHT {w}</div>
            <div style={{ fontWeight: w, fontSize: 32 }}>Aa Bb Cc</div>
          </div>
        ))}
      </div>
    </div>
  );
}
