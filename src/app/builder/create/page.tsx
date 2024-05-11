'use client'

import { useRef, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { BuilderContainer } from '@/app/(components)/builder/builder-container'
import { ArmorCalculatorButton } from '@/app/(components)/buttons/builder-buttons/armor-calculator-button'
import { DetailedViewButton } from '@/app/(components)/buttons/builder-buttons/detailed-view-button'
import { GenerateBuildImageButton } from '@/app/(components)/buttons/builder-buttons/generate-build-image'
import { ItemSuggestionsButton } from '@/app/(components)/buttons/builder-buttons/item-suggestions-button'
import { RandomBuildButton } from '@/app/(components)/buttons/builder-buttons/random-build-button'
import { SaveBuildButton } from '@/app/(components)/buttons/builder-buttons/save-build-button'
import { ArmorSuggestionDialog } from '@/app/(components)/dialogs/armor-suggestion-dialog'
import { DetailedBuildDialog } from '@/app/(components)/dialogs/detailed-build-dialog'
import { ImageDownloadInfoDialog } from '@/app/(components)/dialogs/image-download-info-dialog'
import { ItemTagSuggestionDialog } from '@/app/(components)/dialogs/item-tag-suggestion-dialog'
import { PageHeader } from '@/app/(components)/page-header'
import { INITIAL_BUILD_STATE } from '@/app/(data)/builds/constants'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { BuildState } from '@/app/(types)/builds'
import { useDBBuildState } from '@/app/(utils)/builds/hooks/use-db-build-state'

export default function Page() {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false)

  const { dbBuildState, setNewBuildState, updateDBBuildState } =
    useDBBuildState(INITIAL_BUILD_STATE)

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    imageExportLoading,
    handleClearImageDownloadInfo,
    handleImageExport,
    handleRandomBuild,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)

  const [showArmorCalculator, setShowArmorCalculator] = useState(false)
  const [showItemSuggestions, setShowItemSuggestions] = useState(false)

  function handleApplySuggestions(newBuildState: BuildState) {
    setNewBuildState(newBuildState)
    setShowArmorCalculator(false)
    setShowItemSuggestions(false)
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
        subtitle="Create your builds and share them with your friends and the community."
      />

      <ArmorSuggestionDialog
        buildState={dbBuildState}
        open={showArmorCalculator}
        onClose={() => setShowArmorCalculator(false)}
        onApplySuggestions={handleApplySuggestions}
        key={`${JSON.stringify(dbBuildState)}-armor-suggestions`}
      />

      <ItemTagSuggestionDialog
        buildState={dbBuildState}
        open={showItemSuggestions}
        onClose={() => setShowItemSuggestions(false)}
        onApplySuggestions={handleApplySuggestions}
        key={`${JSON.stringify(dbBuildState)}-item-suggestions`}
      />

      <BuilderContainer
        buildContainerRef={buildContainerRef}
        buildState={dbBuildState}
        isScreenshotMode={isScreenshotMode}
        isEditable={true}
        onUpdateBuildState={updateDBBuildState}
        showControls={showControls}
        showCreatedBy={false}
        usingLocalChanges={false}
        builderActions={
          <>
            <SaveBuildButton buildState={dbBuildState} editMode={false} />

            <GenerateBuildImageButton
              imageExportLoading={imageExportLoading}
              onClick={() =>
                handleImageExport(
                  buildContainerRef.current,
                  `${dbBuildState.name}`,
                )
              }
            />

            <ArmorCalculatorButton
              onClick={() => setShowArmorCalculator(true)}
            />

            <ItemSuggestionsButton
              onClick={() => setShowItemSuggestions(true)}
            />

            <DetailedViewButton
              onClick={() => setDetailedBuildDialogOpen(true)}
            />

            <RandomBuildButton
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
