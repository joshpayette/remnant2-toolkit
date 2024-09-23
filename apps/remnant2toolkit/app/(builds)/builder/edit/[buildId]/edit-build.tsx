'use client';

import { type BuildTags } from '@repo/db';
import { BaseButton } from '@repo/ui';
import cloneDeep from 'lodash.clonedeep';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import { BuildVariantNamePrompt } from '@/app/(builds)/_components/build-variant-name-prompt';
import { RemoveBuildVariantNamePrompt } from '@/app/(builds)/_components/remove-build-variant-prompt';
import { TabbedBuildsDisplay } from '@/app/(builds)/_components/tabbed-builds-display';
import { MAX_BUILD_VARIANTS } from '@/app/(builds)/_constants/max-build-variants';
import { useBuildVariants } from '@/app/(builds)/_hooks/use-build-variants';
import { useImageExport } from '@/app/(builds)/_hooks/use-image-export';
import { syncBuildVariantsToBuild } from '@/app/(builds)/_libs/sync-build-variants-to-build';
import {
  type UpdateBuildCategory,
  updateBuildState,
} from '@/app/(builds)/_libs/update-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
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
  enableMemberFeatures: boolean;
  initialBuildVariants: BuildState[];
}

export function EditBuild({
  enableMemberFeatures,
  initialBuildVariants,
}: Props) {
  const { data: session } = useSession();
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);

  const {
    activeBuildVariant,
    setActiveBuildVariant,
    buildVariants,
    setBuildVariants,
    isBuildVariantNameOpen,
    setIsBuildVariantNameOpen,
    isRemoveBuildPromptOpen,
    setIsRemoveBuildPromptOpen,
    handleAddBuildVariant,
    handleRemoveBuildVariant,
  } = useBuildVariants({ initialBuildVariants });

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
    setBuildVariants((prevBuildVariants) =>
      prevBuildVariants.map((bv) =>
        bv.buildId === newBuildState.buildId
          ? { ...bv, build: newBuildState }
          : bv,
      ),
    );
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
    const newBuildVariants = cloneDeep(buildVariants);
    newBuildVariants[activeBuildVariant] = updatedBuildState;

    setBuildVariants(
      syncBuildVariantsToBuild({
        build: newBuildVariants[0] as BuildState,
        buildVariants: newBuildVariants.slice(1),
      }),
    );
  }

  if (!buildVariants[activeBuildVariant]) return null;

  const buildState = buildVariants[activeBuildVariant];
  const isMainBuild = activeBuildVariant === 0;

  return (
    <>
      <BuildVariantNamePrompt
        key={buildVariants.length}
        open={isBuildVariantNameOpen}
        onCancel={() => setIsBuildVariantNameOpen(false)}
        onClose={() => setIsBuildVariantNameOpen(false)}
        onConfirm={(newVariantName) => {
          setIsBuildVariantNameOpen(false);
          handleAddBuildVariant(newVariantName);
        }}
      />
      <RemoveBuildVariantNamePrompt
        open={isRemoveBuildPromptOpen}
        currentVariantName={buildState.name}
        onCancel={() => setIsRemoveBuildPromptOpen(false)}
        onClose={() => setIsRemoveBuildPromptOpen(false)}
        onConfirm={() => {
          setIsRemoveBuildPromptOpen(false);
          handleRemoveBuildVariant();
        }}
      />
      {enableMemberFeatures ? (
        <TabbedBuildsDisplay
          activeBuild={buildVariants[activeBuildVariant]}
          onChangeActiveBuild={(newActiveBuildVariant) => {
            const idx = buildVariants.findIndex(
              (bv) => bv.buildId === newActiveBuildVariant.buildId,
            );
            setActiveBuildVariant(idx);
          }}
          buildVariants={buildVariants}
          title="Build Variants"
        />
      ) : null}
      {enableMemberFeatures && (
        <div className="mb-2 flex items-start justify-center gap-x-2">
          {buildVariants.length < MAX_BUILD_VARIANTS && (
            <BaseButton onClick={() => setIsBuildVariantNameOpen(true)}>
              Add Build Variant
            </BaseButton>
          )}
          {activeBuildVariant !== 0 && (
            <BaseButton
              onClick={() => setIsRemoveBuildPromptOpen(true)}
              color="red"
            >
              Remove Active Build
            </BaseButton>
          )}
        </div>
      )}
      <BuilderContainer
        buildContainerRef={buildContainerRef}
        buildState={buildState}
        isEditable={true}
        isMainBuild={isMainBuild}
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

            <SaveBuildButton buildVariants={buildVariants} editMode={true} />

            <ArmorCalculatorButton
              onClick={() => setShowArmorCalculator(true)}
            />

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
    </>
  );
}
