import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'mod',
    name: '77 79 68',
    imagePath: '/mod/77_79_68.png',
    dlc: 'dlc2',
    id: '777968', // ! DO NOT CHANGE THIS ID
    description: `84 79 71 71 76 69 32 67 79 77 66 65 84 32 70 73 82 73 78 71 32 77 79 68 69 83`,
    wikiLinks: [`https://remnant.wiki/77_79_68`],
    linkedItems: {
      weapon: {
        name: 'Polygun',
      },
    },
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
