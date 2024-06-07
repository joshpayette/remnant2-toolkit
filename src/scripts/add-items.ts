import { Item } from '../app/(data)/items/types'
import { prisma } from '../app/(utils)/db'

const items = [
  {
    category: 'consumable',
    name: `Walker's Dream`,
    imagePath: '/items/consumables/walkersdream.png',
    saveFileSlug: 'Consumable_WalkersDream_C',
    id: '5dUhG6',
    dlc: 'base',
    description: ``,
    wikiLinks: [`https://remnant.wiki/Walker%27s_Dream`],
    location: { world: 'Root Earth', dungeon: ['Corrupted Harbor'] },
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
