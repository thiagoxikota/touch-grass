const borders = [
  { token: 'hairline', class: 'border border-[var(--color-hairline)]', desc: '1px #1a1a1a · default structure' },
  { token: 'strong',   class: 'border-2 border-white',                   desc: '2px white · important boundaries' },
  { token: 'active',   class: 'border-2 border-[var(--color-earned)]',   desc: '2px green · active/selected' },
  { token: 'danger',   class: 'border-2 border-[var(--color-danger)]',   desc: '2px red · danger surface' },
  { token: 'disabled', class: 'border-2 border-dashed border-white',     desc: '2px DASHED white · honestly broken' },
];

export function Borders() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / BORDERS
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">FIVE BORDERS. NO ROUNDING.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Radius is locked at zero everywhere. Including avatars. The square avatar is a brand signature.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {borders.map((b) => (
          <div key={b.token} className={`p-6 ${b.class}`}>
            <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">{b.token}</div>
            <div className="font-mono text-[16px] font-bold mt-2">{b.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
