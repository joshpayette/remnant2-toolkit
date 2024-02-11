'use client'

import PageHeader from '@/features/ui/PageHeader'
import { useIsClient } from 'usehooks-ts'
import { useRef, useState } from 'react'
import ImageDownloadLink from '@/features/build/components/ImageDownloadLink'
import useDBBuildState from '@/features/build/hooks/useDBBuildState'
import SaveBuildButton from '@/features/build/components/SaveBuildButton'
import ActionButton from '@/features/build/components/ActionButton'
import { initialBuildState } from '@/features/build/lib'
import useBuildActions from '@/features/build/hooks/useBuildActions'
import BuilderPage from '@/features/build/components/BuilderPage'
import { BuildState } from '@/features/build/types'
import { BuildSuggestionsDialog } from '@/features/build/components/BuildSuggestionsDialog'

export default function Page() {
  const isClient = useIsClient()

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

  if (!isClient) return null

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
