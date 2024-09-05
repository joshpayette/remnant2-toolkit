'use client';

import { useCallback, useState } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { FeaturedBuildsList } from '@/app/(builds)/featured-builds/_components/featured-builds-list';

export function FeaturedBuilds() {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  return (
    <>
      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters
          key="featured-build-filters"
          loadingResults={loadingResults}
        />
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2">
        <FeaturedBuildsList
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
