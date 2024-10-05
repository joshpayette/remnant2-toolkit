import { prisma } from '@repo/db';
import { urlNoCache } from '@repo/utils';
import { type NextRequest } from 'next/server';

/**  The number of builds to add when a milestone is reached */
const MILESTONE_STEP = 500;

/**
 * Notifies Discord when the build total exceeds the NEXT_BUILD_MILESTONE
 * Once the milestone is reached, a webhook is sent to Discord
 *
 * In order to set the next milestone, update the TotalBuildMilestone db table
 */
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
        title: `Total build count milestone script succeeded.`,
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
    // Get the milestone data
    const milestone = await prisma.totalBuildMilestone.findFirst();
    if (!milestone) {
      throw new Error('Milestone data not found');
    }

    // Get total count of builds that are public
    const totalBuilds = await prisma.build.count({
      where: {
        isPublic: true,
      },
    });

    if (totalBuilds < milestone.targetBuildCount) {
      await fetch(`${process.env.WEBHOOK_CRON_LOGS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(successParams),
      });

      return new Response(
        `Not enough builds to reach the next milestone: ${totalBuilds} / ${milestone.targetBuildCount}`,
        {
          status: 200,
        },
      );
    }

    // Get the milestone.targetBuildCount build
    // If milestone.targetBuildCount is 3000, it should be the 3000th public build
    const build = await prisma.build.findFirst({
      where: {
        isPublic: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip: milestone.targetBuildCount - 1,
    });
    if (!build) {
      throw new Error(`Build not found at index ${milestone.targetBuildCount}`);
    }

    // Update the database for the next milestone
    await prisma.totalBuildMilestone.update({
      where: {
        id: milestone.id,
      },
      data: {
        targetBuildCount: milestone.targetBuildCount + MILESTONE_STEP,
      },
    });

    const url = urlNoCache(`https://remnant2toolkit.com/builder/${build.id}`);

    const params = {
      content: `# ${milestone.targetBuildCount}th build created! ${url}`,
    };

    const res = await fetch(`${process.env.WEBHOOK_MILESTONES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      console.error('Error in sending build webhook to Discord!');
    }

    await fetch(`${process.env.WEBHOOK_CRON_LOGS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(successParams),
    });

    console.info('Total build count milestone script succeeded.');

    return Response.json({ success: true });
  } catch (e) {
    console.error(e);

    const params = {
      embeds: [
        {
          title: `Total build count milestone script failed.`,
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
