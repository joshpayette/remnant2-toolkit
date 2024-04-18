import { allItems } from '@/app/(data)/items/allItems'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { QuizItem, QuizItemCategory } from '@/app/item-quiz/types'
import { ItemCategory } from '@/features/build/types'

const excludedCategories: ItemCategory[] = ['relicfragment', 'mutator', 'trait']
const excludedItemIds: string[] = [
  't412us', // Rusty Repeater, same image as Repeater Pistol
  'gv6yzu', // Rusty Lever Action, same image as Wrangler 1860
]

const GAME_ITEMS = allItems
  .filter(
    (item) =>
      !excludedCategories.some((i) => i === item.category.toLowerCase()),
  )
  .filter((item) => !excludedItemIds.some((i) => i === item.id))

export function getItemsInCategory(category: QuizItemCategory): QuizItem[] {
  let itemsInCategory = []
  switch (category) {
    case 'Mutator (Gun)':
      itemsInCategory = GAME_ITEMS.filter(
        (item) => MutatorItem.isMutatorItem(item) && item.type === 'gun',
      )
      break
    case 'Mutator (Melee)':
      itemsInCategory = GAME_ITEMS.filter(
        (item) => MutatorItem.isMutatorItem(item) && item.type === 'melee',
      )
      break
    case 'Long Gun':
      itemsInCategory = GAME_ITEMS.filter(
        (item) => WeaponItem.isWeaponItem(item) && item.type === 'long gun',
      )
      break
    case 'Hand Gun':
      itemsInCategory = GAME_ITEMS.filter(
        (item) => WeaponItem.isWeaponItem(item) && item.type === 'hand gun',
      )
      break
    case 'Melee':
      itemsInCategory = GAME_ITEMS.filter(
        (item) => WeaponItem.isWeaponItem(item) && item.type === 'melee',
      )
      break
    default:
      itemsInCategory = GAME_ITEMS.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase(),
      )
      break
  }

  return itemsInCategory.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? '',
    category,
    imagePath: item.imagePath,
    position: 0,
  }))
}
