import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type ItemCategory } from '@/app/(builds)/_types/item-category';

export function buildStateToBuildItems(buildState: BuildState): Array<{
  itemId: string;
  amount?: number;
  index?: number;
  optional?: boolean;
  category: ItemCategory;
}> {
  const { items } = buildState;

  const buildItems = [
    {
      itemId: items.helm?.id ?? '',
      category: 'helm' as ItemCategory,
      optional: items.helm?.optional ?? false,
    },
    {
      itemId: items.torso?.id ?? '',
      category: 'torso' as ItemCategory,
      optional: items.torso?.optional ?? false,
    },
    {
      itemId: items.legs?.id ?? '',
      category: 'legs' as ItemCategory,
      optional: items.legs?.optional ?? false,
    },
    {
      itemId: items.gloves?.id ?? '',
      category: 'gloves' as ItemCategory,
      optional: items.gloves?.optional ?? false,
    },
    {
      itemId: items.amulet?.id ?? '',
      category: 'amulet' as ItemCategory,
      optional: items.amulet?.optional ?? false,
    },
    {
      itemId: items.relic?.id ?? '',
      category: 'relic' as ItemCategory,
      optional: items.relic?.optional ?? false,
    },
    ...(items.ring
      ? items.ring.map((ring, index) => ({
          itemId: ring?.id ?? '',
          category: 'ring' as ItemCategory,
          index,
          optional: ring?.optional ?? false,
        }))
      : [
          {
            itemId: '',
            category: 'ring' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.archetype
      ? items.archetype.map((archetype, index) => ({
          itemId: archetype?.id ?? '',
          category: 'archtype' as ItemCategory, //! database still use `archtype` key
          optional: archetype?.optional ?? false,
          index,
        }))
      : [
          {
            itemId: '',
            category: 'archetype' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.skill
      ? items.skill.map((skill, index) => ({
          itemId: skill?.id ?? '',
          category: 'skill' as ItemCategory,
          optional: skill?.optional ?? false,
          index,
        }))
      : [
          {
            itemId: '',
            category: 'skill' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.concoction
      ? items.concoction.map((concoction, index) => ({
          itemId: concoction?.id ?? '',
          category: 'concoction' as ItemCategory,
          optional: concoction?.optional ?? false,
          index,
        }))
      : [
          {
            itemId: '',
            category: 'concoction' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.consumable
      ? items.consumable.map((consumable, index) => ({
          itemId: consumable?.id ?? '',
          category: 'consumable' as ItemCategory,
          optional: consumable?.optional ?? false,
          index,
        }))
      : [
          {
            itemId: '',
            category: 'consumable' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.weapon
      ? items.weapon.map((weapon, index) => ({
          itemId: weapon?.id ?? '',
          category: 'weapon' as ItemCategory,
          optional: weapon?.optional ?? false,
          index,
        }))
      : [
          {
            itemId: '',
            category: 'weapon' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.mod
      ? items.mod.map((mod, index) => ({
          itemId: mod?.id ?? '',
          category: 'mod' as ItemCategory,
          optional: mod?.optional ?? false,
          index,
        }))
      : [
          {
            itemId: '',
            category: 'mod' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.mutator
      ? items.mutator.map((mutator, index) => ({
          itemId: mutator?.id ?? '',
          category: 'mutator' as ItemCategory,
          optional: mutator?.optional ?? false,
          index,
        }))
      : [
          {
            itemId: '',
            category: 'mutator' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.relicfragment
      ? items.relicfragment.map((relicfragment, index) => ({
          itemId: relicfragment?.id ?? '',
          category: 'relicfragment' as ItemCategory,
          optional: relicfragment?.optional ?? false,
          index,
        }))
      : [
          {
            itemId: '',
            category: 'relicfragment' as ItemCategory,
            index: 0,
            optional: false,
          },
        ]),
    ...(items.trait
      ? items.trait.map((trait) => ({
          itemId: trait.id,
          category: 'trait' as ItemCategory,
          optional: trait.optional ?? false,
          amount: trait.amount,
        }))
      : [
          {
            itemId: '',
            category: 'trait' as ItemCategory,
            amount: 0,
            optional: false,
          },
        ]),
  ];
  return buildItems;
}
