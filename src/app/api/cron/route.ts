import type { NextRequest } from 'next/server'

/**
 * CRON script that runs to moderate reported users and builds
 */
export function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  return Response.json({ success: true })
}
