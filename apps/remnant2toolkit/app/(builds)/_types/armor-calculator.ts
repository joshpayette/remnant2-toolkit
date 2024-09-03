import { type WEIGHT_CLASSES } from '@/app/(builds)/_constants/weight-classes';
import { type ArmorItem } from '@/app/(items)/_types/armor-item';

export type ArmorSuggestion = {
  helm: ArmorItem;
  torso: ArmorItem;
  gloves: ArmorItem;
  legs: ArmorItem;
  totalArmor: number;
  totalWeight: number;
  totalFireResistance: number;
  totalBleedResistance: number;
  totalShockResistance: number;
  totalToxinResistance: number;
  totalBlightResistance: number;
};

export type WeightClassKeysWithDefault = keyof typeof WEIGHT_CLASSES | 'CHOOSE';

export type ArmorCalculatorFilters = {
  selectedAmulet: string;
  selectedRing: string;
  selectedWeightTier: WeightClassKeysWithDefault;
};
