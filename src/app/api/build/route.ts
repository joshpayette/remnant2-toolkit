import { getServerSession } from '@/app/(lib)/auth'
import { ArmorItem } from '@/app/(types)/items/ArmorItem'
import { GenericItem } from '@/app/(types)/items/GenericItem'
import { MutatorItem } from '@/app/(types)/items/MutatorItem'
import { TraitItem } from '@/app/(types)/items/TraitItem'
import { WeaponItem } from '@/app/(types)/items/WeaponItem'
import { Build } from '@prisma/client'
import { prisma } from '@/app/(lib)/db'
import { badWordFilter } from '@/app/(lib)/badword-filter'
import { revalidatePath } from 'next/cache'
import { BuildState, buildStateSchema } from '@/app/(types)/build-state'
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(lib)/constants'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
})

export const config = {
  runtime: 'edge',
}

export async function GET(request: Request) {
  if (!request) {
    console.error('No request body!')
    return Response.json({ message: 'No request body!' }, { status: 500 })
  }

  const body = await request.json()
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
    return Response.json({ message: 'Build not found!' }, { status: 404 })
  }

  if (build.isPublic) {
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

export async function PATCH(request: Request) {
  // session check
  const session = await getServerSession()
  if (!session || !session.user) {
    return Response.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  // rate limiting
  const userId = session.user.id
  const { limit, reset, remaining } = await ratelimit.limit(userId)

  const headers = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  }

  // build parsing
  const unsafeBuildState = await request.json()
  const buildStateParsed = buildStateSchema.safeParse(unsafeBuildState)
  if (!buildStateParsed.success) {
    console.error(
      'Error in buildState!',
      buildStateParsed.error.issues.forEach((issue) => console.error(issue)),
    )
    return Response.json(
      { message: 'Error in buildState!' },
      { status: 500, headers },
    )
  }
  const buildState = buildStateParsed.data as BuildState
  const { items } = buildState

  const cleanName = buildState.name ? badWordFilter(buildState.name) : ''

  // limit description to MAX_DESCRIPTION_LENGTH
  const clippedDescription = buildState.description
    ? buildState.description.slice(0, MAX_BUILD_DESCRIPTION_LENGTH)
    : ''
  const cleanDescription = badWordFilter(clippedDescription)

  if (buildState.createdById !== session.user.id) {
    return Response.json(
      {
        message: 'You must be logged in as the build creator to edit a build.',
      },
      { status: 401, headers },
    )
  }

  if (!buildState.buildId) {
    return Response.json(
      {
        message: 'No buildId provided!',
      },
      { status: 500, headers },
    )
  }

  try {
    const updatedBuild: Omit<
      Build,
      'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'createdById'
    > = {
      name: cleanName,
      description: cleanDescription,
      isPublic: Boolean(buildState.isPublic),
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

    const dbResponse = await prisma?.build.update({
      where: {
        id: buildState.buildId,
        createdBy: {
          id: session.user.id,
        },
      },
      data: updatedBuild,
    })

    // check for errors in dbResponse
    if (!dbResponse) {
      return Response.json(
        { message: 'Error in updating build!' },
        { status: 500, headers },
      )
    }

    // Get the new total upvotes
    const totalUpvotes = await prisma?.buildVoteCounts.count({
      where: {
        buildId: buildState.buildId,
      },
    })

    // Refresh the cache for the route
    revalidatePath(`/builder/${buildState.buildId}`)

    return Response.json(
      {
        message: 'Build successfully updated!',
        buildId: dbResponse.id,
        totalUpvotes,
      },
      { status: 200, headers },
    )
  } catch (e) {
    console.error(e)
    return Response.json(
      { message: 'Error in updating build!' },
      { status: 500, headers },
    )
  }
}

export async function PUT(request: Request) {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return Response.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  // rate limiting
  const userId = session.user.id
  const { limit, reset, remaining } = await ratelimit.limit(userId)

  const headers = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  }

  // build validation
  const unsafeBuildState = await request.json()
  const buildStateParsed = buildStateSchema.safeParse(unsafeBuildState)
  if (!buildStateParsed.success) {
    console.error('Error in buildState!', buildStateParsed.error)
    return Response.json(
      { message: 'Error in buildState!' },
      { status: 500, headers },
    )
  }
  const buildState = buildStateParsed.data as BuildState
  const { items } = buildState

  const cleanName = buildState.name ? badWordFilter(buildState.name) : ''
  // limit description to MAX_DESCRIPTION_LENGTH
  const clippedDescription = buildState.description
    ? buildState.description.slice(0, MAX_BUILD_DESCRIPTION_LENGTH)
    : ''
  const cleanDescription = badWordFilter(clippedDescription)

  const newBuild: Omit<
    Build,
    'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'createdById'
  > = {
    name: cleanName,
    description: cleanDescription,
    isPublic: Boolean(buildState.isPublic),
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

  try {
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
    if (!dbResponse) {
      return Response.json(
        { message: 'Error in saving build!' },
        { status: 500, headers },
      )
    }

    return Response.json(
      { message: 'Build successfully saved!', buildId: dbResponse.id, headers },
      { status: 200 },
    )
  } catch (e) {
    console.error(e)
    return Response.json(
      { message: 'Error in saving build!' },
      { status: 500, headers },
    )
  }
}

export async function DELETE(req: Request) {
  // session check
  const session = await getServerSession()
  if (!session || !session.user) {
    return Response.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  // rate limiting
  const userId = session.user.id
  const { limit, reset, remaining } = await ratelimit.limit(userId)

  const headers = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  }

  // build validation
  const { buildId } = await req.json()
  if (!buildId) {
    return Response.json(
      { message: 'No buildId provided!' },
      { status: 500, headers },
    )
  }

  try {
    const build = await prisma?.build.findUnique({
      where: {
        id: buildId,
      },
      include: {
        createdBy: true,
      },
    })
    if (!build) {
      return Response.json(
        { message: 'Build not found!' },
        { status: 404, headers },
      )
    }

    if (build.createdBy.id !== session.user.id) {
      return Response.json(
        {
          message:
            'You must be logged in as the build creator to delete a build.',
        },
        { status: 401, headers },
      )
    }

    const dbResponse = await prisma?.build.delete({
      where: {
        id: buildId,
      },
    })

    // check for errors in dbResponse
    if (!dbResponse) {
      return Response.json(
        { message: 'Error in deleting build!' },
        { status: 500, headers },
      )
    }

    return Response.json(
      { message: 'Build successfully deleted!', buildId: dbResponse.id },
      { status: 200, headers },
    )
  } catch (e) {
    console.error(e)
    return Response.json(
      { message: 'Error in deleting build!' },
      { status: 500, headers },
    )
  }
}
