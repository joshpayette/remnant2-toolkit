import { getServerSession } from '@/app/(lib)/auth'
import { badWordFilter } from '@/app/(lib)/badword-filter'
import { z } from 'zod'
import { prisma } from '@/app/(lib)/db'
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

export async function PATCH(req: Request) {
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

  const unsafeUserState = await req.json()
  const userStateParsed = z
    .object({
      displayName: z.string(),
    })
    .safeParse(unsafeUserState)

  if (!userStateParsed.success) {
    console.error(
      'Invalid user state!',
      userStateParsed.error.issues.forEach((issue) => console.error(issue)),
    )
    return Response.json(
      { message: 'Invalid user state!' },
      { status: 400, headers },
    )
  }

  try {
    const userState = userStateParsed.data
    const displayName = badWordFilter(userState.displayName)

    const dbResponse = await prisma?.user.update({
      where: { id: session.user.id },
      data: { displayName },
    })

    if (!dbResponse) {
      return Response.json(
        { message: 'Error updating user!' },
        { status: 500, headers },
      )
    }

    return Response.json(
      { message: 'Successfully updated user!' },
      { status: 200, headers },
    )
  } catch (e) {
    return Response.json(
      { message: 'Error updating user!' },
      { status: 500, headers },
    )
  }
}
