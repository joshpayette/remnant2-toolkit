'use client';

import { BaseText, BaseTextLink } from '@repo/ui';
import { useCallback, useState } from 'react';

import { PageHeader } from '@/app/_components/page-header';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_utils/pagination/constants';
import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { BaseGameBuilds } from '@/app/(builds)/base-game-builds/base-game-builds';

export default function Page() {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  return (
    <>
      <PageHeader
        title="Base Game Builds"
        subtitle={
          <div className="flex flex-col">
            <BaseText>{NAV_ITEMS.baseGameBuilds.description}</BaseText>
            <BaseTextLink href="/community-builds?releases=base&withQuality=true">
              <span className="text-primary-500">
                Want more? Click here to browse all community submitted base
                game builds.
              </span>
            </BaseTextLink>
          </div>
        }
      />

      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters
          key="beginner-build-filters"
          loadingResults={loadingResults}
        />
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2">
        <BaseGameBuilds
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
