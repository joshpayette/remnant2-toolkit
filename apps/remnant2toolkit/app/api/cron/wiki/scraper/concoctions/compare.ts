import { type ConcoctionItem } from '@/app/(items)/_types/concotion-item';

export function concoctionDataCompare(
  newData: {
    description: string;
  },
  currentItem: ConcoctionItem,
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
