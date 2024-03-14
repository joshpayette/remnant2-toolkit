import {
  getTotalArmor,
  getTotalWeight,
  getWeightClass,
} from '@/features/build/lib/getTotalValues'
import { BuildState } from '@/features/build/types'
import { WEIGHT_CLASSES } from '@/features/items/constants'
import { remnantItems } from '@/features/items/data/remnantItems'
import { ArmorItem } from '@/features/items/types/ArmorItem'

import { ArmorSuggestion } from './types'

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

  const maxWeight = WEIGHT_CLASSES[desiredWeightClass].maxWeight

  let armorItems: ArmorItem[] = []
  emptyArmorSlots.forEach((slot) => {
    const slotItems = remnantItems.filter(
      (item) => item.category === slot,
    ) as ArmorItem[]
    armorItems = [...armorItems, ...slotItems]
  })

  armorItems = armorItems.filter((item) => {
    const testBuild = JSON.parse(JSON.stringify(buildState))
    testBuild.items[item.category] = item
    const weightClass = getWeightClass(testBuild)
    return weightClass.maxWeight <= maxWeight
  })

  const itemsByCategory: Record<string, ArmorItem[]> = {}
  remnantItems
    .filter((item) => ArmorItem.isArmorItem(item))
    .forEach((item) => {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = []
      }
      itemsByCategory[item.category].push(item as ArmorItem)
    })

  // Process the list of selected items (this is one possible combination)
  const testBuild = JSON.parse(JSON.stringify(buildState))

  // --------------------------------------
  // Need to loop through each empty armor slot.
  // For each empty slot, we need to loop through each armor item and test it
  // against each item of every other empty slot
  // --------------------------------------
  const newArmorSuggestions: ArmorSuggestion[] = []

  // This function will recursively loop through each empty slot and generate a list of
  // possible combinations of armor items
  function generateCombinations(
    slotIndex: number,
    selectedItems: ArmorItem[],
    currentWeight: number,
  ) {
    if (
      desiredWeightClass !== 'ULTRA' &&
      currentWeight > WEIGHT_CLASSES[desiredWeightClass].maxWeight
    ) {
      // If the current combination of items already exceeds the maximum weight, return early
      // unless the desired weight class is "ultra"
      return
    }

    if (slotIndex === emptyArmorSlots.length) {
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
      const slotItems = itemsByCategory[
        emptyArmorSlots[slotIndex]
      ] as ArmorItem[]

      for (let i = 0; i < slotItems.length; i++) {
        const item = slotItems[i]
        generateCombinations(
          slotIndex + 1,
          [...selectedItems, item],
          currentWeight + (item.weight ?? 0),
        )
      }
    }
  }

  // Start the recursive loop
  generateCombinations(0, [], 0)

  // sort the armor suggestions by total armor, with the highest armor first
  // then limit to the top 5
  newArmorSuggestions.sort((a, b) => b.totalArmor - a.totalArmor)

  if (newArmorSuggestions.length > 5)
    newArmorSuggestions.splice(5, newArmorSuggestions.length - 5)

  return newArmorSuggestions
}
