import { ConsumableItem } from '@/app/(data)/items/types/ConsumableItem'

export function consumableDataCompare(
  newData: {
    description: string
  },
  currentItem: ConsumableItem,
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
