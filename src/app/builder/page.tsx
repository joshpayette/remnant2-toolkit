'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'

import { BuilderContainer } from '@/features/build/components/builder/BuilderContainer'
import { ActionButton } from '@/features/build/components/buttons/ActionButton'
import { SaveBuildButton } from '@/features/build/components/buttons/SaveBuildButton'
import { DetailedBuildDialog } from '@/features/build/components/dialogs/DetailedBuildDialog'
import { ImageDownloadInfo } from '@/features/build/components/dialogs/ImageDownloadInfo'
import { useBuildActions } from '@/features/build/hooks/useBuildActions'
import { useUrlBuildState } from '@/features/build/hooks/useUrlBuildState'
import { PageHeader } from '@/features/ui/PageHeader'
import { Skeleton } from '@/features/ui/Skeleton'
import { ToCsvButton } from '@/features/ui/ToCsvButton'

export default function Page() {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false)

  const { data: session, status: sessionStatus } = useSession()

  const { csvItems, urlBuildState, updateUrlBuildState } = useUrlBuildState()

  const {
    isScreenshotMode,
    showControls,
    imageExportLoading,
    imageDownloadInfo,
    handleClearImageDownloadInfo,
    handleCopyBuildUrl,
    handleImageExport,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex w-full flex-col items-center">
      <DetailedBuildDialog
        buildState={urlBuildState}
        open={detailedBuildDialogOpen}
        onClose={() => setDetailedBuildDialogOpen(false)}
      />

      <ImageDownloadInfo
        onClose={handleClearImageDownloadInfo}
        imageDownloadInfo={imageDownloadInfo}
      />

      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create your builds and share them with your friends and the community."
      >
        {sessionStatus === 'loading' ? (
          <Skeleton />
        ) : session?.user ? (
          <div className="rounded-md border border-red-500 px-2 py-1 text-left text-white">
            <h3 className="text-center text-2xl font-bold">
              Features limited on this page!
            </h3>
            <p className="mt-2">
              This page uses the URL to store your build, and is intended for
              unauthenticated users, or as a landing page for builds imported
              from other tools.
            </p>
            <p className="mt-2">
              To access{' '}
              <strong className="text-accent1-500">
                all enhanced features
              </strong>
              , you should either:
            </p>
            <ul className="mt-2 list-inside list-disc">
              <li>
                Click the{' '}
                <strong className="text-accent1-500">Save Build</strong> button
                to save it to the database, enabling the enhanced features.
              </li>
              <li>
                <Link
                  href="/builder/create"
                  className="font-bold text-accent1-500 underline hover:text-accent1-300"
                >
                  Click here to visit the enhanced version of the Builder
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="rounded-md border border-red-500 px-2 py-1 text-left text-white">
            <h3 className="text-center text-lg font-bold">
              You are not signed in, so your features are limited.
            </h3>
            <p className="mt-2">
              Sign in with Discord or Reddit to get the following features:
            </p>
            <ul className="mt-2 list-inside list-disc">
              <li>See all your builds in your profile</li>
              <li>Add build descriptions</li>
              <li>Make private builds</li>
              <li>More individualized social media previews</li>
              <li>More features coming soon!</li>
            </ul>
          </div>
        )}
      </PageHeader>

      <BuilderContainer
        buildContainerRef={buildContainerRef}
        buildState={urlBuildState}
        isEditable={true}
        isScreenshotMode={isScreenshotMode}
        showControls={showControls}
        showCreatedBy={false}
        showMemberFeatures={false}
        onUpdateBuildState={updateUrlBuildState}
        builderActions={
          <>
            {session?.user && (
              <SaveBuildButton buildState={urlBuildState} editMode={false} />
            )}

            <div
              id="actions"
              className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-2"
            >
              <div className="col-span-full">
                <ActionButton.ExportImage
                  imageExportLoading={imageExportLoading}
                  onClick={() =>
                    handleImageExport(
                      buildContainerRef.current,
                      `${urlBuildState.name}`,
                    )
                  }
                />
              </div>

              {session?.user ? null : (
                <ActionButton.ShareBuild
                  onClick={() => {
                    const response = confirm(
                      'This build is unsaved, meaning the URL will be very long. Sign in and Save Build for a shorter URL, plus additional features.\r\n\r\nDo you want to copy the URL anyway?',
                    )

                    if (!response) return

                    handleCopyBuildUrl(
                      window.location.href,
                      'Build url copied to clipboard!',
                    )
                  }}
                />
              )}

              <hr className="my-2 w-full border-t-2 border-gray-500/50" />

              <ActionButton.ShowDetailedView
                onClick={() => setDetailedBuildDialogOpen(true)}
              />

              <ToCsvButton
                data={csvItems}
                filename={`remnant2_builder_${urlBuildState.name}`}
                label="Export to CSV"
              />
            </div>
          </>
        }
      />
    </div>
  )
}
