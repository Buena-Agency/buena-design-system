import { forwardRef } from 'react';
import type { InputHTMLAttributes, HTMLAttributes, ButtonHTMLAttributes, CSSProperties } from 'react';
import { cx } from '../cx';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

/** Range-slider atom. */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider({ className, ...rest }, ref) {
  return <input ref={ref} type="range" className={cx('bds-slider', className)} {...rest} />;
});

export type ProgressTone = 'accent' | 'success' | 'warning' | 'error';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  tone?: ProgressTone;
}

/** Determinate progress-bar atom. */
export function ProgressBar({ value = 0, max = 100, tone = 'accent', className, ...rest }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = tone === 'accent' ? 'var(--color-accent)' : `var(--color-${tone})`;
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cx('bds-progress', className)}
      {...rest}
    >
      <div className="bds-progress__fill" style={{ width: `${pct}%`, background: fill }} />
    </div>
  );
}

export interface ColorSwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  selected?: boolean;
  size?: number;
}

/** Color-swatch atom. */
export function ColorSwatch({ color, selected, size = 24, className, style, type = 'button', ...rest }: ColorSwatchProps) {
  const s: CSSProperties = { width: size, height: size, background: color, ...style };
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx('bds-swatch', selected && 'bds-swatch--selected', className)}
      style={s}
      {...rest}
    />
  );
}
