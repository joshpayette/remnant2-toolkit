import { Archetype, ReleaseKey } from '../items/types'

export interface CommunityBuildFilterProps {
  archetypes: Archetype[]
  longGun: string
  handGun: string
  melee: string
  selectedReleases: ReleaseKey[]
}
