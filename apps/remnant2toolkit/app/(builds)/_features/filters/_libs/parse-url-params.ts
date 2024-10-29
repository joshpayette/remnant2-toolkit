import type { FilterOption } from '@repo/ui';
import type { ReadonlyURLSearchParams } from 'next/navigation';

import { EXCLUDE_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { ALL_RELEASE_KEYS } from '@/app/_constants/releases';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import { amuletFilter } from '@/app/(builds)/_features/filters/_libs/amulet-filter';
import { archetypeFilter } from '@/app/(builds)/_features/filters/_libs/archetype-filter';
import { handGunFilter } from '@/app/(builds)/_features/filters/_libs/hand-gun-filter';
import { longGunFilter } from '@/app/(builds)/_features/filters/_libs/long-gun-filter';
import { meleeFilter } from '@/app/(builds)/_features/filters/_libs/melee-filter';
import { patchAffectedFilter } from '@/app/(builds)/_features/filters/_libs/with-patch-affected-filter';
import { releasesFilter } from '@/app/(builds)/_features/filters/_libs/releases-filter';
import { relicFilter } from '@/app/(builds)/_features/filters/_libs/relic-filter';
import { ringFilter } from '@/app/(builds)/_features/filters/_libs/ring-filter';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/search-text-filter';
import { withCollectionFilter } from '@/app/(builds)/_features/filters/_libs/with-collection';
import { withQualityFilter } from '@/app/(builds)/_features/filters/_libs/with-quality-filter';
import { withReferenceFilter } from '@/app/(builds)/_features/filters/_libs/with-reference-filter';
import { withVideoFilter } from '@/app/(builds)/_features/filters/_libs/with-video-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';
import { amuletItems } from '@/app/(items)/_constants/amulet-items';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';
import { relicItems } from '@/app/(items)/_constants/relic-items';
import { ringItems } from '@/app/(items)/_constants/ring-items';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';

interface Props {
  defaultFilters?: BuildFilterFields;
  searchParams: ReadonlyURLSearchParams;
}

export function parseUrlParams({
  defaultFilters = DEFAULT_BUILD_FIELDS,
  searchParams,
}: Props): BuildFilterFields {
  const parsedParams = new URLSearchParams(searchParams);

  const archetypesParam = parsedParams
    .get(archetypeFilter.buildFilterKey)
    ?.split(',');

  const amuletsParam = parsedParams
    .get(amuletFilter.buildFilterKey)
    ?.split(',');

  const handGunsParam = parsedParams
    .get(handGunFilter.buildFilterKey)
    ?.split(',');

  const longGunsParam = parsedParams
    .get(longGunFilter.buildFilterKey)
    ?.split(',');

  const meleeParam = parsedParams.get(meleeFilter.buildFilterKey)?.split(',');

  const releasesParam = parsedParams
    .get(releasesFilter.buildFilterKey)
    ?.split(',');

  const relicsParam = parsedParams.get(relicFilter.buildFilterKey)?.split(',');

  const ringsParam = parsedParams.get(ringFilter.buildFilterKey)?.split(',');

  const patchAffectedParam = parsedParams.get(
    patchAffectedFilter.buildFilterKey,
  );

  const searchTextParam =
    parsedParams.get(searchTextFilter.buildFilterKey) ||
    defaultFilters.searchText;

  const withCollectionParam = parsedParams.get(
    withCollectionFilter.buildFilterKey,
  );
  const withQualityParam = parsedParams.get(withQualityFilter.buildFilterKey);
  const withVideoParam = parsedParams.get(withVideoFilter.buildFilterKey);
  const withReferenceParam = parsedParams.get(
    withReferenceFilter.buildFilterKey,
  );

  let archetypes: FilterOption[] = [...defaultFilters.archetypes];
  if (archetypesParam) {
    for (const archetypeId of archetypesParam) {
      const cleanArchetypeId = archetypeId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const archetypeItem = archetypeItems.find(
        (item) => item.id === cleanArchetypeId,
      );
      if (!archetypeItem) continue;

      // Check if the exclusion symbol is found
      if (archetypeId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        archetypes = archetypes.map((archetype) => {
          if (archetype.value === archetypeItem.id) {
            return {
              ...archetype,
              state: 'excluded',
            };
          }
          return archetype;
        });
      } else {
        archetypes = archetypes.map((archetype) => {
          if (archetype.value === archetypeItem.id) {
            return {
              ...archetype,
              state: 'included',
            };
          }
          return archetype;
        });
      }
    }
  }

  let amulets: FilterOption[] = [...defaultFilters.amulets];
  if (amuletsParam) {
    for (const amuletId of amuletsParam) {
      const cleanAmuletId = amuletId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const amuletItem = amuletItems.find((item) => item.id === cleanAmuletId);
      if (!amuletItem) continue;

      // Check if the exclusion symbol is found
      if (amuletId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        amulets = amulets.map((amulet) => {
          if (amulet.value === amuletItem.id) {
            return {
              ...amulet,
              state: 'excluded',
            };
          }
          return amulet;
        });
      } else {
        amulets = amulets.map((amulet) => {
          if (amulet.value === amuletItem.id) {
            return {
              ...amulet,
              state: 'included',
            };
          }
          return amulet;
        });
      }
    }
  }

  let handGuns: FilterOption[] = [...defaultFilters.handGuns];
  if (handGunsParam) {
    const handGunItems = weaponItems.filter((i) => i.type === 'hand gun');
    for (const handGunId of handGunsParam) {
      const cleanHandGunId = handGunId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const handGunItem = handGunItems.find(
        (item) => item.id === cleanHandGunId,
      );
      if (!handGunItem) continue;

      // Check if the exclusion symbol is found
      if (handGunId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        handGuns = handGuns.map((handGun) => {
          if (handGun.value === cleanHandGunId) {
            return {
              ...handGun,
              state: 'excluded',
            };
          }
          return handGun;
        });
      } else {
        handGuns = handGuns.map((handGun) => {
          if (handGun.value === cleanHandGunId) {
            return {
              ...handGun,
              state: 'included',
            };
          }
          return handGun;
        });
      }
    }
  }

  let longGuns: FilterOption[] = [...defaultFilters.longGuns];
  if (longGunsParam) {
    const longGunItems = weaponItems.filter((i) => i.type === 'long gun');
    for (const longGunId of longGunsParam) {
      const cleanLongGunId = longGunId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const longGunItem = longGunItems.find(
        (item) => item.id === cleanLongGunId,
      );
      if (!longGunItem) continue;

      // Check if the exclusion symbol is found
      if (longGunId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        longGuns = longGuns.map((longGun) => {
          if (longGun.value === cleanLongGunId) {
            return {
              ...longGun,
              state: 'excluded',
            };
          }
          return longGun;
        });
      } else {
        longGuns = longGuns.map((longGun) => {
          if (longGun.value === cleanLongGunId) {
            return {
              ...longGun,
              state: 'included',
            };
          }
          return longGun;
        });
      }
    }
  }

  let melees: FilterOption[] = [...defaultFilters.melees];
  if (meleeParam) {
    const meleeItems = weaponItems.filter((i) => i.type === 'melee');
    for (const meleeId of meleeParam) {
      const cleanMeleeId = meleeId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const meleeItem = meleeItems.find((item) => item.id === cleanMeleeId);
      if (!meleeItem) continue;

      // Check if the exclusion symbol is found
      if (meleeId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        melees = melees.map((melee) => {
          if (melee.value === cleanMeleeId) {
            return {
              ...melee,
              state: 'excluded',
            };
          }
          return melee;
        });
      } else {
        melees = melees.map((melee) => {
          if (melee.value === cleanMeleeId) {
            return {
              ...melee,
              state: 'included',
            };
          }
          return melee;
        });
      }
    }
  }

  let releases: FilterOption[] = [...defaultFilters.releases];
  if (releasesParam) {
    for (const releaseId of releasesParam) {
      const cleanReleaseId = releaseId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const releaseItem = ALL_RELEASE_KEYS.find(
        (item) => item === cleanReleaseId,
      );
      if (!releaseItem) continue;

      // Check if the exclusion symbol is found
      if (releaseId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        releases = releases.map((release) => {
          if (release.value === releaseItem) {
            return {
              ...release,
              state: 'excluded',
            };
          }
          return release;
        });
      } else {
        releases = releases.map((release) => {
          if (release.value === releaseItem) {
            return {
              ...release,
              state: 'included',
            };
          }
          return release;
        });
      }
    }
  }

  let relics: FilterOption[] = [...defaultFilters.relics];
  if (relicsParam) {
    for (const relicId of relicsParam) {
      const cleanRelicId = relicId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const relicItem = relicItems.find((item) => item.id === cleanRelicId);
      if (!relicItem) continue;

      // Check if the exclusion symbol is found
      if (relicId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        relics = relics.map((relic) => {
          if (relic.value === relicItem.id) {
            return {
              ...relic,
              state: 'excluded',
            };
          }
          return relic;
        });
      } else {
        relics = relics.map((relic) => {
          if (relic.value === relicItem.id) {
            return {
              ...relic,
              state: 'included',
            };
          }
          return relic;
        });
      }
    }
  }

  let rings: FilterOption[] = [...defaultFilters.rings];
  if (ringsParam) {
    for (const ringId of ringsParam) {
      const cleanRingId = ringId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const ringItem = ringItems.find((item) => item.id === cleanRingId);
      if (!ringItem) continue;

      // Check if the exclusion symbol is found
      if (ringId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        rings = rings.map((ring) => {
          if (ring.value === ringItem.id) {
            return {
              ...ring,
              state: 'excluded',
            };
          }
          return ring;
        });
      } else {
        rings = rings.map((ring) => {
          if (ring.value === ringItem.id) {
            return {
              ...ring,
              state: 'included',
            };
          }
          return ring;
        });
      }
    }
  }

  let withCollection = defaultFilters.withCollection;
  if (withCollectionParam) {
    withCollection = withCollectionParam;
  }

  let withPatchAffected = defaultFilters.withPatchAffected;
  if (patchAffectedParam) {
    withPatchAffected = patchAffectedParam === 'true' ? 'true' : 'false';
  }

  let withQuality = defaultFilters.withQuality;
  if (withQualityParam) {
    withQuality = withQualityParam === 'true' ? 'true' : 'false';
  }

  let withVideo = defaultFilters.withVideo;
  if (withVideoParam) {
    withVideo = withVideoParam === 'true' ? 'true' : 'false';
  }

  let withReference = defaultFilters.withReference;
  if (withReferenceParam) {
    withReference = withReferenceParam === 'true' ? 'true' : 'false';
  }

  const searchText = searchTextParam;

  return {
    archetypes,
    amulets,
    handGuns,
    longGuns,
    melees,
    releases,
    relics,
    rings,
    searchText,
    withCollection,
    withPatchAffected,
    withQuality,
    withReference,
    withVideo,
  };
}
