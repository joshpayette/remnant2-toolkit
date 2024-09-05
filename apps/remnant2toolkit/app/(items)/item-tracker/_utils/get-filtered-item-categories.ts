import { type Item } from '@/app/(items)/_types/item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';
import { type ItemTrackerCategory } from '@/app/(items)/item-tracker/_types';

export function getFilteredItemCategories(
  filteredItems: Array<Item & { discovered: boolean }>,
): ItemTrackerCategory[] {
  const filteredItemCategories: ItemTrackerCategory[] = [];

  const helmItemsFound = filteredItems.some((item) => item.category === 'helm');
  if (helmItemsFound) filteredItemCategories.push('Helm');

  const torsoItemsFound = filteredItems.some(
    (item) => item.category === 'torso',
  );
  if (torsoItemsFound) filteredItemCategories.push('Torso');

  const legsItemsFound = filteredItems.some((item) => item.category === 'legs');
  if (legsItemsFound) filteredItemCategories.push('Legs');

  const glovesItemsFound = filteredItems.some(
    (item) => item.category === 'gloves',
  );
  if (glovesItemsFound) filteredItemCategories.push('Gloves');

  const amuletItemsFound = filteredItems.some(
    (item) => item.category === 'amulet',
  );
  if (amuletItemsFound) filteredItemCategories.push('Amulet');

  const ringItemsFound = filteredItems.some((item) => item.category === 'ring');
  if (ringItemsFound) filteredItemCategories.push('Ring');

  const relicItemsFound = filteredItems.some(
    (item) => item.category === 'relic',
  );
  if (relicItemsFound) filteredItemCategories.push('Relic');

  const relicFragmentItemsFound = filteredItems.some(
    (item) => item.category === 'relicfragment',
  );
  if (relicFragmentItemsFound) filteredItemCategories.push('Relic Fragment');

  const archetypeItemsFound = filteredItems.some(
    (item) => item.category === 'archetype',
  );
  if (archetypeItemsFound) filteredItemCategories.push('Archetype');

  const traitItemsFound = filteredItems.some(
    (item) => item.category === 'trait',
  );
  if (traitItemsFound) filteredItemCategories.push('Trait');

  const longGunItemsFound = filteredItems.some(
    (item) => WeaponItem.isWeaponItem(item) && item.type === 'long gun',
  );
  if (longGunItemsFound) filteredItemCategories.push('Long Gun');

  const handGunItemsFound = filteredItems.some(
    (item) => WeaponItem.isWeaponItem(item) && item.type === 'hand gun',
  );
  if (handGunItemsFound) filteredItemCategories.push('Hand Gun');

  const meleeItemsFound = filteredItems.some(
    (item) => WeaponItem.isWeaponItem(item) && item.type === 'melee',
  );
  if (meleeItemsFound) filteredItemCategories.push('Melee');

  const modItemsFound = filteredItems.some((item) => item.category === 'mod');
  if (modItemsFound) filteredItemCategories.push('Mod');

  const mutatorGunItemsFound = filteredItems.some(
    (item) => MutatorItem.isMutatorItem(item) && item.type === 'gun',
  );
  if (mutatorGunItemsFound) filteredItemCategories.push('Mutator (Gun)');

  const mutatorMeleeItemsFound = filteredItems.some(
    (item) => MutatorItem.isMutatorItem(item) && item.type === 'melee',
  );
  if (mutatorMeleeItemsFound) filteredItemCategories.push('Mutator (Melee)');

  const concoctionItemsFound = filteredItems.some(
    (item) => item.category === 'concoction',
  );
  if (concoctionItemsFound) filteredItemCategories.push('Concoction');

  const consumableItemsFound = filteredItems.some(
    (item) => item.category === 'consumable',
  );
  if (consumableItemsFound) filteredItemCategories.push('Consumable');

  return filteredItemCategories;
}
