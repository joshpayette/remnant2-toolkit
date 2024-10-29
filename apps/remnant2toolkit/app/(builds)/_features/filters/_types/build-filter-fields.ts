import { type releasesFilter } from '@/app/(builds)/_features/filters/_libs/releases-filter';

import { type amuletFilter } from '../_libs/amulet-filter';
import { type archetypeFilter } from '../_libs/archetype-filter';
import { type handGunFilter } from '../_libs/hand-gun-filter';
import { type longGunFilter } from '../_libs/long-gun-filter';
import { type meleeFilter } from '../_libs/melee-filter';
import { type relicFilter } from '../_libs/relic-filter';
import { type ringFilter } from '../_libs/ring-filter';
import { type searchTextFilter } from '../_libs/search-text-filter';
import { type withCollectionFilter } from '../_libs/with-collection';
import { type withPatchAffectedFilter } from '../_libs/with-patch-affected-filter';
import { type withQualityFilter } from '../_libs/with-quality-filter';
import { type withReferenceFilter } from '../_libs/with-reference-filter';
import { type withVideoFilter } from '../_libs/with-video-filter';

export interface BuildFilterFields {
  amulets: typeof amuletFilter.defaultValue;
  archetypes: typeof archetypeFilter.defaultValue;
  handGuns: typeof handGunFilter.defaultValue;
  longGuns: typeof longGunFilter.defaultValue;
  melees: typeof meleeFilter.defaultValue;
  releases: typeof releasesFilter.defaultValue;
  relics: typeof relicFilter.defaultValue;
  rings: typeof ringFilter.defaultValue;
  searchText: typeof searchTextFilter.defaultValue;
  withCollection: typeof withCollectionFilter.defaultValue;
  withPatchAffected: typeof withPatchAffectedFilter.defaultValue;
  withQuality: typeof withQualityFilter.defaultValue;
  withVideo: typeof withVideoFilter.defaultValue;
  withReference: typeof withReferenceFilter.defaultValue;
}

export type BuildFilterFieldKey = keyof BuildFilterFields;
