import { WEIGHT_CLASSES } from '../items/constants'
import { ArmorItem } from '../items/types/ArmorItem'

export type ArmorSuggestion = {
  helm: ArmorItem
  torso: ArmorItem
  gloves: ArmorItem
  legs: ArmorItem
  totalArmor: number
  totalWeight: number
}

export type WeightClassWithDefault = keyof typeof WEIGHT_CLASSES | 'CHOOSE'
