import {
  getTotalArmor,
  getTotalResistances,
  getTotalWeight,
  getWeightThreshold,
} from '@/features/build/lib/getTotalValues'
import { BuildState } from '@/features/build/types'
import { WEIGHT_CLASSES } from '@/features/items/constants'
import { ArmorItem } from '@/features/items/types/ArmorItem'

import { armorItems } from '../items/data/armorItems'
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
    : (armorItems.filter(
        (item) => ArmorItem.isArmorItem(item) && item.category === 'helm',
      ) as ArmorItem[])
  const torsoItems = buildState.items.torso
    ? [buildState.items.torso]
    : (armorItems.filter(
        (item) => ArmorItem.isArmorItem(item) && item.category === 'torso',
      ) as ArmorItem[])
  const legItems = buildState.items.legs
    ? [buildState.items.legs]
    : (armorItems.filter(
        (item) => ArmorItem.isArmorItem(item) && item.category === 'legs',
      ) as ArmorItem[])
  const gloveItems = buildState.items.gloves
    ? [buildState.items.gloves]
    : (armorItems.filter(
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
          const totalWeightThreshold = Number(getWeightThreshold(newBuildState))
          const totalFireResistance = getTotalResistances(newBuildState, 'fire')
          const totalBleedResistance = getTotalResistances(
            newBuildState,
            'bleed',
          )
          const totalShockResistance = getTotalResistances(
            newBuildState,
            'shock',
          )
          const totalToxinResistance = getTotalResistances(
            newBuildState,
            'toxin',
          )
          const totalBlightResistance = getTotalResistances(
            newBuildState,
            'blight',
          )

          if (desiredWeightClass === 'ULTRA') {
            armorSuggestions.push({
              helm: helmItem,
              torso: torsoItem,
              legs: legItem,
              gloves: gloveItem,
              totalArmor,
              totalWeight,
              totalFireResistance,
              totalBleedResistance,
              totalShockResistance,
              totalToxinResistance,
              totalBlightResistance,
            })
          } else if (totalWeight <= maxWeight + totalWeightThreshold) {
            armorSuggestions.push({
              helm: helmItem,
              torso: torsoItem,
              legs: legItem,
              gloves: gloveItem,
              totalArmor,
              totalWeight,
              totalFireResistance,
              totalBleedResistance,
              totalShockResistance,
              totalToxinResistance,
              totalBlightResistance,
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
