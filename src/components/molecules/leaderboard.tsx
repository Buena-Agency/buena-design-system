import type { ReactNode } from 'react';
import { Text } from '../atoms/typography';
import { Inline } from '../atoms/layout';
import { Avatar } from '../atoms/data';
import { Sparkline } from '../atoms/dataviz';
import { cx } from '../cx';

const RANK_COLOR: Record<number, string> = {
  1: 'var(--color-yellow-400)', // gold
  2: '#B5B0A1', // silver (neutral-400)
  3: 'var(--color-orange-700)', // bronze
};

export interface LeaderboardRowProps {
  rank: number;
  name: ReactNode;
  value: ReactNode;
  avatar?: { initials?: string; src?: string };
  /** Member/series color for the bar + sparkline. */
  color?: string;
  /** 0–100 fill of the row progress bar. */
  progress?: number;
  /** Sparkline trend. */
  trend?: number[];
  you?: boolean;
  className?: string;
}

/**
 * One leaderboard row (Gitterdone/Atho) = rank + Avatar + Text name/value, with
 * an optional member-colored progress bar and Sparkline. Top-3 ranks tint.
 */
export function LeaderboardRow({
  rank,
  name,
  value,
  avatar,
  color = 'var(--color-accent)',
  progress,
  trend,
  you,
  className,
}: LeaderboardRowProps) {
  const rankColor = RANK_COLOR[rank];
  return (
    <div className={cx('bds-lb-row', you && 'bds-lb-row--you', className)}>
      <span className="bds-lb-row__rank" style={rankColor ? { color: rankColor, fontWeight: 700 } : undefined}>
        {rank}
      </span>
      {avatar && <Avatar size="sm" initials={avatar.initials} src={avatar.src} />}
      <div className="bds-lb-row__main">
        <Inline justify="space-between" align="baseline" gap="sm">
          <Text variant="body" weight={you ? 600 : 500} truncate>
            {name}
            {you && (
              <Text as="span" variant="footnote" color="third">
                {' '}
                (you)
              </Text>
            )}
          </Text>
          <Text variant="body" weight={600} className="bds-lb-row__value">
            {value}
          </Text>
        </Inline>
        {progress != null && (
          <div className="bds-lb-row__bar">
            <div className="bds-lb-row__fill" style={{ width: `${Math.max(0, Math.min(100, progress))}%`, background: color }} />
          </div>
        )}
      </div>
      {trend && <Sparkline data={trend} color={color} width={52} height={16} className="bds-lb-row__spark" />}
    </div>
  );
}
