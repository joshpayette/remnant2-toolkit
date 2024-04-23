import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'ring',
    name: 'Floodlit Diamond',
    imagePath: '/ring/floodlit_diamond.png',
    id: 'z9YJih',
    dlc: 'dlc2',
    tags: [],
    description: `Increases Weakspot Damage by 12%. Bonus is doubled against EXPOSED targets.`,
    wikiLinks: ['https://remnant.wiki/Floodlit_Diamond'],
  },
] as const satisfies Item[]

async function main() {
  for (const item of items) {
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
