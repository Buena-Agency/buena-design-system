import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Menu } from './menu';
import { useEscape, useOutsideClick, useMenuKeyboard, getFocusable } from '../a11y';
import { cx } from '../cx';

export interface DropdownProps {
  /** The button/element that opens the menu. */
  trigger: ReactNode;
  /** MenuItem / MenuDivider / MenuLabel children. */
  children: ReactNode;
  align?: 'start' | 'end';
  className?: string;
}

/**
 * Stateful dropdown = a trigger + a Menu organism. Manages open/close, closes
 * on Escape / outside-click / selection, focuses the first item on open, and
 * roves with ArrowUp/Down — the ergonomic way to use Menu/MenuItem.
 */
export function Dropdown({ trigger, children, align = 'start', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEscape(open, () => setOpen(false));
  useOutsideClick(rootRef, open, () => setOpen(false));
  useMenuKeyboard(menuRef, open);
  useEffect(() => {
    if (open && menuRef.current) getFocusable(menuRef.current)[0]?.focus();
  }, [open]);

  return (
    <div ref={rootRef} className={cx('bds-dropdown', className)}>
      <span
        className="bds-dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {trigger}
      </span>
      {open && (
        <div
          ref={menuRef}
          className={cx('bds-dropdown__menu', align === 'end' && 'bds-dropdown__menu--end')}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('[role="menuitem"]')) setOpen(false);
          }}
        >
          <Menu>{children}</Menu>
        </div>
      )}
    </div>
  );
}
