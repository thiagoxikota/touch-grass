import { useState } from 'react';
import { Switch } from '../../../../ds/src';

export function SwitchPage() {
  const [active, setActive] = useState(false);

  return (
    <div className="p-8 max-w-2xl text-white">
      <h1 className="font-mono text-h1 font-black text-earned uppercase mb-4 tracking-[0.12em]">SWITCH</h1>
      <p className="font-sans text-body mb-12">
        A brutalist switch mechanism. No sliding animations. Thumb position snaps instantly.
      </p>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">STATES</h2>
          <div className="flex flex-col gap-6">
            <Switch checked={active} onChange={(e) => setActive(e.target.checked)} label="TOGGLE NOTIFICATIONS" />
          </div>
        </div>

        <div>
          <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">DISABLED</h2>
          <div className="flex gap-6">
            <Switch disabled label="CANNOT CHANGE" />
            <Switch disabled checked label="CANNOT DISABLE" />
          </div>
        </div>
      </div>
    </div>
  );
}
