import type { HTMLAttributes, ReactNode, CSSProperties } from 'react';
import { cx } from './cx';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title?: ReactNode;
}

/** Inline alert with a colored rule. */
export function Alert({ tone = 'info', title, children, className, ...rest }: AlertProps) {
  return (
    <div role="alert" className={cx('bds-alert', tone !== 'info' && `bds-alert--${tone}`, className)} {...rest}>
      <div>
        {title && <div className="bds-alert__title">{title}</div>}
        {children && <div className="bds-alert__body">{children}</div>}
      </div>
    </div>
  );
}

const SPINNER_SIZES = { sm: 16, md: 24, lg: 32 } as const;

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

/** Indeterminate loading spinner. */
export function Spinner({ size = 'md', className, style, ...rest }: SpinnerProps) {
  const d = SPINNER_SIZES[size];
  const s: CSSProperties = { width: d, height: d, ...style };
  return <div role="status" aria-label="Loading" className={cx('bds-spinner', className)} style={s} {...rest} />;
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'line' | 'block' | 'circle';
}

/** Loading placeholder. */
export function Skeleton({ variant = 'block', className, ...rest }: SkeletonProps) {
  return <div className={cx('bds-skeleton', `bds-skeleton--${variant}`, className)} {...rest} />;
}

export interface TooltipProps {
  content: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Hover/focus tooltip — wraps a trigger and shows the bubble above it. */
export function Tooltip({ content, title, children, className }: TooltipProps) {
  return (
    <span className={cx('bds-tooltip-wrap', className)}>
      {children}
      <span role="tooltip" className="bds-tooltip">
        {title && <span className="bds-tooltip__title">{title}</span>}
        <span className={title ? 'bds-tooltip__body' : undefined}>{content}</span>
      </span>
    </span>
  );
}
