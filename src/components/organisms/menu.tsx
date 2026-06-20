import type { HTMLAttributes, ReactNode } from 'react';
import { Surface, Divider } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { cx } from '../cx';

/**
 * Dropdown / context-menu surface = Surface atom holding MenuItem molecules.
 * Render `MenuItem`, `MenuDivider`, and `MenuLabel` inside it.
 */
export function Menu({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Surface
      role="menu"
      level="high"
      radius="lg"
      border
      shadow
      padding="xs"
      className={cx('bds-menu', className)}
      {...rest}
    />
  );
}

/** Section divider inside a Menu. */
export function MenuDivider() {
  return <Divider className="bds-menu__divider" />;
}

/** Uppercase section label inside a Menu. */
export function MenuLabel({ children }: { children: ReactNode }) {
  return (
    <Text variant="footnote" color="third" className="bds-menu__label">
      {children}
    </Text>
  );
}
