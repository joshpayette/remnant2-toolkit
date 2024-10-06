import { getArrayOfLength } from '@repo/utils';

import { type BuildState } from '@/app/(builds)/_types/build-state';
import { perkItems } from '@/app/(items)/_constants/perk-items';
import { type ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { type Item } from '@/app/(items)/_types/item';
import { type MutatorItem } from '@/app/(items)/_types/mutator-item';
import { type RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { type RingItem } from '@/app/(items)/_types/ring-item';
import { type SkillItem } from '@/app/(items)/_types/skill-item';
import { type WeaponItem } from '@/app/(items)/_types/weapon-item';

export function buildStateToItemList(build: BuildState): Item[] {
  const itemList: Item[] = [];
  const { items } = build;

  // archtypes
  getArrayOfLength(2).forEach((_, i) => {
    if (!items.archetype[i] && !items.skill[i]) return;

    const archetype = items.archetype[i] as ArchetypeItem;
    const skill = items.skill[i] as SkillItem;

    if (archetype) itemList.push(items.archetype[i] as ArchetypeItem);
    if (skill) itemList.push(skill);
  });

  // perks
  getArrayOfLength(2).forEach((_, i) => {
    if (!items.archetype[i]) return;

    const archetype = items.archetype[i] as ArchetypeItem;
    if (archetype) {
      archetype.linkedItems?.perks?.forEach((perk) => {
        const perkItem = perkItems.find((item) => item.name === perk.name);
        if (perkItem) itemList.push(perkItem);
      });
    }
  });

  // armor
  items.helm && itemList.push(items.helm);
  items.torso && itemList.push(items.torso);
  items.legs && itemList.push(items.legs);
  items.gloves && itemList.push(items.gloves);
  items.relic && itemList.push(items.relic);
  getArrayOfLength(3).forEach((_, i) => {
    if (!items.relicfragment[i]) return;
    items.relicfragment[i] &&
      itemList.push(items.relicfragment[i] as RelicFragmentItem);
  });
  items.amulet && itemList.push(items.amulet);
  getArrayOfLength(4).forEach((_, i) => {
    if (!items.ring[i]) return;
    items.ring[i] && itemList.push(items.ring[i] as RingItem);
  });

  // weapons
  getArrayOfLength(3).forEach((_, i) => {
    items.weapon[i] && itemList.push(items.weapon[i] as WeaponItem);
    items.mod[i] && itemList.push(items.mod[i] as Item);
    items.mutator[i] && itemList.push(items.mutator[i] as MutatorItem);
  });

  // traits
  items.trait.forEach((trait) => trait && itemList.push(trait));

  // concoctions
  items.concoction.forEach(
    (concoction) => concoction && itemList.push(concoction),
  );

  // consumables
  items.consumable.forEach(
    (consumable) => consumable && itemList.push(consumable),
  );

  return itemList;
}
