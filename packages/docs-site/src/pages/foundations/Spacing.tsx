const scale = [
  { token: 'space-1',  px: 4   },
  { token: 'space-2',  px: 8   },
  { token: 'space-3',  px: 12  },
  { token: 'space-4',  px: 16  },
  { token: 'space-5',  px: 20  },
  { token: 'space-6',  px: 24  },
  { token: 'space-8',  px: 32  },
  { token: 'space-12', px: 48  },
  { token: 'space-16', px: 64  },
  { token: 'space-24', px: 96  },
  { token: 'space-32', px: 128 },
];

export function Spacing() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / SPACING
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">4PX BASE. NO OFF-GRID.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Density is the brand. Outer padding floors at 16px mobile, 24px desktop.
      </p>
      <div className="border border-[var(--color-hairline)]">
        {scale.map((s) => (
          <div key={s.token} className="grid grid-cols-[180px_120px_1fr] border-b border-[var(--color-hairline)] last:border-b-0 items-center">
            <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">{s.token}</div>
            <div className="p-4 font-mono text-[16px] font-black border-r border-[var(--color-hairline)]">{s.px}px</div>
            <div className="p-4">
              <div style={{ width: s.px, height: 24, background: 'var(--color-earned)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
