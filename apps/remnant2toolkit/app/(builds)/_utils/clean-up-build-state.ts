import { type BuildState } from '@/app/(builds)/_types/build-state';
import { linkArchetypesToPerks } from '@/app/(builds)/_utils/link-archetypes-to-perks';
import { traitItems } from '@/app/(items)/_constants/trait-items';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';
import { type ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { type TraitItem } from '@/app/(items)/_types/trait-item';

import { getConcoctionSlotCount } from './get-concoction-slot-count';
import { linkArchetypesToTraits } from './link-archetypes-to-traits';
import { linkSkillsToArchetypes } from './link-skills-to-archetypes';
import { linkWeaponsToMods } from './link-weapons-to-mods';

/**
 * When a build is updated or loaded, this function is called to ensure
 * the buildstate is in a clean state.
 *   - Cleans up unequipped mods that may still be in the state
 *   - Cleans up excess concotions that may still be equipped
 *   - Ensures the minimum required trait points are equipped
 *   - Ensures that the prime archetype trait has 10 points
 */
export function cleanUpBuildState(buildState: BuildState): BuildState {
  // Look at each mod and if it is linked to the wrong weapon, remove it
  buildState.items.mod = buildState.items.mod.map((mod, index) => {
    if (mod?.linkedItems?.weapon) {
      const linkedWeapon = weaponItems.find(
        (item) => item.name === mod.linkedItems?.weapon?.name,
      );

      if (!linkedWeapon) {
        return null;
      }

      if (buildState.items.weapon[index]?.id !== linkedWeapon.id) {
        return null;
      }
    }
    return mod;
  });

  // Get the new number of allowed concoctions
  // If there are more than the allowed amount, remove the last ones
  const totalConcoctionsAllowed = getConcoctionSlotCount(buildState) + 1;
  if (totalConcoctionsAllowed < buildState.items.concoction.length) {
    buildState.items.concoction = buildState.items.concoction.slice(
      0,
      totalConcoctionsAllowed,
    );
  }

  // Update the trait points to match the minimum for the selected primary archetype
  const primaryArchetype = buildState.items.archetype[0];
  if (primaryArchetype) {
    setArchetypePrimeTraitPoints(primaryArchetype, buildState, 'primary');
  }

  // Update the trait points to match the minimum for the selected secondary archetype
  const secondaryArchetype = buildState.items.archetype[1];
  if (secondaryArchetype) {
    setArchetypePrimeTraitPoints(secondaryArchetype, buildState, 'secondary');
  }

  // link weapons to mods
  buildState = linkWeaponsToMods(buildState);
  // link skills to archetypes
  buildState = linkSkillsToArchetypes(buildState);
  // link perks to archetypes
  buildState = linkArchetypesToPerks(buildState);
  // link archetypes to traits
  buildState = linkArchetypesToTraits(buildState);

  return buildState;
}

/**
 * Ensures that the provided archetype's primary trait has the correct
 * amount of trait points equipped.
 */
function setArchetypePrimeTraitPoints(
  archetype: ArchetypeItem,
  buildState: BuildState,
  type: 'primary' | 'secondary',
) {
  const archetypeTraits = archetype.linkedItems?.traits;
  if (!archetypeTraits) return buildState;

  let archetypeTraitItems = traitItems.filter(
    (item) =>
      archetypeTraits.some((trait) => trait.name === item.name) &&
      item.category === 'trait',
  ) as TraitItem[];

  // if secondary, we only need the 10 point trait
  if (type === 'secondary') {
    archetypeTraitItems = archetypeTraitItems.filter(
      (trait) => trait.type === 'archetype',
    );
  }

  for (const archetypeTrait of archetypeTraits) {
    const traitItem = archetypeTraitItems.find(
      (item) => item.name === archetypeTrait.name,
    );
    if (!traitItem) continue;

    const currentTraitAmount = buildState.items.trait.find(
      (trait) => trait?.id === traitItem.id,
    )?.amount;

    if (!currentTraitAmount) {
      buildState.items.trait.push({
        ...traitItem,
        amount: archetypeTrait.amount,
      });
    }

    if (currentTraitAmount && currentTraitAmount < archetypeTrait.amount) {
      buildState.items.trait = buildState.items.trait.map((trait) => {
        if (trait?.id === traitItem.id) {
          return {
            ...trait,
            amount: archetypeTrait.amount,
          };
        }
        return trait;
      });
    }
  }
}
