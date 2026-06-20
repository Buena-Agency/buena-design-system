import type { ReactNode, MouseEvent } from 'react';
import { Surface, Inline } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { IconButton } from '../atoms/button';
import { Icon } from '../atoms/icon';
import { IconClose } from '../../icons';
import { cx } from '../cx';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Modal dialog = overlay + Surface card composing Inline, Text, IconButton,
 * and Icon atoms for the header. Footer takes Button atoms.
 */
export function Modal({ open, onClose, title, footer, children, className }: ModalProps) {
  if (!open) return null;
  return (
    <div className="bds-modal-overlay" onClick={onClose}>
      <Surface
        level="med"
        radius="2xl"
        shadow
        role="dialog"
        aria-modal="true"
        className={cx('bds-modal', className)}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {(title || onClose) && (
          <Inline justify="space-between" align="center" className="bds-modal__header">
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
        <div className="bds-modal__body">{children}</div>
        {footer && (
          <Inline gap="sm" justify="flex-end" className="bds-modal__footer">
            {footer}
          </Inline>
        )}
      </Surface>
    </div>
  );
}
