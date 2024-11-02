import { type BuildTags } from '@repo/db';

import { isStringArray } from '@/app/_libs/is-string-array';
import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { AmuletItem } from '@/app/(items)/_types/amulet-item';
import { ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { ArmorItem } from '@/app/(items)/_types/armor-item';
import { ConcoctionItem } from '@/app/(items)/_types/concotion-item';
import { ConsumableItem } from '@/app/(items)/_types/consumable-item';
import { FusionItem } from '@/app/(items)/_types/fusion-item';
import { type Item } from '@/app/(items)/_types/item';
import { ModItem } from '@/app/(items)/_types/mod-item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { PrismItem } from '@/app/(items)/_types/prism-item';
import { PylonItem } from '@/app/(items)/_types/pylon-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { RelicItem } from '@/app/(items)/_types/relic-item';
import { RingItem } from '@/app/(items)/_types/ring-item';
import { SkillItem } from '@/app/(items)/_types/skill-item';
import { TraitItem } from '@/app/(items)/_types/trait-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';

export type UpdateBuildCategory =
  | ItemCategory
  | 'name'
  | 'description'
  | 'isPublic'
  | 'isPatchAffected'
  | 'buildLink'
  | 'tags';

function removeSkillIfArchetypeUnequipped({
  buildState,
  value,
}: {
  buildState: BuildState;
  value: Array<string | undefined>;
}): BuildState | null {
  const emptySlot = value.findIndex((item) => item === '');
  if (emptySlot === -1) return null;

  const newSkills = buildState.items.skill.map((skill, index) => {
    if (index === emptySlot) return null;
    return skill;
  });
  const newArchetypes = buildState.items.archetype.map((archetype, index) => {
    if (index === emptySlot) return null;
    return archetype;
  });

  const newBuildState = {
    ...buildState,
    items: {
      ...buildState.items,
      archetype: newArchetypes,
      skill: newSkills,
    },
  };

  return newBuildState;
}

function removeEmptyItems({
  buildState,
  category,
  value,
}: {
  buildState: BuildState;
  category: UpdateBuildCategory;
  value: string | string[];
}): BuildState {
  if (Array.isArray(value)) {
    return cleanUpBuildState({
      ...buildState,
      items: {
        ...buildState.items,
        [category]: [],
      },
    });
  } else {
    return cleanUpBuildState({
      ...buildState,
      items: {
        ...buildState.items,
        [category]: null,
      },
    });
  }
}

export function updateBuildState({
  buildState,
  category,
  value,
}: {
  buildState: BuildState;
  category: UpdateBuildCategory;
  value: string | Array<string | undefined> | BuildTags[];
}): BuildState {
  // If updating a non-item...
  switch (category) {
    case 'name':
      return {
        ...buildState,
        name: value as string,
      };
    case 'description':
      return {
        ...buildState,
        description: value as string,
      };
    case 'isPublic':
      return {
        ...buildState,
        isPublic: value === 'true',
      };

    case 'isPatchAffected':
      return {
        ...buildState,
        isPatchAffected: value === 'true',
      };
    case 'buildLink':
      return {
        ...buildState,
        buildLink: value as string,
      };
    case 'tags':
      if (!Array.isArray(value) || isStringArray(value)) {
        return buildState;
      }

      return {
        ...buildState,
        buildTags: value as BuildTags[],
      };
  }

  if (
    category === 'archetype' &&
    Array.isArray(value) &&
    isStringArray(value)
  ) {
    const newBuildState = removeSkillIfArchetypeUnequipped({
      buildState: buildState,
      value: value,
    });
    if (newBuildState !== null) {
      return newBuildState;
    }
  }

  const allValuesAreEmpty =
    (Array.isArray(value) && value.every((item) => item === '')) ||
    value === '';

  if (allValuesAreEmpty) {
    return removeEmptyItems({
      buildState: buildState,
      category,
      value: value,
    });
  }

  // Update items
  const params = Array.isArray(value) ? value.join(',') : value;
  let itemOrItems: Item | Item[] | null = null;

  switch (category) {
    case 'helm':
      itemOrItems = ArmorItem.fromParams(params);
      break;
    case 'torso':
      itemOrItems = ArmorItem.fromParams(params);
      break;
    case 'legs':
      itemOrItems = ArmorItem.fromParams(params);
      break;
    case 'gloves':
      itemOrItems = ArmorItem.fromParams(params);
      break;
    case 'relic':
      itemOrItems = RelicItem.fromParams(params);
      break;
    case 'amulet':
      itemOrItems = AmuletItem.fromParams(params);
      break;
    case 'weapon':
      itemOrItems = WeaponItem.fromParams(params);
      break;
    case 'archetype':
      itemOrItems = ArchetypeItem.fromParams(params);
      break;
    case 'concoction':
      itemOrItems = ConcoctionItem.fromParams(params);
      break;
    case 'consumable':
      itemOrItems = ConsumableItem.fromParams(params);
      break;
    case 'mod':
      itemOrItems = ModItem.fromParams(params);
      break;
    case 'mutator':
      itemOrItems = MutatorItem.fromParams(params);
      break;
    case 'relicfragment':
      itemOrItems = RelicFragmentItem.fromParams(params);
      break;
    case 'ring':
      itemOrItems = RingItem.fromParams(params);
      break;
    case 'skill':
      itemOrItems = SkillItem.fromParams(params);
      break;
    case 'trait':
      itemOrItems = TraitItem.fromParams(params);
      break;
    case 'prism':
      itemOrItems = PrismItem.fromParams(params);
      break;
    case 'fusion':
      itemOrItems = FusionItem.fromParams(params);
      break;
    case 'pylon':
      itemOrItems = PylonItem.fromParams(params);
      break;
    default:
      console.error(`Unknown category ${category}`);
      break;
  }

  if (itemOrItems === null) return buildState;

  return cleanUpBuildState({
    ...buildState,
    items: {
      ...buildState.items,
      [category]: itemOrItems,
    },
  });
}
