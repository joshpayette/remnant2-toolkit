import type { ReadonlyURLSearchParams } from 'next/navigation';

import { EXCLUDE_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { ALL_RELEASE_KEYS } from '@/app/_constants/releases';
import { ALL_BUILD_TAGS } from '@/app/(builds)/_constants/all-build-tags';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import {
  amuletFilter,
  type AmuletFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/amulet-filter';
import {
  archetypeFilter,
  type ArchetypeFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/archetype-filter';
import {
  archetypeSlotFilter,
  type ArchetypeSlotFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/archetype-slot-filter';
import {
  buildTagFilter,
  type BuildTagFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/build-tag-filter';
import { fusionFilter } from '@/app/(builds)/_features/filters/_libs/filters/fusion-filter';
import {
  handGunFilter,
  type HandGunFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/hand-gun-filter';
import { legendaryFragmentFilter } from '@/app/(builds)/_features/filters/_libs/filters/legendary-fragment-filter';
import {
  longGunFilter,
  type LongGunFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/long-gun-filter';
import {
  meleeFilter,
  type MeleeFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/melee-filter';
import {
  modFilter,
  type ModFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/mod-filter';
import { mutatorFilter } from '@/app/(builds)/_features/filters/_libs/filters/mutator-filter';
import {
  releasesFilter,
  type ReleasesFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/releases-filter';
import {
  relicFilter,
  type RelicFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/relic-filter';
import { relicFragmentFilter } from '@/app/(builds)/_features/filters/_libs/filters/relic-fragment-filter';
import {
  ringFilter,
  type RingFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/ring-filter';
import { searchTextFilter } from '@/app/(builds)/_features/filters/_libs/filters/search-text-filter';
import {
  skillFilter,
  type SkillFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/skill-filter';
import {
  traitFilter,
  type TraitFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/trait-filter';
import {
  withCollectionFilter,
  type WithCollectionFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/with-collection';
import {
  withOptionalPrismFilter,
  type WithOptionalPrismValue,
} from '@/app/(builds)/_features/filters/_libs/filters/with-optional-prism';
import {
  withPatchAffectedFilter,
  type WithPatchAffectedFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/with-patch-affected-filter';
import {
  withQualityFilter,
  type WithQualityFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/with-quality-filter';
import {
  withReferenceFilter,
  type WithReferenceFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/with-reference-filter';
import {
  withVideoFilter,
  type WithVideoFilterValue,
} from '@/app/(builds)/_features/filters/_libs/filters/with-video-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';
import { amuletItems } from '@/app/(items)/_constants/amulet-items';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';
import { fusionItems } from '@/app/(items)/_constants/fusion-items';
import { modItems } from '@/app/(items)/_constants/mod-items';
import { mutatorItems } from '@/app/(items)/_constants/mutator-items';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';
import { relicItems } from '@/app/(items)/_constants/relic-items';
import { ringItems } from '@/app/(items)/_constants/ring-items';
import { skillItems } from '@/app/(items)/_constants/skill-items';
import { traitItems } from '@/app/(items)/_constants/trait-items';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';

interface Props {
  defaultFilters?: BuildFilterFields;
  searchParams: ReadonlyURLSearchParams;
}

export function parseUrlParams({
  defaultFilters = DEFAULT_BUILD_FIELDS,
  searchParams,
}: Props): BuildFilterFields {
  // #region Params
  const parsedParams = new URLSearchParams(searchParams);

  const archetypesParam = parsedParams
    .get(archetypeFilter.buildFilterKey)
    ?.split(',');

  const archetypeSlotParam = parsedParams.get(
    archetypeSlotFilter.buildFilterKey,
  );

  const amuletsParam = parsedParams
    .get(amuletFilter.buildFilterKey)
    ?.split(',');

  const buildTagsParam = parsedParams
    .get(buildTagFilter.buildFilterKey)
    ?.split(',');

  const fusionsParam = parsedParams
    .get(fusionFilter.buildFilterKey)
    ?.split(',');

  const handGunsParam = parsedParams
    .get(handGunFilter.buildFilterKey)
    ?.split(',');

  const legendaryFragmentsParam = parsedParams
    .get(legendaryFragmentFilter.buildFilterKey)
    ?.split(',');

  const longGunsParam = parsedParams
    .get(longGunFilter.buildFilterKey)
    ?.split(',');

  const meleeParam = parsedParams.get(meleeFilter.buildFilterKey)?.split(',');

  const modParam = parsedParams.get(modFilter.buildFilterKey)?.split(',');

  const mutatorParam = parsedParams
    .get(mutatorFilter.buildFilterKey)
    ?.split(',');

  const releasesParam = parsedParams
    .get(releasesFilter.buildFilterKey)
    ?.split(',');

  const relicsParam = parsedParams.get(relicFilter.buildFilterKey)?.split(',');

  const relicFragmentsParam = parsedParams
    .get(relicFragmentFilter.buildFilterKey)
    ?.split(',');

  const ringsParam = parsedParams.get(ringFilter.buildFilterKey)?.split(',');

  const searchTextParam =
    parsedParams.get(searchTextFilter.buildFilterKey) ||
    defaultFilters.searchText;

  const skillParam = parsedParams.get(skillFilter.buildFilterKey)?.split(',');

  const traitsParam = parsedParams.get(traitFilter.buildFilterKey)?.split(',');

  const withCollectionParam = parsedParams.get(
    withCollectionFilter.buildFilterKey,
  );
  const withOptionalPrismParam = parsedParams.get(
    withOptionalPrismFilter.buildFilterKey,
  );
  const withPatchAffectedParam = parsedParams.get(
    withPatchAffectedFilter.buildFilterKey,
  );
  const withQualityParam = parsedParams.get(withQualityFilter.buildFilterKey);
  const withVideoParam = parsedParams.get(withVideoFilter.buildFilterKey);
  const withReferenceParam = parsedParams.get(
    withReferenceFilter.buildFilterKey,
  );

  // #region Archetype parser
  let archetypes: ArchetypeFilterValue = [...defaultFilters.archetypes];
  if (archetypesParam) {
    for (const archetypeName of archetypesParam) {
      const cleanArchetypeName = archetypeName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const archetypeItem = archetypeItems.find(
        (item) => item.name === cleanArchetypeName,
      );
      if (!archetypeItem) continue;

      // Check if the exclusion symbol is found
      if (archetypeName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        archetypes = archetypes.map((archetype) => {
          if (archetype.value === archetypeItem.name) {
            return {
              ...archetype,
              state: 'excluded',
            };
          }
          return archetype;
        });
      } else {
        archetypes = archetypes.map((archetype) => {
          if (archetype.value === archetypeItem.name) {
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

  let archetypeSlot: ArchetypeSlotFilterValue =
    archetypeSlotFilter.defaultValue;
  if (archetypeSlotParam) {
    archetypeSlot = Number(archetypeSlotParam);
    if (
      archetypeSlotFilter.options.find(
        (option) => option.value === archetypeSlot,
      ) === undefined
    ) {
      archetypeSlot = archetypeSlotFilter.defaultValue;
    }
  }

  // #region Amulet parser
  let amulets: AmuletFilterValue = [...defaultFilters.amulets];
  if (amuletsParam) {
    for (const amuletName of amuletsParam) {
      const cleanAmuletName = amuletName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const amuletItem = amuletItems.find(
        (item) => item.name === cleanAmuletName,
      );
      if (!amuletItem) continue;

      // Check if the exclusion symbol is found
      if (amuletName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        amulets = amulets.map((amulet) => {
          if (amulet.value === amuletItem.name) {
            return {
              ...amulet,
              state: 'excluded',
            };
          }
          return amulet;
        });
      } else {
        amulets = amulets.map((amulet) => {
          if (amulet.value === amuletItem.name) {
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

  // #region Build Tags parser
  let buildTags: BuildTagFilterValue = [...defaultFilters.buildTags];
  if (buildTagsParam) {
    for (const buildTagName of buildTagsParam) {
      const cleanBuildTagName = buildTagName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const buildTagItem = ALL_BUILD_TAGS.find(
        (item) => item.value === cleanBuildTagName,
      );
      if (!buildTagItem) continue;

      // Check if the exclusion symbol is found
      if (buildTagName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        buildTags = buildTags.map((buildTag) => {
          if (buildTag.value === buildTagItem.value) {
            return {
              ...buildTag,
              state: 'excluded',
            };
          }
          return buildTag;
        });
      } else {
        buildTags = buildTags.map((buildTag) => {
          if (buildTag.value === buildTagItem.value) {
            return {
              ...buildTag,
              state: 'included',
            };
          }
          return buildTag;
        });
      }
    }
  }

  // #region Fusion parser
  let fusions = [...defaultFilters.fusions];
  if (fusionsParam) {
    for (const fusionName of fusionsParam) {
      const cleanFusionName = fusionName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const fusionItem = fusionItems.find(
        (item) => item.name === cleanFusionName,
      );
      if (!fusionItem) continue;

      // Check if the exclusion symbol is found
      if (fusionName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        fusions = fusions.map((fusion) => {
          if (fusion.value === fusionItem.name) {
            return {
              ...fusion,
              state: 'excluded',
            };
          }
          return fusion;
        });
      } else {
        fusions = fusions.map((fusion) => {
          if (fusion.value === fusionItem.name) {
            return {
              ...fusion,
              state: 'included',
            };
          }
          return fusion;
        });
      }
    }
  }

  // #region Hand Guns parser
  let handGuns: HandGunFilterValue = [...defaultFilters.handGuns];
  if (handGunsParam) {
    const handGunItems = weaponItems.filter((i) => i.type === 'hand gun');
    for (const handGunName of handGunsParam) {
      const cleanHandGunName = handGunName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const handGunItem = handGunItems.find(
        (item) => item.name === cleanHandGunName,
      );
      if (!handGunItem) continue;

      // Check if the exclusion symbol is found
      if (handGunName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        handGuns = handGuns.map((handGun) => {
          if (handGun.value === cleanHandGunName) {
            return {
              ...handGun,
              state: 'excluded',
            };
          }
          return handGun;
        });
      } else {
        handGuns = handGuns.map((handGun) => {
          if (handGun.value === cleanHandGunName) {
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

  let legendaryFragments = [...defaultFilters.legendaryFragments];
  if (legendaryFragmentsParam) {
    for (const legendaryFragmentName of legendaryFragmentsParam) {
      const cleanLegendaryFragmentName = legendaryFragmentName.replace(
        EXCLUDE_ITEM_SYMBOL,
        '',
      );
      const legendaryFragmentItem = relicFragmentItems.find(
        (item) =>
          item.name === cleanLegendaryFragmentName &&
          item.color === 'legendary',
      );
      if (!legendaryFragmentItem) continue;

      // Check if the exclusion symbol is found
      if (legendaryFragmentName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        legendaryFragments = legendaryFragments.map((legendaryFragment) => {
          if (legendaryFragment.value === legendaryFragmentItem.name) {
            return {
              ...legendaryFragment,
              state: 'excluded',
            };
          }
          return legendaryFragment;
        });
      } else {
        legendaryFragments = legendaryFragments.map((legendaryFragment) => {
          if (legendaryFragment.value === legendaryFragmentItem.name) {
            return {
              ...legendaryFragment,
              state: 'included',
            };
          }
          return legendaryFragment;
        });
      }
    }
  }

  // #region Long Guns parser
  let longGuns: LongGunFilterValue = [...defaultFilters.longGuns];
  if (longGunsParam) {
    const longGunItems = weaponItems.filter((i) => i.type === 'long gun');
    for (const longGunName of longGunsParam) {
      const cleanLongGunName = longGunName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const longGunItem = longGunItems.find(
        (item) => item.name === cleanLongGunName,
      );
      if (!longGunItem) continue;

      // Check if the exclusion symbol is found
      if (longGunName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        longGuns = longGuns.map((longGun) => {
          if (longGun.value === cleanLongGunName) {
            return {
              ...longGun,
              state: 'excluded',
            };
          }
          return longGun;
        });
      } else {
        longGuns = longGuns.map((longGun) => {
          if (longGun.value === cleanLongGunName) {
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

  // #region Melee parser
  let melees: MeleeFilterValue = [...defaultFilters.melees];
  if (meleeParam) {
    const meleeItems = weaponItems.filter((i) => i.type === 'melee');
    for (const meleeName of meleeParam) {
      const cleanMeleeName = meleeName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const meleeItem = meleeItems.find((item) => item.name === cleanMeleeName);
      if (!meleeItem) continue;

      // Check if the exclusion symbol is found
      if (meleeName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        melees = melees.map((melee) => {
          if (melee.value === cleanMeleeName) {
            return {
              ...melee,
              state: 'excluded',
            };
          }
          return melee;
        });
      } else {
        melees = melees.map((melee) => {
          if (melee.value === cleanMeleeName) {
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

  // #region Mod parser
  let mods: ModFilterValue = [...defaultFilters.mods];
  if (modParam) {
    for (const modName of modParam) {
      const cleanModName = modName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const modItem = modItems.find((item) => item.name === cleanModName);
      if (!modItem) continue;

      // Check if the exclusion symbol is found
      if (modName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        mods = mods.map((mod) => {
          if (mod.value === modItem.name) {
            return {
              ...mod,
              state: 'excluded',
            };
          }
          return mod;
        });
      } else {
        mods = mods.map((mod) => {
          if (mod.value === modItem.name) {
            return {
              ...mod,
              state: 'included',
            };
          }
          return mod;
        });
      }
    }
  }

  // #region Mutator parser
  let mutators = [...defaultFilters.mutators];
  if (mutatorParam) {
    for (const mutatorName of mutatorParam) {
      const cleanMutatorName = mutatorName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const mutatorItem = mutatorItems.find(
        (item) => item.name === cleanMutatorName,
      );
      if (!mutatorItem) continue;

      // Check if the exclusion symbol is found
      if (mutatorName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        mutators = mutators.map((mutator) => {
          if (mutator.value === mutatorItem.name) {
            return {
              ...mutator,
              state: 'excluded',
            };
          }
          return mutator;
        });
      } else {
        mutators = mutators.map((mutator) => {
          if (mutator.value === mutatorItem.name) {
            return {
              ...mutator,
              state: 'included',
            };
          }
          return mutator;
        });
      }
    }
  }

  // #region Release parser
  let releases: ReleasesFilterValue = [...defaultFilters.releases];
  if (releasesParam) {
    for (const releaseKey of releasesParam) {
      const cleanReleaseKey = releaseKey.replace(EXCLUDE_ITEM_SYMBOL, '');
      const releaseName = ALL_RELEASE_KEYS.find(
        (item) => item === cleanReleaseKey,
      );
      if (!releaseName) continue;

      // Check if the exclusion symbol is found
      if (releaseKey.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        releases = releases.map((release) => {
          if (release.value === releaseName) {
            return {
              ...release,
              state: 'excluded',
            };
          }
          return release;
        });
      } else {
        releases = releases.map((release) => {
          if (release.value === releaseName) {
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

  // #region Relic parser
  let relics: RelicFilterValue = [...defaultFilters.relics];
  if (relicsParam) {
    for (const relicName of relicsParam) {
      const cleanRelicName = relicName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const relicItem = relicItems.find((item) => item.name === cleanRelicName);
      if (!relicItem) continue;

      // Check if the exclusion symbol is found
      if (relicName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        relics = relics.map((relic) => {
          if (relic.value === relicItem.name) {
            return {
              ...relic,
              state: 'excluded',
            };
          }
          return relic;
        });
      } else {
        relics = relics.map((relic) => {
          if (relic.value === relicItem.name) {
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

  // #region Relic fragment parser
  let relicFragments = [...defaultFilters.relicFragments];
  if (relicFragmentsParam) {
    for (const relicFragmentName of relicFragmentsParam) {
      const cleanRelicFragmentName = relicFragmentName.replace(
        EXCLUDE_ITEM_SYMBOL,
        '',
      );
      const relicFragmentItem = relicFragmentItems.find(
        (item) =>
          item.name === cleanRelicFragmentName && item.color !== 'legendary',
      );
      if (!relicFragmentItem) continue;

      // Check if the exclusion symbol is found
      if (relicFragmentName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        relicFragments = relicFragments.map((relicFragment) => {
          if (relicFragment.value === relicFragmentItem.name) {
            return {
              ...relicFragment,
              state: 'excluded',
            };
          }
          return relicFragment;
        });
      } else {
        relicFragments = relicFragments.map((relicFragment) => {
          if (relicFragment.value === relicFragmentItem.name) {
            return {
              ...relicFragment,
              state: 'included',
            };
          }
          return relicFragment;
        });
      }
    }
  }

  // #region Ring parser
  let rings: RingFilterValue = [...defaultFilters.rings];
  if (ringsParam) {
    for (const ringName of ringsParam) {
      const cleanRingName = ringName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const ringItem = ringItems.find((item) => item.name === cleanRingName);
      if (!ringItem) continue;

      // Check if the exclusion symbol is found
      if (ringName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        rings = rings.map((ring) => {
          if (ring.value === ringItem.name) {
            return {
              ...ring,
              state: 'excluded',
            };
          }
          return ring;
        });
      } else {
        rings = rings.map((ring) => {
          if (ring.value === ringItem.name) {
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

  // #region Skill parser
  let skills: SkillFilterValue = defaultFilters.skills;
  if (skillParam) {
    for (const skillName of skillParam) {
      const cleanSkillName = skillName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const skillItem = skillItems.find((item) => item.name === cleanSkillName);
      if (!skillItem) continue;

      if (skillName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        skills = skills.map((skill) => {
          if (skill.value === skillItem.name) {
            return {
              ...skill,
              state: 'excluded',
            };
          }
          return skill;
        });
      } else {
        skills = skills.map((skill) => {
          if (skill.value === skillItem.name) {
            return {
              ...skill,
              state: 'included',
            };
          }
          return skill;
        });
      }
    }
  }

  // #region Trait parser
  let traits: TraitFilterValue = defaultFilters.traits;
  if (traitsParam) {
    for (const traitName of traitsParam) {
      const cleanTraitName = traitName.replace(EXCLUDE_ITEM_SYMBOL, '');
      const traitItem = traitItems.find((item) => item.name === cleanTraitName);
      if (!traitItem) continue;

      if (traitName.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        traits = traits.map((trait) => {
          if (trait.value === traitItem.name) {
            return {
              ...trait,
              state: 'excluded',
            };
          }
          return trait;
        });
      } else {
        traits = traits.map((trait) => {
          if (trait.value === traitItem.name) {
            return {
              ...trait,
              state: 'included',
            };
          }
          return trait;
        });
      }
    }
  }

  // #region Misc filters
  let withCollection: WithCollectionFilterValue = defaultFilters.withCollection;
  if (withCollectionParam) {
    withCollection = Number(withCollectionParam);
    if (
      withCollectionFilter.options.find(
        (option) => option.value === withCollection,
      ) === undefined
    ) {
      withCollection = defaultFilters.withCollection;
    }
  }

  let withOptionalPrism: WithOptionalPrismValue =
    defaultFilters.withOptionalPrism;
  if (withOptionalPrismParam) {
    if (withOptionalPrismParam === 'true') {
      withOptionalPrism = true;
    } else if (withOptionalPrismParam === 'false') {
      withOptionalPrism = false;
    }
  }

  let withPatchAffected: WithPatchAffectedFilterValue =
    defaultFilters.withPatchAffected;
  if (withPatchAffectedParam) {
    if (withPatchAffectedParam === 'true') {
      withPatchAffected = true;
    } else if (withPatchAffectedParam === 'false') {
      withPatchAffected = false;
    }
  }

  let withQuality: WithQualityFilterValue = defaultFilters.withQuality;
  if (withQualityParam) {
    if (withQualityParam === 'true') {
      withQuality = true;
    } else if (withQualityParam === 'false') {
      withQuality = false;
    }
  }

  let withVideo: WithVideoFilterValue = defaultFilters.withVideo;
  if (withVideoParam) {
    if (withVideoParam === 'true') {
      withVideo = true;
    } else if (withVideoParam === 'false') {
      withVideo = false;
    }
  }

  let withReference: WithReferenceFilterValue = defaultFilters.withReference;
  if (withReferenceParam) {
    if (withReferenceParam === 'true') {
      withReference = true;
    } else if (withReferenceParam === 'false') {
      withReference = false;
    }
  }

  const searchText = searchTextParam;

  return {
    amulets,
    archetypes,
    archetypeSlot,
    buildTags,
    fusions,
    handGuns,
    legendaryFragments,
    longGuns,
    melees,
    mods,
    mutators,
    releases,
    relics,
    relicFragments,
    rings,
    searchText,
    skills,
    traits,
    withCollection,
    withOptionalPrism,
    withPatchAffected,
    withQuality,
    withReference,
    withVideo,
  };
}
