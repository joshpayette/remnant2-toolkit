import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { allItems } from '@/app/(items)/_constants/all-items';
import { type ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { type Item } from '@/app/(items)/_types/item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';

/**
 * Returns a list of items that match the selected slot
 * Takes into account the build's current items and the selected slot
 * This is passed to the ItemSelect modal to display the correct items
 */
export function getItemListForSlot(
  buildState: BuildState,
  selectedItem: {
    category: ItemCategory | null;
    index?: number; // Used for slots that can have multiple items, such as rings
  },
) {
  if (!selectedItem.category) return [];

  // Remove items that are already in the build
  // for the current category
  const unequippedItems = allItems.filter((item) => {
    const categoryItemorItems = buildState.items[item.category];
    if (!categoryItemorItems) return true;

    if (Array.isArray(categoryItemorItems)) {
      const buildItems = categoryItemorItems;
      return !buildItems.find((i) => i?.id === item.id);
    } else {
      const buildItem = categoryItemorItems;
      return buildItem?.id !== item.id;
    }
  });

  // If the selected slot is a weapon, then limit the
  // weapons based on the corresponding weapon type
  if (selectedItem.category === 'weapon') {
    let type: WeaponItem['type'];
    switch (selectedItem.index) {
      case 0:
        type = 'long gun';
        break;
      case 1:
        type = 'melee';
        break;
      case 2:
        type = 'hand gun';
        break;
    }

    return unequippedItems.filter(
      (item) => WeaponItem.isWeaponItem(item) && item.type === type,
    );
  }

  // If the selected slot is a mod, then limit the
  // mods to those without a linked weapon
  if (selectedItem.category === 'mod') {
    // If melee weapon is selected, no mods are allowed that are not linked
    // to a melee weapon
    if (selectedItem.index === 1) {
      return [];
    }

    return unequippedItems.filter(
      (item) => item.category === 'mod' && !item.linkedItems?.weapon,
    );
  }

  // If the selected slot is a mutator,
  // then limit the mutators to the weapon type
  if (selectedItem.category === 'mutator') {
    // Get the corresponding weapon from the build
    const buildWeapon = buildState.items.weapon[selectedItem.index ?? 0];
    if (!buildWeapon) return [];

    const weaponType = buildWeapon.type === 'melee' ? 'melee' : 'gun';

    return unequippedItems.filter(
      (item) => MutatorItem.isMutatorItem(item) && item.type === weaponType,
    );
  }

  // If the selected slot is a skill, try to limit
  // skills based on the equipped archetypes
  if (selectedItem.category === 'skill') {
    const skillItems = unequippedItems.filter(
      (item) => item.category === 'skill',
    );

    if (selectedItem.index === undefined) return skillItems;

    const archetype =
      buildState.items.archetype[selectedItem.index]?.name.toLowerCase();

    const otherArchetypeIndex = selectedItem.index === 0 ? 1 : 0;
    const otherArchetype =
      buildState.items.archetype[otherArchetypeIndex]?.name.toLowerCase();

    if (!archetype && !otherArchetype) return skillItems;

    const itemsForArchetype = skillItems.filter(
      (item) => item.linkedItems?.archetype?.name.toLowerCase() === archetype,
    );

    const itemsForOtherArchetype = skillItems.filter(
      (item) =>
        item.linkedItems?.archetype?.name.toLowerCase() === otherArchetype,
    );

    // If current archetype is empty, then all skill items can be returned
    const finalSkillList =
      itemsForArchetype.length === 0 ? skillItems : itemsForArchetype;

    // remove itemsForOtherArchetype from itemsForArchetype
    return finalSkillList.filter(
      (item) => !itemsForOtherArchetype.find((i) => i.id === item.id),
    );
  }

  // If the selected slot is an archetype, try to limit
  // the archetypes based on the corresponding skill
  if (selectedItem.category === 'archetype') {
    const archtypeItems = (unequippedItems as ArchetypeItem[]).filter(
      (item) => item.category === 'archetype',
    );

    if (selectedItem.index === undefined) return archtypeItems;

    const skill =
      buildState.items.skill[selectedItem.index]?.name.toLowerCase();

    if (!skill) return archtypeItems;

    const itemsForSkill = archtypeItems.filter(
      (item) =>
        item.linkedItems?.skills?.some((s) => s.name.toLowerCase() === skill),
    );

    return itemsForSkill;
  }

  // If the selected slot is a relicfragment, we need to limit
  // the items based on the index.
  // The first 3 indexes for relic fragments are the main fragments.
  // These fragments can also show up in the next 5 slots as bonus fragments.
  if (selectedItem.category === 'relicfragment') {
    const allFragmentItems = allItems.filter(
      (item) => item.category === 'relicfragment',
    );

    if (selectedItem.index === undefined) return allFragmentItems;

    // If the index is 0-3, then we are looking at the main fragments
    // We need to remove the equipped main fragments from the list
    if (selectedItem.index < 3) {
      const mainFragments = buildState.items.relicfragment.slice(0, 3);
      return allFragmentItems.filter(
        (item) =>
          RelicFragmentItem.isRelicFragmentItem(item) &&
          !mainFragments.find((f) => f?.id === item.id) &&
          item.color !== 'legendary',
      );
    }

    // If the index is 3-8, then we are looking at the bonus fragments
    // We need to remove the equipped bonus fragments from the list
    if (selectedItem.index < 8) {
      const bonusFragments = buildState.items.relicfragment.slice(3, 8);
      return allFragmentItems.filter(
        (item) =>
          RelicFragmentItem.isRelicFragmentItem(item) &&
          !bonusFragments.find((f) => f?.id === item.id) &&
          item.color !== 'legendary',
      );
    }

    // If the index is 8, then we are looking at the legendary fragment
    // We need to remove the equipped legendary fragment from the list
    const legendaryFragment = buildState.items.relicfragment[8];
    return allFragmentItems.filter(
      (item) =>
        RelicFragmentItem.isRelicFragmentItem(item) &&
        item.color === 'legendary' &&
        item.id !== legendaryFragment?.id,
    );
  }

  // If we got this far, then return all items for the selected slot
  return (unequippedItems as Item[]).filter(
    (item) => item.category === selectedItem.category,
  );
}
