import { ReadonlyURLSearchParams } from 'next/navigation'

import {
  BUILD_FILTER_KEYS,
  BuildListFilters,
  MAX_RINGS,
} from '@/app/(components)/filters/builds/types'
import { DEFAULT_FILTER, DefaultFilter } from '@/app/(components)/filters/types'
import { amuletItems } from '@/app/(data)/items/amulet-items'
import { archetypeItems } from '@/app/(data)/items/archetype-items'
import { ringItems } from '@/app/(data)/items/ring-items'
import { weaponItems } from '@/app/(data)/items/weapon-items'
import { ALL_RELEASE_KEYS } from '@/app/(data)/releases/constants'

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
): BuildListFilters {
  const parsedParams = new URLSearchParams(searchParams)

  // Validate the provided amulet
  let amulet = parsedParams.get(BUILD_FILTER_KEYS.AMULET) || DEFAULT_FILTER
  const amuletIsValid =
    amulet === DEFAULT_FILTER ||
    amuletItems.some((item) => item.name === amulet)
  if (!amuletIsValid) {
    amulet = DEFAULT_FILTER
  }

  // Validate the provided build tags
  let buildTags =
    parsedParams.get(BUILD_FILTER_KEYS.BUILDTAGS)?.split(',') || DEFAULT_FILTER
  // If build tags is the default, convert it to an array
  // Else ensure that the build tags provided are valid
  if (buildTags === DEFAULT_FILTER) {
    buildTags = [DEFAULT_FILTER]
  } else {
    buildTags = (buildTags as string[]).filter((tag) => tag.length > 0)
    // If no build tags, set to default
    if (buildTags.length === 0) {
      buildTags = [DEFAULT_FILTER]
    }
  }

  // Validate the provided archetype
  let archetypes =
    parsedParams.get(BUILD_FILTER_KEYS.ARCHETYPES)?.split(',') || DEFAULT_FILTER
  // If archetypes is the default, convert it to an array
  // Else ensure that the archetypes provided are valid
  if (archetypes === DEFAULT_FILTER) {
    archetypes = [DEFAULT_FILTER]
  } else {
    archetypes = (archetypes as string[]).filter((archetype) =>
      archetypeItems.some((item) => item.name === archetype),
    )
    // If no archetypes, set to default
    if (archetypes.length === 0) {
      archetypes = [DEFAULT_FILTER]
    }
  }

  // Validate the provided long gun
  let longGun = parsedParams.get(BUILD_FILTER_KEYS.LONGGUN) || DEFAULT_FILTER
  const longGunIsValid =
    longGun === DEFAULT_FILTER ||
    weaponItems.some(
      (item) => item.name === longGun && item.type === 'long gun',
    )
  if (!longGunIsValid) {
    longGun = DEFAULT_FILTER
  }

  // validate the provided hand gun
  let handGun = parsedParams.get(BUILD_FILTER_KEYS.HANDGUN) || DEFAULT_FILTER
  const handGunIsValid =
    handGun === DEFAULT_FILTER ||
    weaponItems.some(
      (item) => item.name === handGun && item.type === 'hand gun',
    )
  if (!handGunIsValid) {
    handGun = DEFAULT_FILTER
  }

  // validate the provided melee weapon
  let melee = parsedParams.get(BUILD_FILTER_KEYS.MELEE) || DEFAULT_FILTER
  const meleeIsValid =
    melee === DEFAULT_FILTER ||
    weaponItems.some((item) => item.name === melee && item.type === 'melee')
  if (!meleeIsValid) {
    melee = DEFAULT_FILTER
  }

  // Validate the provided releases
  let releases =
    parsedParams.get(BUILD_FILTER_KEYS.RELEASES)?.split(',') ||
    (DEFAULT_FILTER as string[] | DefaultFilter)
  // If releases is the default, convert it to an array
  // Else ensure that the releases provided are valid
  if (releases === DEFAULT_FILTER) {
    releases = [DEFAULT_FILTER]
  } else {
    releases = releases.filter((release) => ALL_RELEASE_KEYS.includes(release))
    // If no releases, set to default
    if (releases.length === 0) {
      releases = [DEFAULT_FILTER]
    }
  }

  // Validate the provided rings
  let rings =
    parsedParams.get(BUILD_FILTER_KEYS.RINGS)?.split(',') ||
    (DEFAULT_FILTER as string[] | DefaultFilter)
  // If rings is the default, convert it to an array
  // Else ensure that the rings provided are valid
  if (rings === DEFAULT_FILTER) {
    rings = [DEFAULT_FILTER]
  } else {
    // Ensure that the rings provided do not exceed the max allowed
    rings = rings.slice(0, MAX_RINGS)
    rings = rings.filter((ring) => ringItems.some((item) => item.name === ring))
    // If no rings, set to default
    if (rings.length === 0) {
      rings = [DEFAULT_FILTER]
    }
  }

  // Validate the provided search text
  let searchText = parsedParams.get(BUILD_FILTER_KEYS.SEARCHTEXT) || ''

  // Validate the patchAffected filter
  const patchAffected =
    parsedParams.has(BUILD_FILTER_KEYS.PATCHAFFECTED) || false

  // Validate the withVideo filter
  const withVideo = parsedParams.has(BUILD_FILTER_KEYS.WITHVIDEO) || false

  // Validate the withReference filter
  const withReference =
    parsedParams.has(BUILD_FILTER_KEYS.WITHREFERENCE) || false

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
  }
}
