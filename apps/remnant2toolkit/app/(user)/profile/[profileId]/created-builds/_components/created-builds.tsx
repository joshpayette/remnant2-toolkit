'use client';

import { useCallback, useState } from 'react';

import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { CreatedBuildsList } from '@/app/(user)/profile/[profileId]/created-builds/_components/created-builds-list';

interface Props {
  buildFilters: Partial<BuildListFilters>;
  isEditable: boolean;
  profileId: string;
}

export function CreatedBuilds({ buildFilters, isEditable, profileId }: Props) {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center sm:mb-6">
        <BuildFilters
          key="user-created-builds-filters"
          buildFiltersOverrides={buildFilters}
          loadingResults={loadingResults}
        />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatedBuildsList
          isEditable={isEditable}
          profileId={profileId}
          buildFiltersOverrides={buildFilters}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
