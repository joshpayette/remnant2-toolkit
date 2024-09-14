'use client';

import { type BuildTags } from '@repo/db';
import { BaseButton } from '@repo/ui';
import cloneDeep from 'lodash.clonedeep';
import { useRef, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { INITIAL_BUILD_STATE } from '@/app/(builds)/_constants/initial-build-state';
import { MAX_LINKED_BUILDS } from '@/app/(builds)/_constants/max-linked-builds';
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
import { TabbedBuildsDisplay } from '@/app/(builds)/builder/linked/_components/tabbed-builds-display';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';
import { ItemTagSuggestionDialog } from '@/app/(items)/_components/item-tag-suggestion-dialog';

interface Props {
  enableMemberFeatures: boolean;
  initialBuildState?: BuildState;
}

export function CreateBuild({
  enableMemberFeatures,
  initialBuildState = INITIAL_BUILD_STATE,
}: Props) {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false);

  const [buildVariants, setBuildVariants] = useState<LinkedBuildItem[]>([
    {
      label: initialBuildState.name,
      build: {
        ...cloneDeep(initialBuildState),
        buildId: Date.now().toString(),
      },
    },
  ]);
  const [activeBuildVariant, setActiveBuildVariant] = useState<number>(0);

  function handleAddBuildVariant() {
    if (!buildVariants[activeBuildVariant]) {
      console.info('No active build variant');
      return;
    }

    const newBuildState = cloneDeep(buildVariants[activeBuildVariant].build);
    newBuildState.buildId = Date.now().toString();

    const newVariantName = prompt('Enter a name for this build variant');
    if (newVariantName) {
      newBuildState.name = newVariantName;
    } else {
      newBuildState.name = `Build Variant ${buildVariants.length + 1}`;
    }

    if (buildVariants.length >= MAX_LINKED_BUILDS) {
      console.info('Max linked builds reached');
      return;
    }

    setBuildVariants((prevBuildVariants) => [
      ...prevBuildVariants,
      {
        label: newBuildState.name,
        build: newBuildState,
      },
    ]);

    setActiveBuildVariant(buildVariants.length);
  }
  function handleRemoveBuildVariant(buildVariant: LinkedBuildItem) {
    if (buildVariants.length === 1) return;

    setBuildVariants((prevBuildVariants) =>
      prevBuildVariants.filter(
        (bv) => bv.build.buildId !== buildVariant.build.buildId,
      ),
    );
  }

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
    // setBuildState(newBuildState);
    setBuildVariants((prevBuildVariants) =>
      prevBuildVariants.map((bv) =>
        bv.build.buildId === newBuildState.buildId
          ? { label: bv.label, build: newBuildState }
          : bv,
      ),
    );
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
    // setBuildState(updatedBuildState);
    const newBuildVariants = cloneDeep(buildVariants);
    (newBuildVariants[activeBuildVariant] as LinkedBuildItem) = {
      label: updatedBuildState.name,
      build: updatedBuildState,
    };

    setBuildVariants(newBuildVariants);
  }

  const isClient = useIsClient();
  if (!isClient) return null;

  if (!buildVariants[activeBuildVariant]) return null;
  const buildState = buildVariants[activeBuildVariant].build;

  return (
    <>
      {enableMemberFeatures ? (
        <TabbedBuildsDisplay
          activeBuild={buildVariants[activeBuildVariant]}
          onChangeActiveBuild={(newActiveBuildVariant) => {
            const idx = buildVariants.findIndex(
              (bv) => bv.build.buildId === newActiveBuildVariant.build.buildId,
            );
            setActiveBuildVariant(idx);
          }}
          linkedBuild={{
            linkedBuilds: buildVariants,
          }}
          title="Build Variants"
        />
      ) : null}
      {enableMemberFeatures && buildVariants.length <= MAX_LINKED_BUILDS && (
        <BaseButton className="mb-4" onClick={handleAddBuildVariant}>
          Add Build Variant
        </BaseButton>
      )}
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
                handleImageExport(
                  buildContainerRef.current,
                  `${buildState.name}`,
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

            <RandomBuildButton />
          </>
        }
      />
    </>
  );
}
