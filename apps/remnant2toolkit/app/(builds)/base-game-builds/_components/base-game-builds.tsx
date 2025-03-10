'use client';

import { useRef } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildFilters } from '@/app/(builds)/_features/filters/_components/build-filters';
import { BaseGameBuildsList } from '@/app/(builds)/base-game-builds/_components/base-game-builds-list';

export function BaseGameBuilds() {
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
        <BaseGameBuildsList
          key={buildListKey.current}
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </>
  );
}
