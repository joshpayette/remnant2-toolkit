import { type ReadonlyURLSearchParams } from 'next/navigation';

import {
  type ArmorCalculatorFilters,
  type WeightClassKeysWithDefault,
} from '@/app/(types)/armor-calculator';

export function parseArmorCalculatorFilters(
  searchParams: ReadonlyURLSearchParams,
): ArmorCalculatorFilters {
  const params = new URLSearchParams(searchParams);
  let selectedAmulet = params.get('selectedAmulet');
  let selectedRing = params.get('selectedRing');
  let selectedWeightTier = params.get('selectedWeightTier');

  if (!selectedAmulet) {
    selectedAmulet = 'CHOOSE';
  }
  if (!selectedRing) {
    selectedRing = 'CHOOSE';
  }
  if (!selectedWeightTier) {
    selectedWeightTier = 'CHOOSE';
  }

  return {
    selectedAmulet,
    selectedRing,
    selectedWeightTier: selectedWeightTier as WeightClassKeysWithDefault,
  };
}
