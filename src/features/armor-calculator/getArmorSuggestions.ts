import {
  getTotalArmor,
  getTotalWeight,
} from '@/features/build/lib/getTotalValues'
import { BuildState } from '@/features/build/types'
import { WEIGHT_CLASSES } from '@/features/items/constants'
import { remnantItems } from '@/features/items/data/remnantItems'
import { ArmorItem } from '@/features/items/types/ArmorItem'

import { ArmorSuggestion } from './types'

export function getArmorSuggestions({
  buildState,
  desiredWeightClass,
}: {
  buildState: BuildState
  desiredWeightClass: keyof typeof WEIGHT_CLASSES
}): ArmorSuggestion[] {
  const maxWeight = WEIGHT_CLASSES[desiredWeightClass].maxWeight

  const helmItems = buildState.items.helm
    ? [buildState.items.helm]
    : (remnantItems.filter(
        (item) => ArmorItem.isArmorItem(item) && item.category === 'helm',
      ) as ArmorItem[])
  const torsoItems = buildState.items.torso
    ? [buildState.items.torso]
    : (remnantItems.filter(
        (item) => ArmorItem.isArmorItem(item) && item.category === 'torso',
      ) as ArmorItem[])
  const legItems = buildState.items.legs
    ? [buildState.items.legs]
    : (remnantItems.filter(
        (item) => ArmorItem.isArmorItem(item) && item.category === 'legs',
      ) as ArmorItem[])
  const gloveItems = buildState.items.gloves
    ? [buildState.items.gloves]
    : (remnantItems.filter(
        (item) => ArmorItem.isArmorItem(item) && item.category === 'gloves',
      ) as ArmorItem[])

  const armorSuggestions: ArmorSuggestion[] = []

  for (const helmItem of helmItems) {
    for (const torsoItem of torsoItems) {
      for (const legItem of legItems) {
        for (const gloveItem of gloveItems) {
          const newBuildState = {
            ...buildState,
            items: {
              ...buildState.items,
              helm: helmItem,
              torso: torsoItem,
              legs: legItem,
              gloves: gloveItem,
            },
          }

          const totalArmor = Number(getTotalArmor(newBuildState))
          const totalWeight = Number(getTotalWeight(newBuildState))

          if (desiredWeightClass === 'ULTRA') {
            armorSuggestions.push({
              helm: helmItem,
              torso: torsoItem,
              legs: legItem,
              gloves: gloveItem,
              totalArmor,
              totalWeight,
            })
          } else if (totalWeight <= maxWeight) {
            armorSuggestions.push({
              helm: helmItem,
              torso: torsoItem,
              legs: legItem,
              gloves: gloveItem,
              totalArmor,
              totalWeight,
            })
          }
        }
      }
    }
  }

  armorSuggestions.sort((a, b) => b.totalArmor - a.totalArmor)

  // Return only the resultCount number of suggestions
  return armorSuggestions.slice(0)
}
