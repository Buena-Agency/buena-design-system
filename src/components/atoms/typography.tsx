import type { ElementType, HTMLAttributes, AnchorHTMLAttributes, CSSProperties } from 'react';
import { cx } from '../cx';

export type TextVariant =
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'callout'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'footnote';

export type TextColor =
  | 'primary'
  | 'second'
  | 'third'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'inherit';

const TEXT_COLOR_VAR: Record<TextColor, string | null> = {
  primary: '--color-text-primary',
  second: '--color-text-second',
  third: '--color-text-third',
  accent: '--color-accent',
  success: '--color-success',
  warning: '--color-warning',
  error: '--color-error',
  info: '--color-info',
  inherit: null,
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Polymorphic element — use for semantics: as="h1", as="p", as="label". */
  as?: ElementType;
  /** Type-scale step. Sizes are tokens, never raw px — that's the point. */
  variant?: TextVariant;
  color?: TextColor;
  /** Override the scale's default weight when a design calls for it. */
  weight?: 400 | 500 | 600 | 700;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
}

/**
 * The typography atom — the only sanctioned way to place text. Renders at a
 * type-scale step with a semantic color, so every size/color stays on-system.
 * Compose it inside molecules; never write a raw font-size.
 */
export function Text({
  as: As = 'span',
  variant = 'body',
  color = 'primary',
  weight,
  align,
  truncate,
  className,
  style,
  ...rest
}: TextProps) {
  const colorVar = TEXT_COLOR_VAR[color];
  const s: CSSProperties = {
    ...(colorVar ? { color: `var(${colorVar})` } : null),
    ...(weight ? { fontWeight: weight } : null),
    ...(align ? { textAlign: align } : null),
    ...style,
  };
  return (
    <As
      className={cx('bds-text', `bds-text--${variant}`, truncate && 'bds-text--truncate', className)}
      style={s}
      {...rest}
    />
  );
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'accent' | 'subtle';
}

/** Text link atom. */
export function Link({ variant = 'accent', className, ...rest }: LinkProps) {
  return <a className={cx('bds-link', `bds-link--${variant}`, className)} {...rest} />;
}

/** Inline keyboard-key atom. */
export function Kbd({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cx('bds-kbd', className)} {...rest} />;
}

/** Inline monospace code atom. */
export function Code({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <code className={cx('bds-code', className)} {...rest} />;
}
