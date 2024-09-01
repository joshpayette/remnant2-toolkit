'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';

import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { FavoritedBuilds } from '@/app/(user)/profile/[userId]/favorited-builds/favorited-builds';

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

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session?.user?.id !== userId || status === 'unauthenticated') {
    return (
      <p className="text-red-500">You are not authorized to view this page.</p>
    );
  }

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
        <FavoritedBuilds
          buildFiltersOverrides={buildFilters}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
