'use client';

import { useCallback, useState } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { GimmickBuildsList } from '@/app/(builds)/gimmick-builds/_components/gimmick-builds-list';

export function GimmickBuilds() {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  return (
    <>
      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters
          key="gimmick-build-filters"
          loadingResults={loadingResults}
        />
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2">
        <GimmickBuildsList
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
