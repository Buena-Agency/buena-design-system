import type { HTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode } from 'react';
import { Surface, Divider } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { Icon, type SvgIconProps } from '../atoms/icon';
import { IconChevronRight, IconChevronDown } from '../../icons';
import { cx } from '../cx';

export interface NavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ComponentType<SvgIconProps>;
  active?: boolean;
  badge?: ReactNode;
}

/** Sidebar/nav row = Icon + Text atoms + optional trailing badge. */
export function NavItem({ icon, active, badge, children, className, type = 'button', ...rest }: NavItemProps) {
  return (
    <button
      type={type}
      aria-current={active ? 'page' : undefined}
      className={cx('bds-nav-item', active && 'bds-nav-item--active', className)}
      {...rest}
    >
      {icon && <Icon icon={icon} size="sm" />}
      <Text variant="body" color="inherit" className="bds-nav-item__label">
        {children}
      </Text>
      {badge}
    </button>
  );
}

/** Toolbar = a Surface row of IconButton/Button atoms. */
export function Toolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <Surface role="toolbar" level="med" radius="lg" border padding="xs" className={cx('bds-toolbar', className)} {...rest} />;
}

/** Vertical divider for inside a Toolbar. */
export function ToolbarDivider() {
  return <Divider orientation="vertical" className="bds-toolbar__divider" />;
}

export interface IconTab {
  value: string;
  icon: ComponentType<SvgIconProps>;
  label?: ReactNode;
}

export interface TabsBarProps {
  tabs: IconTab[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface TreeItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  icon?: ComponentType<SvgIconProps>;
  expanded?: boolean;
  hasChildren?: boolean;
  depth?: number;
}

/** Tree row = disclosure chevron + optional Icon + Text label, indented by depth. */
export function TreeItem({ label, icon, expanded, hasChildren, depth = 0, className, type = 'button', ...rest }: TreeItemProps) {
  return (
    <button
      type={type}
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      className={cx('bds-tree-item', className)}
      style={{ paddingLeft: 8 + depth * 16 }}
      {...rest}
    >
      {hasChildren ? (
        <Icon icon={expanded ? IconChevronDown : IconChevronRight} size="xs" />
      ) : (
        <span style={{ width: 14, flex: 'none' }} />
      )}
      {icon && <Icon icon={icon} size="sm" />}
      <Text variant="bodySmall" color="inherit">
        {label}
      </Text>
    </button>
  );
}

/** Segmented icon-tab bar = Icon + Text atoms per tab. */
export function TabsBar({ tabs, value, onChange, className }: TabsBarProps) {
  return (
    <div role="tablist" className={cx('bds-tabsbar', className)}>
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={t.value === value}
          aria-label={typeof t.label === 'string' ? t.label : t.value}
          className={cx('bds-tabsbar__tab', t.value === value && 'bds-tabsbar__tab--active')}
          onClick={() => onChange?.(t.value)}
        >
          <Icon icon={t.icon} size="sm" />
          {t.label && (
            <Text variant="caption" color="inherit">
              {t.label}
            </Text>
          )}
        </button>
      ))}
    </div>
  );
}
