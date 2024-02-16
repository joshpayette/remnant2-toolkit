'use client'

import { useRef, useState } from 'react'

import { ActionButton } from '@/features/build/components/ActionButton'
import { BuilderPage } from '@/features/build/components/BuilderPage'
import { BuildSuggestionsDialog } from '@/features/build/components/BuildSuggestionsDialog'
import { ImageDownloadLink } from '@/features/build/components/ImageDownloadLink'
import { SaveBuildButton } from '@/features/build/components/SaveBuildButton'
import { useBuildActions } from '@/features/build/hooks/useBuildActions'
import { useDBBuildState } from '@/features/build/hooks/useDBBuildState'
import { initialBuildState } from '@/features/build/lib'
import { BuildState } from '@/features/build/types'
import { PageHeader } from '@/features/ui/PageHeader'

export default function Page() {
  const { dbBuildState, setNewBuildState, updateDBBuildState } =
    useDBBuildState(initialBuildState)

  const {
    isScreenshotMode,
    showControls,
    imageLink,
    handleClearImageLink,
    handleRandomBuild,
    handleScrollToDetailedView,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)
  const detailedViewContainerRef = useRef<HTMLDivElement>(null)

  const [showBuildSuggestions, setShowBuildSuggestions] = useState(false)

  function handleApplySuggestions(newBuildState: BuildState) {
    setNewBuildState(newBuildState)
    setShowBuildSuggestions(false)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <ImageDownloadLink onClose={handleClearImageLink} imageLink={imageLink} />

      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create your builds and share them with your friends and the community."
      />

      <BuildSuggestionsDialog
        buildState={dbBuildState}
        open={showBuildSuggestions}
        onClose={() => setShowBuildSuggestions(false)}
        onApplySuggestions={handleApplySuggestions}
      />

      <BuilderPage
        buildContainerRef={buildContainerRef}
        buildState={dbBuildState}
        detailedViewContainerRef={detailedViewContainerRef}
        includeMemberFeatures={true}
        isScreenshotMode={isScreenshotMode}
        isEditable={true}
        onUpdateBuildState={updateDBBuildState}
        showControls={showControls}
        showCreatedBy={false}
        builderActions={
          <>
            <SaveBuildButton buildState={dbBuildState} editMode={false} />

            <ActionButton.BuildSuggestions
              onClick={() => setShowBuildSuggestions(true)}
            />

            <ActionButton.ShowDetailedView
              onClick={() =>
                handleScrollToDetailedView(detailedViewContainerRef.current)
              }
            />

            <ActionButton.RandomBuild
              onClick={() => {
                const randomBuild = handleRandomBuild()
                setNewBuildState(randomBuild)
              }}
            />
          </>
        }
      />
    </div>
  )
}
