import { WEIGHT_CLASSES } from '@/app/(data)/items/constants'
import { WeightClass } from '@/app/(data)/items/types'
import { BuildState } from '@/app/(types)/builds'

import { getTotalWeight } from './get-total-weight'
import { getWeightThreshold } from './get-weight-threshold'

type WeightClassResponse = WeightClass & { label: keyof typeof WEIGHT_CLASSES }

export function getWeightClass(buildState: BuildState): WeightClassResponse {
  const combinedWeightThreshold = Number(getWeightThreshold(buildState))

  let totalWeight = Number(getTotalWeight(buildState))

  let weightClass: WeightClassResponse = {
    ...WEIGHT_CLASSES.LIGHT,
    label: 'LIGHT',
  }
  if (totalWeight > WEIGHT_CLASSES.LIGHT.maxWeight + combinedWeightThreshold) {
    weightClass = {
      ...WEIGHT_CLASSES.MEDIUM,
      label: 'MEDIUM',
    }
  }
  if (totalWeight > WEIGHT_CLASSES.MEDIUM.maxWeight + combinedWeightThreshold) {
    weightClass = {
      ...WEIGHT_CLASSES.HEAVY,
      label: 'HEAVY',
    }
  }
  if (totalWeight > WEIGHT_CLASSES.HEAVY.maxWeight + combinedWeightThreshold) {
    weightClass = {
      ...WEIGHT_CLASSES.ULTRA,
      label: 'ULTRA',
    }
  }

  // Dull Steel Ring lowers by one weight class
  // Typically, the -25 weight it provides is enough to lower the build by one weight class
  // For Ultra though, it's not enough to lower it to Heavy
  // So we need to check if the build is Ultra and has the Dull Steel Ring
  // If so, we lower it to Heavy
  const buildHasDullSteelRing = buildState.items.ring.some(
    (ring) => ring?.id === 's76ytc',
  )

  if (weightClass.label === 'ULTRA' && buildHasDullSteelRing) {
    weightClass = {
      ...WEIGHT_CLASSES.HEAVY,
      label: 'HEAVY',
    }
  }

  return weightClass
}
