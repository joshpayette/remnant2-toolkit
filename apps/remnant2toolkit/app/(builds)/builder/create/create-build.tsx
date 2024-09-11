'use client';

import { type BuildTags } from '@repo/db';
import cloneDeep from 'lodash.clonedeep';
import { useRef, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { INITIAL_BUILD_STATE } from '@/app/(builds)/_constants/initial-build-state';
import { useImageExport } from '@/app/(builds)/_hooks/use-image-export';
import {
  type UpdateBuildCategory,
  updateBuildState,
} from '@/app/(builds)/_libs/update-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { ArmorCalculatorButton } from '@/app/(builds)/builder/_components/armor-calculator-button';
import { ArmorSuggestionDialog } from '@/app/(builds)/builder/_components/armor-suggestion-dialog';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/detailed-build-dialog';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/detailed-view-button';
import { GenerateBuildImageButton } from '@/app/(builds)/builder/_components/generate-build-image';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/image-download-info-dialog';
import { ItemSuggestionsButton } from '@/app/(builds)/builder/_components/item-suggestions-button';
import { RandomBuildButton } from '@/app/(builds)/builder/_components/random-build-button';
import { SaveBuildButton } from '@/app/(builds)/builder/_components/save-build-button';
import { ItemTagSuggestionDialog } from '@/app/(items)/_components/item-tag-suggestion-dialog';

interface Props {
  initialBuildState?: BuildState;
}

export function CreateBuild({
  initialBuildState = INITIAL_BUILD_STATE,
}: Props) {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);

  const [buildState, setBuildState] = useState<BuildState>(
    cloneDeep(initialBuildState),
  );

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    imageExportLoading,
    handleClearImageDownloadInfo,
    handleImageExport,
  } = useImageExport();

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

          <RandomBuildButton />
        </>
      }
    />
  );
}
