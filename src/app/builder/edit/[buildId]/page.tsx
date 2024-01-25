'use client'

import PageHeader from '@/components/PageHeader'
import SaveBuildButton from '../../../../features/build/components/SaveBuildButton'
import ImageDownloadLink from '../../../../features/build/components/ImageDownloadLink'
import { useRef } from 'react'
import useBuildActions from '../../../../features/build/hooks/useBuildActions'
import { useIsClient } from 'usehooks-ts'
import useDBBuildState from '../../../../features/build/hooks/useDBBuildState'
import ActionButton from '../../../../features/build/components/ActionButton'
import Builder from '../../../../features/build/components/Builder'
import { cn } from '@/lib/classnames'
import { DBBuild } from '@/features/build/types'
import { dbBuildToBuildState } from '@/features/build/lib/build'
import MasonryItemList from '@/features/items/components/MasonryItemList'
import BuilderPage from '@/features/build/components/BuilderPage'

export default function Page({
  params: { initialBuildState },
}: {
  params: { initialBuildState: DBBuild }
}) {
  const isClient = useIsClient()

  const { masonryItems, dbBuildState, updateDBBuildState } = useDBBuildState(
    dbBuildToBuildState(initialBuildState),
  )

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

      <BuilderPage
        buildContainerRef={buildContainerRef}
        buildState={dbBuildState}
        detailedViewContainerRef={detailedViewContainerRef}
        includeMemberFeatures={true}
        isEditable={true}
        isScreenshotMode={isScreenshotMode}
        showControls={showControls}
        onUpdateBuildState={updateDBBuildState}
        builderActions={
          <>
            <SaveBuildButton buildState={dbBuildState} editMode={true} />

            <ActionButton.ShowDetailedView
              onClick={() =>
                handleScrollToDetailedView(detailedViewContainerRef.current)
              }
            />
          </>
        }
      />
    </div>
  )
}
