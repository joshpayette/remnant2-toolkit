import { Item } from '@/app/(data)/items/types'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { BuildState } from '@/app/(types)/builds'

import { getItemsByKey, getTraitItemsByKey } from './utils'

export function getTotalHealth(buildState: BuildState): {
  totalHealth: string
  breakdown: {
    equippedHealthIncreaseItems: Item[]
    equippedHealthPercentItems: Item[]
    equippedHealthStepItems: TraitItem[]
    equippedHealthStepPercentItems: TraitItem[]
    equippedHealthCapItems: Item[]
    totalHealthCapReduction: number
    totalHealthIncrease: number
    totalHealthPercent: number
    totalHealthStep: number
    totalHealthStepPercent: number
  }
} {
  const equippedHealthIncreaseItems = getItemsByKey(buildState, 'health')
  const equippedHealthPercentItems = getItemsByKey(buildState, 'healthPercent')
  const equippedHealthStepItems = getTraitItemsByKey(buildState, 'healthStep')
  const equippedHealthStepPercentItems = getTraitItemsByKey(
    buildState,
    'healthStepPercent',
  )
  const equippedHealthCapItems = getItemsByKey(buildState, 'healthCap')

  const totalHealthIncrease = equippedHealthIncreaseItems.reduce(
    (acc, item) => acc + (item?.health ?? 0),
    0,
  )

  const totalHealthPercent = equippedHealthPercentItems.reduce(
    (acc, item) => acc + (item?.healthPercent ?? 0),
    0,
  )

  const totalHealthStep = equippedHealthStepItems.reduce(
    (acc, item) => acc + (item.healthStep ?? 0) * (item.amount ?? 0),
    0,
  )

  const totalHealthStepPercent = equippedHealthStepPercentItems.reduce(
    (acc, item) => acc + (item.healthStepPercent ?? 0) * (item.amount ?? 0),
    0,
  )

  // Find the item with the lowest health cap, i.e. the lowest max health
  // player can have
  const itemWithLowestHealthCap = equippedHealthCapItems.reduce<Item | null>(
    (prev, current) => {
      if (prev === null || prev.healthCap === undefined) {
        return current
      } else if (current === null || current.healthCap === undefined) {
        return prev
      } else {
        return prev.healthCap < current.healthCap ? prev : current
      }
    },
    null,
  )

  // Calculate the health cap reduction, i.e. the amount of health that is
  // not included in the total health calculation
  // This is 1 - the lowest health cap, because the health cap is a percentage
  // of the player's max health
  // So if the lowest health cap is 0.9, then the player's max health is 10% less
  const healthCapReduction = 1 - (itemWithLowestHealthCap?.healthCap ?? 0)

  const baseHealthAmount = 100

  const totalHealth =
    (baseHealthAmount + totalHealthIncrease + totalHealthStep) *
    (1 + totalHealthPercent + totalHealthStepPercent) *
    healthCapReduction

  return {
    totalHealth: totalHealth.toFixed(2),
    breakdown: {
      equippedHealthIncreaseItems,
      equippedHealthPercentItems,
      equippedHealthStepItems,
      equippedHealthStepPercentItems,
      equippedHealthCapItems,
      totalHealthCapReduction: healthCapReduction,
      totalHealthIncrease,
      totalHealthPercent,
      totalHealthStep,
      totalHealthStepPercent,
    },
  }
}
