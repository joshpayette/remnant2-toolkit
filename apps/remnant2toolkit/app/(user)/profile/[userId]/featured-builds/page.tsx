'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';

import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { FeaturedBuilds } from '@/app/(user)/profile/[userId]/featured-builds/featured-builds';

const buildFilters: Partial<BuildListFilters> = {
  patchAffected: true,
};

export default function Page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  const { data: session, status } = useSession();
  const isEditable = session?.user?.id === userId;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

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
        <FeaturedBuilds
          isEditable={isEditable}
          userId={userId}
          buildFiltersOverrides={buildFilters}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
