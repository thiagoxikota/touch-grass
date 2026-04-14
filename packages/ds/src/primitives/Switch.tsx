import { forwardRef, type ComponentProps } from 'react';
import { cn } from '../lib/cn';

export interface SwitchProps extends Omit<ComponentProps<'input'>, 'type'> {
  label?: string;
}

const base =
  'peer appearance-none w-14 h-8 bg-black border-2 outline-none cursor-pointer ' +
  'border-white focus-visible:outline-2 focus-visible:outline-white focus-visible:[outline-offset:3px] ' +
  'checked:border-earned ' +
  'disabled:cursor-not-allowed disabled:border-dashed';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, disabled, ...rest },
  ref
) {
  return (
    <label className={cn('inline-flex items-center gap-3', disabled && 'cursor-not-allowed', className)}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          disabled={disabled}
          className={base}
          {...rest}
        />
        {/* Zero motion thumb. Uses pure layout jump based on peer-checked to flip sides */}
        <div 
          className={cn(
            'pointer-events-none absolute w-[calc(50%-4px)] h-[calc(100%-8px)] top-1 bg-white border-white',
            'left-1 peer-checked:left-[calc(50%+2px)] peer-checked:bg-earned peer-checked:border-earned',
            'peer-disabled:bg-white peer-disabled:peer-checked:bg-white'
          )}
        />
      </div>
      {label && (
        <span className="font-mono text-[14px] font-black uppercase text-white tracking-[0.1em]">
          {label}
        </span>
      )}
    </label>
  );
});
