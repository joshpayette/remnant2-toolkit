import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'amulet',
    name: 'Soul Stone',
    imagePath: '/amulet/soul_stone.png',
    id: 'z7ivk3',
    dlc: 'dlc2',
    tags: ['Summon', 'Movement Speed'],
    description: `Increases Summon Damage by 30% and Summon Movement Speed by 30%.`,
    wikiLinks: [`https://remnant.wiki/Soul_Stone`],
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
