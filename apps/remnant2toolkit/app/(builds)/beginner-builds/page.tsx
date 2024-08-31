'use client';

import { DISCORD_INVITE_URL } from '@repo/constants';
import { BaseText, BaseTextLink } from '@repo/ui';
import { useCallback, useState } from 'react';

import { PageHeader } from '@/app/_components/page-header';
import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { BeginnerBuilds } from '@/app/(builds)/beginner-builds/beginner-builds';
import { NAV_ITEMS } from '@/app/(types)/navigation';
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/(utils)/pagination/constants';

export default function Page() {
  const [loadingResults, setLoadingResults] = useState(false);

  const handleToggleLoadingResults = useCallback(
    (isLoading: boolean) => setLoadingResults(isLoading),
    [],
  );

  return (
    <>
      <PageHeader
        title="Beginner Builds"
        subtitle={
          <div className="flex flex-col">
            <BaseText>{NAV_ITEMS.beginnerBuilds.description}</BaseText>
            <BaseTextLink href={DISCORD_INVITE_URL}>
              <span className="text-primary-500">
                Want to feature a beginner build? Join the Remnant 2 Toolkit
                Discord!
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
        <BeginnerBuilds
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  );
}
