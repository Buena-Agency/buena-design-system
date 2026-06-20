import type { HTMLAttributes, CSSProperties } from 'react';
import { cx } from '../cx';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'error';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/** Status / count badge atom. */
export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return <span className={cx('bds-badge', `bds-badge--${tone}`, className)} {...rest} />;
}

export type ChipColor = 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'purple';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  color?: ChipColor;
  outlined?: boolean;
}

/** Filter / key-chip atom. Color resolves to the matching ramp's 700 step. */
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

/** Removable-tag atom. Pass `onRemove` to show the × button. */
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

const AVATAR_SIZES = { sm: 24, md: 32, lg: 40 } as const;

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  initials?: string;
  alt?: string;
}

/** User-avatar atom — image when `src` is set, else `initials`. */
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

export type StatusTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';

const STATUS_VAR: Record<StatusTone, string> = {
  neutral: '--color-text-third',
  success: '--color-success',
  warning: '--color-warning',
  error: '--color-error',
  info: '--color-info',
};

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  size?: number;
  pulse?: boolean;
}

/** Status-dot atom. */
export function StatusDot({ tone = 'neutral', size = 8, pulse, className, style, ...rest }: StatusDotProps) {
  return (
    <span
      className={cx('bds-status-dot', pulse && 'bds-status-dot--pulse', className)}
      style={{ width: size, height: size, background: `var(${STATUS_VAR[tone]})`, ...style }}
      {...rest}
    />
  );
}

const SPINNER_SIZES = { sm: 16, md: 24, lg: 32 } as const;

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

/** Indeterminate loading-spinner atom. */
export function Spinner({ size = 'md', className, style, ...rest }: SpinnerProps) {
  const d = SPINNER_SIZES[size];
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cx('bds-spinner', className)}
      style={{ width: d, height: d, ...style }}
      {...rest}
    />
  );
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'line' | 'block' | 'circle';
}

/** Loading-placeholder atom. */
export function Skeleton({ variant = 'block', className, ...rest }: SkeletonProps) {
  return <div className={cx('bds-skeleton', `bds-skeleton--${variant}`, className)} {...rest} />;
}
