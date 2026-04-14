import { Divider } from '@touch-grass/ds';

export function DividerPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / DIVIDER
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">DIVIDER.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        1px hairline or 2px strong. Horizontal or vertical. Quiet structure.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">HAIRLINE HORIZONTAL</h2>
      <div className="mb-12">
        <p className="font-mono text-[16px] font-semibold text-white mb-4">Above the line.</p>
        <Divider />
        <p className="font-mono text-[16px] font-semibold text-white mt-4">Below the line.</p>
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">STRONG HORIZONTAL</h2>
      <div className="mb-12">
        <p className="font-mono text-[16px] font-semibold text-white mb-4">Above the line.</p>
        <Divider variant="strong" />
        <p className="font-mono text-[16px] font-semibold text-white mt-4">Below the line.</p>
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">VERTICAL</h2>
      <div className="flex items-stretch gap-6 h-24 border border-[var(--color-hairline)] p-4">
        <p className="font-mono text-[16px] font-semibold text-white">LEFT</p>
        <Divider orientation="vertical" />
        <p className="font-mono text-[16px] font-semibold text-white">CENTER</p>
        <Divider variant="strong" orientation="vertical" />
        <p className="font-mono text-[16px] font-semibold text-white">RIGHT</p>
      </div>
    </div>
  );
}
