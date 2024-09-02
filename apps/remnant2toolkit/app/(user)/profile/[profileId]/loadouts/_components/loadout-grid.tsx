'use server';

import { getArrayOfLength } from '@repo/utils';

import { getLoadoutList } from '@/app/(builds)/_actions/get-loadout-list';
import { EmptyLoadoutCard } from '@/app/(builds)/_components/empty-loadout-card';
import { LoadoutCard } from '@/app/(builds)/_components/loadout-card';

interface Props {
  isEditable: boolean;
  profileId?: string;
}

export async function LoadoutGrid({ isEditable, profileId }: Props) {
  const userLoadoutBuilds = await getLoadoutList(profileId);

  return (
    <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {getArrayOfLength(8).map((_, index) => {
        const userLoadoutBuild = userLoadoutBuilds.find(
          (build) => build.slot - 1 === index,
        );

        if (!userLoadoutBuild) {
          return (
            <EmptyLoadoutCard
              key={index}
              showHover={false}
              label="No loadout selected for this slot."
            />
          );
        }

        return (
          <LoadoutCard
            key={`${userLoadoutBuild.id}-${index}`}
            build={userLoadoutBuild}
            isEditable={isEditable}
          />
        );
      })}
    </div>
  );
}
