'use client';

import { useRef } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildFilters } from '@/app/(builds)/_features/filters/_components/build-filters';
import { CommunityBuildsList } from '@/app/(builds)/community-builds/_components/community-builds-list';

export function CommunityBuilds() {
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
          key="community-build-filters"
          onFiltersChange={onFiltersChange}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-2">
        <CommunityBuildsList
          key={buildListKey.current}
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </>
  );
}
