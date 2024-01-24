import { prisma } from '../features/db/lib/db'
import { remnantItems } from '../features/items/data'

// Load all the item ids into the Item table
async function main() {
  for (const item of remnantItems) {
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
