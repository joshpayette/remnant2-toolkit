import { type RelicItem } from '@/app/(items)/_types/relic-item';

export function relicDataCompare(
  newData: {
    description: string;
  },
  currentItem: RelicItem,
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
