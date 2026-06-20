import { forwardRef } from 'react';
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';
import { cx } from './cx';

export type ControlTone = 'expressive' | 'default';

/** Uppercase field label. */
export function Label({ className, ...rest }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cx('bds-label', className)} {...rest} />;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

/** Single-line text input. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={cx('bds-input', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Multi-line text input. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, ...rest },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cx('bds-textarea', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});

export interface FieldProps {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Composed field: label + control + helper/error text. */
export function Field({ label, helper, error, children, className }: FieldProps) {
  return (
    <div className={cx('bds-field', className)}>
      {label && <span className="bds-label">{label}</span>}
      {children}
      {(error || helper) && (
        <span className={cx('bds-helper', !!error && 'bds-helper--error')}>{error || helper}</span>
      )}
    </div>
  );
}

const CHECK = (
  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden>
    <path
      d="M3 8.5l3.5 3.5L13 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  tone?: ControlTone;
}

/** Checkbox. Tone (expressive/default) mirrors the Figma component. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, tone = 'expressive', className, disabled, ...rest },
  ref
) {
  return (
    <label className={cx('bds-control', disabled && 'bds-control--disabled', className)} data-tone={tone}>
      <input ref={ref} type="checkbox" disabled={disabled} {...rest} />
      <span className="bds-checkbox__box" aria-hidden>
        {CHECK}
      </span>
      {label && <span className="bds-control__label">{label}</span>}
    </label>
  );
});

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  tone?: ControlTone;
}

/** Radio button. Use `name` to group. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, tone = 'expressive', className, disabled, ...rest },
  ref
) {
  return (
    <label className={cx('bds-control', disabled && 'bds-control--disabled', className)} data-tone={tone}>
      <input ref={ref} type="radio" disabled={disabled} {...rest} />
      <span className="bds-radio__ring" aria-hidden>
        <span className="bds-radio__dot" />
      </span>
      {label && <span className="bds-control__label">{label}</span>}
    </label>
  );
});

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  tone?: ControlTone;
}

/** Toggle switch. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, tone = 'expressive', className, disabled, ...rest },
  ref
) {
  return (
    <label className={cx('bds-control', disabled && 'bds-control--disabled', className)} data-tone={tone}>
      <input ref={ref} type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="bds-switch" aria-hidden>
        <span className="bds-switch__knob" />
      </span>
      {label && <span className="bds-control__label">{label}</span>}
    </label>
  );
});
