import { type MutatorItem } from '@/app/(data)/items/types/MutatorItem';

export function mutatorDataCompare(
  newData: {
    description: string;
    maxLevelBonus: string;
  },
  currentItem: MutatorItem,
): {
  descriptionMatches: boolean;
  maxLevelBonusMatches: boolean;
  dataDiffers: boolean;
} {
  const descriptionMatches = newData.description === currentItem.description;
  const maxLevelBonusMatches =
    newData.maxLevelBonus === currentItem.maxLevelBonus;
  const dataDiffers = !descriptionMatches || !maxLevelBonusMatches;

  return {
    descriptionMatches,
    maxLevelBonusMatches,
    dataDiffers,
  };
}
