'use client';

import { useRef } from 'react';

import { BuildFilters } from '@/app/(builds)/_features/filters/build-filters';
import { FavoritedBuildsList } from '@/app/(user)/profile/[profileId]/favorited-builds/_components/favorited-builds-list';

const buildFiltersOverrides = {
  patchAffected: true,
};

export function FavoritedBuilds() {
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
      <div className="flex w-full flex-col items-center justify-center sm:mb-6">
        <BuildFilters
          key="user-favorited-builds-filters"
          buildFiltersOverrides={buildFiltersOverrides}
          onFiltersChange={onFiltersChange}
        />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FavoritedBuildsList
          key={buildListKey.current}
          buildFiltersOverrides={buildFiltersOverrides}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </>
  );
}
