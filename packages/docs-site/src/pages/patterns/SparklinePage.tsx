import { Sparkline } from '../../../../ds/src';

export const title = "SPARKLINE";

export function SparklinePage() {
  const mockWeek = [12, 45, 80, 20, 110, 50, 95];
  
  return (
    <div className="p-8 max-w-2xl text-white">
      <h1 className="font-mono text-h1 font-black text-earned uppercase mb-4 tracking-[0.12em]">
        SPARKLINE
      </h1>
      <p className="font-sans text-body mb-12 border-l-4 border-earned pl-4">
        A brutalist implementation of Data-Viz. No heavy SVGs. No animated paths. Pure DOM blocks scaling linearly.
      </p>

      <div className="flex flex-col gap-12">
        <div>
          <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">
            WEEKLY FOCUS (MINUTES)
          </h2>
          <div className="border border-hairline p-4 w-64 bg-black">
             <Sparkline data={mockWeek} />
          </div>
        </div>

        <div>
          <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">
            WITH DANGER THRESHOLD
          </h2>
          <div className="border border-hairline p-4 w-64 bg-black">
             <Sparkline data={mockWeek} dangerThreshold={90} />
          </div>
        </div>
      </div>
    </div>
  );
}
