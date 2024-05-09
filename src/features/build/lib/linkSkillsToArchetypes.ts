import { archetypeItems } from '@/app/(data)/items/archetype-items'
import { BuildState } from '@/app/(types)/builds'

/**
 * Checks the build skills and equips any archetypes
 * that are linked to them
 */
export function linkSkillsToArchetypes(buildState: BuildState) {
  const newBuildState = { ...buildState }

  // Check the skills for linked archetypes
  // If any are found, add them to the build
  const skills = newBuildState.items.skill

  skills.forEach((skill, skillIndex) => {
    const linkedArchetype = skill?.linkedItems?.archetype
    if (!linkedArchetype) return

    const linkedArchetypeItem = archetypeItems.find(
      (item) => linkedArchetype.name === item.name,
    )
    if (!linkedArchetypeItem) return

    newBuildState.items.archetype[skillIndex] = linkedArchetypeItem
  })

  // Return the build with linked items
  return newBuildState
}
