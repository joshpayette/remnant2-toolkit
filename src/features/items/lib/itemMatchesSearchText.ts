import { MutatorItem } from '../../../app/(data)/items/types/MutatorItem'
import { TraitItem } from '../../../app/(data)/items/types/TraitItem'
import { DESCRIPTION_TAGS } from '../constants'
import { Item } from '../types'

export function itemMatchesSearchText({
  item,
  searchText,
}: {
  item: Item
  searchText: string
}) {
  const tagItem = DESCRIPTION_TAGS.find((tag) =>
    tag.type.toLowerCase().includes(searchText.toLowerCase()),
  )

  const itemNameMatch = item.name
    .toLowerCase()
    .includes(searchText.toLowerCase())
  if (itemNameMatch) return true

  let itemDescriptionMatch = item.description
    ?.toLowerCase()
    .includes(searchText.toLowerCase())
  if (tagItem && itemDescriptionMatch === false) {
    itemDescriptionMatch = item.description
      ?.toLowerCase()
      .includes(tagItem.token.toLowerCase())
  }
  if (itemDescriptionMatch) return true

  // Check the max level bonus if applicable for search text
  if (MutatorItem.isMutatorItem(item) || TraitItem.isTraitItem(item)) {
    const maxLevelBonusMatch = item.maxLevelBonus
      ?.toLowerCase()
      .includes(searchText.toLowerCase())
    if (maxLevelBonusMatch) return true
  }

  const itemCategoryMatch = item.category
    .toLowerCase()
    .includes(searchText.toLowerCase())
  if (itemCategoryMatch) return true

  const itemTagsMatch = item.tags?.some((tag) =>
    tag.toLowerCase().includes(searchText.toLowerCase()),
  )
  if (itemTagsMatch) return true

  const linkedArchetypeNameMatch = item.linkedItems?.archetype?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())
  if (linkedArchetypeNameMatch) return true

  const linkedWeaponNameMatch = item.linkedItems?.weapon?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())
  if (linkedWeaponNameMatch) return true

  const linkedModNameMatch = item.linkedItems?.mod?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())
  if (linkedModNameMatch) return true

  return false
}
