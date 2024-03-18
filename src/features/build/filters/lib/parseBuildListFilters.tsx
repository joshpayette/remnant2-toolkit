import { BUILD_TAG } from '@prisma/client'
import { ReadonlyURLSearchParams } from 'next/navigation'

import { ALL_TAGS } from '@/features/build/build-tags/constants'
import { RELEASE_TO_NAME } from '@/features/items/constants'
import { amuletItems } from '@/features/items/data/amuletItems'
import { archetypeItems } from '@/features/items/data/archetypeItems'
import { ringItems } from '@/features/items/data/ringItems'
import { weaponItems } from '@/features/items/data/weaponItems'
import { Archetype, ReleaseKey } from '@/features/items/types'

import { DEFAULT_BUILD_LIST_FILTERS } from '../BuildListFilters'
import { BuildListFilterFields } from '../types'

export function parseBuildListFilters(
  searchParams: ReadonlyURLSearchParams,
): BuildListFilterFields {
  const params = new URLSearchParams(searchParams)
  let archetypes = params.get('archetypes')
  let buildTags = params.get('buildTags')
  let longGun = params.get('longGun')
  let handGun = params.get('handGun')
  let melee = params.get('melee')
  let ring1 = params.get('ring1')
  let ring2 = params.get('ring2')
  let ring3 = params.get('ring3')
  let ring4 = params.get('ring4')
  let amulet = params.get('amulet')
  let searchText = params.get('searchText')
  let releases = params.get('releases')
  let includePatchAffectedBuilds = params.get('includePatchAffectedBuilds')

  // check if archetypes are valid
  if (archetypes) {
    const allArchetypes = archetypeItems.map((item) => item.name.toLowerCase())

    const archetypesArray = archetypes.split(',')

    archetypesArray.forEach((archetype) => {
      if (!allArchetypes.includes(archetype as Archetype)) {
        archetypes = DEFAULT_BUILD_LIST_FILTERS['archetypes'].join(',')
      }
    })
  }
  // check if buildtags are valid
  if (buildTags) {
    const allTagValues = ALL_TAGS.map((tag) => tag.value)
    const buildTagsArray = buildTags.split(',')
    buildTagsArray.forEach((tag) => {
      if (!allTagValues.includes(tag as BUILD_TAG)) {
        buildTags = DEFAULT_BUILD_LIST_FILTERS['buildTags'].join(',')
      }
    })
  }
  // check if longGun is valid
  if (longGun) {
    const allLongGuns: string[] = weaponItems
      .filter((item) => item.type === 'long gun')
      .map((item) => item.name.toLowerCase())
    if (!allLongGuns.includes(longGun.toLowerCase())) {
      longGun = DEFAULT_BUILD_LIST_FILTERS['longGun']
    }
  }
  // check if handGun is valid
  if (handGun) {
    const allHandGuns: string[] = weaponItems
      .filter((item) => item.type === 'hand gun')
      .map((item) => item.name.toLowerCase())
    if (!allHandGuns.includes(handGun.toLowerCase())) {
      handGun = DEFAULT_BUILD_LIST_FILTERS['handGun']
    }
  }
  // check if melee is valid
  if (melee) {
    const allMelees: string[] = weaponItems
      .filter((item) => item.type === 'melee')
      .map((item) => item.name.toLowerCase())
    if (!allMelees.includes(melee.toLowerCase())) {
      melee = DEFAULT_BUILD_LIST_FILTERS['melee']
    }
  }
  // check if ring is valid
  if (ring1) {
    const allRings: string[] = ringItems.map((item) => item.name.toLowerCase())
    if (!allRings.includes(ring1.toLowerCase())) {
      ring1 = DEFAULT_BUILD_LIST_FILTERS['ring1']
    }
  }
  // check if ring is valid
  if (ring2) {
    const allRings: string[] = ringItems.map((item) => item.name.toLowerCase())
    if (!allRings.includes(ring2.toLowerCase())) {
      ring2 = DEFAULT_BUILD_LIST_FILTERS['ring2']
    }
  }
  // check if ring is valid
  if (ring3) {
    const allRings: string[] = ringItems.map((item) => item.name.toLowerCase())
    if (!allRings.includes(ring3.toLowerCase())) {
      ring3 = DEFAULT_BUILD_LIST_FILTERS['ring3']
    }
  }
  // check if ring is valid
  if (ring4) {
    const allRings: string[] = ringItems.map((item) => item.name.toLowerCase())
    if (!allRings.includes(ring4.toLowerCase())) {
      ring4 = DEFAULT_BUILD_LIST_FILTERS['ring4']
    }
  }

  // check if amulet is valid
  if (amulet) {
    const allAmulets: string[] = amuletItems.map((item) =>
      item.name.toLowerCase(),
    )
    if (!allAmulets.includes(amulet.toLowerCase())) {
      amulet = DEFAULT_BUILD_LIST_FILTERS['amulet']
    }
  }
  // check if releases are valid
  if (!releases) {
    releases = Object.keys(RELEASE_TO_NAME).join(',')
  } else {
    const allReleases: ReleaseKey[] = Object.keys(
      RELEASE_TO_NAME,
    ) as ReleaseKey[]
    const releasesArray = releases.split(',')
    releasesArray.forEach((release) => {
      if (!allReleases.includes(release as ReleaseKey)) {
        releases = DEFAULT_BUILD_LIST_FILTERS['selectedReleases'].join(',')
      }
    })
  }

  return {
    archetypes: archetypes
      ? (archetypes.split(',') as Archetype[])
      : DEFAULT_BUILD_LIST_FILTERS['archetypes'],
    buildTags: buildTags
      ? buildTags
          .split(',')
          .map((tag) => ({ label: tag, value: tag as BUILD_TAG }))
      : DEFAULT_BUILD_LIST_FILTERS['buildTags'],
    longGun: longGun || DEFAULT_BUILD_LIST_FILTERS['longGun'],
    handGun: handGun || DEFAULT_BUILD_LIST_FILTERS['handGun'],
    melee: melee || DEFAULT_BUILD_LIST_FILTERS['melee'],
    ring1: ring1 || DEFAULT_BUILD_LIST_FILTERS['ring1'],
    ring2: ring2 || DEFAULT_BUILD_LIST_FILTERS['ring2'],
    ring3: ring3 || DEFAULT_BUILD_LIST_FILTERS['ring3'],
    ring4: ring4 || DEFAULT_BUILD_LIST_FILTERS['ring4'],
    amulet: amulet || DEFAULT_BUILD_LIST_FILTERS['amulet'],
    searchText: searchText || DEFAULT_BUILD_LIST_FILTERS['searchText'],
    selectedReleases: releases
      ? (releases.split(',') as ReleaseKey[])
      : DEFAULT_BUILD_LIST_FILTERS['selectedReleases'],
    includePatchAffectedBuilds: Boolean(includePatchAffectedBuilds),
  } satisfies BuildListFilterFields
}
