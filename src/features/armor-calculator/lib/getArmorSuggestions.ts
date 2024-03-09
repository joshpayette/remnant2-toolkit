import {
  getTotalArmor,
  getTotalWeight,
  getWeightClass,
} from '@/features/build/lib/getTotalValues'
import { BuildState } from '@/features/build/types'
import { WEIGHT_CLASSES } from '@/features/items/constants'
import { remnantItems } from '@/features/items/data/remnantItems'
import { ArmorItem } from '@/features/items/types/ArmorItem'

import { ArmorSuggestion } from '../types'

export function getArmorSuggestions(
  buildState: BuildState,
  desiredWeightClass: keyof typeof WEIGHT_CLASSES,
) {
  const emptyArmorSlots: Array<'helm' | 'torso' | 'gloves' | 'legs'> = []
  if (!buildState.items.helm) emptyArmorSlots.push('helm')
  if (!buildState.items.torso) emptyArmorSlots.push('torso')
  if (!buildState.items.gloves) emptyArmorSlots.push('gloves')
  if (!buildState.items.legs) emptyArmorSlots.push('legs')

  // --------------------------------------
  // Need to get a pool of armor items from each slot that does not already exist in the build
  // We can exclude items that exceed the minimum weight class if it's light
  // --------------------------------------
  let armorItems: ArmorItem[] = []
  emptyArmorSlots.forEach((slot) => {
    const slotItems = remnantItems.filter(
      (item) => item.category === slot,
    ) as ArmorItem[]
    armorItems = [...armorItems, ...slotItems]
  })

  // If the desired weight class is light, we can exclude items that exceed the minimum weight class
  if (desiredWeightClass === 'LIGHT') {
    armorItems = armorItems.filter(
      (item) => item.weight && item.weight <= WEIGHT_CLASSES.LIGHT.maxWeight,
    )
  }

  // --------------------------------------
  // Need to loop through each empty armor slot.
  // For each empty slot, we need to loop through each armor item and test it
  // against each item of every other empty slot
  // --------------------------------------
  const newArmorSuggestions: ArmorSuggestion[] = []

  // This function will recursively loop through each empty slot and generate a list of
  // possible combinations of armor items
  function generateCombinations(slotIndex: number, selectedItems: ArmorItem[]) {
    if (slotIndex === emptyArmorSlots.length) {
      // Process the list of selected items (this is one possible combination)
      const testBuild = JSON.parse(JSON.stringify(buildState))

      selectedItems.forEach((item) => {
        testBuild.items[item.category] = item
      })
      const result = getWeightClass(testBuild)

      const isResultValid =
        result.maxWeight === WEIGHT_CLASSES[desiredWeightClass].maxWeight

      if (isResultValid) {
        const totalArmor = Number(getTotalArmor(testBuild))
        const totalWeight = Number(getTotalWeight(testBuild))

        newArmorSuggestions.push({
          helm: testBuild.items.helm,
          torso: testBuild.items.torso,
          gloves: testBuild.items.gloves,
          legs: testBuild.items.legs,
          totalArmor,
          totalWeight,
        })
      }
    } else {
      const slotItems = remnantItems.filter(
        (item) => item.category === emptyArmorSlots[slotIndex],
      ) as ArmorItem[]

      for (let i = 0; i < slotItems.length; i++) {
        const item = slotItems[i]
        generateCombinations(slotIndex + 1, [...selectedItems, item])
      }
    }
  }

  // Start the recursive loop
  generateCombinations(0, [])

  // sort the armor suggestions by total armor, with the highest armor first
  // then limit to the top 5
  newArmorSuggestions.sort((a, b) => b.totalArmor - a.totalArmor)

  if (newArmorSuggestions.length > 5)
    newArmorSuggestions.splice(5, newArmorSuggestions.length - 5)

  return newArmorSuggestions
}
