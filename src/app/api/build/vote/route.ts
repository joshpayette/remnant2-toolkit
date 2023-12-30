import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import { revalidatePath } from 'next/cache'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { z } from 'zod'

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
})

export async function PUT(request: Request) {
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
  const unsafeRequestData = await request.json()
  const requestSchema = z.object({ upvoted: z.boolean(), buildId: z.string() })
  const requestParsed = requestSchema.safeParse(unsafeRequestData)
  if (!requestParsed.success) {
    console.error(
      'Error in vote data',
      requestParsed.error.issues.forEach((issue) => console.error(issue)),
    )
    return Response.json(
      { message: 'Error in vote data!' },
      { status: 500, headers },
    )
  }
  // infer type from build state parsed
  const data = requestParsed.data as z.infer<typeof requestSchema>

  if (!data.buildId) {
    return Response.json(
      {
        message: 'No buildId provided!',
      },
      { status: 500, headers },
    )
  }

  const build = await prisma?.build.findUnique({
    where: {
      id: data.buildId,
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
        buildId: data.buildId,
        userId: session.user.id,
      },
    })

    if (isVoteRegistered) {
      return Response.json(
        {
          message: 'Vote saved!',
        },
        { status: 200, headers },
      )
    }

    await prisma?.buildVoteCounts.create({
      data: {
        buildId: data.buildId,
        userId: session.user.id,
      },
    })

    // Get the new total upvotes
    const totalUpvotes = await prisma?.buildVoteCounts.count({
      where: {
        buildId: data.buildId,
      },
    })

    // Refresh the cache for the route
    revalidatePath(`/builder/${data.buildId}`)

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

export async function DELETE(request: Request) {
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
  const unsafeRequest = await request.json()
  const requestSchema = z.object({ upvoted: z.boolean(), buildId: z.string() })
  const requestParsed = requestSchema.safeParse(unsafeRequest)
  if (!requestParsed.success) {
    console.error(
      'Error in vote data',
      requestParsed.error.issues.forEach((issue) => console.error(issue)),
    )
    return Response.json(
      { message: 'Error in vote data!' },
      { status: 500, headers },
    )
  }
  const data = requestParsed.data as z.infer<typeof requestSchema>

  if (!data.buildId) {
    return Response.json(
      {
        message: 'No buildId provided!',
      },
      { status: 500, headers },
    )
  }

  const build = await prisma?.build.findUnique({
    where: {
      id: data.buildId,
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
    // If user created this build, they can't remove their vote
    const userCreatedBuild = build.createdById === session.user.id
    if (userCreatedBuild) {
      return Response.json(
        {
          message: 'You cannot remove your vote!',
        },
        { status: 200, headers },
      )
    }

    // Check if user has a vote for this build
    const isVoteRegistered = await prisma?.buildVoteCounts.findFirst({
      where: {
        buildId: data.buildId,
        userId: session.user.id,
      },
    })

    if (!isVoteRegistered) {
      return Response.json(
        {
          message: 'Vote removed!',
        },
        { status: 200, headers },
      )
    }

    await prisma?.buildVoteCounts.delete({
      where: {
        id: isVoteRegistered.id,
      },
    })

    // Get the new total upvotes
    const totalUpvotes = await prisma?.buildVoteCounts.count({
      where: {
        buildId: data.buildId,
      },
    })

    // Refresh the cache for the route
    revalidatePath(`/builder/${data.buildId}`)

    return Response.json(
      {
        message: 'Vote removed!',
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
