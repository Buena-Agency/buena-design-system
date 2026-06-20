import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cx } from './cx';

/** Underline tab bar. Wrap `Tab` children. */
export function Tabs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className={cx('bds-tabs', className)} {...rest} />;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** A single underline tab. */
export function Tab({ selected, className, type = 'button', ...rest }: TabProps) {
  return (
    <button role="tab" type={type} aria-selected={selected} className={cx('bds-tab', className)} {...rest} />
  );
}
