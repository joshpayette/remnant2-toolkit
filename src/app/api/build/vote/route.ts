import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import { revalidatePath } from 'next/cache'
import { BuildState } from '@/app/(types)/build-state'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { z } from 'zod'

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
})

export async function POST(request: Request) {
  // session check
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

  // build parsing
  const unsafeBuildState = await request.json()
  const buildStateParsed = z
    .object({ upvoted: z.boolean(), buildId: z.string() })
    .safeParse(unsafeBuildState)
  if (!buildStateParsed.success) {
    console.error(
      'Error in vote data',
      buildStateParsed.error.issues.forEach((issue) => console.error(issue)),
    )
    return Response.json(
      { message: 'Error in vote data!' },
      { status: 500, headers },
    )
  }
  const buildState = buildStateParsed.data as BuildState

  if (!buildState.buildId) {
    return Response.json(
      {
        message: 'No buildId provided!',
      },
      { status: 500, headers },
    )
  }

  const build = await prisma?.build.findUnique({
    where: {
      id: buildState.buildId,
    },
  })

  if (!build) {
    return Response.json(
      {
        message: 'Build does not exist!',
      },
      { status: 500, headers },
    )
  }

  try {
    // Check if user has a vote for this build already
    const isVoteRegistered = await prisma?.buildVoteCounts.findFirst({
      where: {
        buildId: buildState.buildId,
        userId: session.user.id,
      },
    })

    // if the user created the build, make sure they
    // always vote for it
    if (build.createdById === session.user.id) {
      if (!isVoteRegistered) {
        await prisma?.buildVoteCounts.create({
          data: {
            buildId: buildState.buildId,
            userId: session.user.id,
          },
        })
      }
    }
    // if the user has not voted for the build yet, register their vote
    else if (!isVoteRegistered && buildState.upvoted === true) {
      await prisma?.buildVoteCounts.create({
        data: {
          buildId: buildState.buildId,
          userId: session.user.id,
        },
      })
    }
    // if the user has voted for the build, but is now unvoting
    else if (isVoteRegistered && !buildState.upvoted) {
      await prisma?.buildVoteCounts.delete({
        where: {
          id: isVoteRegistered.id,
        },
      })
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
        message: 'Vote registered!',
        totalUpvotes,
      },
      { status: 200, headers },
    )
  } catch (e) {
    console.error(e)
    return Response.json(
      { message: 'Error in saving vote!' },
      { status: 500, headers },
    )
  }
}
