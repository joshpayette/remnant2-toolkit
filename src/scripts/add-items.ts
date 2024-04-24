import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'relic',
    name: 'Bloodless Heart',
    imagePath: '/relic/bloodless_heart.png',
    id: 'LQho3X',
    dlc: 'dlc2',
    description: `Innate 50% Use Speed bonus. One use, grants a SHIELD that prevents nearly all damage for 3s.

    Cannot prevent certain death mechanics`,
    wikiLinks: [`https://remnant.wiki/Bloodless_Heart`],
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
