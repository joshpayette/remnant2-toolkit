import { BuildState } from '../types'

/**
 * Determines how many concoction slots the build has
 */
export function getConcoctionSlotCount(buildState: BuildState): number {
  // Start at 0 since we already rendered the first concoction
  let concoctionCount = 0

  // Add 3 concoctions if primary is alchemist
  // or if the primary skill is an alchemist skill
  const isPrimaryAlchemist =              // In case user selects alchemist skill without selecting alchemist
    buildState.items.archetype[0]?.id === '67pme7' // Alchemist
  const isPrimarySkillAlchemist =
    buildState.items.skill[0]?.linkedItems?.archetype?.id === '67pme7' // Alchemist
  if (isPrimaryAlchemist || isPrimarySkillAlchemist) concoctionCount += 3

  // Add 1 concoction if they are wearing Feastmaster's Signet
  const hasFeastmastersSignet = buildState.items.ring.some(
    (ring) => ring?.id === "5q53ke", // Feastmaster's Signet
  )
  if (hasFeastmastersSignet) concoctionCount += 1

  // Add 2 concoctionc if they are wearing Brewmasters Cork
  const hasBrewmastersCork =
    buildState.items.amulet?.id === '6il3tm' // Brewmaster's Cork

  if (hasBrewmastersCork) concoctionCount += 2

  return concoctionCount