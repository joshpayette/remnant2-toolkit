import { getServerSession } from '@/app/(lib)/auth'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
})

export async function DELETE(req: Request) {
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
        id: build.id,
      },
      include: {},
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
