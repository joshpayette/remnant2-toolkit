import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'mutator',
    name: 'Thousand Cuts',
    type: 'gun',
    imagePath: '/placeholder.jpg',
    id: 'r8jxFF',
    dlc: 'dlc2',
    tags: [], // TODO Add tags
    description: `Increases this weapon's Critical Chance and Critical Damage by 0.1% for each shot fired. Lasts 0.125s. Max 50 stacks.`,
    maxLevelBonus: `Level 10: Increases this weapon's Reload Speed by 1% per stack.`,
    wikiLinks: [`https://remnant.wiki/Thousand_Cuts`],
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
