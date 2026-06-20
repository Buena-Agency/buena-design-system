import { useRef } from 'react';
import type { HTMLAttributes, ReactNode, MouseEvent } from 'react';
import { Surface, Inline, Divider } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { IconButton } from '../atoms/button';
import { Icon } from '../atoms/icon';
import { IconClose, IconSearch } from '../../icons';
import { useDialog, useMenuKeyboard } from '../a11y';
import { cx } from '../cx';

const stop = (e: MouseEvent) => e.stopPropagation();

export interface TrayProps {
  open: boolean;
  onClose?: () => void;
  side?: 'left' | 'right';
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Slide-in side tray = overlay + Surface panel (header composes atoms). */
export function Tray({ open, onClose, side = 'right', title, children, className }: TrayProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, open, onClose);
  if (!open) return null;
  return (
    <div className="bds-tray-overlay" ref={ref} onClick={onClose}>
      <Surface
        level="med"
        radius="none"
        shadow
        role="dialog"
        aria-modal="true"
        className={cx('bds-tray', `bds-tray--${side}`, className)}
        onClick={stop}
      >
        {(title || onClose) && (
          <Inline justify="space-between" align="center" className="bds-tray__header">
            {title && (
              <Text variant="title3" weight={500}>
                {title}
              </Text>
            )}
            {onClose && (
              <IconButton aria-label="Close" size="sm" onClick={onClose}>
                <Icon icon={IconClose} size="sm" />
              </IconButton>
            )}
          </Inline>
        )}
        <div className="bds-tray__body">{children}</div>
      </Surface>
    </div>
  );
}

export interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Bottom sheet = overlay + Surface rising from the bottom edge. */
export function BottomSheet({ open, onClose, title, children, className }: BottomSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, open, onClose);
  if (!open) return null;
  return (
    <div className="bds-sheet-overlay" ref={ref} onClick={onClose}>
      <Surface level="med" radius="2xl" shadow role="dialog" aria-modal="true" className={cx('bds-sheet', className)} onClick={stop}>
        <div className="bds-sheet__handle" />
        {title && (
          <Text variant="title3" weight={500} className="bds-sheet__title">
            {title}
          </Text>
        )}
        <div className="bds-sheet__body">{children}</div>
      </Surface>
    </div>
  );
}

export interface CommandPaletteProps {
  open: boolean;
  onClose?: () => void;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children?: ReactNode;
  className?: string;
}

/** Command palette = overlay + search field + a results list of MenuItems. */
export function CommandPalette({
  open,
  onClose,
  value,
  onValueChange,
  placeholder = 'Type a command…',
  children,
  className,
}: CommandPaletteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  useDialog(ref, open, onClose);
  useMenuKeyboard(surfaceRef, open);
  if (!open) return null;
  return (
    <div className="bds-cmdk-overlay" ref={ref} onClick={onClose}>
      <div ref={surfaceRef}>
        <Surface level="med" radius="xl" shadow border role="dialog" aria-modal="true" className={cx('bds-cmdk', className)} onClick={stop}>
        <div className="bds-cmdk__search">
          <Icon icon={IconSearch} size="sm" color="var(--color-text-third)" />
          <input
            className="bds-cmdk__input"
            autoFocus
            value={value}
            placeholder={placeholder}
            onChange={(e) => onValueChange?.(e.target.value)}
          />
        </div>
        <Divider />
        <div className="bds-cmdk__results" role="listbox">
          {children}
        </div>
        </Surface>
      </div>
    </div>
  );
}

export interface SnackbarQueueProps extends HTMLAttributes<HTMLDivElement> {
  position?: 'bottom-right' | 'bottom-center' | 'top-right';
}

/** Fixed stack region for Toast molecules. */
export function SnackbarQueue({ position = 'bottom-right', className, ...rest }: SnackbarQueueProps) {
  return <div className={cx('bds-snackbar-queue', `bds-snackbar-queue--${position}`, className)} {...rest} />;
}

export interface NotificationListProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
}

/** Notification panel = Surface holding NotificationItem molecules. */
export function NotificationList({ header, children, className, ...rest }: NotificationListProps) {
  return (
    <Surface level="med" radius="xl" border className={cx('bds-notif-list', className)} {...rest}>
      {header && <div className="bds-notif-list__header">{header}</div>}
      <div className="bds-notif-list__body">{children}</div>
    </Surface>
  );
}
