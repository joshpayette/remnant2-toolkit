import {
  BaseButton,
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
  Skeleton,
} from '@repo/ui';
import { getArrayOfLength } from '@repo/utils';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { addBuildToLoadout } from '@/app/(builds)/_actions/add-build-to-loadout';
import { getLoadoutList } from '@/app/(builds)/_actions/get-loadout-list';
import { EmptyLoadoutCard } from '@/app/(builds)/_components/empty-loadout-card';
import { LoadoutCard } from '@/app/(builds)/_components/loadout-card';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

interface Props {
  open: boolean;
  buildId: string | null;
  isEditable: boolean;
  onClose: () => void;
}

export function LoadoutDialog({ open, buildId, isEditable, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [loadoutList, setLoadoutList] = useState<
    Array<DBBuild & { slot: number }>
  >([]);

  async function fetchLoadoutList() {
    const userLoadoutBuilds = await getLoadoutList();
    setLoadoutList(userLoadoutBuilds);
    setLoading(false);
  }

  useEffect(() => {
    fetchLoadoutList();
  }, []);

  async function addToLoadout(slot: number) {
    if (!buildId) {
      return;
    }

    if (slot < 1 || slot > 8) {
      toast.error('Invalid slot');
      return;
    }

    const response = await addBuildToLoadout(buildId, slot);
    if (!response.success) {
      toast.error('Failed to add build to loadout');
      onClose();
      return;
    }

    const newLoadoutList = await getLoadoutList();
    setLoadoutList(newLoadoutList);

    toast.success('Build added to loadout');
    onClose();
  }

  function removeFromLoadout(slot: number) {
    const newLoadoutList = loadoutList.filter((build) => build.slot !== slot);
    setLoadoutList(newLoadoutList);
  }

  function swapLoadoutSlot({
    oldSlot,
    newSlot,
  }: {
    oldSlot: number;
    newSlot: number;
  }) {
    let newLoadoutList = [...loadoutList];

    newLoadoutList = newLoadoutList.map((build) => {
      if (build.slot === oldSlot) {
        return { ...build, slot: newSlot };
      }
      if (build.slot === newSlot) {
        return { ...build, slot: oldSlot };
      }
      return build;
    });

    setLoadoutList(newLoadoutList);
  }

  return (
    <BaseDialog open={open} onClose={onClose} size="6xl">
      <BaseDialogTitle>Loadouts</BaseDialogTitle>
      <BaseDialogDescription>
        Builds added to a loadout will be favorited. Unfavoriting a build will
        remove it from the loadout.
      </BaseDialogDescription>
      <BaseDialogBody>
        <div className="my-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {getArrayOfLength(8).map((_, index) => {
            if (loading) {
              return (
                <Skeleton
                  key={index}
                  className="bg-background-solid col-span-1 flex h-full min-h-[350px] flex-col items-center justify-start rounded-lg border-4 border-dashed border-gray-500 text-center shadow"
                />
              );
            }

            const userLoadoutBuild = loadoutList.find(
              (build) => build.slot - 1 === index,
            );

            if (!userLoadoutBuild) {
              return (
                <BaseButton
                  plain
                  key={index}
                  onClick={() => addToLoadout(index + 1)}
                >
                  <EmptyLoadoutCard
                    key={index}
                    showHover={true}
                    label="Click to add build to this loadout slot."
                  />
                </BaseButton>
              );
            }

            return (
              <LoadoutCard
                key={`${userLoadoutBuild.id}-${index}`}
                build={userLoadoutBuild}
                isEditable={isEditable}
                onRemove={() => removeFromLoadout(userLoadoutBuild.slot)}
                onSlotChange={(success, newLoadouts) => {
                  if (success && newLoadouts) {
                    swapLoadoutSlot(newLoadouts);
                  }
                }}
              />
            );
          })}
        </div>
      </BaseDialogBody>
    </BaseDialog>
  );
}
