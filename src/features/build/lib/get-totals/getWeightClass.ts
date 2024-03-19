import { BuildState } from '@/features/build/types'
import { WEIGHT_CLASSES } from '@/features/items/constants'
import { WeightClass } from '@/features/items/types'

import { getTotalWeight } from './getTotalWeight'
import { getWeightThreshold } from './getWeightThreshold'

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

  return weightClass
}
