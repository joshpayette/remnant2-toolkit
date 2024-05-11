import { BuildState, ItemCategory } from '@/app/(types)/builds'

export function buildStateToBuildItems(buildState: BuildState): Array<{
  itemId: string
  amount?: number
  index?: number
  category: ItemCategory
}> {
  const { items } = buildState

  const buildItems = [
    { itemId: items.helm?.id ?? '', category: 'helm' as ItemCategory },
    { itemId: items.torso?.id ?? '', category: 'torso' as ItemCategory },
    { itemId: items.legs?.id ?? '', category: 'legs' as ItemCategory },
    { itemId: items.gloves?.id ?? '', category: 'gloves' as ItemCategory },
    { itemId: items.amulet?.id ?? '', category: 'amulet' as ItemCategory },
    { itemId: items.relic?.id ?? '', category: 'relic' as ItemCategory },
    ...(items.ring
      ? items.ring.map((ring, index) => ({
          itemId: ring?.id ?? '',
          category: 'ring' as ItemCategory,
          index,
        }))
      : [{ itemId: '', category: 'ring' as ItemCategory, index: 0 }]),
    ...(items.archetype
      ? items.archetype.map((archetype, index) => ({
          itemId: archetype?.id ?? '',
          category: 'archtype' as ItemCategory, //! database still use `archtype` key
          index,
        }))
      : [{ itemId: '', category: 'archetype' as ItemCategory, index: 0 }]),
    ...(items.skill
      ? items.skill.map((skill, index) => ({
          itemId: skill?.id ?? '',
          category: 'skill' as ItemCategory,
          index,
        }))
      : [{ itemId: '', category: 'skill' as ItemCategory, index: 0 }]),
    ...(items.concoction
      ? items.concoction.map((concoction, index) => ({
          itemId: concoction?.id ?? '',
          category: 'concoction' as ItemCategory,
          index,
        }))
      : [{ itemId: '', category: 'concoction' as ItemCategory, index: 0 }]),
    ...(items.consumable
      ? items.consumable.map((consumable, index) => ({
          itemId: consumable?.id ?? '',
          category: 'consumable' as ItemCategory,
          index,
        }))
      : [{ itemId: '', category: 'consumable' as ItemCategory, index: 0 }]),
    ...(items.weapon
      ? items.weapon.map((weapon, index) => ({
          itemId: weapon?.id ?? '',
          category: 'weapon' as ItemCategory,
          index,
        }))
      : [{ itemId: '', category: 'weapon' as ItemCategory, index: 0 }]),
    ...(items.mod
      ? items.mod.map((mod, index) => ({
          itemId: mod?.id ?? '',
          category: 'mod' as ItemCategory,
          index,
        }))
      : [{ itemId: '', category: 'mod' as ItemCategory, index: 0 }]),
    ...(items.mutator
      ? items.mutator.map((mutator, index) => ({
          itemId: mutator?.id ?? '',
          category: 'mutator' as ItemCategory,
          index,
        }))
      : [{ itemId: '', category: 'mutator' as ItemCategory, index: 0 }]),
    ...(items.relicfragment
      ? items.relicfragment.map((relicfragment, index) => ({
          itemId: relicfragment?.id ?? '',
          category: 'relicfragment' as ItemCategory,
          index,
        }))
      : [{ itemId: '', category: 'relicfragment' as ItemCategory, index: 0 }]),
    ...(items.trait
      ? items.trait.map((trait) => ({
          itemId: trait.id,
          category: 'trait' as ItemCategory,
          amount: trait.amount,
        }))
      : [{ itemId: '', category: 'trait' as ItemCategory, amount: 0 }]),
  ]
  return buildItems
}
