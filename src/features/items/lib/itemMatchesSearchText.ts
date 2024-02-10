import { Item } from '../types'

export function itemMatchesSearchText({
  item,
  searchText,
}: {
  item: Item
  searchText: string
}) {
  const itemNameMatch = item.name
    .toLowerCase()
    .includes(searchText.toLowerCase())
  const itemDescriptionMatch = item.description
    ?.toLowerCase()
    .includes(searchText.toLowerCase())
  const itemTagsMatch = item.tags?.some((tag) =>
    tag.toLowerCase().includes(searchText.toLowerCase()),
  )
  // Some perks don't have the archetype name in the description
  const linkedArchetypeNameMatch = item.linkedItems?.archetype?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())

  return (
    itemNameMatch ||
    itemDescriptionMatch ||
    itemTagsMatch ||
    linkedArchetypeNameMatch
  )
}
