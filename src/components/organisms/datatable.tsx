import type { ReactNode } from 'react';
import { Surface } from '../atoms/layout';
import { DataTableRow } from '../molecules/display';
import { cx } from '../cx';

export interface DataTableProps {
  columns: ReactNode[];
  rows: ReactNode[][];
  className?: string;
}

/** Data table = Surface wrapping a header + DataTableRow molecules. */
export function DataTable({ columns, rows, className }: DataTableProps) {
  return (
    <Surface level="med" radius="xl" border role="table" className={cx('bds-table', className)}>
      <DataTableRow header cells={columns} />
      {rows.map((r, i) => (
        <DataTableRow key={i} cells={r} />
      ))}
    </Surface>
  );
}
