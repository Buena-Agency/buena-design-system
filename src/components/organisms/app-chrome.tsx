import type { HTMLAttributes, ReactNode } from 'react';
import { Surface, Inline } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { cx } from '../cx';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  header?: ReactNode;
  footer?: ReactNode;
}

/** App sidebar = Surface column holding NavItem molecules + sections. */
export function Sidebar({ header, footer, children, className, ...rest }: SidebarProps) {
  return (
    <Surface as="aside" level="med" radius="none" className={cx('bds-sidebar', className)} {...rest}>
      {header && <div className="bds-sidebar__header">{header}</div>}
      <nav className="bds-sidebar__nav">{children}</nav>
      {footer && <div className="bds-sidebar__footer">{footer}</div>}
    </Surface>
  );
}

/** Labeled group inside a Sidebar. */
export function SidebarSection({ label, children }: { label?: ReactNode; children: ReactNode }) {
  return (
    <div className="bds-sidebar__section">
      {label && (
        <Text variant="footnote" color="third" className="bds-sidebar__label">
          {label}
        </Text>
      )}
      {children}
    </div>
  );
}

export interface TopAppBarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  leading?: ReactNode;
  title?: ReactNode;
  trailing?: ReactNode;
}

/** Top app bar = Surface row with leading / title / trailing slots. */
export function TopAppBar({ leading, title, trailing, className, ...rest }: TopAppBarProps) {
  return (
    <Surface as="header" level="med" radius="none" className={cx('bds-topbar', className)} {...rest}>
      <Inline gap="md" align="center">
        {leading}
        {title && (
          <Text variant="title3" weight={500}>
            {title}
          </Text>
        )}
      </Inline>
      <Inline gap="sm" align="center">
        {trailing}
      </Inline>
    </Surface>
  );
}
