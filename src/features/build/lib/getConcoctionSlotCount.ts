import { BuildState } from '../types'

/**
 * Determines how many concoction slots the build has
 */
export function getConcoctionSlotCount(buildState: BuildState): number {
  // Start at 0 since we already rendered the first concoction
  let concoctionCount = 0

  // Add 3 concoctions if primary is alchemist
  // or if the primary skill is an alchemist skill
  const isPrimaryAlchemist =
    buildState.items.archetype[0]?.name?.toLowerCase() === 'alchemist'
  const isPrimarySkillAlchemist =
    buildState.items.skill[0]?.linkedItems?.archetype?.name === 'Alchemist'
  if (isPrimaryAlchemist || isPrimarySkillAlchemist) concoctionCount += 3

  // Add 1 concoction if they are wearing Feastmaster's Signet
  const hasFeastmastersSignet = buildState.items.ring.some(
    (ring) => ring?.name === "Feastmaster's Signet",
  )
  if (hasFeastmastersSignet) concoctionCount += 1

  // Add 2 concoctionc if they are wearing Brewmasters Cork
  const hasBrewmastersCork =
    buildState.items.amulet?.name === 'Brewmasters Cork'

  if (hasBrewmastersCork) concoctionCount += 2

  return concoctionCount
}
