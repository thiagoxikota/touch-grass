import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface BeRealStampProps {
  timestamp: string;
  hours: string;
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
}

export function BeRealStamp({ timestamp, hours, src, alt, children, className }: BeRealStampProps) {
  return (
    <div className={cn('relative aspect-square bg-[var(--color-bg-alt)] border border-[var(--color-hairline)] overflow-hidden', className)}>
      {src ? (
        <img src={src} alt={alt ?? ''} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        children
      )}
      <div className="absolute top-4 left-4 px-3 py-2 bg-black border-2 border-[var(--color-earned)] font-mono text-[13px] font-black text-[var(--color-earned)] uppercase tracking-[0.12em]">
        // VERIFIED OFFLINE
      </div>
      <div className="absolute bottom-4 left-4 px-3 py-2 bg-black border-2 border-white font-mono text-[13px] font-black text-white uppercase tracking-[0.1em]">
        {timestamp}
      </div>
      <div className="absolute bottom-4 right-4 px-4 py-3 bg-[var(--color-earned)] text-black font-mono font-black leading-none">
        <div className="text-[28px]">{hours}</div>
        <div className="text-[11px] font-black mt-1.5 tracking-[0.1em]">UNTETHERED</div>
      </div>
    </div>
  );
}
