import { useRef, useState } from 'react';
import type { ReactNode, FocusEvent } from 'react';
import { Input, type InputProps } from '../atoms/inputs';
import { Tag } from '../atoms/data';
import { Icon } from '../atoms/icon';
import { Menu } from './menu';
import { IconChevronDown } from '../../icons';
import { useEscape, useOutsideClick, useMenuKeyboard } from '../a11y';
import { cx } from '../cx';

function closesOnItem(e: { target: EventTarget | null }) {
  return !!(e.target as HTMLElement | null)?.closest?.('[role="menuitem"]');
}

export interface ComboboxProps extends InputProps {
  /** Controlled open state. Omit to let the Combobox manage its own. */
  open?: boolean;
  /** MenuItem children rendered inside the popover. */
  options?: ReactNode;
}

/**
 * Combobox = Input atom + chevron + a Menu organism of options. Self-manages
 * open/close (opens on focus, closes on Escape / outside-click / selection)
 * unless `open` is passed; ArrowUp/Down roam the options.
 */
export function Combobox({ open: openProp, options, className, ...inputProps }: ComboboxProps) {
  const controlled = openProp !== undefined;
  const [openState, setOpenState] = useState(false);
  const open = controlled ? !!openProp : openState;
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = () => {
    if (!controlled) setOpenState(false);
  };

  useEscape(open, close);
  useOutsideClick(rootRef, open && !controlled, close);
  useMenuKeyboard(menuRef, open);

  return (
    <div className={cx('bds-combobox', className)} ref={rootRef}>
      <div className="bds-combobox__field">
        <Input
          {...inputProps}
          onFocus={(e: FocusEvent<HTMLInputElement>) => {
            inputProps.onFocus?.(e);
            if (!controlled) setOpenState(true);
          }}
        />
        <Icon icon={IconChevronDown} size="sm" className="bds-combobox__chevron" />
      </div>
      {open && (
        <div
          ref={menuRef}
          className="bds-combobox__menu"
          onClick={(e) => {
            if (closesOnItem(e)) close();
          }}
        >
          <Menu>{options}</Menu>
        </div>
      )}
    </div>
  );
}

export interface MultiselectProps {
  values: string[];
  onRemove?: (value: string) => void;
  placeholder?: string;
  /** Controlled open state. Omit to self-manage. */
  open?: boolean;
  options?: ReactNode;
  className?: string;
}

/**
 * Multiselect = Tag atoms for selections + an input + a Menu organism. Opens
 * on focus, closes on Escape / outside-click (stays open across picks, since
 * it's multi-select); ArrowUp/Down roam the options.
 */
export function Multiselect({ values, onRemove, placeholder, open: openProp, options, className }: MultiselectProps) {
  const controlled = openProp !== undefined;
  const [openState, setOpenState] = useState(false);
  const open = controlled ? !!openProp : openState;
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = () => {
    if (!controlled) setOpenState(false);
  };

  useEscape(open, close);
  useOutsideClick(rootRef, open && !controlled, close);
  useMenuKeyboard(menuRef, open);

  return (
    <div className={cx('bds-multiselect', className)} ref={rootRef}>
      <div className="bds-multiselect__field" onClick={() => !controlled && setOpenState(true)}>
        {values.map((v) => (
          <Tag key={v} onRemove={() => onRemove?.(v)}>
            {v}
          </Tag>
        ))}
        <input
          className="bds-multiselect__input"
          placeholder={values.length ? '' : placeholder}
          onFocus={() => !controlled && setOpenState(true)}
        />
      </div>
      {open && (
        <div ref={menuRef} className="bds-multiselect__menu">
          <Menu>{options}</Menu>
        </div>
      )}
    </div>
  );
}
