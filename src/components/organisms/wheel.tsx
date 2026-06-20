import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface WheelSegment {
  color: string;
  emoji?: string;
  label?: ReactNode;
}

export interface WheelSpinnerProps {
  segments: WheelSegment[];
  size?: number;
  /** Index to land on. Changing it spins the wheel to that segment. */
  selectedIndex?: number | null;
  /** Whole extra turns before settling. */
  spins?: number;
  /** Spin duration in ms. */
  durationMs?: number;
  onSpinEnd?: (index: number) => void;
  className?: string;
}

function slicePath(cx0: number, cy0: number, r: number, startDeg: number, endDeg: number) {
  const a0 = ((startDeg - 90) * Math.PI) / 180;
  const a1 = ((endDeg - 90) * Math.PI) / 180;
  const x0 = cx0 + r * Math.cos(a0);
  const y0 = cy0 + r * Math.sin(a0);
  const x1 = cx0 + r * Math.cos(a1);
  const y1 = cy0 + r * Math.sin(a1);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M${cx0} ${cy0} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

/**
 * Prize / winner wheel (Gitterdone "Winner Spinner") = an SVG wheel of colored
 * segments with emoji + a fixed pointer. Drive it by changing `selectedIndex`;
 * it animates to that segment under the top pointer and fires `onSpinEnd`.
 */
export function WheelSpinner({
  segments,
  size = 280,
  selectedIndex = null,
  spins = 4,
  durationMs = 3600,
  onSpinEnd,
  className,
}: WheelSpinnerProps) {
  const n = Math.max(1, segments.length);
  const seg = 360 / n;
  const [rotation, setRotation] = useState(0);
  const center = size / 2;
  const r = size / 2 - 2;
  const hub = size * 0.08;

  useEffect(() => {
    if (selectedIndex == null) return;
    const segCenter = (selectedIndex + 0.5) * seg; // deg from top, clockwise
    const base = Math.ceil(rotation / 360) * 360;
    const target = base + spins * 360 + ((360 - segCenter) % 360);
    setRotation(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  return (
    <div className={cx('bds-wheel', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
            transition: `transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
          onTransitionEnd={() => selectedIndex != null && onSpinEnd?.(selectedIndex)}
        >
          {segments.map((s, i) => {
            const a0 = i * seg;
            const a1 = (i + 1) * seg;
            const mid = ((a0 + seg / 2 - 90) * Math.PI) / 180;
            const ex = center + 0.62 * r * Math.cos(mid);
            const ey = center + 0.62 * r * Math.sin(mid);
            return (
              <g key={i}>
                <path d={slicePath(center, center, r, a0, a1)} fill={s.color} />
                {s.emoji && (
                  <text x={ex} y={ey} fontSize={size * 0.1} textAnchor="middle" dominantBaseline="central">
                    {s.emoji}
                  </text>
                )}
              </g>
            );
          })}
        </g>
        <circle cx={center} cy={center} r={hub} fill="var(--color-bg-low)" stroke="var(--color-border-third)" strokeWidth="2" />
      </svg>
      <div className="bds-wheel__pointer" aria-hidden />
    </div>
  );
}
