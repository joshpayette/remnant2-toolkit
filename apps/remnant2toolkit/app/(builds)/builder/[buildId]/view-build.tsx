'use client';

import { urlNoCache } from '@repo/utils';
import copy from 'clipboard-copy';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';

import { ToCsvButton } from '@/app/_components/to-csv-button';
import {
  type ItemOwnershipPreference,
  LOCALSTORAGE_KEY,
} from '@/app/_types/localstorage';
import { incrementViewCount } from '@/app/(builds)/_actions/increment-view-count';
import { ModeratorBuildToolsDialog } from '@/app/(builds)/_admin/components/dialogs/moderator-build-tools-dialog';
import { LoadoutDialog } from '@/app/(builds)/_components/loadout-dialog';
import { useBuildActions } from '@/app/(builds)/_hooks/use-build-actions';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { buildStateToCsvData } from '@/app/(builds)/_utils/build-state-to-csv-data';
import { setLocalBuildItemOwnership } from '@/app/(builds)/_utils/set-local-build-item-ownership';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { DeleteBuildButton } from '@/app/(builds)/builder/_components/buttons/delete-build-button';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/buttons/detailed-view-button';
import { DuplicateBuildButton } from '@/app/(builds)/builder/_components/buttons/duplicate-build-button';
import { EditBuildButton } from '@/app/(builds)/builder/_components/buttons/edit-build-button';
import { FavoriteBuildButton } from '@/app/(builds)/builder/_components/buttons/favorite-build-button';
import { GenerateBuildImageButton } from '@/app/(builds)/builder/_components/buttons/generate-build-image';
import { ItemOwnershipPreferenceButton } from '@/app/(builds)/builder/_components/buttons/item-ownership-preference-button';
import { LoadoutManagementButton } from '@/app/(builds)/builder/_components/buttons/loadout-management-button';
import { ModeratorToolsButton } from '@/app/(builds)/builder/_components/buttons/moderator-tools-button';
import { NewLinkedBuildButton } from '@/app/(builds)/builder/_components/buttons/new-linked-build-button';
import { ShareBuildButton } from '@/app/(builds)/builder/_components/buttons/share-build-button';
import { ViewLinkedBuildButton } from '@/app/(builds)/builder/_components/buttons/view-linked-builds';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/dialogs/detailed-build-dialog';
import { FavoriteBuildDialog } from '@/app/(builds)/builder/_components/dialogs/favorite-build-dialog';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/dialogs/image-download-info-dialog';
import { useDiscoveredItems } from '@/app/(items)/_hooks/use-discovered-items';

interface Props {
  buildState: BuildState;
}

export function ViewBuild({ buildState }: Props) {
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
    handleDuplicateBuild,
    handleFavoriteBuild,
    handleImageExport,
  } = useBuildActions();

  const buildContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function asyncViewCountUpdate() {
      const response = await incrementViewCount({
        buildId: buildState.buildId || '',
      });
      if (response.viewCount !== -1) {
        buildState.viewCount = response.viewCount;
        buildState.viewCount = response.viewCount;
      }
    }
    asyncViewCountUpdate();
  });

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
            <FavoriteBuildDialog
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
                upvoted={buildState.upvoted}
                onClick={() => {
                  // if user is not signed in, let them know signin is required
                  if (!session?.user?.id) {
                    setSignInRequiredDialogOpen(true);
                    return;
                  }
                  handleFavoriteBuild(buildState, session?.user?.id);
                }}
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
              onClick={() => handleDuplicateBuild(buildState)}
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
