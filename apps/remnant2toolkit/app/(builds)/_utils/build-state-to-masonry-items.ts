import { getArrayOfLength } from '@repo/utils';

import { type BuildState } from '@/app/(builds)/_types/build-state';
import { perkItems } from '@/app/(items)/_data/perk-items';
import { type ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { type Item } from '@/app/(items)/_types/item';
import { type MutatorItem } from '@/app/(items)/_types/mutator-item';
import { type RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { type RingItem } from '@/app/(items)/_types/ring-item';
import { type SkillItem } from '@/app/(items)/_types/skill-item';
import { type WeaponItem } from '@/app/(items)/_types/weapon-item';

export function buildStateToMasonryItems(build: BuildState): Item[] {
  const masonryItems: Item[] = [];
  const { items } = build;

  // archtypes
  getArrayOfLength(2).forEach((_, i) => {
    if (!items.archetype[i] && !items.skill[i]) return;

    const archetype = items.archetype[i] as ArchetypeItem;
    const skill = items.skill[i] as SkillItem;

    if (archetype) masonryItems.push(items.archetype[i] as ArchetypeItem);
    if (skill) masonryItems.push(skill);
  });

  // perks
  getArrayOfLength(2).forEach((_, i) => {
    if (!items.archetype[i]) return;

    const archetype = items.archetype[i] as ArchetypeItem;
    if (archetype) {
      archetype.linkedItems?.perks?.forEach((perk) => {
        const perkItem = perkItems.find((item) => item.name === perk.name);
        if (perkItem) masonryItems.push(perkItem);
      });
    }
  });

  // armor
  items.helm && masonryItems.push(items.helm);
  items.torso && masonryItems.push(items.torso);
  items.legs && masonryItems.push(items.legs);
  items.gloves && masonryItems.push(items.gloves);
  items.relic && masonryItems.push(items.relic);
  getArrayOfLength(3).forEach((_, i) => {
    if (!items.relicfragment[i]) return;
    items.relicfragment[i] &&
      masonryItems.push(items.relicfragment[i] as RelicFragmentItem);
  });
  items.amulet && masonryItems.push(items.amulet);
  getArrayOfLength(4).forEach((_, i) => {
    if (!items.ring[i]) return;
    items.ring[i] && masonryItems.push(items.ring[i] as RingItem);
  });

  // weapons
  getArrayOfLength(3).forEach((_, i) => {
    items.weapon[i] && masonryItems.push(items.weapon[i] as WeaponItem);
    items.mod[i] && masonryItems.push(items.mod[i] as Item);
    items.mutator[i] && masonryItems.push(items.mutator[i] as MutatorItem);
  });

  // traits
  items.trait.forEach((trait) => trait && masonryItems.push(trait));

  // concoctions
  items.concoction.forEach(
    (concoction) => concoction && masonryItems.push(concoction),
  );

  // consumables
  items.consumable.forEach(
    (consumable) => consumable && masonryItems.push(consumable),
  );

  return masonryItems;
}
