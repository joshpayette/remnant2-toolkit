import { prisma } from '../features/db/lib/db'
import { ItemCategory } from '../features/build/types'

async function updateBuildItems() {
  // Delete all build items
  await prisma.buildItems.deleteMany({})

  // Fetch all builds
  const builds = await prisma.build.findMany()

  for (const build of builds) {
    let itemIds: Array<{
      itemId: string
      amount?: number
      index?: number
      category: ItemCategory
    }> = []

    // Do all the single items first
    if (build.helm && build.helm !== '')
      itemIds.push({ itemId: build.helm, category: 'helm' })
    if (build.torso && build.torso !== '')
      itemIds.push({ itemId: build.torso, category: 'torso' })
    if (build.legs && build.legs !== '')
      itemIds.push({ itemId: build.legs, category: 'legs' })
    if (build.gloves && build.gloves !== '')
      itemIds.push({ itemId: build.gloves, category: 'gloves' })
    if (build.amulet && build.amulet !== '')
      itemIds.push({ itemId: build.amulet, category: 'amulet' })
    if (build.relic && build.relic !== '')
      itemIds.push({ itemId: build.relic, category: 'relic' })

    // Now all the multiple items
    if (build.weapon) {
      const weaponIds = build.weapon.split(',')
      weaponIds.forEach((weaponId, index) => {
        itemIds.push({ itemId: weaponId, index, category: 'weapon' })
      })
    }
    if (build.mod) {
      const modIds = build.mod.split(',')
      modIds.forEach((modId, index) => {
        itemIds.push({ itemId: modId, index, category: 'mod' })
      })
    }
    if (build.mutator) {
      const mutatorIds = build.mutator.split(',')
      mutatorIds.forEach((mutatorId, index) => {
        itemIds.push({ itemId: mutatorId, index, category: 'mutator' })
      })
    }
    if (build.ring) {
      const ringIds = build.ring.split(',')
      ringIds.forEach((ringId, index) => {
        itemIds.push({ itemId: ringId, index, category: 'ring' })
      })
    }
    if (build.archtype) {
      const archtypeIds = build.archtype.split(',')
      archtypeIds.forEach((archtypeId, index) => {
        itemIds.push({ itemId: archtypeId, index, category: 'archtype' })
      })
    }
    if (build.skill) {
      const skillIds = build.skill.split(',')
      skillIds.forEach((skillId, index) => {
        itemIds.push({ itemId: skillId, index, category: 'skill' })
      })
    }
    if (build.relicfragment) {
      const relicfragmentIds = build.relicfragment.split(',')
      relicfragmentIds.forEach((relicfragmentId, index) => {
        itemIds.push({
          itemId: relicfragmentId,
          index,
          category: 'relicfragment',
        })
      })
    }
    if (build.concoction) {
      const concoctionIds = build.concoction.split(',')
      concoctionIds.forEach((concoctionId, index) => {
        itemIds.push({ itemId: concoctionId, index, category: 'concoction' })
      })
    }
    if (build.consumable) {
      const consumableIds = build.consumable.split(',')
      consumableIds.forEach((consumableId, index) => {
        itemIds.push({ itemId: consumableId, index, category: 'consumable' })
      })
    }
    if (build.trait) {
      const traits = build.trait.split(',')
      for (const trait of traits) {
        const [traitId, amount] = trait.split(';')
        itemIds.push({
          itemId: traitId,
          amount: parseInt(amount),
          category: 'trait',
        })
      }
    }

    console.info(`Inserting ${itemIds.length} items for build ${build.id}`)

    await prisma.buildItems.createMany({
      data: itemIds.map((itemId) => ({
        buildId: build.id,
        itemId: itemId.itemId,
        amount: itemId.amount,
        index: itemId.index,
        category: itemId.category,
      })),
    })

    console.info(`Inserted ${itemIds.length} items for build ${build.id}`)
  }
}

updateBuildItems()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    console.info('Migrate build items complete!')
    await prisma.$disconnect()
  })
