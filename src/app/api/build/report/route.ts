import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
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
  const requestSchema = z.object({ buildId: z.string(), reason: z.string() })
  const requestParsed = requestSchema.safeParse(unsafeRequestData)
  if (!requestParsed.success) {
    console.error(
      'Error in report data',
      requestParsed.error.issues.forEach((issue) => console.error(issue)),
    )
    return Response.json(
      { message: 'Error in report data!' },
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
    // If user created this build, they can't report it
    const userCreatedBuild = build.createdById === session.user.id
    if (userCreatedBuild) {
      return Response.json(
        {
          message: 'You cannot report your build!',
        },
        { status: 200, headers },
      )
    }

    // Check if user has already reported this build
    const isReportRegistered = await prisma?.buildReports.findFirst({
      where: {
        buildId: data.buildId,
        userId: session.user.id,
      },
    })
    if (isReportRegistered) {
      return Response.json(
        {
          message: 'You have already reported this build!',
        },
        { status: 200, headers },
      )
    }

    await prisma?.buildReports.create({
      data: {
        buildId: data.buildId,
        reason: data.reason,
        userId: session.user.id,
      },
    })

    // Trigger webhook to send report to Discord
    const params = {
      embeds: [
        {
          title: `Build Reported: ${build.id}`,
          url: `https://remnant2toolkit.com/builder/${build.id}`,
          color: 0xff0000,
          fields: [
            {
              name: 'Build ID',
              value: build.id,
            },
            {
              name: 'Reported by',
              value: session.user.id,
            },
            {
              name: 'Reason',
              value: data.reason,
            },
          ],
        },
      ],
    }

    const res = await fetch(`${process.env.WEBHOOK_REPORTED_CONTENT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      console.error('Error in sending report webhook to Discord!')
    }

    return Response.json(
      {
        message:
          'Thank you for the report. We will investigate and take action if appropriate.',
      },
      { status: 200, headers },
    )
  } catch (e) {
    console.error(e)
    return Response.json(
      { message: 'Error in saving report!' },
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
  const requestSchema = z.object({ buildId: z.string() })
  const requestParsed = requestSchema.safeParse(unsafeRequest)
  if (!requestParsed.success) {
    console.error(
      'Error in report data',
      requestParsed.error.issues.forEach((issue) => console.error(issue)),
    )
    return Response.json(
      { message: 'Error in report data!' },
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
    // If user created this build, they can't remove their report
    const userCreatedBuild = build.createdById === session.user.id
    if (userCreatedBuild) {
      return Response.json(
        {
          message: 'You cannot report a build you created.',
        },
        { status: 200, headers },
      )
    }

    // Check if user has a report for this build
    const isReportRegistered = await prisma?.buildReports.findFirst({
      where: {
        buildId: data.buildId,
        userId: session.user.id,
      },
    })
    if (!isReportRegistered) {
      return Response.json(
        {
          message: 'Your report for this build has been removed. Thank you',
        },
        { status: 200, headers },
      )
    }

    await prisma?.buildReports.delete({
      where: {
        id: isReportRegistered.id,
      },
    })

    // Trigger webhook to send report to Discord

    const params = {
      embeds: [
        {
          title: `Build Report Removed: ${build.id}`,
          url: `https://remnant2toolkit.com/builder/${build.id}`,
          color: 0x00ff00,
          fields: [
            {
              name: 'Build ID',
              value: build.id,
            },
            {
              name: 'Reported removed by',
              value: session.user.id,
            },
          ],
        },
      ],
    }

    const res = await fetch(`${process.env.WEBHOOK_REPORTED_CONTENT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      console.error('Error in sending report webhook to Discord!')
    }

    return Response.json(
      {
        message: 'Build report removed!',
      },
      { status: 200, headers },
    )
  } catch (e) {
    console.error(e)
    return Response.json(
      { message: 'Error in saving report!' },
      { status: 500, headers },
    )
  }
}
