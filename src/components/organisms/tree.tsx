import type { HTMLAttributes } from 'react';
import { cx } from '../cx';

/** Tree container = holds TreeItem molecules (render them with `depth`). */
export function TreeView({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div role="tree" className={cx('bds-tree', className)} {...rest} />;
}
