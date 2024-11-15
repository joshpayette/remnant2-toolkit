'use client';

import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import type { DBBuild } from '@/app/(builds)/_types/db-build';
import { MAX_ALLOWED_BUILDS_PER_COLLECTION } from '@/app/(user)/profile/[profileId]/collections/_constants/max-allowed-builds-per-collection';

interface Props {
  builds: DBBuild[];
  isEditable: boolean;
}

export function BuildCollectionBuildList({ builds, isEditable }: Props) {
  return (
    <>
      <BuildList
        isLoading={false}
        itemsOnThisPage={MAX_ALLOWED_BUILDS_PER_COLLECTION}
        pagination={null}
        headerActions={null}
      >
        {builds.map((build) => (
          <div key={`${build.id}${build.variantIndex}`} className="w-full">
            <BuildCard
              build={build}
              isLoading={false}
              showBuildVisibility={true}
              footerActions={
                null
                // isEditable ? (
                //   <CreatedBuildCardActions
                //     build={build}
                //     onDelete={(buildId: string) => {
                //       setBuildListState((prevState) => ({
                //         ...prevState,
                //         builds: prevState.builds.filter(
                //           (b) => b.id !== buildId,
                //         ),
                //       }));
                //     }}
                //   />
                // ) : undefined
              }
            />
          </div>
        ))}
      </BuildList>
    </>
  );
}
