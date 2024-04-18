import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const invokerItems = [
  {
    category: 'perk',
    name: 'Soothsayer',
    imagePath: '/perk/soothsayer-placeholder.png',
    type: 'relic',
    id: 'j7e5Bb',
    dlc: 'dlc2',
    tags: [],
    description:
      'On Relic use, extend the duration of active Invoker skills by 20% of the base duration. Cannot exceed base duration. Relic Use Speed increased by 25% while an Invoker Skill is active.',
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
] as const satisfies Item[]

async function main() {
  for (const item of invokerItems) {
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
