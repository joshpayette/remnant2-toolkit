'use client';

import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogTitle,
  BaseField,
  BaseInput,
  BaseLabel,
  BaseTextarea,
} from '@repo/ui';
import { useState } from 'react';

import { MAX_COLLECTION_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/max-build-description-length';

interface Props {
  collectionName: string;
  collectionDescription: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (
    newCollectionName: string,
    newCollectionDescription: string,
  ) => void;
}

export function EditBuildCollectionDialog({
  collectionName,
  collectionDescription,
  open,
  onClose,
  onConfirm,
}: Props) {
  const [newCollectionName, setNewCollectionName] = useState(collectionName);
  const [newCollectionDescription, setNewCollectionDescription] = useState(
    collectionDescription,
  );

  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>Edit Build Collection</BaseDialogTitle>
      <BaseDialogBody>
        <div className="flex flex-col gap-4">
          <BaseField>
            <BaseLabel>Collection Name</BaseLabel>
            <BaseInput
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
          </BaseField>
          <BaseField>
            <BaseLabel>
              Collection Description (Limit:{' '}
              {`${newCollectionDescription.length} /
                ${MAX_COLLECTION_DESCRIPTION_LENGTH}`}
              )
            </BaseLabel>
            <BaseTextarea
              value={newCollectionDescription}
              onChange={(e) => setNewCollectionDescription(e.target.value)}
              maxLength={MAX_COLLECTION_DESCRIPTION_LENGTH}
            />
          </BaseField>
        </div>
      </BaseDialogBody>
      <BaseDialogActions>
        <BaseButton plain onClick={onClose} aria-label="Cancel">
          Cancel
        </BaseButton>
        <BaseButton
          onClick={() => onConfirm(newCollectionName, newCollectionDescription)}
          color="green"
          aria-label="Save Changes"
        >
          Save Changes
        </BaseButton>
      </BaseDialogActions>
    </BaseDialog>
  );
}
