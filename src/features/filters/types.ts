import { Archetype, ReleaseKey } from '../items/types'

export interface CommunityBuildFilterProps {
  amulet: string
  archetypes: Archetype[]
  handGun: string
  longGun: string
  melee: string
  ring: string
  searchText: string
  selectedReleases: ReleaseKey[]
}

export type TimeRange = 'day' | 'week' | 'month' | 'all-time'
export type OrderBy = 'alphabetical' | 'most favorited' | 'newest'
