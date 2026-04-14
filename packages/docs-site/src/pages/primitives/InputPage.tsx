import { Input } from '@touch-grass/ds';

export function InputPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / INPUT
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">INPUT.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Text or numeric (mono). 2px white border default. Green hard-halo on focus. Dashed when disabled. Red border for error.
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-[700px]">
        <div>
          <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">DEFAULT (TEXT)</div>
          <Input placeholder="@HANDLE" />
        </div>
        <div>
          <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">NUMERIC</div>
          <Input variant="numeric" placeholder="00:00:00" />
        </div>
        <div>
          <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">ERROR</div>
          <Input error placeholder="@HANDLE" defaultValue="invalid" />
        </div>
        <div>
          <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] mb-2">DISABLED</div>
          <Input disabled placeholder="@HANDLE" />
        </div>
      </div>
    </div>
  );
}
