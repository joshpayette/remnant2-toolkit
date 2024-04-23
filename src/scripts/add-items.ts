import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'ring',
    name: `Ravager's Bargain`,
    imagePath: '/ring/ravagers_bargain.png',
    id: 'm4Pz5i',
    dlc: 'dlc2',
    tags: [],
    description: `Increases All Damage and All Critical Chance by 5% while BLEEDING.`,
    wikiLinks: [`https://remnant.wiki/Ravager's_Bargain`],
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
