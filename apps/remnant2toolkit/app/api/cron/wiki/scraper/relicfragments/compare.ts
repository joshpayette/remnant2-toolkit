import { type RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';

export function relicfragmentDataCompare(
  newData: {
    description: string;
  },
  currentItem: RelicFragmentItem,
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
