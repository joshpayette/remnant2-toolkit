import { prisma } from '../app/(lib)/db'
import { remnantItems } from '../app/(data)'

// Load all the item ids into the Item table
async function main() {
  await prisma.item.createMany({
    data: remnantItems.map((item) => ({
      itemId: item.id,
    })),
  })
  console.log('Done with populating items table')
}

main()
