'use server'

export async function ReportBug({
  report,
  username,
}: {
  report: string
  username: string
}) {
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
            value: username ?? 'Unknown User',
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
