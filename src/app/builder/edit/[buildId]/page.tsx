'use client'

import PageHeader from '@/app/(components)/PageHeader'
import SaveBuildButton from '../../(components)/SaveBuildButton'
import ImageDownloadLink from '../../(components)/ImageDownloadLink'
import { useRef } from 'react'
import useBuildActions from '../../(hooks)/useBuildActions'
import { useIsClient } from 'usehooks-ts'
import useDBBuildState from '../../(hooks)/useDBBuildState'
import ActionButton from '../../(components)/ActionButton'
import Builder from '../../(components)/Builder'
import MasonryItemList from '@/app/(components)/MasonryItemList'
import { cn } from '@/app/(lib)/utils'
import { extendedBuildToBuildState } from '../../../(lib)/build'
import { ExtendedBuild } from '@/app/(types)/build'

export default function Page({
  params: { initialBuildState },
}: {
  params: { initialBuildState: ExtendedBuild }
}) {
  const isClient = useIsClient()

  const { masonryItems, dbBuildState, setNewBuildState, updateDBBuildState } =
    useDBBuildState(extendedBuildToBuildState(initialBuildState))

  const {
    isScreenshotMode,
    showControls,
    imageLink,
    handleClearImageLink,
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
        subtitle="Edit your builds and share them with your friends and the community."
      >
        &nbsp;
      </PageHeader>
      <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
        <div
          id="actions-column"
          className="flex min-w-full flex-col justify-between gap-2 sm:min-w-[100px]"
        >
          <SaveBuildButton buildState={dbBuildState} editMode={true} />

          <ActionButton.ShowDetailedView
            onClick={() =>
              handleScrollToDetailedView(detailedViewContainerRef.current)
            }
          />
        </div>

        <div
          ref={buildContainerRef}
          className={cn(
            'w-full grow bg-black',
            isScreenshotMode && 'min-h-[731px] min-w-[502px]',
          )}
        >
          <Builder
            buildState={dbBuildState}
            includeMemberFeatures={true}
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
