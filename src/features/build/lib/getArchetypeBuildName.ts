import { archetypeItems } from '@/app/(data)/items/archetypeItems'
import { Archetype } from '@/features/items/types'

import { ARCHETYPE_BUILD_NAMES } from '../constants'

/**
 * Searches the archetype build names for a match
 * for the given archetypes. The archetypes may be in the
 * reverse order of the archetype build names, so we need to
 * check both orders.
 */
export function getArchetypeBuildName({
  archetype1,
  archetype2,
}: {
  archetype1: Archetype | null
  archetype2: Archetype | null
}): string {
  if (!archetype1 || !archetype2) {
    return ''
  }

  const primePerkName = archetypeItems.find(
    (item) => item.name.toLowerCase() === archetype1,
  )?.linkedItems?.perks?.[0].name

  if (!primePerkName) {
    return ''
  }

  const archetypeBuildName = ARCHETYPE_BUILD_NAMES.find(
    (buildName) =>
      (buildName.archetypes[0] === archetype1 &&
        buildName.archetypes[1] === archetype2) ||
      (buildName.archetypes[0] === archetype2 &&
        buildName.archetypes[1] === archetype1),
  )

  if (!archetypeBuildName) {
    return ''
  }

  return `${primePerkName} ${archetypeBuildName.name}`
}
