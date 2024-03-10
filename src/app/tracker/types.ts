import { ItemCategory } from '@/features/build/types'

export interface LocalStorage {
  discoveredItemIds: string[]
  collapsedCategories: Array<ItemCategory>
}

export type ItemTrackerCategory =
  | Omit<ItemCategory, 'weapon' | 'mutator'>
  | 'Long Gun'
  | 'Hand Gun'
  | 'Melee'
  | 'Mutator (Gun)'
  | 'Mutator (Melee)'
