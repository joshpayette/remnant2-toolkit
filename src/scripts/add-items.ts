import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'ring',
    name: 'Rally Band',
    imagePath: '/ring/rally_band.png',
    id: '7XdP4g',
    dlc: 'dlc2',
    tags: [], // TODO Add tags
    description: ``,
    wikiLinks: [`https://remnant.wiki/Rally_Band`],
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
