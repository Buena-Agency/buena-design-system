import type { HTMLAttributes, ElementType, CSSProperties } from 'react';
import { SPACING, RADIUS } from '../../tokens';
import { cx } from '../cx';

export type SpaceToken = keyof typeof SPACING;
export type RadiusToken = keyof typeof RADIUS;

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  level?: 'low' | 'med' | 'high';
  radius?: RadiusToken;
  padding?: SpaceToken;
  border?: boolean;
  shadow?: boolean;
}

/**
 * The elevated-container atom. Card, Menu, Modal, Popover, Tray, Sheet all
 * sit on a Surface so background/elevation/radius stay consistent and never
 * get hand-rolled per component.
 */
export function Surface({
  as: As = 'div',
  level = 'med',
  radius = 'xl',
  padding,
  border,
  shadow,
  className,
  style,
  ...rest
}: SurfaceProps) {
  const s: CSSProperties = {
    background: `var(--color-bg-${level})`,
    borderRadius: `var(--radius-${radius})`,
    ...(padding ? { padding: `var(--space-${padding})` } : null),
    ...(border ? { border: '1px solid var(--color-border-third)' } : null),
    ...(shadow ? { boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)' } : null),
    ...style,
  };
  return <As className={cx('bds-surface', className)} style={s} {...rest} />;
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  gap?: SpaceToken;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
}

/** Vertical flex layout atom — gap snaps to the 8pt grid. */
export function Stack({ as: As = 'div', gap = 'md', align, justify, className, style, ...rest }: StackProps) {
  const s: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: `var(--space-${gap})`,
    alignItems: align,
    justifyContent: justify,
    ...style,
  };
  return <As className={cx('bds-stack', className)} style={s} {...rest} />;
}

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  gap?: SpaceToken;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: boolean;
}

/** Horizontal flex layout atom. */
export function Inline({
  as: As = 'div',
  gap = 'sm',
  align = 'center',
  justify,
  wrap,
  className,
  style,
  ...rest
}: InlineProps) {
  const s: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: `var(--space-${gap})`,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : undefined,
    ...style,
  };
  return <As className={cx('bds-inline', className)} style={s} {...rest} />;
}

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

/** Divider line atom. */
export function Divider({ orientation = 'horizontal', className, ...rest }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cx('bds-divider', `bds-divider--${orientation}`, className)}
      {...rest}
    />
  );
}

/** Screen-reader-only text atom. */
export function VisuallyHidden({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('bds-visually-hidden', className)} {...rest} />;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'outlined';
}

/** Content-card atom (a styled Surface preset). */
export function Card({ variant = 'outlined', className, ...rest }: CardProps) {
  return <div className={cx('bds-card', variant === 'solid' && 'bds-card--solid', className)} {...rest} />;
}
