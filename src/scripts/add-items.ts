import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'mod',
    name: 'Heatwave',
    imagePath: '/mod/heatwave.png',
    dlc: 'dlc2',
    id: 'vc3s1n',
    description: `Activates a 15m aura of sweltering heat, causing enemies inside the aura for 3s to begin BURNING for 50 FIRE Damage per second for 5s. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Heatwave`],
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
