'use client'

import { useEffect, useRef } from 'react'
import PageHeader from '@/app/(components)/PageHeader'
import Builder from './(components)/Builder'
import useBuildState from '@/app/builder/(hooks)/useBuildState'
import { useIsClient } from 'usehooks-ts'
import {
  buildStateToCsvData,
  buildStateToMasonryItems,
  cn,
} from '../(lib)/utils'
import SaveBuildButton from './(components)/SaveBuildButton'
import useBuildActions from './(hooks)/useBuildActions'
import { ActionButton } from './(components)/ActionButton'
import ToCsvButton from '../(components)/ToCsvButton'
import { useLocalStorage } from '../(hooks)/useLocalStorage'
import { useSearchParams } from 'next/navigation'
import MasonryItemList from '../(components)/MasonryItemList'
import ImageDownloadLink from './(components)/ImageDownloadLink'

export default function Page() {
  const searchParams = useSearchParams()
  const isClient = useIsClient()

  const { buildState } = useBuildState()
  const { builderStorage, setBuilderStorage } = useLocalStorage()
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

  // if search params are empty, clear the temp values
  // from localstorage
  useEffect(() => {
    if (searchParams.toString() === '') {
      setBuilderStorage({
        ...builderStorage,
        tempBuildId: null,
        tempCreatedById: null,
        tempDescription: null,
        tempIsPublic: null,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Add the build name to the page title
  useEffect(() => {
    if (!buildState) {
      document.title = 'Remnant 2 Toolkit'
      return
    }
    document.title = `${buildState.name} | Remnant 2 Toolkit`
  }, [buildState])

  if (!isClient) return null

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildStateToCsvData(buildState).filter(
    (item) => item?.name !== '',
  )

  const masonryItems = buildStateToMasonryItems(buildState)

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
            <SaveBuildButton buildState={buildState} />
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
                    `${buildState.name}.png`,
                  )
                }
              />
            </div>

            <ActionButton.CopyBuildUrl
              onClick={() =>
                handleCopyBuildUrl(
                  window.location.href,
                  'Build url copied to clipboard. Sign in for a shorter link, build descriptions, and more!',
                )
              }
            />

            <ToCsvButton
              data={csvBuildData}
              filename={`remnant2_builder_${buildState.name}`}
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
            buildState={buildState}
            isEditable={true}
            isScreenshotMode={isScreenshotMode}
            showControls={showControls}
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
