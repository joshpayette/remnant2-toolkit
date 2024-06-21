import ImageKit from 'imagekit'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_CLIENT_ID ?? '',
      privateKey: process.env.IMAGEKIT_CLIENT_SECRET ?? '',
      urlEndpoint: 'https://ik.imagekit.io/remnant2toolkit/',
    })

    // Get all files created over an hour ago
    const files = await imagekit.listFiles({
      path: 'build-uploads-temp',
      searchQuery: 'createdAt < "1h"',
    })

    if (files.length > 0) {
      const fileIds = files.map((file) => file.fileId)

      // Delete each file
      await imagekit.bulkDeleteFiles(fileIds)

      console.info('Deleted files:', fileIds.join(', '))
    }

    // Purge the cache
    await imagekit.purgeCache(
      'https://ik.imagekit.io/remnant2toolkit/build-uploads-temp*',
    )

    console.info('Purged cache for build-uploads-temp')

    // Trigger webhook
    const params = {
      embeds: [
        {
          title: `ImageKit Image Cleanup Script Succeeded`,
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
      console.error('Error in sending imagekit webhook to Discord!')
    }

    console.info('ImageKit image cleanup script succeeded')

    return Response.json({ success: true })
  } catch (e) {
    console.error(e)

    const params = {
      embeds: [
        {
          title: `ImageKit Image Cleanup Script Failed`,
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
    }

    await fetch(`${process.env.WEBHOOK_CRON_LOGS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    return Response.json({ success: false })
  }
}
