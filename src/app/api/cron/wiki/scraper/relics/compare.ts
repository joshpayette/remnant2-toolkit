import { RelicItem } from '@/app/(data)/items/types/RelicItem'

export function relicDataCompare(
  newData: {
    description: string
  },
  currentItem: RelicItem,
): {
  descriptionMatches: boolean
  dataDiffers: boolean
} {
  const descriptionMatches = newData.description === currentItem.description
  const dataDiffers = !descriptionMatches

  return {
    descriptionMatches,
    dataDiffers,
  }
}
