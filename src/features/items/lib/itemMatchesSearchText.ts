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
  const linkedArchetypeNameMatch = item.linkedItems?.archetype?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())

  const linkedWeaponNameMatch = item.linkedItems?.weapon?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())

  const linkedModNameMatch = item.linkedItems?.mod?.name
    .toLowerCase()
    .includes(searchText.toLowerCase())

  // * Not automating comparing every linkeditem because it acts
  // * weird with skills. For example, searching `HUNTER`
  // * will return the Explorer archetype with no clear reason why,
  // * but it's because the Explorer is linked to the Fortune Hunter
  // * skill. So it's better to be specific about which linked items
  // * we want to compare
  // Get all of the linked item keys and check if any of them match
  // the search text
  // let linkedItemMatch = false

  // const linkedItemKeys = Object.keys(
  //   item.linkedItems || {},
  // ) as (keyof LinkedItems)[]

  // for (const linkedItemKey of linkedItemKeys) {
  //   const linkedItem = item.linkedItems?.[linkedItemKey]

  //   if (!linkedItem) {
  //     continue
  //   }

  //   if (Array.isArray(linkedItem)) {
  //     for (const linkedItemArrayItem of linkedItem) {
  //       if (
  //         linkedItemArrayItem.name
  //           .toLowerCase()
  //           .includes(searchText.toLowerCase())
  //       ) {
  //         linkedItemMatch = true
  //         break
  //       }
  //     }
  //   } else {
  //     if (linkedItem.name.toLowerCase().includes(searchText.toLowerCase())) {
  //       linkedItemMatch = true
  //       break
  //     }
  //   }
  // }

  return (
    itemNameMatch ||
    itemDescriptionMatch ||
    itemTagsMatch ||
    linkedArchetypeNameMatch ||
    linkedWeaponNameMatch ||
    linkedModNameMatch
  )
}
