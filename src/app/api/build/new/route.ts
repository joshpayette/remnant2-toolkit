import { getServerSession } from '@/app/(lib)/auth'
import { badWordFilter } from '@/app/(lib)/badword-filter'
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(lib)/constants'
import { BuildState, buildStateSchema } from '@/app/(types)/build-state'
import { ArmorItem } from '@/app/(types)/items/ArmorItem'
import { GenericItem } from '@/app/(types)/items/GenericItem'
import { MutatorItem } from '@/app/(types)/items/MutatorItem'
import { TraitItem } from '@/app/(types)/items/TraitItem'
import { WeaponItem } from '@/app/(types)/items/WeaponItem'
import { Build } from '@prisma/client'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
})

export async function PUT(request: Request) {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return Response.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  // rate limiting
  const userId = session.user.id
  const { limit, reset, remaining, success } = await ratelimit.limit(userId)

  const headers = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  }

  if (!success) {
    return Response.json(
      { message: 'You are being rate limited!' },
      { status: 429 },
    )
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

    // Register a vote for the build
    await prisma?.buildVoteCounts.create({
      data: {
        buildId: dbResponse.id,
        userId: session.user.id,
      },
    })

    // Trigger webhook to send build to Discord
    if (buildState.isPublic) {
      const params = {
        content: `https://www.remnant2toolkit.com/builder/${dbResponse.id}`,
      }

      const res = await fetch(`${process.env.WEBHOOK_COMMUNITY_BUILDS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!res.ok) {
        console.error('Error in sending build webhook to Discord!')
      }
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
