import { forwardRef } from 'react';
import type { SelectHTMLAttributes, HTMLAttributes, ComponentType, ReactNode } from 'react';
import { Input, type InputProps } from '../atoms/inputs';
import { Text } from '../atoms/typography';
import { Icon, type SvgIconProps } from '../atoms/icon';
import { IconButton } from '../atoms/button';
import { ColorSwatch } from '../atoms/form';
import {
  IconChevronDown,
  IconMinus,
  IconPlus,
  IconCalendar,
  IconUpload,
  IconEdit,
  IconStar,
} from '../../icons';
import { cx } from '../cx';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/** Select = styled native select + chevron Icon atom. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className, children, ...rest },
  ref
) {
  return (
    <div className="bds-select">
      <select ref={ref} className={cx('bds-select__field', className)} aria-invalid={invalid || undefined} {...rest}>
        {children}
      </select>
      <Icon icon={IconChevronDown} size="sm" className="bds-select__chevron" />
    </div>
  );
});

export interface StepperProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/** Numeric stepper = IconButton atoms + Text value. */
export function Stepper({ value, onChange, min, max, step = 1, className }: StepperProps) {
  return (
    <div className={cx('bds-stepper', className)}>
      <IconButton
        aria-label="Decrease"
        size="sm"
        onClick={() => onChange?.(Math.max(min ?? -Infinity, value - step))}
        disabled={min != null && value <= min}
      >
        <Icon icon={IconMinus} size="sm" />
      </IconButton>
      <Text variant="body" className="bds-stepper__value">
        {value}
      </Text>
      <IconButton
        aria-label="Increase"
        size="sm"
        onClick={() => onChange?.(Math.min(max ?? Infinity, value + step))}
        disabled={max != null && value >= max}
      >
        <Icon icon={IconPlus} size="sm" />
      </IconButton>
    </div>
  );
}

export interface DateFieldProps extends Omit<InputProps, 'type'> {}

/** Date field = Input atom + leading calendar Icon. */
export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(function DateField(
  { className, ...rest },
  ref
) {
  return (
    <div className="bds-datefield">
      <Icon icon={IconCalendar} size="sm" className="bds-datefield__icon" />
      <Input ref={ref} type="date" className={cx('bds-datefield__input', className)} {...rest} />
    </div>
  );
});

export interface ColorPickerProps {
  colors: string[];
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
}

/** Color picker = grid of ColorSwatch atoms. */
export function ColorPicker({ colors, value, onChange, className }: ColorPickerProps) {
  return (
    <div className={cx('bds-color-picker', className)}>
      {colors.map((c) => (
        <ColorSwatch key={c} color={c} selected={c === value} aria-label={c} onClick={() => onChange?.(c)} />
      ))}
    </div>
  );
}

export interface FileDropzoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ComponentType<SvgIconProps>;
  title?: ReactNode;
  description?: ReactNode;
}

/** File dropzone = dashed area composing Icon + Text atoms. */
export function FileDropzone({
  icon = IconUpload,
  title = 'Drop files here',
  description = 'or click to browse',
  className,
  ...rest
}: FileDropzoneProps) {
  return (
    <div className={cx('bds-dropzone', className)} {...rest}>
      <Icon icon={icon} size="lg" color="var(--color-text-third)" />
      <Text variant="body" weight={500}>
        {title}
      </Text>
      <Text variant="footnote" color="third">
        {description}
      </Text>
    </div>
  );
}

export interface InlineEditProps {
  value: string;
  editing?: boolean;
  onEdit?: () => void;
  className?: string;
}

/** Inline-edit = Text display that swaps to an Input atom when editing. */
export function InlineEdit({ value, editing, onEdit, className }: InlineEditProps) {
  if (editing) {
    return <Input defaultValue={value} autoFocus className={cx('bds-inline-edit', className)} />;
  }
  return (
    <button type="button" className={cx('bds-inline-edit__display', className)} onClick={onEdit}>
      <Text variant="body">{value}</Text>
      <Icon icon={IconEdit} size="xs" className="bds-inline-edit__icon" />
    </button>
  );
}

export interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
}

/** Star rating = a row of Icon atoms. */
export function Rating({ value, max = 5, onChange, readOnly, className }: RatingProps) {
  return (
    <div role="img" aria-label={`${value} of ${max}`} className={cx('bds-rating', className)}>
      {Array.from({ length: max }, (_, i) => {
        const color = i < value ? 'var(--color-warning)' : 'var(--color-border-third)';
        if (readOnly) {
          return <Icon key={i} icon={IconStar} size="sm" color={color} />;
        }
        return (
          <button key={i} type="button" className="bds-rating__star" aria-label={`${i + 1} stars`} onClick={() => onChange?.(i + 1)}>
            <Icon icon={IconStar} size="sm" color={color} />
          </button>
        );
      })}
    </div>
  );
}
