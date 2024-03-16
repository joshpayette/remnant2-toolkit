/**
 * When new items are added to the data set,
 * this script is used to populate the items table in the database
 * Because the unique IDs in the items table are used in other tables,
 * we use upsert so that no items are duplicated or deleted mistakenly.
 */

import { prisma } from '../features/db'
import { allItems } from '../features/items/data/allItems'

// Load all the item ids into the Item table
async function main() {
  for (const item of allItems) {
    console.info(`Upserting item ${item.id}`)
    const dlc = item.dlc ?? 'base'

    await prisma.item.upsert({
      where: { itemId: item.id },
      update: { dlc }, // update fields if necessary
      create: { itemId: item.id, dlc },
    })
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    console.info('Done with populating items table')
    await prisma.$disconnect()
  })
