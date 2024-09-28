import { type BuildState } from '@/app/(builds)/_types/build-state';

/**
 * Determines how many concoction slots the build has
 */
export function getConcoctionSlotCount(buildState: BuildState): number {
  // Start at 0 since we already rendered the first concoction
  let concoctionCount = 0;

  // -------------------------------------------------------------------
  // Add 3 concoctions if:
  //  - primary archetype is alchemist
  //  or
  //  - primary skill is an alchemist linked skill, and no archetype is selected
  //
  // Since the user can select a skill without an archetype,
  // we check both values.
  // -------------------------------------------------------------------

  const isPrimaryArchetypeAlchemist =
    buildState.items.archetype[0]?.id === '67pme7';

  const isPrimarySkillAlchemistSkill =
    // Vial: Stone Mist
    buildState.items.skill[0]?.id === 'y7ia9t' ||
    // Vial: Frenzy Dust
    buildState.items.skill[0]?.id === 'xsniv3' ||
    // Vial: Elixir of Life
    buildState.items.skill[0]?.id === '76554i';
  if (isPrimaryArchetypeAlchemist || isPrimarySkillAlchemistSkill)
    concoctionCount += 3;

  // -------------------------------------------------------------------
  // Add 1 concoction if they are wearing Feastmaster's Signet
  // -------------------------------------------------------------------

  const hasFeastmastersSignet = buildState.items.ring.some(
    (ring) => ring?.id === '5q53ke',
  );
  if (hasFeastmastersSignet) concoctionCount += 1;

  // -------------------------------------------------------------------
  // Add 2 concoctions if they are wearing Brewmaster's Cork
  // -------------------------------------------------------------------

  const hasBrewmastersCork = buildState.items.amulet?.id === '6il3tm';
  if (hasBrewmastersCork) concoctionCount += 2;

  // -------------------------------------------------------------------
  // Add 5 concoctions if they are wearing Heavy Drinker
  // -------------------------------------------------------------------

  const hasHeavyDrinker = buildState.items.relicfragment?.some(
    (fragment) => fragment?.id === 'fant12',
  );
  if (hasHeavyDrinker) concoctionCount += 5;

  // -------------------------------------------------------------------
  // Add 1 concoction if they are wearing Mudtooth's Snake Oil
  // -------------------------------------------------------------------
  const hasMudtoothsSnakeOil = buildState.items.concoction.some(
    (concoction) => concoction?.id === 'ru74g9',
  );
  if (hasMudtoothsSnakeOil) concoctionCount += 1;

  return concoctionCount;
}
