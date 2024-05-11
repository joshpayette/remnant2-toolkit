import { DefaultFilter } from '@/app/(components)/filters/types'

export interface BuildListFilters {
  amulet: string | DefaultFilter
  archetypes: string[] | [DefaultFilter]
  buildTags: string[] | [DefaultFilter]
  handGun: string | DefaultFilter
  longGun: string | DefaultFilter
  melee: string | DefaultFilter
  rings: string[] | [DefaultFilter]
  releases: string[] | [DefaultFilter]
  searchText: string
  patchAffected: boolean
  withMinDescription: boolean
  withVideo: boolean
  withReference: boolean
}

/** The keys used in the URL for the filters */
export const BUILD_FILTER_KEYS = {
  AMULET: 'amulet',
  ARCHETYPES: 'archetypes',
  BUILDTAGS: 'buildTags',
  LONGGUN: 'longGun',
  HANDGUN: 'handGun',
  MELEE: 'melee',
  PATCHAFFECTED: 'patchAffected',
  RELEASES: 'releases',
  RINGS: 'rings',
  SEARCHTEXT: 'searchText',
  WITHMINDESCRIPTION: 'withMinDescription',
  WITHVIDEO: 'withVideo',
  WITHREFERENCE: 'withReference',
} as const satisfies Record<string, keyof BuildListFilters>

export const MAX_RINGS = 4
