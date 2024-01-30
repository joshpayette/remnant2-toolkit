'use client'

import PageHeader from '@/features/ui/PageHeader'
import SaveBuildButton from '../../../../features/build/components/SaveBuildButton'
import ImageDownloadLink from '../../../../features/build/components/ImageDownloadLink'
import { useRef, useState } from 'react'
import useBuildActions from '../../../../features/build/hooks/useBuildActions'
import { useIsClient } from 'usehooks-ts'
import useDBBuildState from '../../../../features/build/hooks/useDBBuildState'
import ActionButton from '../../../../features/build/components/ActionButton'
import { BuildState, DBBuild } from '@/features/build/types'
import BuilderPage from '@/features/build/components/BuilderPage'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import ArmorCalculatorDialog from '@/features/build/components/ArmorCalculatorDialog'

export default function Page({
  params: { initialBuildState },
}: {
  params: { initialBuildState: DBBuild }
}) {
  const isClient = useIsClient()

  const { dbBuildState, updateDBBuildState, setNewBuildState } =
    useDBBuildState(dbBuildToBuildState(initialBuildState))

  const {
    isScreenshotMode,
    showControls,
    imageLink,
    handleClearImageLink,
    handleScrollToDetailedView,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)
  const detailedViewContainerRef = useRef<HTMLDivElement>(null)

  const [showArmorCalculator, setShowArmorCalculator] = useState(false)

  function handleSelectArmorSuggestion(newBuildState: BuildState) {
    setNewBuildState(newBuildState)
    setShowArmorCalculator(false)
  }

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

      <ArmorCalculatorDialog
        buildState={dbBuildState}
        open={showArmorCalculator}
        onClose={() => setShowArmorCalculator(false)}
        onSelectArmorSuggestion={handleSelectArmorSuggestion}
      />

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

            <ActionButton.ArmorCalculator
              onClick={() => setShowArmorCalculator(true)}
            />

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
