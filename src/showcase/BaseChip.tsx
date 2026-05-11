import { memo } from 'react';
import clsx from 'clsx';

// Layout constants inlined from Atho's calendar timeUtils so this showcase
// chip stays self-contained. SLOT_WIDTH_PX = 72 → HORIZ_PX_PER_MINUTE = 4.8.
const LANE_HEIGHT_PX = 26;
const HORIZ_PX_PER_MINUTE = 72 / 15;

/**
 * Color-driven calendar/library chip. Renders the same visual you see for
 * meet events and drilled practice drills — solid fill, dashed-empty, or
 * outlined variants — without coupling to any meet-specific category set.
 *
 * Higher-level wrappers like `AthoItem` resolve a domain id (e.g. a meet
 * `categoryId`) into a color and call this component. The practice planner's
 * tiles + placed drills do the same with their own color sources (event
 * group color, primary pillar color).
 *
 * Layout variants:
 *   - 'horizontal' (default): width = `durationMinutes * HORIZ_PX_PER_MINUTE`,
 *     height = `LANE_HEIGHT_PX`. Used on the calendar (rows × time grid)
 *     and the drag overlay.
 *   - 'tile': fixed-height button form used by the library / drills drawer.
 *     Width comes from the parent grid; height is `LANE_HEIGHT_PX`.
 */
export interface BaseChipProps {
  /** Solid background color (hex / rgb / css var). When `outlined` is set,
   *  this drives the border + text color instead. */
  color: string;
  label: string;
  durationMinutes: number;
  variant?: 'horizontal' | 'tile';
  /** Empty/placeholder variant: dashed outline, muted text, transparent fill. */
  empty?: boolean;
  /** Outlined variant: transparent fill, border + text in `color`. */
  outlined?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function BaseChipImpl({
  color,
  label,
  durationMinutes,
  variant = 'horizontal',
  empty = false,
  outlined = false,
  className,
  style,
}: BaseChipProps) {
  const baseBorder = empty
    ? 'border border-dashed border-muted'
    : outlined
      ? 'border'
      : 'border border-ink';

  const baseTextColor = empty ? 'text-muted' : outlined ? undefined : 'text-ink';

  const sizingStyle: React.CSSProperties =
    variant === 'tile'
      ? { height: LANE_HEIGHT_PX }
      : {
          height: LANE_HEIGHT_PX,
          width: durationMinutes * HORIZ_PX_PER_MINUTE,
        };

  return (
    <div
      className={clsx(
        'rounded-md flex items-center px-2 overflow-hidden',
        baseBorder,
        className
      )}
      style={{
        ...sizingStyle,
        backgroundColor: empty || outlined ? 'transparent' : color,
        borderColor: outlined ? color : undefined,
        ...style,
      }}
    >
      <span
        className={clsx(
          // Universal chip title — 11px, used in both regular and
          // Details modes so the size doesn't change when Details
          // is toggled on/off (previously Details inflated to 12px,
          // which read noticeably larger on iOS). Leading 14 +
          // `pt-[2px] pb-[1px]` keeps ascenders + descenders inside
          // the chip's vertical bounds.
          'text-[11px] font-semibold leading-[14px] pt-[2px] pb-[1px] break-normal whitespace-nowrap overflow-hidden text-ellipsis w-full',
          baseTextColor
        )}
        style={outlined ? { color } : undefined}
      >
        {label}
      </span>
    </div>
  );
}

export const BaseChip = memo(BaseChipImpl);
