import cloneDeep from 'lodash.clonedeep';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { MAX_BUILD_VARIANTS } from '@/app/(builds)/_constants/max-build-variants';
import { type BuildState } from '@/app/(builds)/_types/build-state';

export function useBuildVariants({
  initialBuildVariants,
}: {
  initialBuildVariants: BuildState[];
}) {
  const [buildVariants, setBuildVariants] =
    useState<BuildState[]>(initialBuildVariants);
  const [activeBuildVariant, setActiveBuildVariant] = useState<number>(0);

  function handleAddBuildVariant() {
    if (!buildVariants[activeBuildVariant]) {
      console.info('No active build variant');
      return;
    }

    const newBuildState = cloneDeep(buildVariants[activeBuildVariant]);
    newBuildState.buildId = Date.now().toString();

    const defaultNewBuildName =
      activeBuildVariant === 0 ? 'Boss Rush' : 'Budget';

    const newVariantName = prompt(
      'Enter a name for this build variant',
      defaultNewBuildName,
    );

    if (!newVariantName) return;

    newBuildState.name = newVariantName;

    if (buildVariants.length >= MAX_BUILD_VARIANTS) {
      toast.error('You have reached the maximum number of build variants.');
      return;
    }

    setBuildVariants((prevBuildVariants) => [
      ...prevBuildVariants,
      newBuildState,
    ]);

    setActiveBuildVariant(buildVariants.length);
  }

  function handleRemoveBuildVariant() {
    if (buildVariants.length === 1) return;

    const response = confirm(
      'Are you sure you want to remove this build variant?',
    );

    if (!response) return;

    const newBuildVariants = cloneDeep(buildVariants);
    newBuildVariants.splice(activeBuildVariant, 1);
    setBuildVariants(newBuildVariants);
    setActiveBuildVariant(newBuildVariants.length - 1);
  }

  return {
    buildVariants,
    setBuildVariants,
    activeBuildVariant,
    setActiveBuildVariant,
    handleAddBuildVariant,
    handleRemoveBuildVariant,
  };
}
