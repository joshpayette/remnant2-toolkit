import isEqual from 'lodash.isequal';
import { type ReadonlyURLSearchParams } from 'next/navigation';

import { VALID_RELEASE_KEYS } from '@/app/_components/releases-filter';
import { VALID_ARCHETYPES } from '@/app/(builds)/_components/filters/archetype-filter';
import { DEFAULT_BUILD_FILTERS } from '@/app/(builds)/_components/filters/build-filters';
import { VALID_BUILD_TAGS } from '@/app/(builds)/_components/filters/build-tag-filter';
import {
  BUILD_FILTER_KEYS,
  type BuildListFilters,
  MAX_RINGS,
} from '@/app/(builds)/_components/filters/types';
import { amuletItems } from '@/app/(items)/_constants/amulet-items';
import { relicItems } from '@/app/(items)/_constants/relic-items';
import { ringItems } from '@/app/(items)/_constants/ring-items';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
  defaultFilters: BuildListFilters = DEFAULT_BUILD_FILTERS,
): BuildListFilters {
  const parsedParams = new URLSearchParams(searchParams);

  // Validate the provided amulet
  let amulet =
    parsedParams.get(BUILD_FILTER_KEYS.AMULET) || defaultFilters.amulet;
  const amuletIsValid =
    amulet === defaultFilters.amulet ||
    amuletItems.some((item) => item.name === amulet);
  if (!amuletIsValid) {
    amulet = defaultFilters.amulet;
  }

  // Validate the provided build tags
  let buildTags =
    parsedParams.get(BUILD_FILTER_KEYS.BUILDTAGS)?.split(',') ||
    defaultFilters.buildTags;
  if (!isEqual(buildTags, defaultFilters.buildTags)) {
    buildTags = buildTags.filter((tag) =>
      VALID_BUILD_TAGS.some((item) => item === tag),
    );
    // If no build tags, set to default
    if (buildTags.length === 0) {
      buildTags = defaultFilters.buildTags;
    }
  }

  // Validate the provided archetype
  let archetypes =
    parsedParams.get(BUILD_FILTER_KEYS.ARCHETYPES)?.split(',') ||
    defaultFilters.archetypes;
  if (!isEqual(archetypes, defaultFilters.archetypes)) {
    archetypes = archetypes.filter((archetype) =>
      VALID_ARCHETYPES.some((item) => item === archetype),
    );
    // If no archetypes, set to default
    if (archetypes.length === 0) {
      archetypes = defaultFilters.archetypes;
    }
  }

  // Validate the provided long gun
  let longGun =
    parsedParams.get(BUILD_FILTER_KEYS.LONGGUN) || defaultFilters.longGun;
  const longGunIsValid =
    longGun === defaultFilters.longGun ||
    weaponItems.some(
      (item) => item.name === longGun && item.type === 'long gun',
    );
  if (!longGunIsValid) {
    longGun = defaultFilters.longGun;
  }

  // validate the provided hand gun
  let handGun =
    parsedParams.get(BUILD_FILTER_KEYS.HANDGUN) || defaultFilters.handGun;
  const handGunIsValid =
    handGun === defaultFilters.handGun ||
    weaponItems.some(
      (item) => item.name === handGun && item.type === 'hand gun',
    );
  if (!handGunIsValid) {
    handGun = defaultFilters.handGun;
  }

  // validate the provided melee weapon
  let melee = parsedParams.get(BUILD_FILTER_KEYS.MELEE) || defaultFilters.melee;
  const meleeIsValid =
    melee === defaultFilters.melee ||
    weaponItems.some((item) => item.name === melee && item.type === 'melee');
  if (!meleeIsValid) {
    melee = defaultFilters.melee;
  }

  // validate the provided releases
  let releases =
    parsedParams.get(BUILD_FILTER_KEYS.RELEASES)?.split(',') ||
    defaultFilters.releases;
  if (!isEqual(releases, defaultFilters.releases)) {
    releases = releases.filter((release) =>
      VALID_RELEASE_KEYS.includes(release),
    );
    // If no releases, set to default
    if (releases.length === 0) {
      releases = defaultFilters.releases;
    }
  }

  // Validate the provided relic
  let relic = parsedParams.get(BUILD_FILTER_KEYS.RELIC) || defaultFilters.relic;
  const relicIsValid =
    relic === defaultFilters.relic ||
    relicItems.some((item) => item.name === relic);
  if (!relicIsValid) {
    relic = defaultFilters.relic;
  }

  // Validate the provided rings
  let rings =
    parsedParams.get(BUILD_FILTER_KEYS.RINGS)?.split(',') ||
    defaultFilters.rings;
  if (!isEqual(rings, defaultFilters.rings)) {
    // Ensure that the rings provided do not exceed the max allowed
    rings = rings.slice(0, MAX_RINGS);
    rings = rings.filter((ring) =>
      ringItems.some((item) => item.name === ring),
    );
    // If no rings, set to default
    if (rings.length === 0) {
      rings = defaultFilters.rings;
    }
  }

  // Validate the provided search text
  const searchText =
    parsedParams.get(BUILD_FILTER_KEYS.SEARCHTEXT) || defaultFilters.searchText;

  // Validate the patchAffected filter
  const patchAffectedParam = parsedParams.get(BUILD_FILTER_KEYS.PATCHAFFECTED);
  let patchAffected = defaultFilters.patchAffected;
  if (typeof patchAffectedParam === 'string') {
    patchAffected = patchAffectedParam === 'true';
  } else if (patchAffectedParam === null) {
    patchAffected = defaultFilters.patchAffected;
  }

  // Validate the withVideo filter
  const withVideoParam = parsedParams.get(BUILD_FILTER_KEYS.WITHVIDEO);
  let withVideo = defaultFilters.withVideo;
  if (typeof withVideoParam === 'string') {
    withVideo = withVideoParam === 'true';
  } else if (withVideoParam === null) {
    withVideo = defaultFilters.withVideo;
  }

  // Validate the withReference filter
  const withReferenceParam = parsedParams.get(BUILD_FILTER_KEYS.WITHREFERENCE);
  let withReference = defaultFilters.withReference;
  if (typeof withReferenceParam === 'string') {
    withReference = withReferenceParam === 'true';
  } else if (withReferenceParam === null) {
    withReference = defaultFilters.withReference;
  }

  // Validate the withQuality filter
  const withQualityParam = parsedParams.get(BUILD_FILTER_KEYS.WITHQUALITY);
  let withQuality = defaultFilters.withQuality;
  if (typeof withQualityParam === 'string') {
    withQuality = withQualityParam === 'true';
  } else if (withQualityParam === null) {
    withQuality = defaultFilters.withQuality;
  }

  // Validate the withCollection filter
  const withCollectionParam = parsedParams.get(
    BUILD_FILTER_KEYS.WITHCOLLECTION,
  );
  let withCollection = defaultFilters.withCollection;
  if (typeof withCollectionParam === 'string') {
    withCollection = withCollectionParam === 'true';
  } else if (withCollectionParam === null) {
    withCollection = defaultFilters.withCollection;
  }

  return {
    amulet,
    archetypes,
    buildTags,
    longGun,
    handGun,
    melee,
    releases,
    relic,
    rings,
    searchText,
    patchAffected,
    withCollection,
    withVideo,
    withReference,
    withQuality,
  };
}
