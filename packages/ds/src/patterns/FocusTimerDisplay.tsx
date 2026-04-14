import type { ReactNode } from 'react';
import { Card } from '../primitives/Card';
import { Stat, type StatMeta } from '../primitives/Stat';
import { Button } from '../primitives/Button';

export interface FocusTimerDisplayProps {
  header: ReactNode;
  sessionLabel?: ReactNode;
  label: ReactNode;
  value: ReactNode;
  meta?: StatMeta[];
  ctaLabel: ReactNode;
  onCtaClick?: () => void;
  className?: string;
}

export function FocusTimerDisplay({
  header,
  sessionLabel,
  label,
  value,
  meta,
  ctaLabel,
  onCtaClick,
  className,
}: FocusTimerDisplayProps) {
  return (
    <Card
      className={className}
      header={
        <div className="flex justify-between items-center w-full">
          <span>{header}</span>
          {sessionLabel && <span>{sessionLabel}</span>}
        </div>
      }
    >
      <Stat label={label} value={value} meta={meta} />
      <div className="mt-6">
        <Button onClick={onCtaClick} className="w-full">{ctaLabel}</Button>
      </div>
    </Card>
  );
}
