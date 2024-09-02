'use client';

import { type BuildTags } from '@repo/db';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import { useImageExport } from '@/app/(builds)/_hooks/use-image-export';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import {
  type UpdateBuildCategory,
  updateBuildState,
} from '@/app/(builds)/_libs/update-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { ArmorCalculatorButton } from '@/app/(builds)/builder/_components/armor-calculator-button';
import { ArmorSuggestionDialog } from '@/app/(builds)/builder/_components/armor-suggestion-dialog';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { DeleteBuildButton } from '@/app/(builds)/builder/_components/delete-build-button';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/detailed-build-dialog';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/detailed-view-button';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/image-download-info-dialog';
import { ItemSuggestionsButton } from '@/app/(builds)/builder/_components/item-suggestions-button';
import { SaveBuildButton } from '@/app/(builds)/builder/_components/save-build-button';
import { ItemTagSuggestionDialog } from '@/app/(items)/_components/item-tag-suggestion-dialog';

interface Props {
  build: DBBuild;
}

export function EditBuild({ build }: Props) {
  const { data: session } = useSession();

  const [buildState, setBuildState] = useState<BuildState>(
    dbBuildToBuildState(build),
  );

  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    handleClearImageDownloadInfo,
  } = useImageExport();

  const buildContainerRef = useRef<HTMLDivElement>(null);

  const [showArmorCalculator, setShowArmorCalculator] = useState(false);
  const [showItemTagSuggestions, setShowItemTagSuggestions] = useState(false);

  function handleSelectArmorSuggestion(newBuildState: BuildState) {
    setBuildState(newBuildState);
    setShowArmorCalculator(false);
    setShowItemTagSuggestions(false);
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

  return (
    <BuilderContainer
      buildContainerRef={buildContainerRef}
      buildState={buildState}
      isEditable={true}
      isScreenshotMode={isScreenshotMode}
      itemOwnershipPreference={false}
      showControls={showControls}
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
            onApplySuggestions={handleSelectArmorSuggestion}
          />

          <ItemTagSuggestionDialog
            buildState={buildState}
            open={showItemTagSuggestions}
            onClose={() => setShowItemTagSuggestions(false)}
            onApplySuggestions={handleSelectArmorSuggestion}
          />

          <SaveBuildButton buildState={buildState} editMode={true} />

          <ArmorCalculatorButton onClick={() => setShowArmorCalculator(true)} />

          <ItemSuggestionsButton
            onClick={() => setShowItemTagSuggestions(true)}
          />

          {session &&
            session.user?.id === buildState.createdById &&
            buildState.buildId && (
              <DeleteBuildButton buildId={buildState.buildId} />
            )}

          <DetailedViewButton
            onClick={() => setDetailedBuildDialogOpen(true)}
          />
        </>
      }
    />
  );
}
