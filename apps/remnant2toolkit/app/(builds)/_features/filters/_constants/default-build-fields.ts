import { amuletFilter } from '@/app/(builds)/_features/filters/_libs/amulet-filter';
import { buildTagFilter } from '@/app/(builds)/_features/filters/_libs/build-tag-filter';
import { fusionFilter } from '@/app/(builds)/_features/filters/_libs/fusion-filter';
import { handGunFilter } from '@/app/(builds)/_features/filters/_libs/hand-gun-filter';
import { legendaryFragmentFilter } from '@/app/(builds)/_features/filters/_libs/legendary-fragment-filter';
import { longGunFilter } from '@/app/(builds)/_features/filters/_libs/long-gun-filter';
import { meleeFilter } from '@/app/(builds)/_features/filters/_libs/melee-filter';
import { modFilter } from '@/app/(builds)/_features/filters/_libs/mod-filter';
import { mutatorFilter } from '@/app/(builds)/_features/filters/_libs/mutator-filter';
import { releasesFilter } from '@/app/(builds)/_features/filters/_libs/releases-filter';
import { relicFilter } from '@/app/(builds)/_features/filters/_libs/relic-filter';
import { relicFragmentFilter } from '@/app/(builds)/_features/filters/_libs/relic-fragment-filter';
import { ringFilter } from '@/app/(builds)/_features/filters/_libs/ring-filter';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/search-text-filter';
import { skillFilter } from '@/app/(builds)/_features/filters/_libs/skill-filter';
import { traitFilter } from '@/app/(builds)/_features/filters/_libs/trait-filter';
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
  fusions: fusionFilter.defaultValue as BuildFilterFields['fusions'],
  handGuns: handGunFilter.defaultValue as BuildFilterFields['handGuns'],
  legendaryFragments:
    legendaryFragmentFilter.defaultValue as BuildFilterFields['legendaryFragments'],
  longGuns: longGunFilter.defaultValue as BuildFilterFields['longGuns'],
  melees: meleeFilter.defaultValue as BuildFilterFields['melees'],
  mods: modFilter.defaultValue as BuildFilterFields['mods'],
  mutators: mutatorFilter.defaultValue as BuildFilterFields['mutators'],
  releases: releasesFilter.defaultValue as BuildFilterFields['releases'],
  relics: relicFilter.defaultValue as BuildFilterFields['relics'],
  relicFragments:
    relicFragmentFilter.defaultValue as BuildFilterFields['relicFragments'],
  rings: ringFilter.defaultValue as BuildFilterFields['rings'],
  searchText: searchTextFilter.defaultValue as BuildFilterFields['searchText'],
  skills: skillFilter.defaultValue as BuildFilterFields['skills'],
  traits: traitFilter.defaultValue as BuildFilterFields['traits'],
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
