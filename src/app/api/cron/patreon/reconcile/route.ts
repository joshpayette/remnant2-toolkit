import type { NextRequest } from 'next/server'
import { patreon as patreonAPI } from 'patreon'
import { prisma } from '@/app/(lib)/db'

// TODO SCHEDULE THIS

/**
 * Gives specific users the benefits of a paid user
 */
const allowListIserIds = [
  'clql3zq8k0000a6m41vtnvldq',
  'clqnz8j6s000ekmx52vr5tot9',
  'clqoktf3g0005ivzzxbyane4s',
]

/**
 * CRON script that runs to moderate reported users and builds
 */
export async function GET(request: NextRequest) {
  // const authHeader = request.headers.get('authorization')
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', {
  //     status: 401,
  //   })
  // }

  try {
    const patreonAPIClient = patreonAPI(
      process.env.PATREON_CREATOR_ACCESS_TOKEN,
    )

    const campaign = await patreonAPIClient('/current_user/campaigns').then(
      ({ store }: { store: any }) => {
        const campaigns = store
          .findAll('campaign')
          .map((campaign: any) => campaign.serialize())

        return campaigns[0]
      },
    )
    const campaignId = campaign.data.id

    const pledgeEmails = await patreonAPIClient(
      `/campaigns/${campaignId}/pledges`,
    ).then(({ store }: { store: any }) =>
      store.findAll('pledge').map((pledge: any) => pledge.patron.email),
    )

    // Need to remove all users from the db table PaidUsers whose User.email is not in pledgeEmails
    const paidUsers = await prisma.paidUsers.findMany({
      include: {
        user: true, // Include the related User record
      },
    })
    for (const paidUser of paidUsers) {
      if (!pledgeEmails.includes(paidUser.user.email)) {
        await prisma.paidUsers.delete({
          where: {
            id: paidUser.id,
          },
        })
      }
    }

    // Need to add all users from pledgeEmails whose User.email is not in PaidUsers
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: pledgeEmails,
        },
      },
    })
    for (const user of users) {
      const paidUser = await prisma.paidUsers.findFirst({
        where: {
          userId: user.id,
        },
      })
      // if user is already in PaidUsers, skip
      if (paidUser) continue
      // if user is not in PaidUsers, add
      await prisma.paidUsers.create({
        data: {
          userId: user.id,
        },
      })
    }

    // Add the allowed users to the PaidUsers table
    for (const userId of allowListIserIds) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      if (!user) continue
      const paidUser = await prisma.paidUsers.findFirst({
        where: {
          userId: user.id,
        },
      })
      // if user is already in PaidUsers, skip
      if (paidUser) continue
      // if user is not in PaidUsers, add
      await prisma.paidUsers.create({
        data: {
          userId: user.id,
        },
      })
    }

    // Trigger webhook
    const params = {
      embeds: [
        {
          title: `Patreon Membership Script Succeeded`,
          color: 0x00ff00,
          fields: [
            {
              name: 'Last Run',
              value: new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
              }),
            },
          ],
        },
      ],
    }

    const res = await fetch(`${process.env.WEBHOOK_CRON_LOGS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      console.error('Error in sending build webhook to Discord!')
    }

    return Response.json({ success: true })
  } catch (e) {
    console.error(e)
    return Response.json({ success: false })

    // // Trigger webhook
    // const params = {
    //   embeds: [
    //     {
    //       title: `Patreon Membership Script Failed`,
    //       color: 0xff0000,
    //       fields: [
    //         {
    //           name: 'Last Run',
    //           value: new Date().toLocaleString('en-US', {
    //             timeZone: 'America/New_York',
    //           }),
    //         },
    //       ],
    //     },
    //   ],
    // }

    // const res = await fetch(`${process.env.WEBHOOK_CRON_LOGS}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(params),
    // })

    // if (!res.ok) {
    //   console.error('Error in sending build webhook to Discord!')
    // }
  }
}
