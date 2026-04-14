import { __NAME__ } from '../../../../ds/src';

export const title = "__NAMECAP__";

export function __NAME__Page() {
  return (
    <div className="p-8 max-w-2xl text-white">
      <h1 className="font-mono text-h1 font-black text-earned uppercase mb-4 tracking-[0.12em]">
        __NAMECAP__
      </h1>
      <p className="font-sans text-body mb-12">
        A brutalist implementation of __NAME__.
      </p>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">
            DEFAULT
          </h2>
          <__NAME__ />
        </div>
      </div>
    </div>
  );
}
