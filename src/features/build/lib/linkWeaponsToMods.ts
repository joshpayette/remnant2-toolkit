import { remnantItems } from '@/features/items/data'
import { BuildState } from '../types'
import { ModItem } from '@/features/items/types/ModItem'

/**
 * Checks the build weapons and equips any mods
 * that are linked to them
 */
export default function linkWeaponsToMods(buildState: BuildState) {
  const newBuildState = { ...buildState }

  // Check the weapons for linked mods
  // If any are found, add them to the build
  const weapons = newBuildState.items.weapon
  weapons.forEach((weapon, index) => {
    const linkedMod = weapon?.linkedItems?.mod
    if (!linkedMod) return

    const modItem = remnantItems.find((mod) => mod.name === linkedMod.name)
    if (!modItem) return

    newBuildState.items.mod[index] = modItem as ModItem
  })

  // Return the build with linked items
  return newBuildState
}
