'use client';

import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { PageHeader } from '@/app/_components/page-header';
import { useBuildActions } from '@/app/(builds)/_hooks/use-build-actions';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { cleanUpBuildState } from '@/app/(builds)/_utils/clean-up-build-state';
import { dbBuildToBuildState } from '@/app/(builds)/_utils/db-build-to-build-state';
import { useDBBuildState } from '@/app/(builds)/_utils/hooks/use-db-build-state';
import { BuilderContainer } from '@/app/(builds)/builder/_components/builder-container';
import { ArmorCalculatorButton } from '@/app/(builds)/builder/_components/buttons/armor-calculator-button';
import { DeleteBuildButton } from '@/app/(builds)/builder/_components/buttons/delete-build-button';
import { DetailedViewButton } from '@/app/(builds)/builder/_components/buttons/detailed-view-button';
import { ItemSuggestionsButton } from '@/app/(builds)/builder/_components/buttons/item-suggestions-button';
import { SaveBuildButton } from '@/app/(builds)/builder/_components/buttons/save-build-button';
import { ArmorSuggestionDialog } from '@/app/(builds)/builder/_components/dialogs/armor-suggestion-dialog';
import { DetailedBuildDialog } from '@/app/(builds)/builder/_components/dialogs/detailed-build-dialog';
import { ImageDownloadInfoDialog } from '@/app/(builds)/builder/_components/dialogs/image-download-info-dialog';
import { ItemTagSuggestionDialog } from '@/app/(items)/_components/item-tag-suggestion-dialog';

interface Props {
  build: DBBuild;
}

export function PageClient({ build }: Props) {
  const { data: session } = useSession();

  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);

  const { dbBuildState, updateDBBuildState, setNewBuildState } =
    useDBBuildState(cleanUpBuildState(dbBuildToBuildState(build)));

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    handleClearImageDownloadInfo,
  } = useBuildActions();

  const buildContainerRef = useRef<HTMLDivElement>(null);

  const [showArmorCalculator, setShowArmorCalculator] = useState(false);
  const [showItemTagSuggestions, setShowItemTagSuggestions] = useState(false);

  function handleSelectArmorSuggestion(newBuildState: BuildState) {
    setNewBuildState(newBuildState);
    setShowArmorCalculator(false);
    setShowItemTagSuggestions(false);
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
        itemOwnershipPreference={false}
        showControls={showControls}
        onUpdateBuildState={updateDBBuildState}
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
  );
}
