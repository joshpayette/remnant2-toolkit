import { type TraitItem } from '@/app/(data)/items/types/TraitItem';

export function traitDataCompare(
  newData: {
    description: string;
  },
  currentItem: TraitItem,
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
