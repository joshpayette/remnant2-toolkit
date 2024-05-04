import { NextRequest } from 'next/server'

import { validateEnv } from '@/app/(validators)/validate-env'
import { handleWeaponItems } from '@/app/api/cron/wiki/scraper/weapons/handle-weapon-items'
export async function GET(request: NextRequest) {
  const envVars = validateEnv()

  const authHeader = request.headers.get('authorization')
  if (
    authHeader !== `Bearer ${envVars.CRON_SECRET}` &&
    envVars.NODE_ENV === 'production'
  ) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  await handleWeaponItems()

  console.info('Finished running wiki scraper script.')

  return new Response('Finished running wiki scraper script.', {
    status: 200,
  })
}
