import type { ReactNode, CSSProperties } from 'react';
import { cx } from '../cx';

/** Categorical series palette — one ramp 700 per series, in order. */
export const CHART_COLORS = [
  'var(--color-green-700)',
  'var(--color-blue-700)',
  'var(--color-purple-700)',
  'var(--color-orange-700)',
  'var(--color-yellow-400)',
  'var(--color-red-700)',
];

/** Status palette shared across task/data tooling (mirrors Gitterdone). */
export const STATUS_COLORS = {
  todo: 'var(--color-text-third)',
  progress: 'var(--color-orange-700)',
  review: 'var(--color-yellow-400)',
  blocked: 'var(--color-error)',
  done: 'var(--color-success)',
} as const;

export const seriesColor = (i: number) => CHART_COLORS[i % CHART_COLORS.length];

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  area?: boolean;
  strokeWidth?: number;
  className?: string;
}

/** Tiny trend line atom (pure SVG). */
export function Sparkline({
  data,
  width = 64,
  height = 20,
  color = 'var(--color-accent)',
  area,
  strokeWidth = 1.5,
  className,
}: SparklineProps) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;
  const pts = data.map((v, i) => [i * stepX, height - ((v - min) / span) * (height - 2) - 1]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  return (
    <svg
      className={cx('bds-sparkline', className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
    >
      {area && <path d={`${line} L${width} ${height} L0 ${height} Z`} fill={color} opacity={0.15} />}
      <path d={line} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type RingTone = 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  thickness?: number;
  tone?: RingTone;
  trackColor?: string;
  children?: ReactNode;
  className?: string;
}

/** Circular / donut progress atom. Pass center content as children. */
export function ProgressRing({
  value,
  max = 100,
  size = 72,
  thickness = 7,
  tone = 'accent',
  trackColor = 'var(--color-bg-high)',
  children,
  className,
}: ProgressRingProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  const color = tone === 'accent' ? 'var(--color-accent)' : `var(--color-${tone})`;
  const center = size / 2;
  return (
    <div className={cx('bds-ring', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={r} fill="none" stroke={trackColor} strokeWidth={thickness} />
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset var(--motion-slow, 320ms) var(--ease-standard, ease)' }}
        />
      </svg>
      {children != null && <div className="bds-ring__label">{children}</div>}
    </div>
  );
}

export interface MeterProps {
  value: number;
  max?: number;
  tone?: RingTone;
  height?: number;
  trackColor?: string;
  style?: CSSProperties;
  className?: string;
}

/** Thin labelled meter atom — a track + fill (use ProgressBar for plain bars). */
export function Meter({ value, max = 100, tone = 'accent', height = 8, trackColor, style, className }: MeterProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color = tone === 'accent' ? 'var(--color-accent)' : `var(--color-${tone})`;
  return (
    <div
      className={cx('bds-meter', className)}
      style={{ height, background: trackColor || 'var(--color-bg-high)', ...style }}
    >
      <div className="bds-meter__fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}
