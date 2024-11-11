'use client';

import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogTitle,
  BaseDivider,
  BaseInput,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
  BaseText,
} from '@repo/ui';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { createBuildCollection } from '@/app/(user)/profile/[profileId]/collections/_actions/create-build-collection';
import { getBuildCollections } from '@/app/(user)/profile/[profileId]/collections/_actions/get-build-collections';
import type { BuildCollectionWithBuilds } from '@/app/(user)/profile/[profileId]/collections/_types/build-collection-with-builds';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (collection: BuildCollectionWithBuilds) => void;
}

export function AddToCollectionDialog({ open, onClose, onConfirm }: Props) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.id;

  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState<string>('');

  const [buildCollections, setBuildCollections] = useState<
    BuildCollectionWithBuilds[]
  >([]);

  useEffect(() => {
    async function fetchCollections() {
      const response = await getBuildCollections(userId as string);

      if (isErrorResponse(response)) {
        toast.error(response.errors?.join(' '));
        return;
      }
      setBuildCollections(response.collections);
    }

    if (userId) {
      fetchCollections();
    }
  }, [userId]);

  async function handleCreateCollection() {
    if (!newCollectionName) {
      toast.error(
        'Cannot create a new collection - collection name is missing!',
      );
      return;
    }
    const response = await createBuildCollection({
      collectionName: newCollectionName,
      collectionDescription: '',
      buildIds: [],
    });

    if (isErrorResponse(response)) {
      toast.error(response.errors?.join(' '));
      return;
    }

    if (!response.collection || !response.collection?.id) {
      toast.error('Failed to create collection');
      return;
    }

    setBuildCollections((prevCollections) => [
      ...prevCollections,
      response.collection as BuildCollectionWithBuilds,
    ]);

    onConfirm(response.collection);
  }

  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>Add Build to Collection</BaseDialogTitle>
      <BaseDialogBody>
        <BaseText className="mb-2">
          Which collection would you like to add this build to?
        </BaseText>
        <BaseListbox onChange={(value: string) => setCollectionId(value)}>
          {buildCollections.map((collection) => (
            <BaseListboxOption key={collection.id} value={collection.id}>
              <BaseListboxLabel>{collection.name}</BaseListboxLabel>
            </BaseListboxOption>
          ))}
        </BaseListbox>
      </BaseDialogBody>
      <BaseDialogActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton
          onClick={() => {
            const selectedCollection = buildCollections.find(
              (collection) => collection.id === collectionId,
            );
            if (!selectedCollection) {
              toast.error('Failed to find selected collection');
              return;
            }
            onConfirm(selectedCollection);
          }}
          color="green"
        >
          Add to Collection
        </BaseButton>
      </BaseDialogActions>
      <BaseDivider className="mt-2" />
      <BaseDialogBody>
        <BaseText className="mb-2">Create a new collection?</BaseText>
        <BaseInput
          placeholder="Collection Name"
          onChange={(e) => setNewCollectionName(e.target.value)}
        />
      </BaseDialogBody>
      <BaseDialogActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton color="green" onClick={handleCreateCollection}>
          Create and add build
        </BaseButton>
      </BaseDialogActions>
    </BaseDialog>
  );
}
