import { prisma } from '../app/(lib)/db'

async function updateBuildItems() {
  // Delete all build items
  await prisma.buildItems.deleteMany({})

  // Fetch all builds
  const builds = await prisma.build.findMany()

  for (const build of builds) {
    let itemIds: Array<{ itemId: string; amount?: number }> = []

    // Do all the single items first
    if (build.helm) itemIds.push({ itemId: build.helm })
    if (build.torso) itemIds.push({ itemId: build.torso })
    if (build.legs) itemIds.push({ itemId: build.legs })
    if (build.gloves) itemIds.push({ itemId: build.gloves })
    if (build.amulet) itemIds.push({ itemId: build.amulet })
    if (build.relic) itemIds.push({ itemId: build.relic })

    // Now all the multiple items
    if (build.weapon) {
      const weaponIds = build.weapon.split(',')
      for (const weaponId of weaponIds) {
        itemIds.push({ itemId: weaponId })
      }
    }
    if (build.mod) {
      const modIds = build.mod.split(',')
      for (const modId of modIds) {
        itemIds.push({ itemId: modId })
      }
    }
    if (build.mutator) {
      const mutatorIds = build.mutator.split(',')
      for (const mutatorId of mutatorIds) {
        itemIds.push({ itemId: mutatorId })
      }
    }
    if (build.ring) {
      const ringIds = build.ring.split(',')
      for (const ringId of ringIds) {
        itemIds.push({ itemId: ringId })
      }
    }
    if (build.archtype) {
      const archtypeIds = build.archtype.split(',')
      for (const archtypeId of archtypeIds) {
        itemIds.push({ itemId: archtypeId })
      }
    }
    if (build.skill) {
      const skillIds = build.skill.split(',')
      for (const skillId of skillIds) {
        itemIds.push({ itemId: skillId })
      }
    }
    if (build.relicfragment) {
      const relicfragmentIds = build.relicfragment.split(',')
      for (const relicfragmentId of relicfragmentIds) {
        itemIds.push({ itemId: relicfragmentId })
      }
    }
    if (build.concoction) {
      const concoctionIds = build.concoction.split(',')
      for (const concoctionId of concoctionIds) {
        itemIds.push({ itemId: concoctionId })
      }
    }
    if (build.consumable) {
      const consumableIds = build.consumable.split(',')
      for (const consumableId of consumableIds) {
        itemIds.push({ itemId: consumableId })
      }
    }
    if (build.trait) {
      const traits = build.trait.split(',')
      for (const trait of traits) {
        const [traitId, amount] = trait.split(';')
        itemIds.push({ itemId: traitId, amount: parseInt(amount) })
      }
    }

    console.info(`Inserting ${itemIds.length} items for build ${build.id}`)

    await prisma.buildItems.createMany({
      data: itemIds.map((itemId) => ({
        buildId: build.id,
        itemId: itemId.itemId,
        amount: itemId.amount,
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
