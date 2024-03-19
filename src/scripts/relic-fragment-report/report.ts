import { writeFile } from 'fs'
import path from 'path'

import { prisma } from '../../features/db/index'
import { relicFragmentItems } from '../../features/items/data/relicFragmentItems'

async function main() {
  const results: Array<{
    id: string
    name: string
    count: number
  }> = []

  console.info('running report')

  for (const item of relicFragmentItems) {
    const { name, id } = item
    const count = await prisma.buildItems.count({
      where: {
        itemId: id,
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
  writeFile(path.join(__dirname, 'relic-fragment-report.csv'), csv, (err) => {
    if (err) {
      console.error('error writing report', err)
    } else {
      console.info('report written')
    }
  })
}

main()
