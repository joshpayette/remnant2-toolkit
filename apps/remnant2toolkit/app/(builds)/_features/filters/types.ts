import { type DefaultFilter } from '@/app/_types/default-filter';
import { type PercentageOwned } from '@/app/(builds)/_components/filters/build-collection-filter';

export interface BuildListFilters {
  amulet: string | DefaultFilter;
  archetypes: string[] | [DefaultFilter];
  buildTags: string[] | [DefaultFilter];
  handGun: string | DefaultFilter;
  longGun: string | DefaultFilter;
  melee: string | DefaultFilter;
  relic: string | DefaultFilter;
  rings: string[] | [DefaultFilter];
  releases: string[] | [DefaultFilter];
  searchText: string;
  patchAffected: boolean;
  withQuality: boolean;
  withVideo: boolean;
  withReference: boolean;
  withCollection: PercentageOwned;
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
  RELIC: 'relic',
  RINGS: 'rings',
  SEARCHTEXT: 'searchText',
  WITHCOLLECTION: 'withCollection',
  WITHQUALITY: 'withQuality',
  WITHVIDEO: 'withVideo',
  WITHREFERENCE: 'withReference',
} as const satisfies Record<string, keyof BuildListFilters>;

export const MAX_RINGS = 4;
