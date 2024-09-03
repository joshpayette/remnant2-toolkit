'use client';

import React, { createContext, useContext, useState } from 'react';
import { BaseLink } from '../link';
import { cn } from '../../utils/classnames';

const TableContext = createContext<{
  bleed: boolean;
  dense: boolean;
  grid: boolean;
  striped: boolean;
}>({
  bleed: false,
  dense: false,
  grid: false,
  striped: false,
});

export function BaseTable({
  bleed = false,
  dense = false,
  grid = false,
  striped = false,
  className,
  children,
  ...props
}: {
  bleed?: boolean;
  dense?: boolean;
  grid?: boolean;
  striped?: boolean;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <TableContext.Provider
      value={
        { bleed, dense, grid, striped } as React.ContextType<
          typeof TableContext
        >
      }
    >
      <div className="flow-root">
        <div
          {...props}
          className={cn(
            className,
            '-ui-mx-[--gutter] ui-overflow-x-auto ui-whitespace-nowrap',
          )}
        >
          <div
            className={cn(
              'ui-inline-block ui-min-w-full ui-align-middle',
              !bleed && 'sm:ui-px-[--gutter]',
            )}
          >
            <table className="ui-min-w-full ui-text-left ui-text-sm/6">
              {children}
            </table>
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
}

export function BaseTableHead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'thead'>) {
  return <thead className={cn(className, 'ui-text-zinc-400')} {...props} />;
}

export function BaseTableBody(props: React.ComponentPropsWithoutRef<'tbody'>) {
  return <tbody {...props} />;
}

const TableRowContext = createContext<{
  href?: string;
  target?: string;
  title?: string;
}>({
  href: undefined,
  target: undefined,
  title: undefined,
});

export function BaseTableRow({
  href,
  target,
  title,
  className,
  children,
  ...props
}: {
  href?: string;
  target?: string;
  title?: string;
} & React.ComponentPropsWithoutRef<'tr'>) {
  const { striped } = useContext(TableContext);

  return (
    <TableRowContext.Provider
      value={
        { href, target, title } as React.ContextType<typeof TableRowContext>
      }
    >
      <tr
        {...props}
        className={cn(
          className,
          href &&
            'focus-within:ui-bg-surface-solid/[2.5%] has-[[data-row-link][data-focus]]:ui-outline has-[[data-row-link][data-focus]]:ui-outline-2 has-[[data-row-link][data-focus]]:-ui-outline-offset-2 has-[[data-row-link][data-focus]]:ui-outline-blue-500',
          striped && 'even:ui-bg-surface-solid/[2.5%]',
          href && striped && 'hover:ui-bg-surface-solid/5',
          href && !striped && 'hover:ui-bg-surface-solid/[2.5%]',
        )}
      >
        {children}
      </tr>
    </TableRowContext.Provider>
  );
}

export function BaseTableHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'th'>) {
  const { bleed, grid } = useContext(TableContext);

  return (
    <th
      {...props}
      className={cn(
        className,
        'ui-border-b-surface-solid/10 ui-border-b ui-px-4 ui-py-2 ui-font-medium first:ui-pl-[var(--gutter,theme(spacing.2))] last:ui-pr-[var(--gutter,theme(spacing.2))]',
        grid && 'ui-border-l-surface-solid/5 ui-border-l first:ui-border-l-0',
        !bleed && 'sm:first:ui-pl-2 sm:last:ui-pr-2',
      )}
    />
  );
}

export function BaseTableCell({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'td'>) {
  const { bleed, dense, grid, striped } = useContext(TableContext);
  const { href, target, title } = useContext(TableRowContext);
  const [cellRef, setCellRef] = useState<HTMLElement | null>(null);

  return (
    <td
      ref={href ? setCellRef : undefined}
      {...props}
      className={cn(
        className,
        'ui-relative ui-px-4 first:ui-pl-[var(--gutter,theme(spacing.2))] last:ui-pr-[var(--gutter,theme(spacing.2))]',
        !striped && 'ui-border-surface-solid/5 ui-border-b',
        grid && 'ui-border-l-surface-solid/5 ui-border-l first:ui-border-l-0',
        dense ? 'ui-py-2.5' : 'ui-py-4',
        !bleed && 'sm:first:ui-pl-2 sm:last:ui-pr-2',
      )}
    >
      {href ? (
        <BaseLink
          aria-label={title}
          className="ui-absolute ui-inset-0 focus:ui-outline-none"
          data-row-link
          href={href}
          tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
          target={target}
        />
      ) : null}
      {children}
    </td>
  );
}
