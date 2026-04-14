import { LeaderboardRow } from '@touch-grass/ds';

export const title = "LEADERBOARD ROW";

export function LeaderboardRowPage() {
  return (
    <div>
      <div className="font-mono text-[13px] font-black uppercase tracking-[0.12em] text-[var(--color-earned)] border-b-2 border-[var(--color-earned)] pb-2 mb-12">
        // PATTERNS / LEADERBOARDROW
      </div>
      <h1 className="text-[32px] font-black tracking-[-0.02em] mb-2">LEADERBOARDROW.</h1>
      <p className="text-[16px] font-mono font-semibold mb-12 max-w-[60ch]">
        One row in the ranking. Three variants: top1 (KING badge + green hours), default (delta chip), you (green left border + tint). Names truncate at 16 chars, handles at 14.
      </p>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mb-4">FULL LEADERBOARD</h2>
      <div className="border border-[var(--color-hairline)]">
        <LeaderboardRow variant="top1" rank={1}  name="David H."     handle="dhh"          initials="DH" hours="62:14:08" />
        <LeaderboardRow              rank={2}  name="Pieter Levels" handle="levelsio"     initials="PL" hours="58:09:41" delta="+02:11" />
        <LeaderboardRow              rank={3}  name="Naval R."      handle="naval"        initials="NR" hours="51:33:17" delta="+01:08" />
        <LeaderboardRow              rank={4}  name="Sam Corcos"    handle="samcorcos"    initials="SC" hours="44:21:52" delta="−00:42" />
        <LeaderboardRow variant="you" rank={17} name="You"           handle="thiagoxikota" initials="TX" hours="22:48:33" delta="−08:16" />
      </div>

      <h2 className="text-[24px] font-black tracking-[-0.02em] mt-16 mb-4">EDGE CASES</h2>
      <div className="border border-[var(--color-hairline)]">
        <LeaderboardRow rank={1247} name="Long ranking number"        handle="longrank"          initials="LR" hours="12:00:00" delta="+00:01" />
        <LeaderboardRow rank={42}   name="Display name truncates here" handle="reallylonghandle" initials="DN" hours="08:30:00" delta="−00:15" />
      </div>
    </div>
  );
}
