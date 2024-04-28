import { writeFile } from 'fs'
import path from 'path'

import { ringItems } from '../../app/(data)/items/ring-items'
import { prisma } from '../../features/db/index'

async function main() {
  const results: Array<{
    id: string
    name: string
    count: number
  }> = []

  console.info('running report')

  for (const item of ringItems) {
    const { name, id } = item
    const count = await prisma.buildItems.count({
      where: {
        itemId: id,
        build: {
          isPublic: true,
        },
      },
    })

    results.push({ id, name, count })
  }

  // sort results by count, highest to lowest
  results.sort((a, b) => b.count - a.count)

  // write the results to a csv file
  const csv = results
    .map((result) => `${result.id},${result.name},${result.count}`)
    .join('\n')
  // write to the current folder
  writeFile(path.join(__dirname, 'ring-report.csv'), csv, (err) => {
    if (err) {
      console.error('error writing report', err)
    } else {
      console.info('report written')
    }
  })
}

main()
