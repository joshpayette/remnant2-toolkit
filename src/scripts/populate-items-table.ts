import { prisma } from '../app/(lib)/db'
import { remnantItems } from '../app/(data)'

// Load all the item ids into the Item table
async function main() {
  // first clear all items from Item table
  await prisma.item.deleteMany({})

  // then add all items from remnantItems dataset
  await prisma.item.createMany({
    data: remnantItems.map((item) => ({
      itemId: item.id,
    })),
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    console.info('Done with populating items table')
    await prisma.$disconnect()
  })
