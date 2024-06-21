import { ConcoctionItem } from '@/app/(data)/items/types/ConcoctionItem'

export function concoctionDataCompare(
  newData: {
    description: string
  },
  currentItem: ConcoctionItem,
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
