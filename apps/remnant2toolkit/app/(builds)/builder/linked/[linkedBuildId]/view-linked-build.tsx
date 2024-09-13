'use client';

import { urlNoCache } from '@repo/utils';
import copy from 'clipboard-copy';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { startTransition, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';

import { ToCsvButton } from '@/app/_components/to-csv-button';
import {
  type ItemOwnershipPreference,
  LOCALSTORAGE_KEY,
} from '@/app/_types/localstorage';
import { LoadoutDialog } from '@/app/(builds)/_components/loadout-dialog';
import { useImageExport } from '@/app/(builds)/_hooks/use-image-export';
import { buildStateToCsvData } from '@/app/(builds)/_libs/build-state-to-csv-data';
import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { handleDuplicateBuild } from '@/app/(builds)/_libs/handlers/handle-duplicate-build';
import { handleFavoriteBuild } from '@/app/(builds)/_libs/handlers/handle-favorite-build';
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
import { VideoThumbnail } from '@/app/(builds)/builder/_components/video-thumbnail';
import { ModeratorLinkedBuildToolsDialog } from '@/app/(builds)/builder/linked/_admin/components/dialogs/moderator-linkedbuild-tools-dialog';
import { EditLinkedBuildButton } from '@/app/(builds)/builder/linked/_components/edit-linked-build-button';
import { TabbedBuildsDisplay } from '@/app/(builds)/builder/linked/_components/tabbed-builds-display';
import { type LinkedBuild } from '@/app/(builds)/builder/linked/_types/linked-build';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

interface Props {
  linkedBuild: LinkedBuild;
}

export function ViewLinkedBuild({ linkedBuild }: Props) {
  const { linkedBuilds } = linkedBuild;
  const [currentLinkedBuild, setCurrentLinkedBuild] = useState<LinkedBuildItem>(
    linkedBuilds[0] as LinkedBuildItem,
  );

  const buildState = cleanUpBuildState(
    dbBuildToBuildState(currentLinkedBuild.build),
  );

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
  const { data: session } = useSession();

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

  // Need to convert the build data to a format that the BuildPage component can use
  if (!session?.user) {
    buildState.upvoted = false;
    buildState.reported = false;
  }

  const [optimisticUpvote, setOptimisticUpvote] = useState(buildState.upvoted);
  useEffect(() => {
    setOptimisticUpvote(buildState.upvoted);
  }, [buildState]);

  function onFavoriteBuild() {
    startTransition(() => {
      // if user is not signed in, let them know signin is required
      if (!session?.user?.id) {
        setSignInRequiredDialogOpen(true);
        return;
      }

      setOptimisticUpvote(!optimisticUpvote);

      setCurrentLinkedBuild((prev) => ({
        ...prev,
        build: {
          ...prev.build,
          upvoted: !optimisticUpvote,
          totalUpvotes: prev.build.upvoted
            ? prev.build.totalUpvotes - 1
            : prev.build.totalUpvotes + 1,
        },
      }));

      handleFavoriteBuild({
        buildState,
        userId: session?.user?.id,
        onFavorite: () => router.refresh(),
      });
    });
  }

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildStateToCsvData(buildState);

  return (
    <div className="flex w-full flex-col items-center">
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
      <div className="height-full flex w-full flex-col items-center justify-center">
        <TabbedBuildsDisplay
          activeBuild={currentLinkedBuild}
          linkedBuild={linkedBuild}
          onChangeCurrentLinkedBuild={setCurrentLinkedBuild}
          title="Linked Builds"
        />

        <VideoThumbnail buildState={buildState} />
        <BuilderContainer
          buildContainerRef={buildContainerRef}
          buildState={buildState}
          isEditable={false}
          isScreenshotMode={isScreenshotMode}
          itemOwnershipPreference={itemOwnershipPreference}
          showControls={showControls}
          builderActions={
            <>
              {session &&
                session.user?.id !== buildState.createdById &&
                session.user?.role === 'admin' && (
                  <>
                    <ModeratorLinkedBuildToolsDialog
                      open={showModeratorTooling}
                      onClose={() => setShowModeratorTooling(false)}
                      buildToModerate={linkedBuild}
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
                <EditLinkedBuildButton
                  onClick={() =>
                    router.push(`/builder/linked/edit/${linkedBuild.id}`)
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
                  const url = urlNoCache(
                    `https://remnant2toolkit.com/builder/${currentLinkedBuild.build.id}`,
                  );
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
      </div>
    </div>
  );
}
