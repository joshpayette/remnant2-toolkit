import { type RingItem } from '@/app/(items)/_types/ring-item';

export function ringDataCompare(
  newData: {
    description: string;
  },
  currentItem: RingItem,
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
