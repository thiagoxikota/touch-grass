import { Button } from '@touch-grass/ds';

const VARIANTS = ['primary', 'ghost', 'danger'] as const;

export function ButtonPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / BUTTON
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">BUTTON.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Three variants. Five states. 48px tap target floor. Loading uses block characters, never spinners.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">VARIANTS × STATES</h2>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] border border-[var(--color-hairline)]">
        <div className="p-4 border-r border-b border-[var(--color-hairline)]" />
        {['DEFAULT', 'HOVER', 'FOCUS', 'DISABLED', 'LOADING'].map((s) => (
          <div key={s} className="p-4 border-r border-b border-[var(--color-hairline)] last:border-r-0 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)]">{s}</div>
        ))}
        {VARIANTS.map((v) => [
          <div key={`${v}-label`} className="p-4 border-r border-b border-[var(--color-hairline)] font-mono text-[13px] font-black uppercase tracking-[0.12em] text-white">{v}</div>,
          <div key={`${v}-default`} className="p-4 border-r border-b border-[var(--color-hairline)] flex items-center"><Button variant={v}>START</Button></div>,
          <div key={`${v}-hover`} className="p-4 border-r border-b border-[var(--color-hairline)] flex items-center"><Button variant={v} className="[box-shadow:inset_0_0_0_2px_#000]">START</Button></div>,
          <div key={`${v}-focus`} className="p-4 border-r border-b border-[var(--color-hairline)] flex items-center"><Button variant={v} className="outline-2 outline-white [outline-offset:3px] outline-solid">START</Button></div>,
          <div key={`${v}-disabled`} className="p-4 border-r border-b border-[var(--color-hairline)] flex items-center"><Button variant={v} disabled>START</Button></div>,
          <div key={`${v}-loading`} className="p-4 border-b border-[var(--color-hairline)] flex items-center"><Button variant={v} loading loadingLabel="SYNCING">START</Button></div>,
        ])}
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">USAGE</h2>
      <pre className="border border-[var(--color-hairline)] p-6 font-mono text-[13px] text-white overflow-x-auto">{`import { Button } from '@touch-grass/ds';

<Button>START FOCUS</Button>
<Button variant="ghost">CANCEL</Button>
<Button variant="danger">END SESSION</Button>
<Button loading loadingLabel="SYNCING">START FOCUS</Button>
<Button disabled>START FOCUS</Button>`}</pre>
    </div>
  );
}
