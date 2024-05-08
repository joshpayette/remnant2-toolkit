import { ItemCategory } from '@/app/(types)/builds'

export interface ItemTrackerLocalStorage {
  discoveredItemIds: string[]
  collapsedCategories: Array<ItemTrackerCategory>
}

export type ItemTrackerCategory =
  | Omit<ItemCategory, 'weapon' | 'mutator'>
  | 'Long Gun'
  | 'Hand Gun'
  | 'Melee'
  | 'Mutator (Gun)'
  | 'Mutator (Melee)'
