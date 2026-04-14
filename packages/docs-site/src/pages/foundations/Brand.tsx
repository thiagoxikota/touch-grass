import TouchGrassLogo from '@brand/touch-grass/logo.svg?react';
import TouchGrassIcon from '@brand/touch-grass/icon.svg?react';

const accent = { color: 'var(--color-earned)' };

export function Brand() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // FOUNDATIONS / BRAND
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">ONE MARK. ONE PALETTE.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        Touch Grass is a product-agnostic design system. The only brand mark
        shipped inside this repo is the Touch Grass mark itself. Products built
        on top of the DS keep their own brand assets in their own repos.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">TOUCH GRASS</h2>
      <p className="text-[16px] font-mono font-semibold mb-6 max-w-[60ch]">
        The DS mark. Five blades fanning from a single point. Use the lockup in
        long-form contexts, the icon in tight spaces.
      </p>

      <div className="grid grid-cols-[1fr_240px] gap-px bg-[var(--color-hairline)] border border-[var(--color-hairline)] mb-12">
        <div className="bg-[var(--color-bg)] p-12 flex items-center justify-center">
          <TouchGrassLogo style={accent} className="w-full max-w-[480px] h-auto" />
        </div>
        <div className="bg-[var(--color-bg)] p-12 flex items-center justify-center">
          <TouchGrassIcon style={accent} className="w-[120px] h-[120px]" />
        </div>
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">RULES</h2>
      <div className="border border-[var(--color-hairline)]">
        {[
          ['ALWAYS LIME', 'The brand mark renders in --color-earned on --color-bg. No tints, no opacity, no white-on-black variant.'],
          ['CURRENTCOLOR', 'Brand SVGs use stroke/fill="currentColor". Set color on a parent via var(--color-earned). Never hardcode hex inside a mark.'],
          ['NO RECOLORING', 'No alt color schemes. No "light mode" version. There is no light mode.'],
          ['CLEARSPACE', 'Minimum padding around the mark equals the height of one wordmark letter (~half the icon at its natural size).'],
          ['PRODUCT-AGNOSTIC', 'Touch Grass does not ship product brands. Apps built on the DS (Timeouts, etc.) keep their marks in their own repositories.'],
          ['SOURCE OF TRUTH', 'Canonical SVGs live at brand/touch-grass/*. Imported via @brand/ alias + ?react suffix (vite-plugin-svgr).'],
        ].map(([rule, desc]) => (
          <div key={rule} className="grid grid-cols-[200px_1fr] border-b border-[var(--color-hairline)] last:border-b-0">
            <div className="p-4 font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-r border-[var(--color-hairline)]">
              {rule}
            </div>
            <div className="p-4 text-[16px] font-mono font-semibold">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
