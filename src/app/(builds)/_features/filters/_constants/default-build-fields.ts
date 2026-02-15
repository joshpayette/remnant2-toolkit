import { amuletFilter } from '@/app/(builds)/_features/filters/_libs/filters/amulet-filter';
import { archetypeFilter } from '@/app/(builds)/_features/filters/_libs/filters/archetype-filter';
import { archetypeSlotFilter } from '@/app/(builds)/_features/filters/_libs/filters/archetype-slot-filter';
import { buildTagFilter } from '@/app/(builds)/_features/filters/_libs/filters/build-tag-filter';
import { fusionFilter } from '@/app/(builds)/_features/filters/_libs/filters/fusion-filter';
import { handGunFilter } from '@/app/(builds)/_features/filters/_libs/filters/hand-gun-filter';
import { legendaryFragmentFilter } from '@/app/(builds)/_features/filters/_libs/filters/legendary-fragment-filter';
import { longGunFilter } from '@/app/(builds)/_features/filters/_libs/filters/long-gun-filter';
import { meleeFilter } from '@/app/(builds)/_features/filters/_libs/filters/melee-filter';
import { modFilter } from '@/app/(builds)/_features/filters/_libs/filters/mod-filter';
import { mutatorFilter } from '@/app/(builds)/_features/filters/_libs/filters/mutator-filter';
import { releasesFilter } from '@/app/(builds)/_features/filters/_libs/filters/releases-filter';
import { relicFilter } from '@/app/(builds)/_features/filters/_libs/filters/relic-filter';
import { relicFragmentFilter } from '@/app/(builds)/_features/filters/_libs/filters/relic-fragment-filter';
import { ringFilter } from '@/app/(builds)/_features/filters/_libs/filters/ring-filter';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/filters/search-text-filter';
import { skillFilter } from '@/app/(builds)/_features/filters/_libs/filters/skill-filter';
import { traitFilter } from '@/app/(builds)/_features/filters/_libs/filters/trait-filter';
import { withCollectionFilter } from '@/app/(builds)/_features/filters/_libs/filters/with-collection';
import { withOptionalPrismFilter } from '@/app/(builds)/_features/filters/_libs/filters/with-optional-prism';
import { withPatchAffectedFilter } from '@/app/(builds)/_features/filters/_libs/filters/with-patch-affected-filter';
import { withQualityFilter } from '@/app/(builds)/_features/filters/_libs/filters/with-quality-filter';
import { withReferenceFilter } from '@/app/(builds)/_features/filters/_libs/filters/with-reference-filter';
import { withVideoFilter } from '@/app/(builds)/_features/filters/_libs/filters/with-video-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';

export const DEFAULT_BUILD_FIELDS: BuildFilterFields = {
  amulets: amuletFilter.defaultValue as BuildFilterFields['amulets'],
  archetypes: archetypeFilter.defaultValue as BuildFilterFields['archetypes'],
  archetypeSlot:
    archetypeSlotFilter.defaultValue as BuildFilterFields['archetypeSlot'],
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
  withOptionalPrism:
    withOptionalPrismFilter.defaultValue as BuildFilterFields['withOptionalPrism'],
  withPatchAffected:
    withPatchAffectedFilter.defaultValue as BuildFilterFields['withPatchAffected'],
  withQuality:
    withQualityFilter.defaultValue as BuildFilterFields['withQuality'],
  withVideo: withVideoFilter.defaultValue as BuildFilterFields['withVideo'],
  withReference:
    withReferenceFilter.defaultValue as BuildFilterFields['withReference'],
};
