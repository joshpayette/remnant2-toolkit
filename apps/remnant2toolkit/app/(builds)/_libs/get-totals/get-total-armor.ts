import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type Item } from '@/app/(items)/_types/item';
import { type TraitItem } from '@/app/(items)/_types/trait-item';

import { getItemsByKey, getTraitItemsByKey } from './lib';

export function getTotalArmor(buildState: BuildState): {
  totalArmor: string;
  breakdown: {
    equippedArmorIncreaseItems: Item[];
    equippedArmorPercentItems: Item[];
    equippedArmorStepItems: TraitItem[];
    equippedArmorStepPercentItems: TraitItem[];
    totalArmorIncrease: number;
    totalArmorPercent: number;
    totalArmorStep: number;
    totalArmorStepPercent: number;
  };
} {
  // all equipped items that increase armor
  const equippedArmorIncreaseItems = getItemsByKey(buildState, 'armor');
  // all equipped items that increase armor by a percentage
  const equippedArmorPercentItems = getItemsByKey(buildState, 'armorPercent');
  // all equipped items that increase the armor by a value per point
  const equippedArmorStepItems = getTraitItemsByKey(buildState, 'armorStep');
  // all equipped itesm that increase the armor by a percentage point
  const equippedArmorStepPercentItems = getTraitItemsByKey(
    buildState,
    'armorStepPercent',
  );

  const totalArmorIncrease = equippedArmorIncreaseItems.reduce(
    (acc, item) => acc + (item.armor ?? 0),
    0,
  );
  const totalArmorPercent = equippedArmorPercentItems.reduce(
    (acc, item) => acc + (item.armorPercent ?? 0),
    0,
  );
  const totalArmorStep = equippedArmorStepItems.reduce(
    (acc, item) => acc + (item.armorStep ?? 0) * (item.amount ?? 0),
    0,
  );

  const totalArmorStepPercent = equippedArmorStepPercentItems.reduce(
    (acc, item) => acc + (item.armorStepPercent ?? 0) * (item.amount ?? 0),
    0,
  );

  const totalArmor =
    totalArmorIncrease * (1 + totalArmorPercent + totalArmorStepPercent) +
    totalArmorStep;

  return {
    totalArmor: totalArmor.toFixed(2),
    breakdown: {
      equippedArmorIncreaseItems,
      equippedArmorPercentItems,
      equippedArmorStepItems,
      equippedArmorStepPercentItems,
      totalArmorIncrease,
      totalArmorPercent,
      totalArmorStep,
      totalArmorStepPercent,
    },
  };
}
