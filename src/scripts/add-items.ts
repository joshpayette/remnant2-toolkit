import { prisma } from '../features/db'
import { Item } from '../features/items/types'

const items = [
  {
    category: 'ring',
    name: `Bloodless King's Vow`,
    imagePath: '/ring/bloodless_kings_vow.png',
    id: 'WHgN93',
    dlc: 'dlc2',
    tags: [],
    description: `Gain 4% of base Ranged Damage dealt as Lifesteal.`,
    wikiLinks: [`https://remnant.wiki/Bloodless_King's_Vow`],
  },
  {
    category: 'helm',
    name: 'Dandy Topper',
    imagePath: '/helm/dandy_topper.png',
    id: 'vZL5tu',
    dlc: 'dlc2',
    armor: 12.8,
    weight: 5.3,
    bleedResistance: 0,
    fireResistance: 0,
    shockResistance: 0,
    blightResistance: 5,
    toxinResistance: 0,
  },
  {
    category: 'amulet',
    name: 'Beads of the Valorous',
    imagePath: '/amulet/beads_of_the_valorous.png',
    id: 'n8gqNY',
    dlc: 'dlc2',
    tags: [],
    description: `Increases Damage Reduction and Movement Speed by 1% for every 5% of missing Max Health. Bonus is doubled at or below 50% Max Health. Max 10 stacks.`,
    wikiLinks: ['https://remnant.wiki/Beads_of_the_Valorous'],
  },
  {
    category: 'ring',
    name: 'Feathery Binding',
    imagePath: '/ring/feathery_binding.png',
    id: 'zXq2H7',
    dlc: 'dlc2',
    tags: [],
    description: `Increases Projectile Speed by 15% and Decreases Weapon Charge Time by 10%. Bonus is doubled when HASTE is active.`,
    wikiLinks: [`https://remnant.wiki/Feathery_Binding`],
  },
  {
    category: 'ring',
    name: `Matriarch's Ring`,
    imagePath: '/ring/matriarchs_ring.png',
    id: 'R3fM4y',
    dlc: 'dlc2',
    tags: [],
    description: `Perfect Dodge reduces Charge Melee Stamina Cost by 100% for 5s.`,
    wikiLinks: [`https://remnant.wiki/Matriarch's_Ring`],
  },
  {
    category: 'ring',
    name: 'Burden of the Mesmer',
    imagePath: '/ring/burden_of_the_mesmer.png',
    id: 'fGFm6B',
    dlc: 'dlc2',
    tags: [],
    description: `Reduces Max Health by 25%. Increases All Damage by 1% for every 5% of the wearer's total Damage Reduction.`,
    wikiLinks: [`https://remnant.wiki/Burden_of_the_Mesmer`],
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
