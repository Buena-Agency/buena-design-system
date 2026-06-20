import { Fragment } from 'react';
import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Text, Link } from '../atoms/typography';
import { Icon } from '../atoms/icon';
import { IconButton } from '../atoms/button';
import { Inline } from '../atoms/layout';
import { IconChevronRight, IconChevronLeft } from '../../icons';
import { cx } from '../cx';

/** Underline tab bar = Tab molecules. */
export function Tabs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className={cx('bds-tabs', className)} {...rest} />;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** A single underline tab = button + Text atom. */
export function Tab({ selected, className, type = 'button', children, ...rest }: TabProps) {
  return (
    <button role="tab" type={type} aria-selected={selected} className={cx('bds-tab', className)} {...rest}>
      <Text variant="callout" color="inherit">
        {children}
      </Text>
    </button>
  );
}

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

/** Breadcrumb = Link + Text atoms with Icon separators. */
export function Breadcrumb({ items, className, ...rest }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cx('bds-breadcrumb', className)} {...rest}>
      {items.map((it, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={i}>
            {i > 0 && <Icon icon={IconChevronRight} size="xs" color="var(--color-text-third)" />}
            {it.href && !isLast ? (
              <Link variant="subtle" href={it.href}>
                <Text variant="bodySmall" color="inherit">
                  {it.label}
                </Text>
              </Link>
            ) : (
              <Text variant="bodySmall" color={isLast ? 'primary' : 'third'}>
                {it.label}
              </Text>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

export interface PaginationProps {
  page: number;
  total: number;
  onChange?: (page: number) => void;
  className?: string;
}

/** Pagination = IconButton atoms + numbered page buttons. */
export function Pagination({ page, total, onChange, className }: PaginationProps) {
  return (
    <Inline gap="xs" className={cx('bds-pagination', className)}>
      <IconButton aria-label="Previous page" size="sm" disabled={page <= 1} onClick={() => onChange?.(page - 1)}>
        <Icon icon={IconChevronLeft} size="sm" />
      </IconButton>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? 'page' : undefined}
          className={cx('bds-page', p === page && 'bds-page--active')}
          onClick={() => onChange?.(p)}
        >
          <Text variant="bodySmall" color="inherit">
            {p}
          </Text>
        </button>
      ))}
      <IconButton aria-label="Next page" size="sm" disabled={page >= total} onClick={() => onChange?.(page + 1)}>
        <Icon icon={IconChevronRight} size="sm" />
      </IconButton>
    </Inline>
  );
}

export interface SegmentedOption {
  value: string;
  label: ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

/** Segmented control = a track of pressable Text segments. */
export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div role="tablist" className={cx('bds-segmented', className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          className={cx('bds-segment', o.value === value && 'bds-segment--active')}
          onClick={() => onChange?.(o.value)}
        >
          <Text variant="caption" weight={500} color="inherit">
            {o.label}
          </Text>
        </button>
      ))}
    </div>
  );
}
