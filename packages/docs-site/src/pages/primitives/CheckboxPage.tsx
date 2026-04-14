import { useState } from 'react';
import { Checkbox } from '../../../../ds/src';

export function CheckboxPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-8 max-w-2xl text-white">
      <h1 className="font-mono text-h1 font-black text-earned uppercase mb-4 tracking-[0.12em]">CHECKBOX</h1>
      <p className="font-sans text-body mb-12">
        A brutally honest checkbox. Hard SVG path strokes. 0 radius. 0 hover easing.
      </p>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">DEFAULT</h2>
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="AGREE TO TERMS" />
        </div>

        <div>
          <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">DISABLED</h2>
          <div className="flex gap-6">
            <Checkbox disabled label="UNAVAILABLE" />
            <Checkbox disabled checked label="PERMANENTLY CHECKED" />
          </div>
        </div>

        <div>
          <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">ERROR</h2>
          <Checkbox error label="REQUIRED FIELD" />
        </div>
      </div>
    </div>
  );
}
