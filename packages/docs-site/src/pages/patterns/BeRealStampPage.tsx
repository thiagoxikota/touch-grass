import { BeRealStamp } from '@touch-grass/ds';

export const title = "BEREAL STAMP";

export function BeRealStampPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / BEREALSTAMP
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">BEREALSTAMP.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Three-layer overlay system for raw photos. TL: verify badge. BL: ISO timestamp. BR: hours flex block. The hours block is the part the eye sees first.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px]">
        <BeRealStamp timestamp="2026-04-13 19:42" hours="04:32:18">
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[14px] font-bold text-white tracking-[0.2em] opacity-30">PHOTO PLACEHOLDER</div>
        </BeRealStamp>
        <BeRealStamp timestamp="2026-04-13 06:11" hours="08:14:02">
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[14px] font-bold text-white tracking-[0.2em] opacity-30">PHOTO PLACEHOLDER</div>
        </BeRealStamp>
      </div>
    </div>
  );
}
