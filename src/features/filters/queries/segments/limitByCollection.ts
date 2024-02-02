import { remnantItems } from '@/features/items/data/remnantItems'
import { Prisma } from '@prisma/client'

/**
 * Takes a list of itemIds and adds any linked items to the list
 */
function addLinkedItemIds(itemIds: string[]): string[] {
  for (const itemId of itemIds) {
    const currentItem = remnantItems.find((item) => item.id === itemId)

    if (currentItem?.linkedItems?.mod) {
      const modItem = remnantItems.find(
        (item) => item.name === currentItem.linkedItems?.mod?.name,
      )
      if (!modItem) {
        console.error(`Could not find mod item for ${currentItem.name}`)
        continue
      }
      itemIds.push(modItem.id)
    }

    if (currentItem?.linkedItems?.skills) {
      for (const skill of currentItem.linkedItems.skills) {
        const skillItem = remnantItems.find((item) => item.name === skill.name)
        if (!skillItem) {
          console.error(`Could not find skill item for ${currentItem.name}`)
          continue
        }
        itemIds.push(skillItem.id)
      }
    }

    if (currentItem?.linkedItems?.traits) {
      for (const trait of currentItem.linkedItems.traits) {
        const traitItem = remnantItems.find((item) => item.name === trait.name)
        if (!traitItem) {
          console.error(`Could not find trait item for ${currentItem.name}`)
          continue
        }

        itemIds.push(traitItem.id)
      }
    }
  }

  return itemIds
}

export function limitByCollectionSegment({
  allOwnedItemIds,
  userId,
}: {
  allOwnedItemIds: string[]
  userId: string
}) {
  return allOwnedItemIds.length === 0
    ? Prisma.empty
    : Prisma.sql`AND NOT EXISTS (
      SELECT 1
      FROM BuildItems
      LEFT JOIN UserItems
          ON  BuildItems.itemId = UserItems.itemId 
          AND UserItems.userId = ${userId}
      WHERE BuildItems.buildId = Build.id
      AND nullif(BuildItems.itemId,'') IS NOT NULL
      AND UserItems.itemId IS NULL
  )`
}

export function collectionToIds({
  discoveredItemIds,
}: {
  discoveredItemIds: string[]
}): string[] {
  const linkedItemIds = addLinkedItemIds(discoveredItemIds)
  // Add all concoctions and consumables to the user's items
  // so we can query them efficiently
  // This is necessary because these categories are omitted from
  // the item tracker
  const consumableItemIds = remnantItems
    .filter((item) => item.category === 'consumable')
    .map((item) => item.id)
  const concoctionItemIds = remnantItems
    .filter((item) => item.category === 'concoction')
    .map((item) => item.id)
  const perkItemIds = remnantItems
    .filter((item) => item.category === 'perk')
    .map((item) => item.id)

  const allOwnedItemIds = [
    ...linkedItemIds,
    ...consumableItemIds,
    ...concoctionItemIds,
    ...perkItemIds,
  ]
  return allOwnedItemIds
}
