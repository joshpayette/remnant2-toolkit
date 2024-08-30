import { type BuildState } from '@/app/(builds)/_types/build-state';
import { modItems } from '@/app/(data)/items/mod-items';
import { type ModItem } from '@/app/(data)/items/types/ModItem';

/**
 * Checks the build weapons and equips any mods
 * that are linked to them
 */
export function linkWeaponsToMods(buildState: BuildState) {
  const newBuildState = { ...buildState };

  // Check the weapons for linked mods
  // If any are found, add them to the build
  const weapons = newBuildState.items.weapon;
  weapons.forEach((weapon, index) => {
    const linkedMod = weapon?.linkedItems?.mod;
    if (!linkedMod) return;

    const linkedModItem = modItems.find((mod) => mod.name === linkedMod.name);
    if (!linkedModItem) return;

    // If mod is already equipped, skip
    if (newBuildState.items.mod[index]?.id === linkedModItem.id) {
      return;
    }

    newBuildState.items.mod[index] = linkedModItem as ModItem;
  });

  // Return the build with linked items
  return newBuildState;
}
