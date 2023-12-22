import { getServerSession } from '@/app/(lib)/auth'
import { BuildState, buildStateSchema } from '@/app/(types)'
import { ArmorItem } from '@/app/(types)/ArmorItem'
import { GenericItem } from '@/app/(types)/GenericItem'
import { MutatorItem } from '@/app/(types)/MutatorItem'
import { TraitItem } from '@/app/(types)/TraitItem'
import { WeaponItem } from '@/app/(types)/WeaponItem'
import { Build } from '@prisma/client'

export async function GET(request: Request) {
  console.info('Reached this route!')

  if (!request) {
    console.error('No request body!')
    return Response.json({ message: 'No request body!' }, { status: 500 })
  }

  const body = await request.json()
  console.info('body', body)
  const { buildId } = body
  if (!buildId) {
    console.error('No buildId provided!')
    return Response.json({ message: 'No buildId provided!' }, { status: 500 })
  }

  const build = await prisma?.build.findUnique({
    where: {
      id: buildId,
    },
    include: {
      createdBy: true,
    },
  })
  if (!build) {
    console.error('Build not found!')
    return Response.json({ message: 'Build not found!' }, { status: 404 })
  }

  if (build.public) {
    console.info('build', build)
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

  console.info('build', build)

  return Response.json(
    { message: 'Successfully fetched build!', build },
    { status: 200 },
  )
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return Response.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  const unsafeBuildState = await request.json()
  const buildStateParsed = buildStateSchema.safeParse(unsafeBuildState)
  if (!buildStateParsed.success) {
    return Response.json({ message: 'Error in buildState!' }, { status: 500 })
  }
  const buildState = buildStateParsed.data as BuildState
  const { items } = buildState

  // TODO set hard code values on client side and
  // TODO include in the request
  const newBuild: Omit<
    Build,
    'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'createdById'
  > = {
    name: buildState.name,
    public: true,
    description: '',
    videoUrl: '',
    helm: items.helm ? ArmorItem.toDBValue(items.helm) : null,
    torso: items.torso ? ArmorItem.toDBValue(items.torso) : null,
    legs: items.legs ? ArmorItem.toDBValue(items.legs) : null,
    gloves: items.gloves ? ArmorItem.toDBValue(items.gloves) : null,
    relic: items.relic ? GenericItem.toDBValue(items.relic) : null,
    amulet: items.amulet ? GenericItem.toDBValue(items.amulet) : null,
    weapon: items.weapon ? WeaponItem.toDBValue(items.weapon) : null,
    ring: items.ring ? GenericItem.toDBValue(items.ring) : null,
    archtype: items.archtype ? GenericItem.toDBValue(items.archtype) : null,
    skill: items.skill ? GenericItem.toDBValue(items.skill) : null,
    concoction: items.concoction
      ? GenericItem.toDBValue(items.concoction)
      : null,
    consumable: items.consumable
      ? GenericItem.toDBValue(items.consumable)
      : null,
    mod: items.mod ? GenericItem.toDBValue(items.mod) : null,
    mutator: items.mutator ? MutatorItem.toDBValue(items.mutator) : null,
    relicfragment: items.relicfragment
      ? GenericItem.toDBValue(items.relicfragment)
      : null,
    trait: TraitItem.toDBValue(buildState.items.trait),
  }

  const dbResponse = await prisma?.build.create({
    data: {
      ...newBuild,
      createdBy: {
        connect: {
          id: session.user.id,
        },
      },
    },
  })

  // check for errors in dbResponse
  if (dbResponse) {
    return Response.json(
      { message: 'Build successfully saved!', buildId: dbResponse.id },
      { status: 200 },
    )
  } else {
    return Response.json({ message: 'Error in saving build!' }, { status: 500 })
  }
}
