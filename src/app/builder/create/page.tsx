'use client'

import PageHeader from '@/app/(components)/PageHeader'
import useBuildActions from '../(hooks)/useBuildActions'
import { useIsClient } from 'usehooks-ts'
import { useRef } from 'react'
import ImageDownloadLink from '../(components)/ImageDownloadLink'
import useDBBuildState from '../(hooks)/useDBBuildState'
import SaveBuildButton from '../(components)/SaveBuildButton'
import ActionButton from '../(components)/ActionButton'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import Builder from '../(components)/Builder'
import MasonryItemList from '@/app/(components)/MasonryItemList'

export default function Page() {
  const isClient = useIsClient()

  const { csvItems, masonryItems, dbBuildState, updateDBBuildState } =
    useDBBuildState()

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
        &nbsp;
      </PageHeader>
      <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
        <div
          id="actions-column"
          className="flex min-w-full flex-col justify-between sm:min-w-[100px]"
        >
          <div className="mb-2">
            <SaveBuildButton buildState={dbBuildState} />
          </div>

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
                    `${dbBuildState.name}.png`,
                  )
                }
              />
            </div>

            <ActionButton.ShareBuild
              onClick={() => {
                handleCopyBuildUrl(
                  window.location.href,
                  'Build url copied to clipboard!',
                )
              }}
            />

            <ToCsvButton
              data={csvItems}
              filename={`remnant2_builder_${dbBuildState.name}`}
              label="Export to CSV"
            />

            <ActionButton.ShowDetailedView
              onClick={() =>
                handleScrollToDetailedView(detailedViewContainerRef.current)
              }
            />
          </div>
        </div>

        <div ref={buildContainerRef}>
          <Builder
            buildState={dbBuildState}
            includeMemberFeatures={false}
            isEditable={true}
            isScreenshotMode={isScreenshotMode}
            showControls={showControls}
            updateBuildState={updateDBBuildState}
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
