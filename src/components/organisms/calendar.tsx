import { Surface, Inline } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { IconButton } from '../atoms/button';
import { Icon } from '../atoms/icon';
import { IconChevronLeft, IconChevronRight } from '../../icons';
import { cx } from '../cx';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export interface CalendarProps {
  /** 0-11 */
  month: number;
  year: number;
  selected?: number;
  onSelect?: (day: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  /** Days (1-based) that show an event dot. */
  events?: number[];
  className?: string;
}

/** Month calendar = Surface + header (Text + IconButtons) + a grid of day cells. */
export function Calendar({ month, year, selected, onSelect, onPrev, onNext, events, className }: CalendarProps) {
  const eventSet = new Set(events);
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <Surface level="med" radius="xl" border padding="md" className={cx('bds-calendar', className)}>
      <Inline justify="space-between" align="center" className="bds-calendar__header">
        <Text variant="body" weight={600}>
          {MONTHS[month]} {year}
        </Text>
        <Inline gap="xs">
          <IconButton aria-label="Previous month" size="sm" onClick={onPrev}>
            <Icon icon={IconChevronLeft} size="sm" />
          </IconButton>
          <IconButton aria-label="Next month" size="sm" onClick={onNext}>
            <Icon icon={IconChevronRight} size="sm" />
          </IconButton>
        </Inline>
      </Inline>
      <div className="bds-calendar__grid">
        {DOW.map((d, i) => (
          <Text key={`h${i}`} variant="footnote" color="third" align="center" className="bds-calendar__dow">
            {d}
          </Text>
        ))}
        {cells.map((d, i) =>
          d == null ? (
            <span key={i} />
          ) : (
            <button
              key={i}
              type="button"
              aria-pressed={d === selected}
              className={cx('bds-calendar__cell', d === selected && 'bds-calendar__cell--selected')}
              onClick={() => onSelect?.(d)}
            >
              <Text variant="bodySmall" color="inherit">
                {d}
              </Text>
              {eventSet.has(d) && <span className="bds-calendar__dot" />}
            </button>
          )
        )}
      </div>
    </Surface>
  );
}
