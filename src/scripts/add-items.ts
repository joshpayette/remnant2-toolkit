import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'amulet',
    name: 'Fragrant Thorn',
    imagePath: '/amulet/fragrant_thorn.png',
    id: 'Hx5iNF',
    dlc: 'dlc2',
    tags: [], // TODO Add tags
    description: `Increases Status Effect Damage by 20%. Inflicting 4 or more unique Negative Status Effects on a target applies EXPOSED for 15s.

    EXPOSED: Target receives 15% additional damage from all sources.`,
    wikiLinks: ['https://remnant.wiki/Fragrant_Thorn'],
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
