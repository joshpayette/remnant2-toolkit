import { WEIGHT_CLASSES } from '@/app/(builds)/_constants/weight-classes';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type WeightClass } from '@/app/(items)/_types/weight-class';

import { getTotalWeight } from './get-total-weight';
import { getWeightThreshold } from './get-weight-threshold';

type WeightClassResponse = WeightClass & { label: keyof typeof WEIGHT_CLASSES };

export function getWeightClass(buildState: BuildState): WeightClassResponse {
  const combinedWeightThreshold = Number(getWeightThreshold(buildState));

  const totalWeight = Number(getTotalWeight(buildState));

  let weightClass: WeightClassResponse = {
    ...WEIGHT_CLASSES.LIGHT,
    label: 'LIGHT',
  };
  if (totalWeight > WEIGHT_CLASSES.LIGHT.maxWeight + combinedWeightThreshold) {
    weightClass = {
      ...WEIGHT_CLASSES.MEDIUM,
      label: 'MEDIUM',
    };
  }
  if (totalWeight > WEIGHT_CLASSES.MEDIUM.maxWeight + combinedWeightThreshold) {
    weightClass = {
      ...WEIGHT_CLASSES.HEAVY,
      label: 'HEAVY',
    };
  }

  if (totalWeight > WEIGHT_CLASSES.HEAVY.maxWeight + combinedWeightThreshold) {
    weightClass = {
      ...WEIGHT_CLASSES.ULTRA,
      label: 'ULTRA',
    };
  }

  // Dull Steel Ring lowers by one weight class
  // Typically, the -25 weight it provides is enough to lower the build by one weight class
  // For Ultra though, -25 is not enough to lower it to Heavy
  // So we need to check if the build is Ultra and has the Dull Steel Ring
  // If so, we lower it to Heavy
  // However, if the build has Burden of the Mason, we should not lower it to Heavy
  // Burden of the Mason negates the weight of the Dull Steel Ring
  const buildHasDullSteelRing = buildState.items.ring.some(
    (ring) => ring?.id === 's76ytc',
  );
  const buildHasBurdenOfTheMason = buildState.items.ring.some(
    (ring) => ring?.id === 'k89bxz',
  );

  if (
    weightClass.label === 'ULTRA' &&
    buildHasDullSteelRing &&
    !buildHasBurdenOfTheMason
  ) {
    weightClass = {
      ...WEIGHT_CLASSES.HEAVY,
      label: 'HEAVY',
    };
  }

  return weightClass;
}
