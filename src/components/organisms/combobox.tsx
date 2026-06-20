import type { ReactNode } from 'react';
import { Input, type InputProps } from '../atoms/inputs';
import { Tag } from '../atoms/data';
import { Icon } from '../atoms/icon';
import { Menu } from './menu';
import { IconChevronDown } from '../../icons';
import { cx } from '../cx';

export interface ComboboxProps extends InputProps {
  /** Whether the options menu is shown. */
  open?: boolean;
  /** MenuItem children rendered inside the popover. */
  options?: ReactNode;
}

/** Combobox = Input atom + chevron + a Menu organism of options. */
export function Combobox({ open, options, className, ...inputProps }: ComboboxProps) {
  return (
    <div className={cx('bds-combobox', className)}>
      <div className="bds-combobox__field">
        <Input {...inputProps} />
        <Icon icon={IconChevronDown} size="sm" className="bds-combobox__chevron" />
      </div>
      {open && <Menu className="bds-combobox__menu">{options}</Menu>}
    </div>
  );
}

export interface MultiselectProps {
  values: string[];
  onRemove?: (value: string) => void;
  placeholder?: string;
  open?: boolean;
  options?: ReactNode;
  className?: string;
}

/** Multiselect = Tag atoms for selections + an input + a Menu organism. */
export function Multiselect({ values, onRemove, placeholder, open, options, className }: MultiselectProps) {
  return (
    <div className={cx('bds-multiselect', className)}>
      <div className="bds-multiselect__field">
        {values.map((v) => (
          <Tag key={v} onRemove={() => onRemove?.(v)}>
            {v}
          </Tag>
        ))}
        <input className="bds-multiselect__input" placeholder={values.length ? '' : placeholder} />
      </div>
      {open && <Menu className="bds-multiselect__menu">{options}</Menu>}
    </div>
  );
}
