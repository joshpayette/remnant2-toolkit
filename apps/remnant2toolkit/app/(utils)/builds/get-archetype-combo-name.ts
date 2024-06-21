import { archetypeItems } from '@/app/(data)/items/archetype-items'

import { ARCHETYPE_COMBO_NAMES } from '../../(data)/builds/constants'

export type ArchetypeName =
  | 'alchemist'
  | 'archon'
  | 'challenger'
  | 'engineer'
  | 'explorer'
  | 'gunslinger'
  | 'handler'
  | 'hunter'
  | 'invader'
  | 'invoker'
  | 'medic'
  | 'ritualist'
  | 'summoner'

/**
 * Searches the archetype build names for a match
 * for the given archetypes. The archetypes may be in the
 * reverse order of the archetype build names, so we need to
 * check both orders.
 */
export function getArchetypeComboName({
  archetype1,
  archetype2,
}: {
  archetype1: ArchetypeName | null
  archetype2: ArchetypeName | null
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

  const archetypeBuildName = ARCHETYPE_COMBO_NAMES.find(
    (comboName) =>
      (comboName.archetypes[0] === archetype1 &&
        comboName.archetypes[1] === archetype2) ||
      (comboName.archetypes[0] === archetype2 &&
        comboName.archetypes[1] === archetype1),
  )

  if (!archetypeBuildName) {
    return ''
  }

  return `${primePerkName} ${archetypeBuildName.name}`
}
