import cloneDeep from 'lodash.clonedeep';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { MAX_BUILD_VARIANTS } from '@/app/(builds)/_constants/max-build-variants';
import { type UpdateBuildCategory } from '@/app/(builds)/_libs/update-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';

export function useBuildVariants({
  initialBuildVariants,
}: {
  initialBuildVariants: BuildState[];
}) {
  const [buildVariants, setBuildVariants] =
    useState<BuildState[]>(initialBuildVariants);
  const [activeBuildVariant, setActiveBuildVariant] = useState<number>(0);

  const [isBuildVariantNameOpen, setIsBuildVariantNameOpen] = useState(false);
  const [isRemoveBuildPromptOpen, setIsRemoveBuildPromptOpen] = useState(false);

  const [areVariantsAddedOrDeleted, setAreVariantsAddedOrDeleted] =
    useState(false);

  const [variantChanges, setVariantChanges] = useState<
    Array<{
      category: UpdateBuildCategory;
      buildId: string;
    }>
  >([]);

  function handleAddBuildVariant(newVariantName: string) {
    if (!buildVariants[activeBuildVariant]) {
      console.info('No active build variant');
      return;
    }

    const newBuildState = cloneDeep(buildVariants[activeBuildVariant]);
    newBuildState.buildId = Date.now().toString();

    newBuildState.name = newVariantName;
    newBuildState.description = '';

    if (buildVariants.length >= MAX_BUILD_VARIANTS) {
      toast.error('You have reached the maximum number of build variants.');
      return;
    }

    setAreVariantsAddedOrDeleted(true);

    setBuildVariants((prevBuildVariants) => [
      ...prevBuildVariants,
      newBuildState,
    ]);

    setActiveBuildVariant(buildVariants.length);
  }

  function handleRemoveBuildVariant() {
    if (buildVariants.length === 1) return;
    if (!buildVariants[activeBuildVariant]?.buildId) return;

    const newBuildVariants = cloneDeep(buildVariants);
    newBuildVariants.splice(activeBuildVariant, 1);

    setAreVariantsAddedOrDeleted(true);
    setBuildVariants(newBuildVariants);
    setActiveBuildVariant(newBuildVariants.length - 1);
    // Remove all variantChanges for the build variant being removed
    setVariantChanges((prevVariantChanges) =>
      prevVariantChanges.filter(
        (change) =>
          change.buildId !== buildVariants[activeBuildVariant]?.buildId,
      ),
    );
  }

  return {
    areVariantsAddedOrDeleted,
    buildVariants,
    setBuildVariants,
    activeBuildVariant,
    setActiveBuildVariant,
    isBuildVariantNameOpen,
    setIsBuildVariantNameOpen,
    isRemoveBuildPromptOpen,
    setIsRemoveBuildPromptOpen,
    variantChanges,
    setVariantChanges,
    handleAddBuildVariant,
    handleRemoveBuildVariant,
  };
}
