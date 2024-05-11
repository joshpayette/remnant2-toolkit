import { modItems } from '@/app/(data)/items/mod-items'
import { ModItem } from '@/app/(data)/items/types/ModItem'
import { BuildState } from '@/app/(types)/builds'

/**
 * Checks the build weapons and equips any mods
 * that are linked to them
 */
export function linkWeaponsToMods(buildState: BuildState) {
  const newBuildState = { ...buildState }

  // Check the weapons for linked mods
  // If any are found, add them to the build
  const weapons = newBuildState.items.weapon
  weapons.forEach((weapon, index) => {
    const linkedMod = weapon?.linkedItems?.mod
    if (!linkedMod) return

    const modItem = modItems.find((mod) => mod.name === linkedMod.name)
    if (!modItem) return

    newBuildState.items.mod[index] = modItem as ModItem
  })

  // Return the build with linked items
  return newBuildState
}
