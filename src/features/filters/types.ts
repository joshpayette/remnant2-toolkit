import { Archetype, ReleaseKey } from '../items/types'

export interface CommunityBuildFilterProps {
  archetypes: Archetype[]
  longGun: string
  handGun: string
  melee: string
  ring: string
  amulet: string
  selectedReleases: ReleaseKey[]
}

export type TimeRange = 'day' | 'week' | 'month' | 'all-time'
export type OrderBy = 'alphabetical' | 'most favorited' | 'newest'
