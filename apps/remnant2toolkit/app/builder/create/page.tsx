'use client';

import { useRef, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { INITIAL_BUILD_STATE } from '@/app/(builds)/_constants/initial-build-state';
import { useBuildActions } from '@/app/(builds)/_hooks/use-build-actions';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { useDBBuildState } from '@/app/(builds)/_utils/hooks/use-db-build-state';
import { ItemTagSuggestionDialog } from '@/app/(components)/dialogs/item-tag-suggestion-dialog';
import { PageHeader } from '@/app/(components)/page-header';
import { BuilderContainer } from '@/app/builder/_components/builder-container';
import { ArmorCalculatorButton } from '@/app/builder/_components/buttons/armor-calculator-button';
import { DetailedViewButton } from '@/app/builder/_components/buttons/detailed-view-button';
import { GenerateBuildImageButton } from '@/app/builder/_components/buttons/generate-build-image';
import { ItemSuggestionsButton } from '@/app/builder/_components/buttons/item-suggestions-button';
import { RandomBuildButton } from '@/app/builder/_components/buttons/random-build-button';
import { SaveBuildButton } from '@/app/builder/_components/buttons/save-build-button';
import { ArmorSuggestionDialog } from '@/app/builder/_components/dialogs/armor-suggestion-dialog';
import { DetailedBuildDialog } from '@/app/builder/_components/dialogs/detailed-build-dialog';
import { ImageDownloadInfoDialog } from '@/app/builder/_components/dialogs/image-download-info-dialog';

export default function Page() {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);

  const { dbBuildState, setNewBuildState, updateDBBuildState } =
    useDBBuildState(INITIAL_BUILD_STATE);

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    imageExportLoading,
    handleClearImageDownloadInfo,
    handleImageExport,
    handleRandomBuild,
  } = useBuildActions();

  const buildContainerRef = useRef<HTMLDivElement>(null);

  const [showArmorCalculator, setShowArmorCalculator] = useState(false);
  const [showItemSuggestions, setShowItemSuggestions] = useState(false);

  function handleApplySuggestions(newBuildState: BuildState) {
    setNewBuildState(newBuildState);
    setShowArmorCalculator(false);
    setShowItemSuggestions(false);
  }

  const isClient = useIsClient();
  if (!isClient) return;

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
        itemOwnershipPreference={false}
        onUpdateBuildState={updateDBBuildState}
        showControls={showControls}
        showCreatedBy={false}
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
                const randomBuild = handleRandomBuild();
                setNewBuildState(randomBuild);
              }}
            />
          </>
        }
      />
    </div>
  );
}
