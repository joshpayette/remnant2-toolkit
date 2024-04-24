import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'weapon',
    type: 'long gun',
    name: 'Trinity Crossbow',
    saveFileSlug: '/weapon_trinitycrossbow',
    imagePath: '/mainhand/trinity_crossbow.png',
    id: '13hsq6',
    dlc: 'dlc2',
    description: `A powerful Pan crossbow designed for mid-range combat. Fires 3 bolts at a time.`,
    wikiLinks: [`https://remnant.wiki/Trinity_Crossbow`],
    damage: 42,
    rps: 0.63,
    magazine: 18,
    accuracy: 100,
    ideal: 22,
    falloff: 65,
    ammo: 90,
    crit: 10,
    weakspot: 115,
    stagger: -65,
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
