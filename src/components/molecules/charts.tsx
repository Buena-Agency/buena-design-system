import type { ReactNode } from 'react';
import { Text } from '../atoms/typography';
import { Inline, Stack } from '../atoms/layout';
import { seriesColor } from '../atoms/dataviz';
import { cx } from '../cx';

export interface StackedSegment {
  label: string;
  value: number;
  color?: string;
}

export interface StackedBarProps {
  segments: StackedSegment[];
  orientation?: 'horizontal' | 'vertical';
  /** Thickness of the bar (px). Length is 100% of the container. */
  thickness?: number;
  /** For vertical bars, the length of the bar (px). */
  length?: number;
  showLegend?: boolean;
  showValues?: boolean;
  className?: string;
}

/**
 * A single bar split into colored segments (one color each) — the canonical
 * "stacked single bar" (Gitterdone status mix / Atho points-by-event). Set
 * `orientation="vertical"` for an upright bar; pass `showLegend` for a key.
 */
export function StackedBar({
  segments,
  orientation = 'horizontal',
  thickness = 12,
  length = 200,
  showLegend,
  showValues,
  className,
}: StackedBarProps) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const vertical = orientation === 'vertical';
  return (
    <div className={cx('bds-stacked', `bds-stacked--${orientation}`, className)}>
      <div
        className="bds-stacked__track"
        style={vertical ? { width: thickness, height: length } : { height: thickness, width: '100%' }}
      >
        {segments.map((s, i) => {
          const pct = `${(s.value / total) * 100}%`;
          return (
            <div
              key={i}
              className="bds-stacked__seg"
              title={`${s.label}: ${s.value}`}
              style={{
                background: s.color || seriesColor(i),
                ...(vertical ? { height: pct } : { width: pct }),
              }}
            />
          );
        })}
      </div>
      {showLegend && (
        <div className="bds-stacked__legend">
          {segments.map((s, i) => (
            <Inline key={i} gap="xs" align="center">
              <span className="bds-legend-dot" style={{ background: s.color || seriesColor(i) }} />
              <Text variant="footnote" color="second">
                {s.label}
              </Text>
              {showValues && (
                <Text variant="footnote" color="third">
                  {s.value}
                </Text>
              )}
            </Inline>
          ))}
        </div>
      )}
    </div>
  );
}

export interface BarDatum {
  label: ReactNode;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarDatum[];
  max?: number;
  orientation?: 'horizontal' | 'vertical';
  showValues?: boolean;
  /** Plot height for vertical bars (px). */
  height?: number;
  className?: string;
}

/**
 * Multi-bar chart of progress-style bars. Horizontal = labelled rows (default);
 * vertical = columns growing up with labels beneath.
 */
export function BarChart({
  data,
  max,
  orientation = 'horizontal',
  showValues = true,
  height = 160,
  className,
}: BarChartProps) {
  const peak = max ?? Math.max(1, ...data.map((d) => d.value));

  if (orientation === 'vertical') {
    return (
      <div className={cx('bds-barchart bds-barchart--vertical', className)} style={{ height }}>
        {data.map((d, i) => (
          <div key={i} className="bds-barchart__col">
            <div className="bds-barchart__col-track">
              {showValues && (
                <Text variant="footnote" color="third" className="bds-barchart__val">
                  {d.value}
                </Text>
              )}
              <div
                className="bds-barchart__col-fill"
                style={{ height: `${(d.value / peak) * 100}%`, background: d.color || seriesColor(i) }}
              />
            </div>
            <Text variant="footnote" color="third" align="center" truncate>
              {d.label}
            </Text>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Stack gap="sm" className={cx('bds-barchart bds-barchart--horizontal', className)}>
      {data.map((d, i) => (
        <div key={i} className="bds-barchart__row">
          <Text variant="footnote" color="second" className="bds-barchart__label" truncate>
            {d.label}
          </Text>
          <div className="bds-barchart__track">
            <div
              className="bds-barchart__fill"
              style={{ width: `${(d.value / peak) * 100}%`, background: d.color || seriesColor(i) }}
            />
          </div>
          {showValues && (
            <Text variant="footnote" color="third" className="bds-barchart__val">
              {d.value}
            </Text>
          )}
        </div>
      ))}
    </Stack>
  );
}

export interface ActivityHeatmapProps {
  /** Intensity per cell, column-major (week by week). */
  values: number[];
  weeks?: number;
  max?: number;
  color?: string;
  cell?: number;
  gap?: number;
  className?: string;
}

/** GitHub-style activity grid (Gitterdone streak board). */
export function ActivityHeatmap({
  values,
  weeks = 14,
  max,
  color = 'var(--color-accent)',
  cell = 11,
  gap = 3,
  className,
}: ActivityHeatmapProps) {
  const peak = max ?? Math.max(1, ...values);
  const rows = 7;
  return (
    <div
      className={cx('bds-heatmap', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${weeks}, ${cell}px)`,
        gridTemplateRows: `repeat(${rows}, ${cell}px)`,
        gridAutoFlow: 'column',
        gap,
      }}
    >
      {Array.from({ length: weeks * rows }, (_, i) => {
        const v = values[i] ?? 0;
        const on = v > 0;
        return (
          <span
            key={i}
            className="bds-heatmap__cell"
            title={String(v)}
            style={{
              background: on ? color : 'var(--color-bg-high)',
              opacity: on ? 0.25 + 0.75 * (v / peak) : 1,
            }}
          />
        );
      })}
    </div>
  );
}
