'use client';

import { useCallback, useRef, useState } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { FeaturedBuildsList } from '@/app/(builds)/featured-builds/_components/featured-builds-list';

export function FeaturedBuilds() {
  // TODO Remove
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  const buildListKey = useRef(new Date().getTime());

  function onFiltersChange() {
    buildListKey.current = new Date().getTime();
  }

  return (
    <>
      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters
          key="featured-build-filters"
          loadingResults={loadingResults}
          onFiltersChange={onFiltersChange}
        />
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2">
        <FeaturedBuildsList
          key={buildListKey.current}
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
