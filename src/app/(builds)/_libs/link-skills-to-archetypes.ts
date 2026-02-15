import { type BuildState } from '@/app/(builds)/_types/build-state';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

/**
 * Checks the build skills and equips any archetypes
 * that are linked to them
 */
export function linkSkillsToArchetypes(buildState: BuildState) {
  const newBuildState = { ...buildState };

  // Check the skills for linked archetypes
  // If any are found, add them to the build
  const skills = newBuildState.items.skill;

  skills.forEach((skill, skillIndex) => {
    const linkedArchetype = skill?.linkedItems?.archetype;
    if (!linkedArchetype) return;

    const linkedArchetypeItem = archetypeItems.find(
      (item) => linkedArchetype.name === item.name,
    );
    if (!linkedArchetypeItem) return;

    // If archetype is already equipped, skip
    if (
      newBuildState.items.archetype[skillIndex]?.id === linkedArchetypeItem.id
    ) {
      return;
    }

    newBuildState.items.archetype[skillIndex] = linkedArchetypeItem;
  });

  // Return the build with linked items
  return newBuildState;
}
