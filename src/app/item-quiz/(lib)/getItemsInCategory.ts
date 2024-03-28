import { QuizItem, QuizItemCategory } from '@/app/item-quiz/types'
import { ItemCategory } from '@/features/build/types'
import { allItems } from '@/features/items/data/allItems'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'

const excludedCategories: ItemCategory[] = ['relicfragment', 'mutator', 'trait']
const GAME_ITEMS = allItems.filter(
  (item) => !excludedCategories.some((i) => i === item.category.toLowerCase()),
)

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
    category,
    imagePath: item.imagePath,
    position: 0,
  }))
}
