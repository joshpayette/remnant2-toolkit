import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem'

export function relicfragmentDataCompare(
  newData: {
    description: string
  },
  currentItem: RelicFragmentItem,
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
