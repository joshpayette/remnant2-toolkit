'use client';

import {
  BaseDivider,
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
  cn,
} from '@repo/ui';
import { urlNoCache } from '@repo/utils';
import copy from 'clipboard-copy';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { startTransition, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { DescriptionWithTokens } from '@/app/_components/description-with-tokens';
import { LoadoutDialog } from '@/app/(builds)/_components/loadout-dialog';
import { useImageExport } from '@/app/(builds)/_hooks/use-image-export';
import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { handleFavoriteBuild } from '@/app/(builds)/_libs/handlers/handle-favorite-build';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { DeleteBuildButton } from '@/app/(builds)/builder/_components/delete-build-button';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/detailed-build-dialog';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/detailed-view-button';
import { EditBuildButton } from '@/app/(builds)/builder/_components/edit-build-button';
import { FavoriteBuildButton } from '@/app/(builds)/builder/_components/favorite-build-button';
import { FavoriteBuildDialog } from '@/app/(builds)/builder/_components/favorite-build-dialog';
import { GenerateBuildImageButton } from '@/app/(builds)/builder/_components/generate-build-image';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/image-download-info-dialog';
import { LoadoutManagementButton } from '@/app/(builds)/builder/_components/loadout-management-button';
import { ShareBuildButton } from '@/app/(builds)/builder/_components/share-build-button';
import { VideoThumbnail } from '@/app/(builds)/builder/_components/video-thumbnail';
import {
  type LinkedBuildItem,
  type LinkedBuildState,
} from '@/app/(builds)/builder/(deprecated)/linked/[linkedBuildId]/types';

interface Props {
  linkedBuildState: LinkedBuildState;
}

export function ViewLinkedBuild({ linkedBuildState }: Props) {
  const { linkedBuildItems } = linkedBuildState;
  const [currentLinkedBuild, setCurrentLinkedBuild] = useState<LinkedBuildItem>(
    linkedBuildItems[0] as LinkedBuildItem,
  );

  const isMainBuild = currentLinkedBuild.build.id === linkedBuildState.id;

  const buildState = cleanUpBuildState(
    dbBuildToBuildState(currentLinkedBuild.build),
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
  }

  const [optimisticUpvote, setOptimisticUpvote] = useState(buildState.upvoted);

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
          upvoted: optimisticUpvote,
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
        <div className="mb-8 w-full max-w-lg">
          <h2 className="border-b-primary-500 mb-2 border-b pb-2 text-center text-2xl font-bold">
            {linkedBuildState.name}
          </h2>
          <div className="mb-2 flex flex-col">
            {linkedBuildState.description &&
              linkedBuildState.description.length > 0 && (
                <div
                  className={cn(
                    'text-md overflow-x-auto overflow-y-auto whitespace-pre-wrap text-gray-200',
                    isScreenshotMode && 'max-h-none',
                  )}
                >
                  <DescriptionWithTokens
                    description={linkedBuildState.description}
                    highlightBuildTokens={true}
                    highlightExternalTokens={false}
                    highlightItems={true}
                  />
                </div>
              )}
          </div>

          <BaseDivider className="my-4 sm:my-0 sm:hidden" />

          <BaseField className="sm:hidden">
            <BaseLabel>
              <div className="mb-2 w-full text-center">Linked Builds</div>
            </BaseLabel>
            <BaseListbox
              name="linkedBuilds"
              value={currentLinkedBuild.label}
              onChange={(value) => {
                const linkedBuild = linkedBuildItems.find(
                  (linkedBuildItem) => linkedBuildItem.label === value,
                );
                if (linkedBuild) {
                  setCurrentLinkedBuild(linkedBuild);
                }
              }}
            >
              {linkedBuildItems.map((linkedBuildItem) => (
                <BaseListboxOption
                  key={linkedBuildItem.id}
                  value={linkedBuildItem.label}
                >
                  <BaseListboxLabel>{linkedBuildItem.label}</BaseListboxLabel>
                </BaseListboxOption>
              ))}
            </BaseListbox>
          </BaseField>
          <div className="hidden sm:block">
            <nav
              className="isolate flex divide-x divide-gray-700 rounded-lg shadow"
              aria-label="Tabs"
            >
              {linkedBuildItems.map((linkedBuildItem, tabIdx) => (
                <button
                  key={linkedBuildItem.build.id}
                  onClick={() => setCurrentLinkedBuild(linkedBuildItem)}
                  className={cn(
                    linkedBuildItem.build.id === currentLinkedBuild.build.id
                      ? 'text-gray-300'
                      : 'text-gray-400 hover:text-gray-300',
                    tabIdx === 0 ? 'rounded-l-lg' : '',
                    tabIdx === linkedBuildItems.length - 1
                      ? 'rounded-r-lg'
                      : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-gray-900 px-4 py-4 text-center text-sm font-medium hover:bg-gray-800 focus:z-10',
                  )}
                >
                  <span>{linkedBuildItem.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      linkedBuildItem.build.id === currentLinkedBuild.build.id
                        ? 'bg-purple-500'
                        : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5',
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>
        <VideoThumbnail buildState={buildState} />
        <BuilderContainer
          buildContainerRef={buildContainerRef}
          buildState={buildState}
          isEditable={false}
          isMainBuild={isMainBuild}
          isScreenshotMode={isScreenshotMode}
          itemOwnershipPreference={false}
          showControls={showControls}
          builderActions={
            <>
              {session && session.user?.id === buildState.createdById && (
                <EditBuildButton
                  onClick={() =>
                    router.push(`/builder/edit/${buildState.buildId}`)
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
                  variantIndex={0}
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
            </>
          }
        />
      </div>
    </div>
  );
}
