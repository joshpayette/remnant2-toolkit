import { perkItems } from '@/app/(data)/items/perk-items';
import { PerkItem } from '@/app/(data)/items/types/PerkItem';
import { BuildState } from '@/app/(features)/builds/types/build-state';

/**
 * Checks the build archtypes and equips any perks
 * that are linked to them
 */
export function linkArchetypesToPerks(buildState: BuildState) {
  const newBuildState = { ...buildState };

  // Check the archtypes for linked perks
  // If any are found, add them to the build
  const archtypes = newBuildState.items.archetype;

  archtypes.forEach((archetype, archetypeIndex) => {
    const linkedPerks = archetype?.linkedItems?.perks;
    if (!linkedPerks) return;

    let linkedPerkItems = perkItems.filter((item) =>
      linkedPerks.some((linkedPerk) => linkedPerk.name === item.name),
    ) as PerkItem[];
    if (!linkedPerkItems) return;

    // if any items aren't valid perk items, error
    const invalidItems = linkedPerkItems.filter(
      (traitItem) => !PerkItem.isPerkItem(traitItem),
    );
    if (invalidItems.length > 0) {
      console.error(
        `Invalid perks found for archtype ${archetype.name}: ${invalidItems}`,
      );
      return;
    }

    // if this is not the primary archetype, remove the prime perk
    if (archetypeIndex === 1) {
      linkedPerkItems = linkedPerkItems.filter((perk) => perk.type !== 'prime');
    }

    newBuildState.items.perk = newBuildState.items.perk.concat(linkedPerkItems);
  });

  // *We deliberately don't check the traits and link to archtypes,
  // *since traits can be used without the archtype equipped
  // Return the build with linked items
  return newBuildState;
}
