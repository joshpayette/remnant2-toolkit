import { Archtype, ReleaseKey } from '../items/types'

export interface CommunityBuildFilterProps {
  archtypes: Archtype[]
  longGun: string
  handGun: string
  melee: string
  selectedReleases: ReleaseKey[]
}
