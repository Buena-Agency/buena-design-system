import { Fragment } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { Surface, Inline } from '../atoms/layout';
import { Text } from '../atoms/typography';
import { Icon } from '../atoms/icon';
import { IconButton } from '../atoms/button';
import { ProgressBar } from '../atoms/form';
import { StatusDot } from '../atoms/data';
import {
  IconArrowUp,
  IconArrowDown,
  IconCheck,
  IconChevronUp,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconPlay,
  IconPause,
  IconCopy,
} from '../../icons';
import { cx } from '../cx';

export interface StatComparisonProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  primary: ReactNode;
  secondary: ReactNode;
  delta?: { direction: 'up' | 'down'; label: ReactNode };
}

/** Two-value KPI tile = Surface + Text atoms + delta (Icon + Text). */
export function StatComparison({ label, primary, secondary, delta, className, ...rest }: StatComparisonProps) {
  return (
    <Surface level="med" radius="xl" border padding="lg" className={cx('bds-stat-comparison', className)} {...rest}>
      <Text variant="caption" color="third">
        {label}
      </Text>
      <Inline gap="sm" align="baseline">
        <Text as="div" variant="title1" weight={500}>
          {primary}
        </Text>
        <Text variant="bodySmall" color="third">
          vs {secondary}
        </Text>
      </Inline>
      {delta && (
        <Inline gap="xs">
          <Icon
            icon={delta.direction === 'up' ? IconArrowUp : IconArrowDown}
            size="xs"
            color={`var(--color-${delta.direction === 'up' ? 'success' : 'error'})`}
          />
          <Text variant="footnote" color={delta.direction === 'up' ? 'success' : 'error'}>
            {delta.label}
          </Text>
        </Inline>
      )}
    </Surface>
  );
}

export interface ProgressStepsProps {
  steps: { label: ReactNode }[];
  current: number;
  className?: string;
}

/** Horizontal step indicator = numbered/checked dots + Text labels. */
export function ProgressSteps({ steps, current, className }: ProgressStepsProps) {
  return (
    <div className={cx('bds-steps', className)}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <Fragment key={i}>
            <div className={cx('bds-step', done && 'bds-step--done', active && 'bds-step--active')}>
              <span className="bds-step__dot">
                {done ? <Icon icon={IconCheck} size="xs" /> : <Text variant="caption" color="inherit">{i + 1}</Text>}
              </span>
              <Text variant="caption" color={active ? 'primary' : 'third'}>
                {s.label}
              </Text>
            </div>
            {i < steps.length - 1 && <span className={cx('bds-step__line', done && 'bds-step__line--done')} />}
          </Fragment>
        );
      })}
    </div>
  );
}

export interface AccordionProps {
  title: ReactNode;
  open?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
  className?: string;
}

/** Accordion = a header button (Text + chevron Icon) + collapsible body. */
export function Accordion({ title, open, onToggle, children, className }: AccordionProps) {
  return (
    <div className={cx('bds-accordion', className)}>
      <button type="button" className="bds-accordion__header" aria-expanded={open} onClick={onToggle}>
        <Text variant="body" weight={500}>
          {title}
        </Text>
        <Icon icon={open ? IconChevronUp : IconChevronDown} size="sm" />
      </button>
      {open && <div className="bds-accordion__body">{children}</div>}
    </div>
  );
}

export interface DataTableRowProps extends HTMLAttributes<HTMLDivElement> {
  cells: ReactNode[];
  header?: boolean;
  selected?: boolean;
}

/** One data-table row = Text cells (header cells styled as labels). */
export function DataTableRow({ cells, header, selected, className, ...rest }: DataTableRowProps) {
  return (
    <div
      role="row"
      className={cx('bds-tr', header && 'bds-tr--header', selected && 'bds-tr--selected', className)}
      {...rest}
    >
      {cells.map((c, i) => (
        <div role={header ? 'columnheader' : 'cell'} key={i} className="bds-td">
          {header ? (
            <Text variant="caption" color="third">
              {c}
            </Text>
          ) : typeof c === 'string' || typeof c === 'number' ? (
            <Text variant="bodySmall">{c}</Text>
          ) : (
            c
          )}
        </div>
      ))}
    </div>
  );
}

export interface NotificationItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  leading?: ReactNode;
  title: ReactNode;
  time?: ReactNode;
  unread?: boolean;
}

/** Notification row = StatusDot + leading slot + Text title/body + time. */
export function NotificationItem({ leading, title, time, unread, children, className, ...rest }: NotificationItemProps) {
  return (
    <div className={cx('bds-notification', unread && 'bds-notification--unread', className)} {...rest}>
      {unread && <StatusDot tone="info" className="bds-notification__dot" />}
      {leading && <div className="bds-notification__leading">{leading}</div>}
      <div className="bds-notification__content">
        <Text variant="bodySmall" weight={unread ? 600 : 400}>
          {title}
        </Text>
        {children && (
          <Text variant="footnote" color="third">
            {children}
          </Text>
        )}
      </div>
      {time && (
        <Text variant="footnote" color="third">
          {time}
        </Text>
      )}
    </div>
  );
}

export interface MediaControlsProps extends HTMLAttributes<HTMLDivElement> {
  playing?: boolean;
  onPlayPause?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  progress?: number;
  elapsed?: ReactNode;
  duration?: ReactNode;
}

/** Transport bar = IconButton atoms + ProgressBar + Text timecodes. */
export function MediaControls({
  playing,
  onPlayPause,
  onPrev,
  onNext,
  progress = 0,
  elapsed,
  duration,
  className,
  ...rest
}: MediaControlsProps) {
  return (
    <Surface level="high" radius="xl" border padding="md" className={cx('bds-media', className)} {...rest}>
      <Inline gap="xs" align="center">
        <IconButton aria-label="Previous" size="sm" onClick={onPrev}>
          <Icon icon={IconChevronLeft} size="sm" />
        </IconButton>
        <IconButton aria-label={playing ? 'Pause' : 'Play'} onClick={onPlayPause}>
          <Icon icon={playing ? IconPause : IconPlay} size="md" />
        </IconButton>
        <IconButton aria-label="Next" size="sm" onClick={onNext}>
          <Icon icon={IconChevronRight} size="sm" />
        </IconButton>
      </Inline>
      <Inline gap="sm" align="center" style={{ flex: 1 }}>
        <Text variant="footnote" color="third">
          {elapsed}
        </Text>
        <ProgressBar value={progress} style={{ flex: 1 }} />
        <Text variant="footnote" color="third">
          {duration}
        </Text>
      </Inline>
    </Surface>
  );
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  onCopy?: () => void;
  className?: string;
}

/** Code block = Surface + a bar (Text + copy IconButton) + monospace pre. */
export function CodeBlock({ code, language, onCopy, className }: CodeBlockProps) {
  return (
    <Surface level="high" radius="lg" border className={cx('bds-code-block', className)}>
      <Inline justify="space-between" align="center" className="bds-code-block__bar">
        <Text variant="footnote" color="third">
          {language || 'code'}
        </Text>
        <IconButton aria-label="Copy" size="sm" onClick={onCopy}>
          <Icon icon={IconCopy} size="sm" />
        </IconButton>
      </Inline>
      <pre className="bds-code-block__pre">
        <code>{code}</code>
      </pre>
    </Surface>
  );
}
