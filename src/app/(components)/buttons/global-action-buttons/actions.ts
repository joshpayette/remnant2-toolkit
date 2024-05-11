'use server'

import { getServerSession } from '@/app/(utils)/auth'

export async function ReportBug(report: string) {
  const session = await getServerSession()

  const params = {
    embeds: [
      {
        title: `Bug Reported`,
        color: 0xff0000,
        fields: [
          {
            name: 'Report',
            value: report,
          },
          {
            name: 'User',
            value: session?.user?.name ?? 'Unknown User',
          },
        ],
      },
    ],
  }

  const res = await fetch(`${process.env.WEBHOOK_BUG_REPORT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    console.error('Error in sending build webhook to Discord!')
    return {
      message: 'Error in sending bug report!',
    }
  }

  return {
    message: 'Bug report sent! Thank you for helping improve the tool!',
  }
}
