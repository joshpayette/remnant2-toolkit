import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'weapon',
    type: 'melee',
    name: 'Mirage',
    imagePath: '/melee/mirage.png',
    dlc: 'dlc2',
    id: '6j7c6k',
    description: `The mace whirs as if living harmonics hold its shape. When swung, a breath of sand tethers to the rock crown for extended reach and lethal momentum.`,
    wikiLinks: [`https://remnant.wiki/Mirage`],
    linkedItems: {
      mod: {
        name: 'Cyclone',
      },
    },
    damage: 56,
    crit: 3,
    weakspot: 100,
    stagger: -5,
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
