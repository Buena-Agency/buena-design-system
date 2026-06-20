import type { ComponentType, CSSProperties } from 'react';
import { cx } from '../cx';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const ICON_SIZES: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/** Shape every icon in `@buena/brand/icons` already satisfies. */
export interface SvgIconProps {
  className?: string;
  style?: CSSProperties;
}

export interface IconProps {
  /** An icon component from `@buena/brand/icons`. */
  icon: ComponentType<SvgIconProps>;
  /** A size token, or a raw px number for the rare exception. */
  size?: IconSize | number;
  /** CSS color; defaults to `currentColor` so it inherits from its parent. */
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** When set, the icon is exposed to AT with this label; otherwise hidden. */
  title?: string;
}

/**
 * The icon atom — standardizes size + color over the existing SVG set without
 * ever re-drawing a glyph. The icons render with `currentColor`, so `color`
 * (or an inherited text color) flows straight through.
 */
export function Icon({ icon: Glyph, size = 'md', color, className, style, title }: IconProps) {
  const px = typeof size === 'number' ? size : ICON_SIZES[size];
  return (
    <span
      className={cx('bds-icon', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: 'inline-flex', flex: 'none', width: px, height: px, color, ...style }}
    >
      <Glyph style={{ width: '100%', height: '100%' }} />
    </span>
  );
}
