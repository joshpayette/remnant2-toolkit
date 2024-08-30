import { type PerkItem } from '@/app/(data)/items/types/PerkItem';

export function perkDataCompare(
  newData: {
    description: string;
  },
  currentItem: PerkItem,
): {
  descriptionMatches: boolean;
  dataDiffers: boolean;
} {
  const descriptionMatches = newData.description === currentItem.description;
  const dataDiffers = !descriptionMatches;

  return {
    descriptionMatches,
    dataDiffers,
  };
}
