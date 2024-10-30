import { amuletFilter } from '@/app/(builds)/_features/filters/_libs/amulet-filter';
import { buildTagFilter } from '@/app/(builds)/_features/filters/_libs/build-tag-filter';
import { handGunFilter } from '@/app/(builds)/_features/filters/_libs/hand-gun-filter';
import { longGunFilter } from '@/app/(builds)/_features/filters/_libs/long-gun-filter';
import { meleeFilter } from '@/app/(builds)/_features/filters/_libs/melee-filter';
import { releasesFilter } from '@/app/(builds)/_features/filters/_libs/releases-filter';
import { relicFilter } from '@/app/(builds)/_features/filters/_libs/relic-filter';
import { ringFilter } from '@/app/(builds)/_features/filters/_libs/ring-filter';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/search-text-filter';
import { withCollectionFilter } from '@/app/(builds)/_features/filters/_libs/with-collection';
import { withPatchAffectedFilter } from '@/app/(builds)/_features/filters/_libs/with-patch-affected-filter';
import { withQualityFilter } from '@/app/(builds)/_features/filters/_libs/with-quality-filter';
import { withReferenceFilter } from '@/app/(builds)/_features/filters/_libs/with-reference-filter';
import { withVideoFilter } from '@/app/(builds)/_features/filters/_libs/with-video-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';

import { archetypeFilter } from '../_libs/archetype-filter';

export const DEFAULT_BUILD_FIELDS: BuildFilterFields = {
  amulets: amuletFilter.defaultValue as BuildFilterFields['amulets'],
  archetypes: archetypeFilter.defaultValue as BuildFilterFields['archetypes'],
  buildTags: buildTagFilter.defaultValue as BuildFilterFields['buildTags'],
  handGuns: handGunFilter.defaultValue as BuildFilterFields['handGuns'],
  longGuns: longGunFilter.defaultValue as BuildFilterFields['longGuns'],
  melees: meleeFilter.defaultValue as BuildFilterFields['melees'],
  releases: releasesFilter.defaultValue as BuildFilterFields['releases'],
  relics: relicFilter.defaultValue as BuildFilterFields['relics'],
  rings: ringFilter.defaultValue as BuildFilterFields['rings'],
  searchText: searchTextFilter.defaultValue as BuildFilterFields['searchText'],
  withCollection:
    withCollectionFilter.defaultValue as BuildFilterFields['withCollection'],
  withPatchAffected:
    withPatchAffectedFilter.defaultValue as BuildFilterFields['withPatchAffected'],
  withQuality:
    withQualityFilter.defaultValue as BuildFilterFields['withQuality'],
  withVideo: withVideoFilter.defaultValue as BuildFilterFields['withVideo'],
  withReference:
    withReferenceFilter.defaultValue as BuildFilterFields['withReference'],
};
