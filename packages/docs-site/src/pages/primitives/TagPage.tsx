import { useState } from 'react';
import { Tag } from '@touch-grass/ds';

const FILTERS = ['DAILY', 'WEEKLY', 'MONTHLY', 'ALL TIME'];

export function TagPage() {
  const [active, setActive] = useState('WEEKLY');
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PRIMITIVES / TAG
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">TAG.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Filter chip. Default white border, active green fill. Click to toggle.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">INTERACTIVE</h2>
      <div className="flex gap-2 mb-12">
        {FILTERS.map((f) => (
          <Tag key={f} active={active === f} onClick={() => setActive(f)}>{f}</Tag>
        ))}
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">STATES</h2>
      <div className="flex gap-2">
        <Tag>DEFAULT</Tag>
        <Tag active>ACTIVE</Tag>
      </div>
    </div>
  );
}
