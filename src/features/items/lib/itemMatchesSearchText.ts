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

  let itemDescriptionMatch = item.description
    ?.toLowerCase()
    .includes(searchText.toLowerCase())
  if (tagItem && itemDescriptionMatch === false) {
    itemDescriptionMatch = item.description
      ?.toLowerCase()
      .includes(tagItem.token.toLowerCase())
  }

  const itemTagsMatch = item.tags?.some((tag) =>
    tag.toLowerCase().includes(searchText.toLowerCase()),
  )

  const linkedArchetypeNameMatch = item.linkedItems?.archetype?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())

  const linkedWeaponNameMatch = item.linkedItems?.weapon?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())

  const linkedModNameMatch = item.linkedItems?.mod?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())

  return (
    itemNameMatch ||
    itemDescriptionMatch ||
    itemTagsMatch ||
    linkedArchetypeNameMatch ||
    linkedWeaponNameMatch ||
    linkedModNameMatch
  )
}
