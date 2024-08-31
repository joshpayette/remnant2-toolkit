'use client';

import { ChangeLoadoutSlotButton } from '@/app/_components/buttons/loadout-buttons/change-loadout-slot-button';
import { RemoveFromLoadoutButton } from '@/app/_components/buttons/loadout-buttons/remove-from-loadout-button';
import { BuildCard } from '@/app/(builds)/_components/cards/build-card';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

interface Props {
  build: DBBuild & { slot: number };
  isEditable: boolean;
  onRemove?: () => void;
  onSlotChange?: (
    success: boolean,
    newLoadouts: {
      oldSlot: number;
      newSlot: number;
    } | null,
  ) => void;
}

export function LoadoutCard({
  build,
  isEditable,
  onRemove,
  onSlotChange,
}: Props) {
  return (
    <BuildCard
      build={build}
      isLoading={false}
      footerActions={
        isEditable ? (
          <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
            <ChangeLoadoutSlotButton
              buildId={build.id}
              callback={onSlotChange}
            />
            <RemoveFromLoadoutButton
              buildId={build.id}
              slot={build.slot}
              callback={onRemove}
            />
          </div>
        ) : undefined
      }
    />
  );
}
