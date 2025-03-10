'use client';

import { BaseButton, MoveIcon, Tooltip } from '@repo/ui';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { changeLoadoutSlot } from '@/app/(builds)/_actions/change-loadout-slot';
import { ChangeLoadoutSlotPrompt } from '@/app/(builds)/_components/change-loadout-slot-prompt';

export function ChangeLoadoutSlotButton({
  buildId,
  variantIndex,
  callback,
}: {
  buildId: string;
  variantIndex: number;
  callback?: (
    success: boolean,
    newLoadouts: {
      oldSlot: number;
      newSlot: number;
    } | null,
  ) => void;
}) {
  const [alertOpen, setAlertOpen] = useState(false);

  async function handleConfirm(newSlot: string) {
    const newSlotNumber = parseInt(newSlot);
    if (isNaN(newSlotNumber) || newSlotNumber < 1 || newSlotNumber > 8) {
      if (callback) callback(false, null);
      setAlertOpen(false);
      toast.error('Invalid slot number');
      return;
    }

    const response = await changeLoadoutSlot(
      buildId,
      newSlotNumber,
      variantIndex,
    );
    if (!response.success) {
      if (callback) callback(false, null);
      toast.error('Failed to change loadout slot');
      setAlertOpen(false);
      return;
    }
    if (callback) callback(true, response.newLoadouts ?? null);
    toast.success('Loadout slot changed successfully');
    setAlertOpen(false);
  }

  function handleCancel() {
    if (callback) {
      callback(false, null);
    }
    setAlertOpen(false);
  }

  return (
    <>
      <ChangeLoadoutSlotPrompt
        open={alertOpen}
        onCancel={handleCancel}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirm}
      />
      <Tooltip content="Move to different loadout slot">
        <BaseButton
          color="cyan"
          className="flex flex-col items-center gap-y-1 text-xs"
          aria-label="Move to different loadout slot"
          onClick={() => setAlertOpen(true)}
        >
          <MoveIcon className="h-5 w-5" />
        </BaseButton>
      </Tooltip>
    </>
  );
}
