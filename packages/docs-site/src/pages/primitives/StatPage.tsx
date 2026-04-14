import { Stat } from '@touch-grass/ds';

export function StatPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / STAT
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">STAT.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        The headline number. Hero variant for the home screen. Inline for badges and meta strips. Sizes sm/md/lg/xl map to type tokens.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">HERO + META</h2>
      <div className="border border-[var(--color-hairline)] p-8 mb-12">
        <Stat
          label="UNTETHERED TODAY"
          value="04:32:18"
          meta={[
            { k: 'VS YESTERDAY', v: '+47%' },
            { k: 'STREAK', v: '12 DAYS' },
            { k: 'RANK', v: '#17' },
          ]}
        />
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">HERO SIZES</h2>
      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="border border-[var(--color-hairline)] p-6">
          <Stat label="LG (80PX)" value="04:32:18" size="lg" />
        </div>
        <div className="border border-[var(--color-hairline)] p-6">
          <Stat label="MD (64PX)" value="04:32:18" size="md" />
        </div>
        <div className="border border-[var(--color-hairline)] p-6">
          <Stat label="XL (96PX)" value="04:32" size="xl" />
        </div>
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">INLINE</h2>
      <div className="border border-[var(--color-hairline)] p-6">
        <p className="font-mono text-[16px] font-semibold text-white">
          You are <Stat variant="inline" value="#17" /> on a <Stat variant="inline" value="12D" /> streak.
        </p>
      </div>
    </div>
  );
}
