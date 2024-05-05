import { Item } from '@/app/(data)/items/types'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { EXTERNAL_TOKENS, INLINE_TOKENS } from '@/app/(types)/tokens'

export function itemMatchesSearchText({
  item,
  searchText,
}: {
  item: Item
  searchText: string
}) {
  const inlineTokenItem = INLINE_TOKENS.find((tag) =>
    tag.type.toLowerCase().includes(searchText.toLowerCase()),
  )
  const externalTokenItem = EXTERNAL_TOKENS.find((tag) =>
    tag.token.toLowerCase().includes(searchText.toLowerCase()),
  )

  const itemNameMatch = item.name
    .toLowerCase()
    .includes(searchText.toLowerCase())
  if (itemNameMatch) return true

  let itemDescriptionMatch = item.description
    ?.toLowerCase()
    .includes(searchText.toLowerCase())

  if (inlineTokenItem && itemDescriptionMatch === false) {
    itemDescriptionMatch = item.description
      ?.toLowerCase()
      .includes(inlineTokenItem.token.toLowerCase())
  }

  if (externalTokenItem && itemDescriptionMatch === false) {
    itemDescriptionMatch = item.externalTokens?.some((itemToken) =>
      itemToken.toLowerCase().includes(externalTokenItem.token.toLowerCase()),
    )
  }

  if (itemDescriptionMatch) return true

  // Check the max level bonus if applicable for search text
  if (MutatorItem.isMutatorItem(item)) {
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
