import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'ring',
    name: 'Mark of the Destroyer',
    imagePath: '/ring/mark_of_the_destroyer.png',
    id: 'E7fQdZ',
    dlc: 'dlc2',
    tags: [], // TODO Check tags
    description: `Perfect Dodge triggers a 3m AOE blast that deals 387.5 Explosive Damage.`,
    wikiLinks: [`https://remnant.wiki/Mark_of_the_Destroyer`],
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
