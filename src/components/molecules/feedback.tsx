import type { HTMLAttributes, ReactNode, ComponentType } from 'react';
import { Surface } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { Icon, type SvgIconProps } from '../atoms/icon';
import { IconButton } from '../atoms/button';
import { IconClose } from '../../icons';
import { cx } from '../cx';

export type FeedbackTone = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: FeedbackTone;
  title?: ReactNode;
  icon?: ComponentType<SvgIconProps>;
}

/** Inline alert = Surface + optional Icon + Text title/body. */
export function Alert({ tone = 'info', title, icon, children, className, ...rest }: AlertProps) {
  return (
    <Surface
      role="alert"
      level="med"
      radius="lg"
      className={cx('bds-alert', `bds-alert--${tone}`, className)}
      {...rest}
    >
      {icon && <Icon icon={icon} size="sm" className="bds-alert__icon" />}
      <div className="bds-alert__content">
        {title && <Text variant="bodySmall" weight={600}>{title}</Text>}
        {children && <Text variant="footnote" color="third">{children}</Text>}
      </div>
    </Surface>
  );
}

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  tone?: FeedbackTone;
  icon?: ComponentType<SvgIconProps>;
  action?: ReactNode;
  onDismiss?: () => void;
}

/** Full-width banner = Icon + Text + optional action + dismiss. */
export function Banner({ tone = 'info', icon, action, onDismiss, children, className, ...rest }: BannerProps) {
  return (
    <div role="status" className={cx('bds-banner', `bds-banner--${tone}`, className)} {...rest}>
      {icon && <Icon icon={icon} size="sm" />}
      <Text variant="bodySmall" className="bds-banner__text">
        {children}
      </Text>
      {action}
      {onDismiss && (
        <IconButton aria-label="Dismiss" size="sm" onClick={onDismiss}>
          <Icon icon={IconClose} size="sm" />
        </IconButton>
      )}
    </div>
  );
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: FeedbackTone;
  icon?: ComponentType<SvgIconProps>;
  title?: ReactNode;
  onDismiss?: () => void;
}

/** Toast = elevated Surface + Icon + Text + dismiss. */
export function Toast({ tone = 'info', icon, title, onDismiss, children, className, ...rest }: ToastProps) {
  return (
    <Surface level="high" radius="lg" border shadow className={cx('bds-toast', `bds-toast--${tone}`, className)} {...rest}>
      {icon && <Icon icon={icon} size="sm" className="bds-toast__icon" />}
      <div className="bds-toast__content">
        {title && <Text variant="bodySmall" weight={600}>{title}</Text>}
        {children && <Text variant="footnote" color="third">{children}</Text>}
      </div>
      {onDismiss && (
        <IconButton aria-label="Dismiss" size="sm" onClick={onDismiss}>
          <Icon icon={IconClose} size="sm" />
        </IconButton>
      )}
    </Surface>
  );
}

export interface TooltipProps {
  content: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Hover/focus tooltip = trigger + Text bubble. */
export function Tooltip({ content, title, children, className }: TooltipProps) {
  return (
    <span className={cx('bds-tooltip-wrap', className)}>
      {children}
      <span role="tooltip" className="bds-tooltip">
        {title && (
          <Text variant="footnote" weight={600} style={{ color: '#fff' }}>
            {title}
          </Text>
        )}
        <Text variant="footnote" color="inherit" className="bds-tooltip__body">
          {content}
        </Text>
      </span>
    </span>
  );
}
