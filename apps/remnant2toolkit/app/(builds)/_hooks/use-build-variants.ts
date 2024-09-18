import cloneDeep from 'lodash.clonedeep';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { MAX_LINKED_BUILDS } from '@/app/(builds)/_constants/max-linked-builds';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

export function useBuildVariants({
  initialBuildVariants,
}: {
  initialBuildVariants: LinkedBuildItem[];
}) {
  const [buildVariants, setBuildVariants] =
    useState<LinkedBuildItem[]>(initialBuildVariants);
  const [activeBuildVariant, setActiveBuildVariant] = useState<number>(0);

  function handleAddBuildVariant() {
    if (!buildVariants[activeBuildVariant]) {
      console.info('No active build variant');
      return;
    }

    const newBuildState = cloneDeep(buildVariants[activeBuildVariant].build);
    newBuildState.buildId = Date.now().toString();

    const defaultNewBuildName =
      activeBuildVariant === 0 ? 'Boss Rush' : 'Budget';

    const newVariantName = prompt(
      'Enter a name for this build variant',
      defaultNewBuildName,
    );

    if (!newVariantName) return;

    newBuildState.name = newVariantName;

    if (buildVariants.length >= MAX_LINKED_BUILDS) {
      toast.error('You have reached the maximum number of build variants.');
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
