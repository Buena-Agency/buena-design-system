import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import { cx } from './cx';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/** Status / count badge. */
export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return <span className={cx('bds-badge', `bds-badge--${tone}`, className)} {...rest} />;
}

export type ChipColor = 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'purple';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  color?: ChipColor;
  outlined?: boolean;
}

/** Filter / key chip. Color resolves to the matching ramp's 700 step. */
export function Chip({ color = 'green', outlined, className, style, ...rest }: ChipProps) {
  const c = `var(--color-${color}-700)`;
  const s: CSSProperties = outlined
    ? { background: 'transparent', borderColor: c, color: c, ...style }
    : { background: c, borderColor: '#0a0a0a', color: '#0a0a0a', ...style };
  return <span className={cx('bds-chip', className)} style={s} {...rest} />;
}

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
}

/** Removable tag. Pass `onRemove` to show the × button. */
export function Tag({ children, onRemove, className, ...rest }: TagProps) {
  return (
    <span className={cx('bds-tag', className)} {...rest}>
      {children}
      {onRemove && (
        <button type="button" className="bds-tag__remove" aria-label="Remove" onClick={onRemove}>
          ×
        </button>
      )}
    </span>
  );
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'outlined';
}

/** Content card. */
export function Card({ variant = 'outlined', className, ...rest }: CardProps) {
  return <div className={cx('bds-card', variant === 'solid' && 'bds-card--solid', className)} {...rest} />;
}

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

/** Divider line. */
export function Divider({ orientation = 'horizontal', className, ...rest }: DividerProps) {
  return (
    <div role="separator" className={cx('bds-divider', `bds-divider--${orientation}`, className)} {...rest} />
  );
}

const AVATAR_SIZES = { sm: 24, md: 32, lg: 40 } as const;

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  initials?: string;
  alt?: string;
}

/** User avatar — image when `src` is set, else `initials`. */
export function Avatar({ size = 'md', src, initials, alt, className, style, ...rest }: AvatarProps) {
  const d = AVATAR_SIZES[size];
  return (
    <span className={cx('bds-avatar', className)} style={{ width: d, height: d, ...style }} {...rest}>
      {src ? (
        <img src={src} alt={alt || ''} width={d} height={d} style={{ objectFit: 'cover' }} />
      ) : (
        initials
      )}
    </span>
  );
}

export interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
}

/** Header toggle pill. */
export function Pill({ pressed, className, type = 'button', ...rest }: PillProps) {
  return <button type={type} className={cx('bds-pill', className)} aria-pressed={pressed} {...rest} />;
}

export type { ReactNode };
