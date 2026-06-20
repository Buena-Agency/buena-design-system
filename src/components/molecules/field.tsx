import type { ReactNode } from 'react';
import { Label } from '../atoms/inputs';
import { Text } from '../atoms/typography';
import { cx } from '../cx';

export interface FieldProps {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

/** Composed field = Label atom + control + helper/error Text atom. */
export function Field({ label, helper, error, htmlFor, children, className }: FieldProps) {
  return (
    <div className={cx('bds-field', className)}>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
      {(error || helper) && (
        <Text variant="footnote" color={error ? 'error' : 'third'}>
          {error || helper}
        </Text>
      )}
    </div>
  );
}
