import { BaseButton, Tooltip, TrashIcon } from '@repo/ui';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { removeBuildFromLoadout } from '@/app/(builds)/_actions/remove-build-from-loadout';
import { RemoveFromLoadoutAlert } from '@/app/(builds)/_components/remove-from-loadout-alert';

export function RemoveFromLoadoutButton({
  buildId,
  variantIndex,
  slot,
  callback,
}: {
  buildId: string;
  variantIndex: number;
  slot: number;
  callback?: (success: boolean) => void;
}) {
  const [alertOpen, setAlertOpen] = useState(false);

  async function handleRemoveFromLoadout() {
    const response = await removeBuildFromLoadout(buildId, slot, variantIndex);
    if (!response.success) {
      if (callback) callback(false);
      toast.error('Failed to remove build from loadout');
      setAlertOpen(false);
      return;
    }
    if (callback) callback(true);
    toast.success('Build removed from loadout');
    setAlertOpen(false);
  }

  function handleCancel() {
    if (callback) callback(false);
    setAlertOpen(false);
  }

  return (
    <>
      <RemoveFromLoadoutAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onCancel={handleCancel}
        onConfirm={handleRemoveFromLoadout}
      />
      <Tooltip content="Remove From loadout?">
        <BaseButton
          color="red"
          className="flex flex-col items-center gap-y-1"
          aria-label="Remove from your pinned loadouts"
          onClick={() => setAlertOpen(true)}
        >
          <TrashIcon className="h-5 w-5" />
        </BaseButton>
      </Tooltip>
    </>
  );
}
