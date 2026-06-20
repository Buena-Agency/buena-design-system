import type { ReactNode, ComponentType } from 'react';
import { Surface, Stack, Inline } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { Icon, type SvgIconProps } from '../atoms/icon';
import { Avatar } from '../atoms/data';
import { Sparkline } from '../atoms/dataviz';
import { IconArrowUp, IconArrowDown, IconClock, IconPin } from '../../icons';
import { cx } from '../cx';

export interface MetricCardProps {
  label: ReactNode;
  value: ReactNode;
  icon?: ComponentType<SvgIconProps>;
  iconColor?: string;
  delta?: { direction: 'up' | 'down'; label: ReactNode };
  trend?: number[];
  className?: string;
}

/** KPI tile = Surface + Icon + Text + optional delta + Sparkline. */
export function MetricCard({ label, value, icon, iconColor, delta, trend, className }: MetricCardProps) {
  const down = delta?.direction === 'down';
  return (
    <Surface level="med" radius="xl" border padding="lg" className={cx('bds-metric-card', className)}>
      <Inline justify="space-between" align="center">
        <Text variant="footnote" color="third" className="bds-metric-card__label">
          {label}
        </Text>
        {icon && <Icon icon={icon} size="sm" color={iconColor || 'var(--color-text-third)'} />}
      </Inline>
      <Text as="div" variant="largeTitle" weight={600}>
        {value}
      </Text>
      <Inline justify="space-between" align="flex-end">
        {delta ? (
          <Inline gap="xs">
            <Icon
              icon={down ? IconArrowDown : IconArrowUp}
              size="xs"
              color={`var(--color-${down ? 'error' : 'success'})`}
            />
            <Text variant="footnote" color={down ? 'error' : 'success'}>
              {delta.label}
            </Text>
          </Inline>
        ) : (
          <span />
        )}
        {trend && <Sparkline data={trend} area color={down ? 'var(--color-error)' : 'var(--color-accent)'} width={72} height={24} />}
      </Inline>
    </Surface>
  );
}

export interface ProfileStat {
  label: ReactNode;
  value: ReactNode;
}

export interface ProfileCardProps {
  name: ReactNode;
  role?: ReactNode;
  avatar?: { initials?: string; src?: string };
  stats?: ProfileStat[];
  action?: ReactNode;
  className?: string;
}

/** Profile card = Avatar + Text + an optional stat row + action slot. */
export function ProfileCard({ name, role, avatar, stats, action, className }: ProfileCardProps) {
  return (
    <Surface level="med" radius="xl" border padding="lg" className={cx('bds-profile-card', className)}>
      <Stack align="center" gap="sm">
        <Avatar size="lg" initials={avatar?.initials} src={avatar?.src} />
        <Stack align="center" gap="xs">
          <Text variant="title3" weight={600}>
            {name}
          </Text>
          {role && (
            <Text variant="footnote" color="third">
              {role}
            </Text>
          )}
        </Stack>
        {stats && (
          <Inline gap="xl" justify="center" className="bds-profile-card__stats">
            {stats.map((s, i) => (
              <Stack key={i} align="center" gap="xs">
                <Text variant="body" weight={600}>
                  {s.value}
                </Text>
                <Text variant="footnote" color="third">
                  {s.label}
                </Text>
              </Stack>
            ))}
          </Inline>
        )}
        {action}
      </Stack>
    </Surface>
  );
}

export interface MediaCardProps {
  media?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Media card = a cover slot + Text title/description + footer slot. */
export function MediaCard({ media, title, description, footer, className }: MediaCardProps) {
  return (
    <Surface level="med" radius="xl" border className={cx('bds-media-card', className)}>
      {media && <div className="bds-media-card__media">{media}</div>}
      <Stack gap="xs" className="bds-media-card__body">
        <Text variant="title3" weight={600}>
          {title}
        </Text>
        {description && (
          <Text variant="bodySmall" color="second">
            {description}
          </Text>
        )}
        {footer && <div className="bds-media-card__footer">{footer}</div>}
      </Stack>
    </Surface>
  );
}

export interface EventCardProps {
  date: ReactNode;
  title: ReactNode;
  time?: ReactNode;
  location?: ReactNode;
  media?: ReactNode;
  className?: string;
}

/** Dated event card (Atho meets) = media + accent date + Text + time/location. */
export function EventCard({ date, title, time, location, media, className }: EventCardProps) {
  return (
    <Surface level="med" radius="xl" border className={cx('bds-event-card', className)}>
      {media && <div className="bds-event-card__media">{media}</div>}
      <Stack gap="xs" className="bds-event-card__body">
        <Text variant="footnote" color="accent" weight={600}>
          {date}
        </Text>
        <Text variant="body" weight={600}>
          {title}
        </Text>
        <Inline gap="md" wrap>
          {time && (
            <Inline gap="xs">
              <Icon icon={IconClock} size="xs" color="var(--color-text-third)" />
              <Text variant="footnote" color="third">
                {time}
              </Text>
            </Inline>
          )}
          {location && (
            <Inline gap="xs">
              <Icon icon={IconPin} size="xs" color="var(--color-text-third)" />
              <Text variant="footnote" color="third">
                {location}
              </Text>
            </Inline>
          )}
        </Inline>
      </Stack>
    </Surface>
  );
}
