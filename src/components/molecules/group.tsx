import { Children } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { Surface, Inline } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { Icon } from '../atoms/icon';
import { Avatar } from '../atoms/data';
import { Input, type InputProps } from '../atoms/inputs';
import { IconButton } from '../atoms/button';
import { IconSearch, IconClose, IconArrowUp, IconArrowDown } from '../../icons';
import { cx } from '../cx';

/** Joins Button atoms into a single segmented control. Children stay Buttons. */
export function ButtonGroup({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div role="group" className={cx('bds-button-group', className)} {...rest} />;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Cap the number of avatars shown; the rest collapse into a +N avatar. */
  max?: number;
}

/** Overlapping stack of Avatar atoms. */
export function AvatarGroup({ max, children, className, ...rest }: AvatarGroupProps) {
  const arr = Children.toArray(children);
  const shown = max ? arr.slice(0, max) : arr;
  const extra = max ? arr.length - shown.length : 0;
  return (
    <div className={cx('bds-avatar-group', className)} {...rest}>
      {shown}
      {extra > 0 && <Avatar initials={`+${extra}`} />}
    </div>
  );
}

export interface SearchInputProps extends Omit<InputProps, 'type'> {
  onClear?: () => void;
}

/** Search field = Icon atom + Input atom + optional clear IconButton. */
export function SearchInput({ onClear, value, className, ...rest }: SearchInputProps) {
  return (
    <div className={cx('bds-search', className)}>
      <Icon icon={IconSearch} size="sm" className="bds-search__icon" />
      <Input type="search" className="bds-search__input" value={value} {...rest} />
      {onClear && value ? (
        <IconButton aria-label="Clear" size="sm" className="bds-search__clear" onClick={onClear}>
          <Icon icon={IconClose} size="sm" />
        </IconButton>
      ) : null}
    </div>
  );
}

export interface StatTrend {
  direction: 'up' | 'down';
  label: ReactNode;
}

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  trend?: StatTrend;
}

/** KPI tile = Surface + Text label/value + trend (Icon + Text). */
export function Stat({ label, value, trend, className, ...rest }: StatProps) {
  return (
    <Surface level="med" radius="xl" border padding="lg" className={cx('bds-stat', className)} {...rest}>
      <Text variant="caption" color="third">
        {label}
      </Text>
      <Text as="div" variant="title1" weight={500}>
        {value}
      </Text>
      {trend && (
        <Inline gap="xs">
          <Icon
            icon={trend.direction === 'up' ? IconArrowUp : IconArrowDown}
            size="xs"
            color={`var(--color-${trend.direction === 'up' ? 'success' : 'error'})`}
          />
          <Text variant="footnote" color={trend.direction === 'up' ? 'success' : 'error'}>
            {trend.label}
          </Text>
        </Inline>
      )}
    </Surface>
  );
}
