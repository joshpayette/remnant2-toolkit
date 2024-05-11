import { Item } from '../app/(data)/items/types'
import { prisma } from '../app/(utils)/db'

const items = [
  {
    category: 'amulet',
    name: 'Cervine Keepsake',
    imagePath: '/amulet/cervine_keepsake.png',
    id: '5sfzsd',
    dlc: 'dlc2',
    tags: ['Movement Speed'],
    description: `On Relic Use, gain a stack of CALL OF THE DOE for 30s. Max 5 stacks.

    CALL OF THE DOE: Increases Movement Speed by 4% per stack. When CALL OF THE DOE expires, regain 1 Relic Charge per stack.`,
    wikiLinks: [`https://remnant.wiki/Cervine_Keepsake`],
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
