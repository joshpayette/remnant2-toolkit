import { ItemCategory } from '../build/types'
import { BossCategory } from '../enemies/types'
import { Archetype, ReleaseKey } from '../items/types'

export interface BuildListFilterFields {
  amulet: string
  archetypes: Archetype[]
  handGun: string
  longGun: string
  melee: string
  ring: string
  searchText: string
  selectedReleases: ReleaseKey[]
}

export type ItemLookupCategory =
  | Omit<ItemCategory, 'weapon' | 'mutator'>
  | 'Long Gun'
  | 'Hand Gun'
  | 'Melee'
  | 'Mutator (Gun)'
  | 'Mutator (Melee)'

export interface ItemLookupFilterFields {
  collectionKeys: string[]
  itemCategories: ItemLookupCategory[]
  searchText: string
  selectedReleases: ReleaseKey[]
}

export interface BossTrackerFilterFields {
  searchText: string
  selectedBossCategories: BossCategory[]
}

export type TimeRange = 'day' | 'week' | 'month' | 'all-time'
export type OrderBy = 'alphabetical' | 'most favorited' | 'newest'
