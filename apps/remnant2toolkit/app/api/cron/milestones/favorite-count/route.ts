import { prisma } from '@repo/db';
import { urlNoCache } from '@repo/utils';
import type { NextRequest } from 'next/server';

/** Ignore all milestones before this date. */
const MILESTONE_START_DATE = '2024-08-03T00:00:00.000Z';

/** The number of favorites required for notification. */
const TOTAL_FAVORITES_MILESTONE = 25;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const successParams = {
    embeds: [
      {
        title: `Total favorite count milestone script succeeded.`,
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
  };

  try {
    // Fetch all isPublic builds that are:
    //  - Build.createdAt is after the milestone start date
    //  - Build.milestoneLogged value is false
    //  - Build.isPublic is true
    //  - Build.isPatchAffected is false
    const builds = await prisma.build.findMany({
      where: {
        createdAt: {
          gte: new Date(MILESTONE_START_DATE),
        },
        milestoneLogged: false,
        isPublic: true,
        isPatchAffected: false,
      },
      include: {
        BuildVotes: true,
      },
    });

    if (builds.length === 0) {
      throw new Error(
        'No builds found in the milestone favorite count script.',
      );
    }

    // Filter the builds to only include those that have reached the milestone
    const filteredBuilds = builds.filter((build) => {
      return build.BuildVotes.length >= TOTAL_FAVORITES_MILESTONE;
    });

    // async loop over each filteredBuild
    // for each build, update the milestoneLogged value to true
    // and send a webhook to Discord
    for await (const build of filteredBuilds) {
      await prisma.build.update({
        where: {
          id: build.id,
        },
        data: {
          milestoneLogged: true,
        },
      });

      const url = urlNoCache(`https://remnant2toolkit.com/builder/${build.id}`);

      const params = {
        content: `${TOTAL_FAVORITES_MILESTONE} favorites milestone reached! ${url}`,
      };

      const res = await fetch(`${process.env.WEBHOOK_MILESTONES}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        console.error(
          'Error in sending favorite count milestone webhook to Discord!',
        );
      }
    }

    await fetch(`${process.env.WEBHOOK_CRON_LOGS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(successParams),
    });

    console.info('Total favorite count milestone script succeeded.');

    return Response.json({ success: true });
  } catch (e) {
    console.error(e);

    const params = {
      embeds: [
        {
          title: `Total favorite count milestone script failed.`,
          color: 0xff0000,
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
    };

    await fetch(`${process.env.WEBHOOK_CRON_LOGS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    return Response.json({ success: false });
  }
}
