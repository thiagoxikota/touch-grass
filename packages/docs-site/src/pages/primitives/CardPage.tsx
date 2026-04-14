import { Card } from '@touch-grass/ds';

export function CardPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / CARD
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">CARD.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Container with hairline border. Optional header slot. Inset variant uses alt background for nested content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <p className="font-mono text-[16px] font-semibold text-white">Default card. Hairline border. Black bg.</p>
        </Card>
        <Card variant="inset">
          <p className="font-mono text-[16px] font-semibold text-white">Inset card. #0a0a0a bg. Use inside another card.</p>
        </Card>
        <Card header={<span>FOCUS / TODAY</span>}>
          <p className="font-mono text-[16px] font-semibold text-white">Card with header. Header is mono uppercase, separated by hairline.</p>
        </Card>
        <Card variant="inset" header={<span>SESSION 04</span>}>
          <p className="font-mono text-[16px] font-semibold text-white">Inset + header combo.</p>
        </Card>
      </div>
    </div>
  );
}
