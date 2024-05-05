import { NextRequest } from 'next/server'

import { validateEnv } from '@/app/(validators)/validate-env'
import { handleAmuletItems } from '@/app/api/cron/wiki/scraper/amulets/handle-amulet-items'
import { handleArmorItems } from '@/app/api/cron/wiki/scraper/armor/handle-armor-items'
import { handleConcoctionItems } from '@/app/api/cron/wiki/scraper/concoctions/handle-concoction-items'
import { handleConsumableItems } from '@/app/api/cron/wiki/scraper/consumables/handle-consumable-items'
import { handleModItems } from '@/app/api/cron/wiki/scraper/mods/handle-mod-items'
import { handleMutatorItems } from '@/app/api/cron/wiki/scraper/mutators/handle-mutator-items'
import { handlePerkItems } from '@/app/api/cron/wiki/scraper/perks/handle-perk-items'
import { handleRelicFragmentItems } from '@/app/api/cron/wiki/scraper/relicfragments/handle-relicfragment-items'
import { handleRelicItems } from '@/app/api/cron/wiki/scraper/relics/handle-relic-items'
import { handleRingItems } from '@/app/api/cron/wiki/scraper/rings/handle-ring-items'
import { handleSkillItems } from '@/app/api/cron/wiki/scraper/skills/handle-skill-items'
import { handleTraitItems } from '@/app/api/cron/wiki/scraper/traits/handle-trait-items'
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

  // no need for archetype items

  await handleAmuletItems()
  await handleArmorItems()
  await handleConcoctionItems()
  await handleConsumableItems()
  await handleModItems()
  await handleMutatorItems()
  await handlePerkItems()
  await handleRelicFragmentItems()
  await handleRelicItems()
  await handleRingItems()
  await handleSkillItems()
  await handleTraitItems()
  await handleWeaponItems()

  // Send Discord message stating thte script has finished running
  // Send the update notification to Discord
  const params = {
    embeds: [
      {
        title: `Wiki scraper script completed.`,
        color: 0x00ff00,
      },
    ],
  }

  if (envVars.NODE_ENV === 'production') {
    const res = await fetch(`${envVars.WEBHOOK_WIKI_SCRAPER_FEED}`, {
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

  console.info('Finished running wiki scraper script.')

  return new Response('Finished running wiki scraper script.', {
    status: 200,
  })
}
