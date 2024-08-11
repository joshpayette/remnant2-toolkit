import { prisma } from '@repo/db'

import { Item } from '@/app/(data)/items/types'

const items = [
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 31,
    name: 'Resolute',
    imagePath: '/items/traits/resolute.png',
    saveFileSlug: 'Trait_Resolute_C',
    id: '7z3ejd',
    dlc: 'dlc2',
    tags: ['Stagger'],
    description: 'Reduces Hit Reaction Time by 2.5% - 25%.',
    wikiLinks: [`https://remnant.wiki/Resolute`],
    amount: 10,
    location: { world: 'Yaesha', dungeon: 'Quest' },
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
