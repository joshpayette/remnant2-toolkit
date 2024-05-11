import isEqual from 'lodash.isequal'
import { ReadonlyURLSearchParams } from 'next/navigation'

import { VALID_ARCHETYPES } from '@/app/(components)/filters/builds/archetype-filter'
import { DEFAULT_BUILD_FILTERS } from '@/app/(components)/filters/builds/build-filters'
import { VALID_BUILD_TAGS } from '@/app/(components)/filters/builds/build-tag-filter'
import {
  BUILD_FILTER_KEYS,
  BuildListFilters,
  MAX_RINGS,
} from '@/app/(components)/filters/builds/types'
import { VALID_RELEASE_KEYS } from '@/app/(components)/filters/releases-filter'
import { amuletItems } from '@/app/(data)/items/amulet-items'
import { ringItems } from '@/app/(data)/items/ring-items'
import { weaponItems } from '@/app/(data)/items/weapon-items'

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
  defaultFilters: BuildListFilters = DEFAULT_BUILD_FILTERS,
): BuildListFilters {
  const parsedParams = new URLSearchParams(searchParams)

  // Validate the provided amulet
  let amulet =
    parsedParams.get(BUILD_FILTER_KEYS.AMULET) || defaultFilters.amulet
  const amuletIsValid =
    amulet === defaultFilters.amulet ||
    amuletItems.some((item) => item.name === amulet)
  if (!amuletIsValid) {
    amulet = defaultFilters.amulet
  }

  // Validate the provided build tags
  let buildTags =
    parsedParams.get(BUILD_FILTER_KEYS.BUILDTAGS)?.split(',') ||
    defaultFilters.buildTags
  if (!isEqual(buildTags, defaultFilters.buildTags)) {
    buildTags = buildTags.filter((tag) =>
      VALID_BUILD_TAGS.some((item) => item === tag),
    )
    // If no build tags, set to default
    if (buildTags.length === 0) {
      buildTags = defaultFilters.buildTags
    }
  }

  // Validate the provided archetype
  let archetypes =
    parsedParams.get(BUILD_FILTER_KEYS.ARCHETYPES)?.split(',') ||
    defaultFilters.archetypes
  if (!isEqual(archetypes, defaultFilters.archetypes)) {
    archetypes = archetypes.filter((archetype) =>
      VALID_ARCHETYPES.some((item) => item === archetype),
    )
    // If no archetypes, set to default
    if (archetypes.length === 0) {
      archetypes = defaultFilters.archetypes
    }
  }

  // Validate the provided long gun
  let longGun =
    parsedParams.get(BUILD_FILTER_KEYS.LONGGUN) || defaultFilters.longGun
  const longGunIsValid =
    longGun === defaultFilters.longGun ||
    weaponItems.some(
      (item) => item.name === longGun && item.type === 'long gun',
    )
  if (!longGunIsValid) {
    longGun = defaultFilters.longGun
  }

  // validate the provided hand gun
  let handGun =
    parsedParams.get(BUILD_FILTER_KEYS.HANDGUN) || defaultFilters.handGun
  const handGunIsValid =
    handGun === defaultFilters.handGun ||
    weaponItems.some(
      (item) => item.name === handGun && item.type === 'hand gun',
    )
  if (!handGunIsValid) {
    handGun = defaultFilters.handGun
  }

  // validate the provided melee weapon
  let melee = parsedParams.get(BUILD_FILTER_KEYS.MELEE) || defaultFilters.melee
  const meleeIsValid =
    melee === defaultFilters.melee ||
    weaponItems.some((item) => item.name === melee && item.type === 'melee')
  if (!meleeIsValid) {
    melee = defaultFilters.melee
  }

  // validate the provided releases
  let releases =
    parsedParams.get(BUILD_FILTER_KEYS.RELEASES)?.split(',') ||
    defaultFilters.releases
  if (!isEqual(releases, defaultFilters.releases)) {
    releases = releases.filter((release) =>
      VALID_RELEASE_KEYS.includes(release),
    )
    // If no releases, set to default
    if (releases.length === 0) {
      releases = defaultFilters.releases
    }
  }

  // Validate the provided rings
  let rings =
    parsedParams.get(BUILD_FILTER_KEYS.RINGS)?.split(',') ||
    defaultFilters.rings
  if (!isEqual(rings, defaultFilters.rings)) {
    // Ensure that the rings provided do not exceed the max allowed
    rings = rings.slice(0, MAX_RINGS)
    rings = rings.filter((ring) => ringItems.some((item) => item.name === ring))
    // If no rings, set to default
    if (rings.length === 0) {
      rings = defaultFilters.rings
    }
  }

  // Validate the provided search text
  let searchText =
    parsedParams.get(BUILD_FILTER_KEYS.SEARCHTEXT) || defaultFilters.searchText

  // Validate the patchAffected filter
  let patchAffected =
    parsedParams.get(BUILD_FILTER_KEYS.PATCHAFFECTED) ||
    defaultFilters.patchAffected
  if (typeof patchAffected === 'string') {
    patchAffected = patchAffected === 'true'
  }

  // Validate the withVideo filter
  let withVideo = parsedParams.get(BUILD_FILTER_KEYS.WITHVIDEO) === 'true'
  if (typeof withVideo === 'string') {
    withVideo = withVideo === 'true'
  }

  // Validate the withReference filter
  let withReference =
    parsedParams.get(BUILD_FILTER_KEYS.WITHREFERENCE) === 'true'
  if (typeof withReference === 'string') {
    withReference = withReference === 'true'
  }

  // Validate the withMinDescription filter
  let withMinDescription =
    parsedParams.get(BUILD_FILTER_KEYS.WITHMINDESCRIPTION) === 'true'
  if (typeof withMinDescription === 'string') {
    withMinDescription = withMinDescription === 'true'
  }

  return {
    amulet,
    archetypes,
    buildTags,
    longGun,
    handGun,
    melee,
    releases,
    rings,
    searchText,
    patchAffected,
    withVideo,
    withReference,
    withMinDescription,
  }
}
