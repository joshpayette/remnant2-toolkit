import { BuildState } from '@/app/(types)/builds'

import { getItemsByKey, getTraitItemsByKey } from './utils'

export function getTotalResistances(
  buildState: BuildState,
  resistance: 'fire' | 'blight' | 'shock' | 'bleed' | 'toxin',
) {
  const itemsWithResistance = getItemsByKey(
    buildState,
    `${resistance}Resistance`,
  )
  const itemsWithResistancePercent = getItemsByKey(
    buildState,
    `${resistance}ResistancePercent`,
  )
  const itemsWithElementalResistanceStep = getTraitItemsByKey(
    buildState,
    `elementalResistanceStep`,
  )

  const totalItemResistance = itemsWithResistance.reduce(
    (acc, item) => acc + (item?.[`${resistance}Resistance`] ?? 0),
    0,
  )
  const totalItemResistancePercent = itemsWithResistancePercent.reduce(
    (acc, item) => acc + (item?.[`${resistance}ResistancePercent`] ?? 0),
    0,
  )

  // Elemental Resistance only applies to the elemental resistances,
  // so fire and blight are excluded
  let totalElementalResistance = 0
  if (resistance !== 'bleed' && resistance !== 'blight') {
    totalElementalResistance = itemsWithElementalResistanceStep.reduce(
      (acc, item) =>
        acc + (item.elementalResistanceStep ?? 0) * (item.amount ?? 0),
      0,
    )
  }

  const totalResistanceIncrease =
    totalItemResistance * totalItemResistancePercent

  const totalResistance =
    totalItemResistance + totalResistanceIncrease + totalElementalResistance

  return totalResistance
}
