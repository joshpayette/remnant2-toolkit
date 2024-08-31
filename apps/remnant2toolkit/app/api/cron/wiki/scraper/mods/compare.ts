import { type ModItem } from '@/app/(items)/_types/mod-item';

export function modDataCompare(
  newData: {
    description: string;
  },
  currentItem: ModItem,
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
