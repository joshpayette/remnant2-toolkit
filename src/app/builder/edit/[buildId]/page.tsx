'use client'

import { useRef, useState } from 'react'

import { ActionButton } from '@/features/build/components/ActionButton'
import { BuilderPage } from '@/features/build/components/BuilderPage'
import { BuildSuggestionsDialog } from '@/features/build/components/BuildSuggestionsDialog'
import { ImageDownloadLink } from '@/features/build/components/ImageDownloadLink'
import { SaveBuildButton } from '@/features/build/components/SaveBuildButton'
import { useBuildActions } from '@/features/build/hooks/useBuildActions'
import { useDBBuildState } from '@/features/build/hooks/useDBBuildState'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { BuildState, DBBuild } from '@/features/build/types'
import { PageHeader } from '@/features/ui/PageHeader'

export default function Page({
  params: { initialBuildState },
}: {
  params: { initialBuildState: DBBuild }
}) {
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

  const [showBuildSuggestions, setShowBuildSuggestions] = useState(false)

  function handleSelectArmorSuggestion(newBuildState: BuildState) {
    setNewBuildState(newBuildState)
    setShowBuildSuggestions(false)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <ImageDownloadLink onClose={handleClearImageLink} imageLink={imageLink} />

      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Edit your builds and share them with your friends and the community."
      >
        &nbsp;
      </PageHeader>

      <BuildSuggestionsDialog
        buildState={dbBuildState}
        open={showBuildSuggestions}
        onClose={() => setShowBuildSuggestions(false)}
        onApplySuggestions={handleSelectArmorSuggestion}
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

            <ActionButton.BuildSuggestions
              onClick={() => setShowBuildSuggestions(true)}
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
