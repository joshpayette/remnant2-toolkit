'use client';

import { useRef } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildFilters } from '@/app/(builds)/_features/filters/_components/build-filters';
import { BeginnerBuildsList } from '@/app/(builds)/beginner-builds/_components/beginner-builds-list';

export function BeginnerBuilds() {
  const buildListKey = useRef(new Date().getTime());

  /**
   * When a filter changes, we need the build list to re-render
   * to re-fetch the data
   */
  function onFiltersChange() {
    buildListKey.current = new Date().getTime();
  }

  return (
    <>
      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters
          key="beginner-build-filters"
          onFiltersChange={onFiltersChange}
        />
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2">
        <BeginnerBuildsList
          key={buildListKey.current}
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </>
  );
}
