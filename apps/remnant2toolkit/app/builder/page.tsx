'use client';

import { BaseLink } from '@repo/ui';
import { Skeleton } from '@repo/ui';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import { LongUrlAlert } from '@/app/(components)/alerts/long-url-alert';
import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button';
import { PageHeader } from '@/app/(components)/page-header';
import { BuilderContainer } from '@/app/(features)/builder/components/builder-container';
import { DetailedViewButton } from '@/app/(features)/builder/components/buttons/detailed-view-button';
import { GenerateBuildImageButton } from '@/app/(features)/builder/components/buttons/generate-build-image';
import { SaveBuildButton } from '@/app/(features)/builder/components/buttons/save-build-button';
import { ShareBuildButton } from '@/app/(features)/builder/components/buttons/share-build-button';
import { DetailedBuildDialog } from '@/app/(features)/builder/components/dialogs/detailed-build-dialog';
import { ImageDownloadInfoDialog } from '@/app/(features)/builder/components/dialogs/image-download-info-dialog';
import { useUrlBuildState } from '@/app/(features)/builds/utils/hooks/use-url-build-state';
import { useBuildActions } from '@/app/(hooks)/use-build-actions';

export default function Page() {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);
  const [shareBuildAlertOpen, setShareBuildAlertOpen] = useState(false);

  const { data: session, status: sessionStatus } = useSession();

  const {
    csvItems,
    urlBuildState: buildState,
    updateUrlBuildState,
  } = useUrlBuildState();

  const {
    isScreenshotMode,
    showControls,
    imageExportLoading,
    imageDownloadInfo,
    handleClearImageDownloadInfo,
    handleImageExport,
  } = useBuildActions();

  const buildContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col items-center">
      <DetailedBuildDialog
        buildState={buildState}
        open={detailedBuildDialogOpen}
        onClose={() => setDetailedBuildDialogOpen(false)}
      />

      <ImageDownloadInfoDialog
        onClose={handleClearImageDownloadInfo}
        imageDownloadInfo={imageDownloadInfo}
      />

      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create your builds and share them with your friends and the community."
      />

      {sessionStatus === 'loading' ? (
        <Skeleton />
      ) : session?.user ? (
        <div className="text-surface-solid my-4 max-w-lg rounded-md border border-red-500 px-2 py-1 text-left">
          <h3 className="text-center text-2xl font-bold">
            Features limited on this page!
          </h3>
          <p className="mt-2">
            This page uses the URL to store your build, and is intended for
            unauthenticated users, or as a landing page for builds imported from
            other tools.
          </p>
          <p className="mt-2">
            To access{' '}
            <strong className="text-accent1-500">all enhanced features</strong>,
            you should either:
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>
              Click the <strong className="text-accent1-500">Save Build</strong>{' '}
              button to save it to the database, enabling the enhanced features.
            </li>
            <li>
              <BaseLink
                href="/builder/create"
                className="text-accent1-500 hover:text-accent1-300 font-bold underline"
              >
                Click here to visit the enhanced version of the Builder
                directly.
              </BaseLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-surface-solid mb-2 rounded-md border border-red-500 px-2 py-1 text-left">
          <h3 className="text-center text-lg font-bold">
            You are not signed in, so your features are limited.
          </h3>
          <p className="mt-2">
            Sign in with Discord or Reddit to get the following features:
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>Have your builds searchable by the community</li>
            <li>
              Allow your builds to be favorited and added to user loadouts
            </li>
            <li>Add build descriptions and reference URLs</li>
            <li>Mark builds public or private</li>
            <li>Shorter URLs when sharing your build</li>
            <li>Get better and more specific social media previews</li>
          </ul>
        </div>
      )}

      <BuilderContainer
        buildContainerRef={buildContainerRef}
        buildState={buildState}
        isEditable={true}
        isScreenshotMode={isScreenshotMode}
        itemOwnershipPreference={false}
        showControls={showControls}
        showCreatedBy={false}
        showMemberFeatures={false}
        onUpdateBuildState={updateUrlBuildState}
        builderActions={
          <>
            {session?.user && (
              <SaveBuildButton buildState={buildState} editMode={false} />
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

            {session?.user ? null : (
              <>
                <LongUrlAlert
                  open={shareBuildAlertOpen}
                  onClose={() => setShareBuildAlertOpen(false)}
                />
                <ShareBuildButton
                  onClick={() => setShareBuildAlertOpen(true)}
                />
              </>
            )}

            <DetailedViewButton
              onClick={() => setDetailedBuildDialogOpen(true)}
            />

            <ToCsvButton
              data={csvItems}
              filename={`remnant2_builder_${buildState.name}`}
              label="Export to CSV"
            />
          </>
        }
      />
    </div>
  );
}
