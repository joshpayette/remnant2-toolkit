'use client'

import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { ArmorCalculatorButton } from '@/app/(components)/buttons/builder-buttons/armor-calculator-button'
import { DeleteBuildButton } from '@/app/(components)/buttons/builder-buttons/delete-build-button'
import { DetailedViewButton } from '@/app/(components)/buttons/builder-buttons/detailed-view-button'
import { ItemSuggestionsButton } from '@/app/(components)/buttons/builder-buttons/item-suggestions-button'
import { SaveBuildButton } from '@/app/(components)/buttons/builder-buttons/save-build-button'
import { ArmorSuggestionDialog } from '@/app/(components)/dialogs/armor-suggestion-dialog'
import { DetailedBuildDialog } from '@/app/(components)/dialogs/detailed-build-dialog'
import { ImageDownloadInfoDialog } from '@/app/(components)/dialogs/image-download-info-dialog'
import { ItemTagSuggestionDialog } from '@/app/(components)/dialogs/item-tag-suggestion-dialog'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { BuilderContainer } from '@/features/build/components/builder/BuilderContainer'
import { useDBBuildState } from '@/features/build/hooks/useDBBuildState'
import { cleanUpBuildState } from '@/features/build/lib/cleanUpBuildState'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { BuildState, DBBuild } from '@/features/build/types'
import { PageHeader } from '@/features/ui/PageHeader'

interface Props {
  build: DBBuild
}

export function BuildPage({ build }: Props) {
  const { data: session } = useSession()

  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false)

  const {
    dbBuildState,
    usingLocalChanges,
    updateDBBuildState,
    setNewBuildState,
  } = useDBBuildState(cleanUpBuildState(dbBuildToBuildState(build)), 'edit')

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    handleClearImageDownloadInfo,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)

  const [showArmorCalculator, setShowArmorCalculator] = useState(false)
  const [showItemTagSuggestions, setShowItemTagSuggestions] = useState(false)

  function handleSelectArmorSuggestion(newBuildState: BuildState) {
    setNewBuildState(newBuildState)
    setShowArmorCalculator(false)
    setShowItemTagSuggestions(false)
  }

  const isClient = useIsClient()
  if (!isClient) return

  return (
    <div className="flex w-full flex-col items-center">
      <DetailedBuildDialog
        buildState={dbBuildState}
        open={detailedBuildDialogOpen}
        onClose={() => setDetailedBuildDialogOpen(false)}
      />

      <ImageDownloadInfoDialog
        onClose={handleClearImageDownloadInfo}
        imageDownloadInfo={imageDownloadInfo}
      />

      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Edit your builds and share them with your friends and the community."
      />

      <ArmorSuggestionDialog
        buildState={dbBuildState}
        open={showArmorCalculator}
        onClose={() => setShowArmorCalculator(false)}
        onApplySuggestions={handleSelectArmorSuggestion}
      />

      <ItemTagSuggestionDialog
        buildState={dbBuildState}
        open={showItemTagSuggestions}
        onClose={() => setShowItemTagSuggestions(false)}
        onApplySuggestions={handleSelectArmorSuggestion}
      />

      <BuilderContainer
        buildContainerRef={buildContainerRef}
        buildState={dbBuildState}
        isEditable={true}
        isScreenshotMode={isScreenshotMode}
        showControls={showControls}
        onUpdateBuildState={updateDBBuildState}
        usingLocalChanges={usingLocalChanges}
        builderActions={
          <>
            <SaveBuildButton buildState={dbBuildState} editMode={true} />

            <ArmorCalculatorButton
              onClick={() => setShowArmorCalculator(true)}
            />

            <ItemSuggestionsButton
              onClick={() => setShowItemTagSuggestions(true)}
            />

            {session &&
              session.user?.id === dbBuildState.createdById &&
              dbBuildState.buildId && (
                <DeleteBuildButton buildId={dbBuildState.buildId} />
              )}

            <DetailedViewButton
              onClick={() => setDetailedBuildDialogOpen(true)}
            />
          </>
        }
      />
    </div>
  )
}
