'use client';

import { urlNoCache } from '@repo/utils';
import copy from 'clipboard-copy';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { startTransition, useOptimistic, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';

import { ToCsvButton } from '@/app/_components/to-csv-button';
import { isErrorResponse } from '@/app/_libs/is-error-response';
import {
  type ItemOwnershipPreference,
  LOCALSTORAGE_KEY,
} from '@/app/_types/localstorage';
import { LoadoutDialog } from '@/app/(builds)/_components/loadout-dialog';
import { ModeratorBuildToolsDialog } from '@/app/(builds)/_components/moderator-build-tools-dialog';
import { useImageExport } from '@/app/(builds)/_hooks/use-image-export';
import { buildStateToCsvData } from '@/app/(builds)/_libs/build-state-to-csv-data';
import { handleFavoriteBuild } from '@/app/(builds)/_libs/handlers/handle-favorite-build';
import { setLocalBuildItemOwnership } from '@/app/(builds)/_libs/set-local-build-item-ownership';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { AddToCollectionButton } from '@/app/(builds)/builder/_components/add-to-collection-button';
import { AddToCollectionDialog } from '@/app/(builds)/builder/_components/add-to-collection-dialog';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { DeleteBuildButton } from '@/app/(builds)/builder/_components/delete-build-button';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/detailed-build-dialog';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/detailed-view-button';
import { DuplicateBuildButton } from '@/app/(builds)/builder/_components/duplicate-build-button';
import { EditBuildButton } from '@/app/(builds)/builder/_components/edit-build-button';
import { FavoriteBuildButton } from '@/app/(builds)/builder/_components/favorite-build-button';
import { FavoriteBuildDialog } from '@/app/(builds)/builder/_components/favorite-build-dialog';
import { GenerateBuildImageButton } from '@/app/(builds)/builder/_components/generate-build-image';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/image-download-info-dialog';
import { ItemOwnershipPreferenceButton } from '@/app/(builds)/builder/_components/item-ownership-preference-button';
import { LoadoutManagementButton } from '@/app/(builds)/builder/_components/loadout-management-button';
import { ModeratorToolsButton } from '@/app/(builds)/builder/_components/moderator-tools-button';
import { ShareBuildButton } from '@/app/(builds)/builder/_components/share-build-button';
import { useDiscoveredItems } from '@/app/(items)/_hooks/use-discovered-items';
import { editBuildCollection } from '@/app/(user)/profile/[profileId]/collections/_actions/edit-build-collection';
import type { BuildCollectionWithBuilds } from '@/app/(user)/profile/[profileId]/collections/_types/build-collection-with-builds';

interface Props {
  activeBuildState: BuildState;
  activeVariantIndex: number;
  mainBuildState: BuildState;
  onDuplicateBuild: () => void;
}

export function ViewBuild({
  activeBuildState,
  activeVariantIndex,
  mainBuildState,
  onDuplicateBuild,
}: Props) {
  const { data: session, status: sessionStatus } = useSession();

  const router = useRouter();
  const buildContainerRef = useRef<HTMLDivElement>(null);

  const { discoveredItemIds } = useDiscoveredItems();
  const buildStateWithItemsOwned = setLocalBuildItemOwnership({
    buildState: activeBuildState,
    discoveredItemIds,
    sessionStatus,
  });

  const [showModeratorTooling, setShowModeratorTooling] = useState(false);

  const [itemOwnershipPreference, setItemOwnershipPreference] =
    useLocalStorage<ItemOwnershipPreference>(
      LOCALSTORAGE_KEY.ITEM_OWNERSHIP_PREFERENCE,
      false,
      { initializeWithValue: false },
    );

  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);
  const [loadoutDialogOpen, setLoadoutDialogOpen] = useState(false);
  const [signInRequiredDialogOpen, setSignInRequiredDialogOpen] =
    useState(false);
  const [addToCollectionDialogOpen, setAddToCollectionDialogOpen] =
    useState(false);

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    imageExportLoading,
    handleClearImageDownloadInfo,
    handleImageExport,
  } = useImageExport();

  const [optimisticUpvote, setOptimisticUpvote] = useOptimistic<
    boolean,
    boolean
  >(mainBuildState.upvoted, (_state, newUpvoted) => newUpvoted);

  function onFavoriteBuild() {
    startTransition(() => {
      // if user is not signed in, let them know signin is required
      if (!session?.user?.id) {
        setSignInRequiredDialogOpen(true);
        return;
      }

      setOptimisticUpvote(!optimisticUpvote);

      handleFavoriteBuild({
        buildState: mainBuildState,
        userId: session?.user?.id,
        onFavorite: () => router.refresh(),
      });
    });
  }

  async function handleAddToCollection(collection: BuildCollectionWithBuilds) {
    setAddToCollectionDialogOpen(false);

    const buildAlreadyInCollection = collection.builds.some(
      (build) => build.id === activeBuildState.buildId,
    );
    if (buildAlreadyInCollection) {
      toast.error('Build is already in this collection.');
      return;
    }
    if (!activeBuildState.buildId) {
      toast.error(
        'You must first save this build to the database before it can be added to a collection.',
      );
      return;
    }

    const response = await editBuildCollection({
      collectionId: collection.id,
      collectionName: collection.name,
      collectionDescription: collection.description ?? '',
      buildIds: [
        ...collection.builds.map((build) => build.id),
        activeBuildState.buildId,
      ],
    });

    if (isErrorResponse(response)) {
      toast.error(response.errors?.join(' '));
      return;
    }
    toast.success(`Collection ${collection.name} created successfully!`);
  }

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildStateToCsvData(activeBuildState);
  const isMainBuild = activeBuildState.buildId === mainBuildState.buildId;

  // #region RENDER

  return (
    <>
      <BuilderContainer
        buildContainerRef={buildContainerRef}
        buildState={buildStateWithItemsOwned}
        isEditable={false}
        isMainBuild={isMainBuild}
        isScreenshotMode={isScreenshotMode}
        itemOwnershipPreference={itemOwnershipPreference}
        showControls={showControls}
        builderActions={
          <>
            <DetailedBuildDialog
              buildState={activeBuildState}
              open={detailedBuildDialogOpen}
              onClose={() => setDetailedBuildDialogOpen(false)}
            />
            <LoadoutDialog
              key={mainBuildState.buildId}
              buildId={mainBuildState.buildId}
              open={loadoutDialogOpen}
              onClose={() => setLoadoutDialogOpen(false)}
              isEditable={true}
            />
            <ImageDownloadInfoDialog
              onClose={handleClearImageDownloadInfo}
              imageDownloadInfo={imageDownloadInfo}
            />
            <FavoriteBuildDialog
              open={signInRequiredDialogOpen}
              onClose={() => setSignInRequiredDialogOpen(false)}
            />
            <AddToCollectionDialog
              open={addToCollectionDialogOpen}
              onClose={() => setAddToCollectionDialogOpen(false)}
              onConfirm={handleAddToCollection}
            />

            {session && session.user?.role === 'admin' && (
              <>
                <ModeratorBuildToolsDialog
                  key={activeBuildState.buildId}
                  open={showModeratorTooling}
                  onClose={() => setShowModeratorTooling(false)}
                  buildToModerate={activeBuildState}
                  mainBuildState={mainBuildState}
                />
                <ModeratorToolsButton
                  onClick={() => setShowModeratorTooling(true)}
                />
              </>
            )}
            {session && session.user?.id === mainBuildState.createdById && (
              <EditBuildButton
                onClick={() =>
                  router.push(`/builder/edit/${mainBuildState.buildId}`)
                }
              />
            )}

            <GenerateBuildImageButton
              imageExportLoading={imageExportLoading}
              onClick={() =>
                handleImageExport(
                  buildContainerRef.current,
                  `${activeBuildState.name}`,
                )
              }
            />

            <ShareBuildButton
              onClick={() => {
                // remove params from the url

                const url = urlNoCache(
                  window.location.href.split('?')[0] ?? window.location.href,
                );
                copy(
                  `${url}${
                    activeVariantIndex !== 0
                      ? `&variant=${activeVariantIndex}`
                      : ''
                  }`,
                );
                toast.success('Copied Build URL to clipboard.');
              }}
            />

            {session?.user?.id && (
              <AddToCollectionButton
                onClick={() => setAddToCollectionDialogOpen(true)}
              />
            )}

            {session?.user?.id && (
              <LoadoutManagementButton
                key={loadoutDialogOpen ? 'open' : 'closed'}
                buildId={mainBuildState.buildId}
                onClick={() => setLoadoutDialogOpen(true)}
              />
            )}

            {mainBuildState.createdById !== session?.user?.id && (
              <FavoriteBuildButton
                upvoted={session?.user ? optimisticUpvote : false}
                onClick={onFavoriteBuild}
              />
            )}

            {session &&
              session.user?.id === mainBuildState.createdById &&
              mainBuildState.buildId && (
                <DeleteBuildButton buildId={mainBuildState.buildId} />
              )}

            <DetailedViewButton
              onClick={() => setDetailedBuildDialogOpen(true)}
            />

            <ItemOwnershipPreferenceButton
              onClick={() =>
                setItemOwnershipPreference(!itemOwnershipPreference)
              }
            />

            <DuplicateBuildButton onClick={onDuplicateBuild} />

            <ToCsvButton
              data={csvBuildData.filter((item) => item?.name !== '')}
              filename={`remnant2_builder_${activeBuildState.name}`}
              label="Export to CSV"
            />
          </>
        }
      />
    </>
  );
}
