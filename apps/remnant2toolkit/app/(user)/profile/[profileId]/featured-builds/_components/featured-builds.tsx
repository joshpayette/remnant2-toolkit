'use client';

import { useCallback, useState } from 'react';

import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { FeaturedBuildsList } from '@/app/(user)/profile/[profileId]/featured-builds/_components/featured-builds-list';

interface Props {
  buildFilters: Partial<BuildListFilters>;
  isEditable: boolean;
  profileId: string;
}

export function FeaturedBuilds({ buildFilters, isEditable, profileId }: Props) {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  return (
    <>
      <div className="mb-8 flex w-full flex-col items-center justify-center">
        <BuildFilters
          key="user-featured-builds-filters"
          buildFiltersOverrides={buildFilters}
          loadingResults={loadingResults}
        />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FeaturedBuildsList
          isEditable={isEditable}
          profileId={profileId}
          buildFiltersOverrides={buildFilters}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
