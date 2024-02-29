'use client'

import { useRef, useState } from 'react'

import { ActionButton } from '@/features/build/components/ActionButton'
import { BuilderPage } from '@/features/build/components/BuilderPage'
import { BuildSuggestionsDialog } from '@/features/build/components/BuildSuggestionsDialog'
import { DetailedBuildDialog } from '@/features/build/components/DetailedBuildDialog'
import { ImageDownloadInfo } from '@/features/build/components/ImageDownloadInfo'
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
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false)

  const { dbBuildState, updateDBBuildState, setNewBuildState } =
    useDBBuildState(dbBuildToBuildState(initialBuildState))

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    handleClearImageDownloadInfo,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)

  const [showBuildSuggestions, setShowBuildSuggestions] = useState(false)

  function handleSelectArmorSuggestion(newBuildState: BuildState) {
    setNewBuildState(newBuildState)
    setShowBuildSuggestions(false)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <DetailedBuildDialog
        buildState={dbBuildState}
        open={detailedBuildDialogOpen}
        onClose={() => setDetailedBuildDialogOpen(false)}
      />

      <ImageDownloadInfo
        onClose={handleClearImageDownloadInfo}
        imageDownloadInfo={imageDownloadInfo}
      />

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
              onClick={() => setDetailedBuildDialogOpen(true)}
            />
          </>
        }
      />
    </div>
  )
}
