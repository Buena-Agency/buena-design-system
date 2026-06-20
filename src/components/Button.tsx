import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cx } from './cx';

export type ButtonVariant =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'destructive-secondary';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Push button. Variant × Size mirror the Figma `Button` component. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, type = 'button', ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'bds-btn',
        `bds-btn--${variant}`,
        size !== 'md' && `bds-btn--${size}`,
        className
      )}
      {...rest}
    />
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  /** Required — icon buttons have no visible label. */
  'aria-label': string;
}

/** Square icon-only button. Pass an icon from `@buena/brand/icons` as children. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ size = 'md', className, type = 'button', ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx('bds-icon-btn', size !== 'md' && `bds-icon-btn--${size}`, className)}
        {...rest}
      />
    );
  }
);
