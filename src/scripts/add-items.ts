import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'weapon',
    type: 'melee',
    name: 'Shovel',
    imagePath: '/melee/shovel.png',
    id: 'vpEWS5',
    dlc: 'dlc2',
    description: ``,
    wikiLinks: [`https://remnant.wiki/Shovel`],
    // TODO Check damage values
    damage: -1,
    crit: -1,
    weakspot: -1,
    stagger: -1,
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
