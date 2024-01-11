'use client'

import { useRef } from 'react'
import PageHeader from '@/app/(components)/PageHeader'
import Builder from './(components)/Builder'
import useUrlBuildState from '@/app/builder/(hooks)/useUrlBuildState'
import { useIsClient } from 'usehooks-ts'
import SaveBuildButton from './(components)/SaveBuildButton'
import { ActionButton } from './(components)/ActionButton'
import ToCsvButton from '../(components)/ToCsvButton'
import MasonryItemList from '../(components)/MasonryItemList'
import ImageDownloadLink from './(components)/ImageDownloadLink'
import { useSession } from 'next-auth/react'
import LoadingIndicator from '../(components)/LoadingIndicator'
import Skeleton from '../(components)/Skeleton'
import useBuildActions from './(hooks)/useBuildActions'

export default function Page() {
  const { data: session, status: sessionStatus } = useSession()

  const isClient = useIsClient()

  const { csvItems, masonryItems, urlBuildState, updateUrlBuildState } =
    useUrlBuildState()

  const {
    isScreenshotMode,
    showControls,
    imageExportLoading,
    imageLink,
    handleClearImageLink,
    handleCopyBuildUrl,
    handleImageExport,
    handleScrollToDetailedView,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)
  const detailedViewContainerRef = useRef<HTMLDivElement>(null)

  if (!isClient) return null

  return (
    <div className="flex w-full flex-col items-center">
      <ImageDownloadLink onClose={handleClearImageLink} imageLink={imageLink} />

      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create your builds and share them with your friends and the community."
      >
        {sessionStatus === 'loading' ? (
          <Skeleton />
        ) : session?.user ? null : (
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
      <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
        {sessionStatus === 'loading' ? (
          <LoadingIndicator />
        ) : (
          <div
            id="actions-column"
            className="flex min-w-full flex-col justify-between gap-2 sm:min-w-[100px]"
          >
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
                      `${urlBuildState.name}.png`,
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

              <ToCsvButton
                data={csvItems}
                filename={`remnant2_builder_${urlBuildState.name}`}
                label="Export to CSV"
              />

              <ActionButton.ShowDetailedView
                onClick={() =>
                  handleScrollToDetailedView(detailedViewContainerRef.current)
                }
              />
            </div>
          </div>
        )}
        <div ref={buildContainerRef}>
          <Builder
            buildState={urlBuildState}
            includeMemberFeatures={false}
            isEditable={true}
            isScreenshotMode={isScreenshotMode}
            showControls={showControls}
            updateBuildState={updateUrlBuildState}
          />
        </div>
      </div>
      <div
        className="mt-12 flex w-full flex-col items-center justify-center gap-2"
        ref={detailedViewContainerRef}
      >
        <MasonryItemList items={masonryItems} />
      </div>
    </div>
  )
}
