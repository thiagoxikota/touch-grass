import { Card } from '../primitives/Card';
import { Stat, type StatMeta } from '../primitives/Stat';

export interface SessionSummaryCardProps {
  date: string;
  duration: string;
  stats: StatMeta[];
  className?: string;
}

export function SessionSummaryCard({ date, duration, stats, className }: SessionSummaryCardProps) {
  return (
    <Card
      className={className}
      header={
        <div className="flex justify-between items-center w-full">
          <span>SESSION SUMMARY</span>
          <span>{date}</span>
        </div>
      }
    >
      <Stat label="UNTETHERED" value={duration} size="md" meta={stats} />
    </Card>
  );
}
