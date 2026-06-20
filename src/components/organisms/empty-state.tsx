import type { ReactNode, ComponentType } from 'react';
import { Stack } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { Icon, type SvgIconProps } from '../atoms/icon';
import { cx } from '../cx';

export interface EmptyStateProps {
  icon?: ComponentType<SvgIconProps>;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** Empty state = Stack + Icon + Text atoms, with an optional action slot. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <Stack align="center" gap="md" className={cx('bds-empty-state', className)}>
      {icon && <Icon icon={icon} size="xl" color="var(--color-text-third)" />}
      <Stack align="center" gap="xs">
        <Text variant="title3" weight={500} align="center">
          {title}
        </Text>
        {description && (
          <Text variant="bodySmall" color="third" align="center">
            {description}
          </Text>
        )}
      </Stack>
      {action}
    </Stack>
  );
}
