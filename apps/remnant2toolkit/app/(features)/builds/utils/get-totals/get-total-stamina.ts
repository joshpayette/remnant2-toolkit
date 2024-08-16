import { Item } from '@/app/(data)/items/types'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { BuildState } from '@/app/(types)/builds'

import { getItemsByKey, getTraitItemsByKey } from './utils'

export function getTotalStamina(buildState: BuildState): {
  totalStamina: string
  breakdown: {
    equippedStaminaIncreaseItems: Item[]
    equippedStaminaPercentItems: Item[]
    equippedStaminaStepItems: TraitItem[]
    equippedStaminaStepPercentItems: TraitItem[]
    totalStaminaIncrease: number
    totalStaminaPercent: number
    totalStaminaStep: number
    totalStaminaStepPercent: number
  }
} {
  const equippedStaminaIncreaseItems = getItemsByKey(buildState, 'stamina')
  const equippedStaminaPercentItems = getItemsByKey(
    buildState,
    'staminaPercent',
  )
  const equippedStaminaStepItems = getTraitItemsByKey(buildState, 'staminaStep')
  const equippedStaminaStepPercentItems = getTraitItemsByKey(
    buildState,
    'staminaStepPercent',
  )

  const totalStaminaIncrease = equippedStaminaIncreaseItems.reduce(
    (acc, item) => acc + (item?.stamina ?? 0),
    0,
  )

  const totalStaminaPercent = equippedStaminaPercentItems.reduce(
    (acc, item) => acc + (item?.staminaPercent ?? 0),
    0,
  )

  const totalStaminaStep = equippedStaminaStepItems.reduce(
    (acc, item) => acc + (item.staminaStep ?? 0) * (item.amount ?? 0),
    0,
  )

  const totalStaminaStepPercent = equippedStaminaStepPercentItems.reduce(
    (acc, item) => acc + (item.staminaStepPercent ?? 0) * (item.amount ?? 0),
    0,
  )

  const baseStaminaAmount = 100

  const totalStamina =
    (baseStaminaAmount + totalStaminaIncrease + totalStaminaStep) *
    (1 + totalStaminaPercent + totalStaminaStepPercent)

  return {
    totalStamina: totalStamina.toFixed(2),
    breakdown: {
      equippedStaminaIncreaseItems,
      equippedStaminaPercentItems,
      equippedStaminaStepItems,
      equippedStaminaStepPercentItems,
      totalStaminaIncrease,
      totalStaminaPercent,
      totalStaminaStep,
      totalStaminaStepPercent,
    },
  }
}
