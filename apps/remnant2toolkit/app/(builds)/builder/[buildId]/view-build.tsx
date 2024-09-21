'use client';

import { urlNoCache } from '@repo/utils';
import copy from 'clipboard-copy';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { startTransition, useOptimistic, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';

import { ToCsvButton } from '@/app/_components/to-csv-button';
import {
  type ItemOwnershipPreference,
  LOCALSTORAGE_KEY,
} from '@/app/_types/localstorage';
import { ModeratorBuildToolsDialog } from '@/app/(builds)/_admin/components/dialogs/moderator-build-tools-dialog';
import { LoadoutDialog } from '@/app/(builds)/_components/loadout-dialog';
import { useImageExport } from '@/app/(builds)/_hooks/use-image-export';
import { buildStateToCsvData } from '@/app/(builds)/_libs/build-state-to-csv-data';
import { handleDuplicateBuild } from '@/app/(builds)/_libs/handlers/handle-duplicate-build';
import { handleFavoriteBuild } from '@/app/(builds)/_libs/handlers/handle-favorite-build';
import { handleFollowBuild } from '@/app/(builds)/_libs/handlers/handle-follow-build';
import { setLocalBuildItemOwnership } from '@/app/(builds)/_libs/set-local-build-item-ownership';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { DeleteBuildButton } from '@/app/(builds)/builder/_components/delete-build-button';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/detailed-build-dialog';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/detailed-view-button';
import { DuplicateBuildButton } from '@/app/(builds)/builder/_components/duplicate-build-button';
import { EditBuildButton } from '@/app/(builds)/builder/_components/edit-build-button';
import { FavoriteBuildButton } from '@/app/(builds)/builder/_components/favorite-build-button';
import { FollowBuildButton } from '@/app/(builds)/builder/_components/follow-build-button';
import { GenerateBuildImageButton } from '@/app/(builds)/builder/_components/generate-build-image';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/image-download-info-dialog';
import { ItemOwnershipPreferenceButton } from '@/app/(builds)/builder/_components/item-ownership-preference-button';
import { LoadoutManagementButton } from '@/app/(builds)/builder/_components/loadout-management-button';
import { ModeratorToolsButton } from '@/app/(builds)/builder/_components/moderator-tools-button';
import { ShareBuildButton } from '@/app/(builds)/builder/_components/share-build-button';
import { SignInRequiredDialog } from '@/app/(builds)/builder/_components/sign-in-required-dialog';
import { NewLinkedBuildButton } from '@/app/(builds)/builder/linked/_components/new-linked-build-button';
import { ViewLinkedBuildButton } from '@/app/(builds)/builder/linked/_components/view-linked-builds-button';
import { useDiscoveredItems } from '@/app/(items)/_hooks/use-discovered-items';

interface Props {
  buildState: BuildState;
  isFollowingBuild: boolean;
}

export function ViewBuild({ buildState, isFollowingBuild }: Props) {
  const { data: session, status: sessionStatus } = useSession();
  const { discoveredItemIds } = useDiscoveredItems();
  const buildStateWithItemsOwned = setLocalBuildItemOwnership({
    buildState,
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

  const router = useRouter();

  const [signInRequiredDialogOpen, setSignInRequiredDialogOpen] =
    useState(false);

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    imageExportLoading,
    handleClearImageDownloadInfo,
    handleImageExport,
  } = useImageExport();

  const buildContainerRef = useRef<HTMLDivElement>(null);

  const [optimisticUpvote, setOptimisticUpvote] = useOptimistic<
    boolean,
    boolean
  >(buildState.upvoted, (_state, newUpvoted) => newUpvoted);

  function onFavoriteBuild() {
    startTransition(() => {
      // if user is not signed in, let them know signin is required
      if (!session?.user?.id) {
        setSignInRequiredDialogOpen(true);
        return;
      }

      setOptimisticUpvote(!optimisticUpvote);

      handleFavoriteBuild({
        buildState,
        userId: session?.user?.id,
        onFavorite: () => router.refresh(),
      });
    });
  }

  const [optimisticFollow, setOptimisticFollow] = useOptimistic<
    boolean,
    boolean
  >(isFollowingBuild, (_state, newFollowed) => newFollowed);

  function onFollowBuild() {
    startTransition(() => {
      if (!session?.user?.id) {
        setSignInRequiredDialogOpen(true);
        return;
      }

      if (!buildState.buildId) {
        return;
      }

      setOptimisticFollow(!optimisticFollow);

      handleFollowBuild({
        buildId: buildState.buildId,
        isFollowingBuild,
        userId: session?.user?.id,
        onFollow: () => router.refresh(),
      });
    });
  }

  // Need to convert the build data to a format that the BuildPage component can use
  if (!session?.user) {
    buildState.upvoted = false;
    buildState.reported = false;
  }

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildStateToCsvData(buildState);

  // #region RENDER

  return (
    <>
      <BuilderContainer
        buildContainerRef={buildContainerRef}
        buildState={buildStateWithItemsOwned}
        isEditable={false}
        isScreenshotMode={isScreenshotMode}
        itemOwnershipPreference={itemOwnershipPreference}
        showControls={showControls}
        builderActions={
          <>
            <DetailedBuildDialog
              buildState={buildState}
              open={detailedBuildDialogOpen}
              onClose={() => setDetailedBuildDialogOpen(false)}
            />
            <LoadoutDialog
              key={loadoutDialogOpen.toString()}
              buildId={buildState.buildId}
              open={loadoutDialogOpen}
              onClose={() => setLoadoutDialogOpen(false)}
              isEditable={true}
            />
            <ImageDownloadInfoDialog
              onClose={handleClearImageDownloadInfo}
              imageDownloadInfo={imageDownloadInfo}
            />
            <SignInRequiredDialog
              open={signInRequiredDialogOpen}
              onClose={() => setSignInRequiredDialogOpen(false)}
            />

            {session &&
              session.user?.id !== buildState.createdById &&
              session.user?.role === 'admin' && (
                <>
                  <ModeratorBuildToolsDialog
                    open={showModeratorTooling}
                    onClose={() => setShowModeratorTooling(false)}
                    buildToModerate={buildState}
                  />
                  <ModeratorToolsButton
                    onClick={() => setShowModeratorTooling(true)}
                  />
                </>
              )}
            {session && session.user?.id === buildState.createdById && (
              <EditBuildButton
                onClick={() =>
                  router.push(`/builder/edit/${buildState.buildId}`)
                }
              />
            )}

            {session && session.user?.id === buildState.createdById && (
              <NewLinkedBuildButton
                onClick={() =>
                  router.push(`/builder/linked/create/${buildState.buildId}`)
                }
              />
            )}

            <GenerateBuildImageButton
              imageExportLoading={imageExportLoading}
              onClick={() =>
                handleImageExport(
                  buildContainerRef.current,
                  `${buildState.name}`,
                )
              }
            />

            <ShareBuildButton
              onClick={() => {
                const url = urlNoCache(window.location.href);
                copy(url);
                toast.success('Copied Build URL to clipboard.');
              }}
            />

            {session?.user?.id && (
              <LoadoutManagementButton
                buildId={buildState.buildId}
                onClick={() => setLoadoutDialogOpen(true)}
              />
            )}

            {buildState.createdById !== session?.user?.id && (
              <FavoriteBuildButton
                upvoted={optimisticUpvote}
                onClick={onFavoriteBuild}
              />
            )}

            {(
              <FollowBuildButton
                onClick={onFollowBuild}
                followed={optimisticFollow}
              />
            )}

            {session &&
              session.user?.id === buildState.createdById &&
              buildState.buildId && (
                <DeleteBuildButton buildId={buildState.buildId} />
              )}

            <DetailedViewButton
              onClick={() => setDetailedBuildDialogOpen(true)}
            />

            <ItemOwnershipPreferenceButton
              onClick={() =>
                setItemOwnershipPreference(!itemOwnershipPreference)
              }
            />

            <ViewLinkedBuildButton
              onClick={() =>
                router.push(
                  `/profile/${buildState.createdById}/linked-builds/${buildState.buildId}`,
                )
              }
            />

            <DuplicateBuildButton
              onClick={() =>
                handleDuplicateBuild({
                  buildState,
                  onDuplicate: (buildId: string) =>
                    router.push(`/builder/${buildId}`),
                })
              }
            />

            <ToCsvButton
              data={csvBuildData.filter((item) => item?.name !== '')}
              filename={`remnant2_builder_${buildState.name}`}
              label="Export to CSV"
            />
          </>
        }
      />
    </>
  );
}
