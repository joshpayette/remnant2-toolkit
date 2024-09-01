'use client';

import { type BuildTags } from '@repo/db';
import cloneDeep from 'lodash.clonedeep';
import { useRef, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { INITIAL_BUILD_STATE } from '@/app/(builds)/_constants/initial-build-state';
import { useBuildActions } from '@/app/(builds)/_hooks/use-build-actions';
import {
  type UpdateBuildCategory,
  updateBuildState,
} from '@/app/(builds)/_libs/update-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { ArmorCalculatorButton } from '@/app/(builds)/builder/_components/buttons/armor-calculator-button';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/buttons/detailed-view-button';
import { GenerateBuildImageButton } from '@/app/(builds)/builder/_components/buttons/generate-build-image';
import { ItemSuggestionsButton } from '@/app/(builds)/builder/_components/buttons/item-suggestions-button';
import { RandomBuildButton } from '@/app/(builds)/builder/_components/buttons/random-build-button';
import { SaveBuildButton } from '@/app/(builds)/builder/_components/buttons/save-build-button';
import { ArmorSuggestionDialog } from '@/app/(builds)/builder/_components/dialogs/armor-suggestion-dialog';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/dialogs/detailed-build-dialog';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/dialogs/image-download-info-dialog';
import { ItemTagSuggestionDialog } from '@/app/(items)/_components/item-tag-suggestion-dialog';

export function CreateBuild() {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);

  const [buildState, setBuildState] = useState<BuildState>(
    cloneDeep(INITIAL_BUILD_STATE),
  );

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
    setBuildState(newBuildState);
    setShowArmorCalculator(false);
    setShowItemSuggestions(false);
  }

  function handleUpdateBuildState({
    buildState,
    category,
    value,
  }: {
    buildState: BuildState;
    category: UpdateBuildCategory;
    value: string | Array<string | undefined> | BuildTags[];
  }) {
    const updatedBuildState = updateBuildState({
      buildState,
      category,
      value,
    });
    setBuildState(updatedBuildState);
  }

  const isClient = useIsClient();
  if (!isClient) return null;

  return (
    <BuilderContainer
      buildContainerRef={buildContainerRef}
      buildState={buildState}
      isScreenshotMode={isScreenshotMode}
      isEditable={true}
      itemOwnershipPreference={false}
      showControls={showControls}
      showCreatedBy={false}
      onUpdateBuildState={handleUpdateBuildState}
      builderActions={
        <>
          <DetailedBuildDialog
            buildState={buildState}
            open={detailedBuildDialogOpen}
            onClose={() => setDetailedBuildDialogOpen(false)}
          />

          <ImageDownloadInfoDialog
            onClose={handleClearImageDownloadInfo}
            imageDownloadInfo={imageDownloadInfo}
          />

          <ArmorSuggestionDialog
            buildState={buildState}
            open={showArmorCalculator}
            onClose={() => setShowArmorCalculator(false)}
            onApplySuggestions={handleApplySuggestions}
            key={`${JSON.stringify(buildState)}-armor-suggestions`}
          />

          <ItemTagSuggestionDialog
            buildState={buildState}
            open={showItemSuggestions}
            onClose={() => setShowItemSuggestions(false)}
            onApplySuggestions={handleApplySuggestions}
            key={`${JSON.stringify(buildState)}-item-suggestions`}
          />

          <SaveBuildButton buildState={buildState} editMode={false} />

          <GenerateBuildImageButton
            imageExportLoading={imageExportLoading}
            onClick={() =>
              handleImageExport(buildContainerRef.current, `${buildState.name}`)
            }
          />

          <ArmorCalculatorButton onClick={() => setShowArmorCalculator(true)} />

          <ItemSuggestionsButton onClick={() => setShowItemSuggestions(true)} />

          <DetailedViewButton
            onClick={() => setDetailedBuildDialogOpen(true)}
          />

          <RandomBuildButton
            onClick={() => {
              const randomBuild = handleRandomBuild();
              setBuildState(randomBuild);
            }}
          />
        </>
      }
    />
  );
}
