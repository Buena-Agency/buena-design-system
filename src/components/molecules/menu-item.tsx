import type { ButtonHTMLAttributes, HTMLAttributes, ComponentType, ReactNode } from 'react';
import { Text, Kbd } from '../atoms/typography';
import { Icon, type SvgIconProps } from '../atoms/icon';
import { cx } from '../cx';

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: ComponentType<SvgIconProps>;
  trailingIcon?: ComponentType<SvgIconProps>;
  shortcut?: string;
  selected?: boolean;
  destructive?: boolean;
}

/**
 * The dropdown-list-item molecule = pressable row composing the Icon, Text,
 * and Kbd atoms. This is "the atom for an item in a dropdown" — except it's a
 * molecule, because it's an assembly of atoms, not an indivisible primitive.
 */
export function MenuItem({
  leadingIcon,
  trailingIcon,
  shortcut,
  selected,
  destructive,
  children,
  className,
  type = 'button',
  ...rest
}: MenuItemProps) {
  return (
    <button
      type={type}
      role="menuitem"
      aria-current={selected || undefined}
      className={cx(
        'bds-menu-item',
        destructive && 'bds-menu-item--destructive',
        selected && 'bds-menu-item--selected',
        className
      )}
      {...rest}
    >
      {leadingIcon && <Icon icon={leadingIcon} size="sm" />}
      <Text variant="body" color={destructive ? 'error' : 'primary'} className="bds-menu-item__label">
        {children}
      </Text>
      {shortcut && <Kbd>{shortcut}</Kbd>}
      {trailingIcon && <Icon icon={trailingIcon} size="sm" />}
    </button>
  );
}

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
}

/** List row = optional leading slot + Text title/subtitle + trailing slot. */
export function ListItem({ leading, title, subtitle, trailing, className, ...rest }: ListItemProps) {
  return (
    <div className={cx('bds-list-item', className)} {...rest}>
      {leading && <div className="bds-list-item__leading">{leading}</div>}
      <div className="bds-list-item__content">
        <Text variant="body" weight={500}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="footnote" color="third">
            {subtitle}
          </Text>
        )}
      </div>
      {trailing && <div className="bds-list-item__trailing">{trailing}</div>}
    </div>
  );
}
