import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const invokerItems = [
  {
    category: 'archetype',
    name: 'Invoker',
    imagePath: 'placeholder.jpg', // TODO
    id: 'Y2NhrX',
    dlc: 'dlc2',
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      traits: [
        { name: 'INVOKER TRAIT', amount: 10 }, // TODO
      ],
      skills: [
        { name: 'INVOKER SKILL #1' }, // TODO
        { name: 'INVOKER SKILL #2' }, // TODO
        { name: 'INVOKER SKILL #3' }, // TODO
      ],
      perks: [
        { name: 'INVOKER PERK #1' }, // TODO
        { name: 'INVOKER PERK #2' }, // TODO
        { name: 'INVOKER PERK #3' }, // TODO
        { name: 'INVOKER PERK #4' }, // TODO
      ],
    },
  },
  {
    category: 'skill',
    name: 'INVOKER SKILL #1', // TODO
    imagePath: 'placeholder.jpg', // TODO
    id: 'h4B9dD',
    dlc: 'dlc2',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'skill',
    name: 'INVOKER SKILL #2', // TODO
    imagePath: 'placeholder.jpg', // TODO
    id: '7DnBmE',
    dlc: 'dlc2',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'skill',
    name: 'INVOKER SKILL #3', // TODO
    imagePath: 'placeholder.jpg', // TODO
    id: 'T2xA6c',
    dlc: 'dlc2',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'perk',
    name: 'INVOKER PERK #1', // TODO
    imagePath: 'placeholder.jpg',
    type: 'prime',
    id: 'hYsQ4M',
    dlc: 'dlc2',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'perk',
    name: 'INVOKER PERK #2', // TODO
    imagePath: 'placeholder.jpg',
    type: 'damage',
    id: 'Y9Tj7F',
    dlc: 'dlc2',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'perk',
    name: 'INVOKER PERK #3', // TODO
    imagePath: 'placeholder.jpg',
    type: 'team',
    id: 'GV9bDr',
    dlc: 'dlc2',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'perk',
    name: 'INVOKER PERK #4', // TODO
    imagePath: 'placeholder.jpg',
    type: 'utility',
    id: 'T2U4dZ',
    dlc: 'dlc2',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'trait',
    name: 'INVOKER TRAIT',
    imagePath: 'placeholder.jpg',
    id: 'c9af3B',
    dlc: 'dlc2',
    tags: [],
    description: 'NO DESCRIPTION YET',
    maxLevelBonus: 'NO DESCRIPTION YET',
    wikiLinks: [],
    amount: 10,
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
