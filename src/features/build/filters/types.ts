import { Archetype, ReleaseKey } from '@/features/items/types'

import { BuildTagFilterItem } from './parts/BuildTagFilters'

export interface BuildListFilterFields {
  amulet: string
  archetypes: Archetype[]
  buildTags: BuildTagFilterItem[]
  handGun: string
  longGun: string
  melee: string
  ring1: string
  ring2: string
  ring3: string
  ring4: string
  searchText: string
  selectedReleases: ReleaseKey[]
  includePatchAffectedBuilds: boolean
  limitToBuildsWithVideo: boolean
  limitToBuildsWithReferenceLink: boolean
}

export type TimeRange = 'day' | 'week' | 'month' | 'all-time'
export type OrderBy = 'alphabetical' | 'most favorited' | 'newest'
