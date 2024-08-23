import { BuildState } from '@/app/(features)/builds/types/build-state';

import { getItemsByKey, getTraitItemsByKey } from './utils';

export function getWeightThreshold(buildState: BuildState) {
  const equippedWeightThresholdItems = getItemsByKey(
    buildState,
    'weightThreshold',
  );
  const equippedWeightThresholdTraits = getTraitItemsByKey(
    buildState,
    'weightThresholds',
  );

  const totalWeightThreshold = equippedWeightThresholdItems.reduce(
    (acc, item) => acc + (item?.weightThreshold ?? 0),
    0,
  );
  const totalWeightThresholdTrait = equippedWeightThresholdTraits.reduce(
    (acc, item) => acc + (item.weightThresholds?.[item.amount - 1] ?? 0),
    0,
  );

  const combinedWeightThreshold =
    totalWeightThreshold + totalWeightThresholdTrait;

  return combinedWeightThreshold;
}
