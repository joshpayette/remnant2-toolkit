import { BuildState } from '@/app/(types)/builds'

import { getItemsByKey, getTraitItemsByKey } from './utils'

export function getTotalArmor(buildState: BuildState) {
  // all equipped items that increase armor
  const equippedArmorIncreaseItems = getItemsByKey(buildState, 'armor')
  // all equipped items that increase armor by a percentage
  const equippedArmorPercentItems = getItemsByKey(buildState, 'armorPercent')
  // all equipped items that increase the armor by a value per point
  const equippedArmorStepItems = getTraitItemsByKey(buildState, 'armorStep')
  // all equipped itesm that increase the armor by a percentage point
  const equippedArmorStepPercentItems = getTraitItemsByKey(
    buildState,
    'armorStepPercent',
  )

  const totalArmorIncrease = equippedArmorIncreaseItems.reduce(
    (acc, item) => acc + (item.armor ?? 0),
    0,
  )
  const totalArmorPercent = equippedArmorPercentItems.reduce(
    (acc, item) => acc + (item.armorPercent ?? 0),
    0,
  )
  const totalArmorStep = equippedArmorStepItems.reduce(
    (acc, item) => acc + (item.armorStep ?? 0) * (item.amount ?? 0),
    0,
  )

  const totalArmorStepPercent = equippedArmorStepPercentItems.reduce(
    (acc, item) => acc + (item.armorStepPercent ?? 0) * (item.amount ?? 0),
    0,
  )

  const totalArmor =
    totalArmorIncrease * (1 + totalArmorPercent + totalArmorStepPercent) +
    totalArmorStep

  return totalArmor.toFixed(2)
}
