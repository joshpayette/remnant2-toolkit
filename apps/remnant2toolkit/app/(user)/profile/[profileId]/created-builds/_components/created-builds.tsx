'use client';

import { useRef } from 'react';

import { BuildFilters } from '@/app/(builds)/_components/filters/build-filters';
import { CreatedBuildsList } from '@/app/(user)/profile/[profileId]/created-builds/_components/created-builds-list';

const buildFiltersOverrides = {
  patchAffected: true,
  withQuality: false,
};

interface Props {
  isEditable: boolean;
  profileId: string;
}

export function CreatedBuilds({ isEditable, profileId }: Props) {
  const buildListKey = useRef(new Date().getTime());

  /**
   * When a filter changes, we need the build list to re-render
   * to re-fetch the data
   */
  function onFiltersChange() {
    buildListKey.current = new Date().getTime();
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center sm:mb-6">
        <BuildFilters
          key="user-created-builds-filters"
          buildFiltersOverrides={buildFiltersOverrides}
          onFiltersChange={onFiltersChange}
        />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatedBuildsList
          key={buildListKey.current}
          isEditable={isEditable}
          profileId={profileId}
          buildFiltersOverrides={buildFiltersOverrides}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </>
  );
}
