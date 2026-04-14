import { Button } from '../primitives/Button';
import { cn } from '../lib/cn';

export interface PatternInterruptContextItem {
  k: string;
  v: string;
}

export interface PatternInterruptModalProps {
  headline: string;
  time: string;
  status: string;
  context: PatternInterruptContextItem[];
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  className?: string;
}

export function PatternInterruptModal({
  headline,
  time,
  status,
  context,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  className,
}: PatternInterruptModalProps) {
  return (
    <div className={cn('border-2 border-danger bg-black', className)}>
      <div className="flex justify-between items-center px-5 py-3 bg-danger font-mono text-[14px] font-black text-white uppercase tracking-[0.14em]">
        <span>INTERRUPT · {time}</span>
        <span>{status}</span>
      </div>
      <div className="px-8 py-10">
        <h3 className="text-[56px] font-black leading-[1.0] tracking-[-0.025em] text-white mb-6 max-w-[14ch]">
          {headline}
        </h3>
        <div className="grid grid-cols-3 gap-8 px-6 py-5 border-2 border-white mb-7">
          {context.map((c) => (
            <div key={c.k}>
              <div className="font-mono text-[13px] font-black uppercase tracking-[0.14em] text-white">{c.k}</div>
              <div className="font-mono text-[20px] font-black text-white mt-2 leading-none">{c.v}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={onPrimary} className="flex-[2]">{primaryLabel}</Button>
          <Button variant="danger" onClick={onSecondary} className="flex-1">{secondaryLabel}</Button>
        </div>
      </div>
    </div>
  );
}
