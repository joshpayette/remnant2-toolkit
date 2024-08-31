import { type AmuletItem } from '@/app/(items)/_types/amulet-item';

export function amuletDataCompare(
  newData: {
    description: string;
  },
  currentItem: AmuletItem,
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
