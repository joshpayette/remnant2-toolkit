'use client';

import { cn } from '@repo/ui';
import { getArrayOfLength } from '@repo/utils';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildCardSkeleton } from '@/app/(builds)/_components/build-card-skeleton';

interface Props {
  children: React.ReactNode;
  headerActions: React.ReactNode | undefined;
  pagination: React.ReactNode;
  isLoading: boolean;
  itemsOnThisPage: number;
  label?: string;
}

export function BuildList({
  children,
  headerActions,
  isLoading,
  itemsOnThisPage,
  label,
  pagination,
}: Props) {
  let content: React.ReactNode = (
    <div className="col-span-full flex w-full items-center justify-center py-8">
      <h2 className="text-primary-400 text-2xl font-bold">
        No builds found. Try adjusting your filters.
      </h2>
    </div>
  );

  if (itemsOnThisPage > 0) {
    content = children;
  }

  if (isLoading) {
    content = getArrayOfLength(DEFAULT_ITEMS_PER_PAGE).map((_, index) => (
      <BuildCardSkeleton key={index} />
    ));
  }

  return (
    <div className={cn(isLoading ? 'min-h-[1000px]' : 'min-h-0')}>
      {label || headerActions ? (
        <div className="border-b-primary-500 flex w-full flex-row items-end justify-center border-b py-2">
          {label ? <div className="w-full text-xl">{label}</div> : null}
          {headerActions}
        </div>
      ) : null}
      {pagination}
      <ul
        role="list"
        className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {content}
      </ul>
      {pagination}
    </div>
  );
}
