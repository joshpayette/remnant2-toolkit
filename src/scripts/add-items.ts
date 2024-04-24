import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'helm',
    name: `Mudtooth's Hat`,
    imagePath: '/helm/mudtooths_hat.png',
    id: 'u7PqrJ',
    dlc: 'dlc2',
    armor: 10.6,
    weight: 4.4,
    bleedResistance: 1,
    fireResistance: 1,
    shockResistance: 1,
    blightResistance: 2,
    toxinResistance: 1,
    wikiLinks: [`https://remnant.wiki/Mudtooth's_Hat`],
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
