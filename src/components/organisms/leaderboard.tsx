import type { ReactNode } from 'react';
import { Surface } from '../atoms/layout';
import { LeaderboardRow } from '../molecules/leaderboard';
import { cx } from '../cx';

export interface LeaderboardEntry {
  name: ReactNode;
  value: ReactNode;
  avatar?: { initials?: string; src?: string };
  color?: string;
  /** Raw metric used to scale the row bar against the leader (if `progress` unset). */
  amount?: number;
  progress?: number;
  trend?: number[];
  you?: boolean;
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  header?: ReactNode;
  /** Show the member-colored progress bar on each row (scaled to the leader). */
  showBars?: boolean;
  className?: string;
}

/**
 * Ranked leaderboard = Surface holding LeaderboardRow molecules. Entries render
 * in the order given (rank = index + 1); when `showBars`, row fill scales to
 * the top `amount`.
 */
export function Leaderboard({ entries, header, showBars, className }: LeaderboardProps) {
  const peak = Math.max(1, ...entries.map((e) => e.amount ?? 0));
  return (
    <Surface level="med" radius="xl" border className={cx('bds-leaderboard', className)}>
      {header && <div className="bds-leaderboard__header">{header}</div>}
      <div className="bds-leaderboard__body">
        {entries.map((e, i) => (
          <LeaderboardRow
            key={i}
            rank={i + 1}
            name={e.name}
            value={e.value}
            avatar={e.avatar}
            color={e.color}
            trend={e.trend}
            you={e.you}
            progress={e.progress ?? (showBars && e.amount != null ? (e.amount / peak) * 100 : undefined)}
          />
        ))}
      </div>
    </Surface>
  );
}
