import { remnantItems } from '@/features/items/data'
import { BuildState } from '../types'
import { TraitItem } from '@/features/items/types/TraitItem'
import { DEFAULT_TRAIT_AMOUNT } from '../constants'

/**
 * Checks the build archtypes and equips any traints
 * that are linked to them
 */
export default function linkArchtypesToTraits(buildState: BuildState) {
  const newBuildState = { ...buildState }

  // Check the archtypes for linked traits
  // If any are found, add them to the build
  const archtypes = newBuildState.items.archtype

  archtypes.forEach((archtype, archtypeIndex) => {
    const linkedTraits = archtype?.linkedItems?.traits
    if (!linkedTraits) return

    const linkedTraitItems = remnantItems.filter((item) =>
      linkedTraits.some(
        (linkedTrait) =>
          linkedTrait.name === item.name && item.category === 'trait',
      ),
    ) as TraitItem[]
    if (!linkedTraitItems) return

    // if any items aren't valid trait items, error
    const invalidItems = linkedTraitItems.filter(
      (traitItem) => !TraitItem.isTraitItem(traitItem),
    )
    if (invalidItems.length > 0) {
      console.error(
        `Invalid traits found for archtype ${archtype.name}: ${invalidItems}`,
      )
      return
    }

    for (const linkedTraitItem of linkedTraitItems) {
      // if we are not on the primary archtype, skip this linkedTraitItem if it does
      // not have a value of 10 (we don't add core values for secondary archtypes)
      const linkedTrait = linkedTraits.find(
        (trait) => trait.name === linkedTraitItem.name,
      )
      if (archtypeIndex === 1 && linkedTrait?.amount !== 10) continue

      const existingBuildTrait = newBuildState.items.trait.find(
        (trait) => trait.name === linkedTraitItem.name,
      )

      let defaultTraitAmount = DEFAULT_TRAIT_AMOUNT

      // If we are on the primary archtype, determine the core
      // trait amounts to use as defaults
      if (archtypeIndex === 0) {
        defaultTraitAmount =
          linkedTraits.find((trait) => trait.name === linkedTraitItem.name)
            ?.amount ?? DEFAULT_TRAIT_AMOUNT
      }

      // If the trait already exists with a value that is greater
      // than the default amount, use the existing amount
      const traitAmount = existingBuildTrait?.amount ?? defaultTraitAmount

      // If the trait is already in the build, set the amount to the default value
      // Otherwise, add the trait to the build
      if (existingBuildTrait) {
        existingBuildTrait.amount = traitAmount

        newBuildState.items.trait = newBuildState.items.trait.map((trait) =>
          trait.name === linkedTraitItem.name ? existingBuildTrait : trait,
        )
      } else {
        newBuildState.items.trait.push(
          new TraitItem({
            amount: traitAmount,
            id: linkedTraitItem.id,
            name: linkedTraitItem.name,
            category: linkedTraitItem.category,
            imagePath: linkedTraitItem.imagePath,
            description: linkedTraitItem.description ?? '',
            maxLevelBonus: linkedTraitItem.maxLevelBonus ?? '',
            howToGet: linkedTraitItem.howToGet ?? '',
            wikiLinks: linkedTraitItem.wikiLinks ?? [],
            linkedItems: linkedTraitItem.linkedItems ?? {},
            saveFileSlug: linkedTraitItem.saveFileSlug,
            healthStep: linkedTraitItem.healthStep ?? 0,
            healthStepPercent: linkedTraitItem.healthStepPercent ?? 0,
            armorStep: linkedTraitItem.armorStep ?? 0,
            armorStepPercent: linkedTraitItem.armorStepPercent ?? 0,
            staminaStep: linkedTraitItem.staminaStep ?? 0,
            staminaStepPercent: linkedTraitItem.staminaStepPercent ?? 0,
          }),
        )
      }
    }
  })

  // *We deliberately don't check the traits and link to archtypes,
  // *since traits can be used without the archtype equipped
  // Return the build with linked items
  return newBuildState
}
