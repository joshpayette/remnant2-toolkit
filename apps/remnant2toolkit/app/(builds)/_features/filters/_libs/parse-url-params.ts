import type { FilterOption } from '@repo/ui';
import type { ReadonlyURLSearchParams } from 'next/navigation';

import { EXCLUDE_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import { amuletFilter } from '@/app/(builds)/_features/filters/_libs/amulet-filter';
import { archetypeFilter } from '@/app/(builds)/_features/filters/_libs/archetype-filter';
import { patchAffectedFilter } from '@/app/(builds)/_features/filters/_libs/patch-affected-filter';
import { relicFilter } from '@/app/(builds)/_features/filters/_libs/relic-filter';
import { ringFilter } from '@/app/(builds)/_features/filters/_libs/ring-filter';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/search-text-filter';
import { withQualityFilter } from '@/app/(builds)/_features/filters/_libs/with-quality-filter';
import { withReferenceFilter } from '@/app/(builds)/_features/filters/_libs/with-reference-filter';
import { withVideoFilter } from '@/app/(builds)/_features/filters/_libs/with-video-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';
import { amuletItems } from '@/app/(items)/_constants/amulet-items';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';
import { relicItems } from '@/app/(items)/_constants/relic-items';
import { ringItems } from '@/app/(items)/_constants/ring-items';

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

  const relicsParam = parsedParams.get(relicFilter.buildFilterKey)?.split(',');

  const ringsParam = parsedParams.get(ringFilter.buildFilterKey)?.split(',');

  const patchAffectedParam = parsedParams.get(
    patchAffectedFilter.buildFilterKey,
  );

  const searchTextParam =
    parsedParams.get(searchTextFilter.buildFilterKey) ||
    defaultFilters.searchText;

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

  let patchAffected = defaultFilters.patchAffected;
  if (patchAffectedParam) {
    patchAffected = patchAffectedParam === 'true' ? 'true' : 'false';
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
    patchAffected,
    relics,
    rings,
    searchText,
    withQuality,
    withVideo,
    withReference,
  };
}
