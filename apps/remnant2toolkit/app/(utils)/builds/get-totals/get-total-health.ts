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

  const baseHealthAmount = 100

  let totalHealth =
    (baseHealthAmount + totalHealthIncrease + totalHealthStep) *
    (1 + totalHealthPercent + totalHealthStepPercent)

  let cappedTotalHealth = totalHealth
  for (const item of equippedHealthCapItems) {
    cappedTotalHealth = cappedTotalHealth * (1 - (item.healthCap ?? 0))
  }

  const totalHealthCapReduction = equippedHealthCapItems.reduce(
    (acc, item) => acc + (item.healthCap ?? 0),
    0,
  )

  return {
    totalHealth: cappedTotalHealth.toFixed(2),
    breakdown: {
      equippedHealthIncreaseItems,
      equippedHealthPercentItems,
      equippedHealthStepItems,
      equippedHealthStepPercentItems,
      equippedHealthCapItems,
      totalHealthCapReduction,
      totalHealthIncrease,
      totalHealthPercent,
      totalHealthStep,
      totalHealthStepPercent,
    },
  }
}
