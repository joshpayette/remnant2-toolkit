import { getServerSession } from 'next-auth'
import { prisma } from '@/app/(lib)/db'
import BuildPage from './BuildPage'
import { BuildState } from '@/app/(types)'
import { ArmorItem } from '@/app/(types)/ArmorItem'
import { GenericItem } from '@/app/(types)/GenericItem'
import { WeaponItem } from '@/app/(types)/WeaponItem'
import { MutatorItem } from '@/app/(types)/MutatorItem'
import { TraitItem } from '@/app/(types)/TraitItem'

async function getBuild(buildId: string) {
  if (!buildId) {
    console.error('No buildId provided!')
    return Response.json({ message: 'No buildId provided!' }, { status: 500 })
  }

  const build = await prisma.build.findUnique({
    where: {
      id: buildId,
    },
    include: {
      createdBy: true,
    },
  })
  if (!build) {
    console.error('Build not found!', build)
    return Response.json({ message: 'Build not found!' }, { status: 404 })
  }

  if (build.public) {
    return Response.json({ build }, { status: 200 })
  }

  const session = await getServerSession()
  if (!session || !session.user || build.createdBy.id !== session.user.id) {
    console.error(
      'You must be logged in as the build creator to view a private build.',
    )
    return Response.json(
      {
        message:
          'You must be logged in as the build creator to view a private build.',
      },
      { status: 401 },
    )
  }

  return Response.json(
    { message: 'Successfully fetched build!', build },
    { status: 200 },
  )
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const buildData = await getBuild(id)
  if (buildData.status !== 200) {
    return (
      <div>
        <h1>Build {id} not found!</h1>
      </div>
    )
  }
  const { build: dbBuild } = await buildData.json()

  // Need to convert the build data to a format that the BuildPage component can use
  const build: BuildState = {
    name: dbBuild.name,
    items: {
      helm: ArmorItem.fromDBValue(dbBuild.helm),
      torso: ArmorItem.fromDBValue(dbBuild.torso),
      gloves: ArmorItem.fromDBValue(dbBuild.gloves),
      legs: ArmorItem.fromDBValue(dbBuild.legs),
      relic: GenericItem.fromDBValueSingle(dbBuild.relic),
      weapon: WeaponItem.fromDBValue(dbBuild.weapon),
      ring: GenericItem.fromDBValueArray(dbBuild.ring),
      amulet: GenericItem.fromDBValueSingle(dbBuild.amulet),
      archtype: GenericItem.fromDBValueArray(dbBuild.archtype),
      skill: GenericItem.fromDBValueArray(dbBuild.skill),
      concoction: GenericItem.fromDBValueArray(dbBuild.concoction),
      consumable: GenericItem.fromDBValueArray(dbBuild.consumable),
      mod: GenericItem.fromDBValueArray(dbBuild.mod),
      mutator: MutatorItem.fromDBValue(dbBuild.mutator),
      relicfragment: GenericItem.fromDBValueArray(dbBuild.relicfragment),
      trait: TraitItem.fromDBValue(dbBuild.trait),
    },
  }

  return <BuildPage build={build} />
}
