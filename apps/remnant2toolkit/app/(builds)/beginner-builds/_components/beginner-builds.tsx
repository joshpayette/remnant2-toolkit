'use client';

import { useCallback, useState } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { BeginnerBuildsList } from '@/app/(builds)/beginner-builds/_components/beginner-builds-list';

export function BeginnerBuilds() {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  return (
    <>
      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters
          key="beginner-build-filters"
          loadingResults={loadingResults}
        />
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2">
        <BeginnerBuildsList
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
