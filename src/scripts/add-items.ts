import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'ring',
    name: 'Dark Sea Armada Crest',
    imagePath: '/ring/dark_sea_armada_crest.png',
    id: 'Zj9qF5',
    dlc: 'dlc2',
    tags: [], // TODO Add tags
    description: `On Relic Use, increases All Elemental Damage dealt by 15% for 15s.`,
    wikiLinks: [`https://remnant.wiki/Dark_Sea_Armada_Crest`],
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
