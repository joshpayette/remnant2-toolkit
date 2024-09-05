'use client';

import { useCallback, useState } from 'react';

import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { FavoritedBuildsList } from '@/app/(user)/profile/[profileId]/favorited-builds/_components/favorited-builds-list';

const buildFilters: Partial<BuildListFilters> = {
  patchAffected: true,
};

export function FavoritedBuilds() {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center sm:mb-6">
        <BuildFilters
          key="user-favorited-builds-filters"
          buildFiltersOverrides={buildFilters}
          loadingResults={loadingResults}
        />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FavoritedBuildsList
          buildFiltersOverrides={buildFilters}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
