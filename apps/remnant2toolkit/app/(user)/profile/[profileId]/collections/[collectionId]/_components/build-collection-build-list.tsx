'use client';

import type { BuildCollection } from '@repo/db';
import { BaseButton, EditIcon, TrashIcon } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import type { DBBuild } from '@/app/(builds)/_types/db-build';
import { deleteBuildCollection } from '@/app/(user)/profile/[profileId]/collections/_actions/delete-build-collection';
import { editBuildCollection } from '@/app/(user)/profile/[profileId]/collections/_actions/edit-build-collection';
import { MAX_ALLOWED_BUILDS_PER_COLLECTION } from '@/app/(user)/profile/[profileId]/collections/_constants/max-allowed-builds-per-collection';
import { DeleteBuildCollectionAlert } from '@/app/(user)/profile/[profileId]/collections/[collectionId]/_components/delete-build-collection-alert';
import { EditBuildCollectionDialog } from '@/app/(user)/profile/[profileId]/collections/[collectionId]/_components/edit-build-collection-dialog';

interface Props {
  builds: DBBuild[];
  collection: BuildCollection;
  isEditable: boolean;
}

export function BuildCollectionBuildList({
  builds,
  collection,
  isEditable,
}: Props) {
  const router = useRouter();

  const [editCollectionDialogOpen, setEditCollectionDialogOpen] =
    useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  async function handleDeleteCollection() {
    setDeleteAlertOpen(false);
    const response = await deleteBuildCollection(collection.id);
    if (isErrorResponse(response)) {
      toast.error('Failed to delete build collection');
      console.error(response.errors);
      return;
    }
    toast.success('Build collection deleted');
    router.push(
      `https://remnant2toolkit.com/profile/${collection.createdById}/collections`,
    );
  }

  async function handleRemoveBuildFromCollection(buildId: string) {
    const response = await editBuildCollection({
      collectionId: collection.id,
      collectionName: collection.name,
      collectionDescription: collection.description || '',
      buildIds: builds
        .filter((build) => build.id !== buildId)
        .map((build) => build.id),
    });
    if (isErrorResponse(response)) {
      toast.error('Failed to remove build from collection');
      console.error(response.errors);
      return;
    }
    toast.success('Build removed from collection');
    router.refresh();
  }

  async function handleUpdateCollectionInfo(
    newCollectionName: string,
    newCollectionDescription: string,
  ) {
    setEditCollectionDialogOpen(false);
    const response = await editBuildCollection({
      collectionId: collection.id,
      collectionName: newCollectionName,
      collectionDescription: newCollectionDescription,
      buildIds: builds.map((build) => build.id),
    });
    if (isErrorResponse(response)) {
      toast.error('Failed to update build collection info');
      console.error(response.errors);
      return;
    }
    toast.success('Build collection info updated');
    router.refresh();
  }

  return (
    <>
      {isEditable && (
        <div className="flex gap-2">
          <EditBuildCollectionDialog
            open={editCollectionDialogOpen}
            onClose={() => setEditCollectionDialogOpen(false)}
            onConfirm={handleUpdateCollectionInfo}
            collectionName={collection.name}
            collectionDescription={collection.description || ''}
          />
          <BaseButton
            color="yellow"
            aria-label="Edit Build Collection"
            onClick={() => setEditCollectionDialogOpen(true)}
          >
            <EditIcon className="h-4 w-4" /> Edit Collection
          </BaseButton>

          <DeleteBuildCollectionAlert
            open={deleteAlertOpen}
            onClose={() => setDeleteAlertOpen(false)}
            onDelete={handleDeleteCollection}
          />
          <BaseButton
            color="red"
            aria-label="Delete Build Collection"
            onClick={() => setDeleteAlertOpen(true)}
          >
            <div className="flex flex-row items-center justify-center">
              <TrashIcon className="mr-1 h-4 w-4" /> Delete Collection
            </div>
          </BaseButton>
        </div>
      )}

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
                isEditable ? (
                  <div className="m-1">
                    <BaseButton
                      color="red"
                      aria-label="Delete Build"
                      onClick={() => handleRemoveBuildFromCollection(build.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </BaseButton>
                  </div>
                ) : undefined
              }
            />
          </div>
        ))}
      </BuildList>
    </>
  );
}
