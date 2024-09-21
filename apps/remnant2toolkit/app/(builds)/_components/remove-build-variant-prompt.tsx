'use client';

import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertDescription,
  BaseAlertTitle,
  BaseButton,
} from '@repo/ui';

interface Props {
  open: boolean;
  currentVariantName: string;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function RemoveBuildVariantNamePrompt({
  open,
  currentVariantName,
  onCancel,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Delete Build Variant?</BaseAlertTitle>
      <BaseAlertDescription>
        Are you sure you want to delete the build variant "{currentVariantName}
        "? This action cannot be undone.
      </BaseAlertDescription>
      <BaseAlertActions>
        <BaseButton plain onClick={onCancel}>
          Cancel
        </BaseButton>
        <BaseButton onClick={onConfirm}>Delete Variant</BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  );
}
