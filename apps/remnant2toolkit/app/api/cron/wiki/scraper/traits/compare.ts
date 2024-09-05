import { type TraitItem } from '@/app/(items)/_types/trait-item';

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
