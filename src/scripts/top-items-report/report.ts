import { writeFile } from 'fs'
import path from 'path'

import { allItems } from '../../app/(data)/items/all-items'
import { amuletItems } from '../../app/(data)/items/amulet-items'
import { archetypeItems } from '../../app/(data)/items/archetype-items'
import { armorItems } from '../../app/(data)/items/armor-items'
import { concoctionItems } from '../../app/(data)/items/concoction-items'
import { consumableItems } from '../../app/(data)/items/consumable-items'
import { modItems } from '../../app/(data)/items/mod-items'
import { mutatorItems } from '../../app/(data)/items/mutator-items'
import { perkItems } from '../../app/(data)/items/perk-items'
import { relicFragmentItems } from '../../app/(data)/items/relic-fragment-items'
import { relicItems } from '../../app/(data)/items/relic-items'
import { ringItems } from '../../app/(data)/items/ring-items'
import { skillItems } from '../../app/(data)/items/skill-items'
import { traitItems } from '../../app/(data)/items/trait-items'
import { Item } from '../../app/(data)/items/types'
import { weaponItems } from '../../app/(data)/items/weapon-items'
import { ItemCategory } from '../../app/(types)/builds'
import { prisma } from '../../app/(utils)/db/index'

type Result = {
  id: string
  name: string
  count: number
}

async function runReportForCategory(category: ItemCategory | 'all') {
  let reportVars: { fileName: string; reportName: string; items: Item[] } = {
    fileName: 'all-items-report.csv',
    reportName: 'allItems',
    items: allItems,
  }

  switch (category) {
    case 'all':
      reportVars = {
        fileName: 'all-items-report.csv',
        reportName: 'allItems',
        items: allItems,
      }
      break
    case 'amulet':
      reportVars = {
        fileName: 'amulet-items-report.csv',
        reportName: 'amuletItems',
        items: amuletItems,
      }
      break
    case 'archetype':
      reportVars = {
        fileName: 'archetype-items-report.csv',
        reportName: 'archetypeItems',
        items: archetypeItems,
      }
      break
    case 'helm': {
      reportVars = {
        fileName: 'helm-items-report.csv',
        reportName: 'helmItems',
        items: armorItems.filter((item) => item.category === 'helm'),
      }
      break
    }
    case 'torso': {
      reportVars = {
        fileName: 'torso-items-report.csv',
        reportName: 'torsoItems',
        items: armorItems.filter((item) => item.category === 'torso'),
      }
      break
    }
    case 'gloves': {
      reportVars = {
        fileName: 'gloves-items-report.csv',
        reportName: 'glovesItems',
        items: armorItems.filter((item) => item.category === 'gloves'),
      }
      break
    }
    case 'legs': {
      reportVars = {
        fileName: 'legs-items-report.csv',
        reportName: 'legsItems',
        items: armorItems.filter((item) => item.category === 'legs'),
      }
      break
    }
    case 'concoction': {
      reportVars = {
        fileName: 'concoction-items-report.csv',
        reportName: 'concoctionItems',
        items: concoctionItems,
      }
      break
    }
    case 'consumable': {
      reportVars = {
        fileName: 'consumable-items-report.csv',
        reportName: 'consumableItems',
        items: consumableItems,
      }
      break
    }
    case 'mod': {
      reportVars = {
        fileName: 'mod-items-report.csv',
        reportName: 'modItems',
        items: modItems,
      }
      break
    }
    case 'mutator': {
      reportVars = {
        fileName: 'mutator-items-report.csv',
        reportName: 'mutatorItems',
        items: mutatorItems,
      }
      break
    }
    case 'perk': {
      reportVars = {
        fileName: 'perk-items-report.csv',
        reportName: 'perkItems',
        items: perkItems,
      }
      break
    }
    case 'relicfragment': {
      reportVars = {
        fileName: 'relic-fragment-items-report.csv',
        reportName: 'relicFragmentItems',
        items: relicFragmentItems,
      }
      break
    }
    case 'relic': {
      reportVars = {
        fileName: 'relic-items-report.csv',
        reportName: 'relicItems',
        items: relicItems,
      }
      break
    }
    case 'ring':
      reportVars = {
        fileName: 'ring-items-report.csv',
        reportName: 'ringItems',
        items: ringItems,
      }
      break
    case 'skill': {
      reportVars = {
        fileName: 'skill-items-report.csv',
        reportName: 'skillItems',
        items: skillItems,
      }
      break
    }
    case 'trait': {
      reportVars = {
        fileName: 'trait-items-report.csv',
        reportName: 'traitItems',
        items: traitItems,
      }
      break
    }
    case 'weapon': {
      reportVars = {
        fileName: 'weapon-items-report.csv',
        reportName: 'weaponItems',
        items: weaponItems,
      }
      break
    }
    default:
      console.error('invalid category')
      return
  }

  console.info(`running ${reportVars.reportName} report`)

  const results: Result[] = []
  for (const item of reportVars.items) {
    const { name, id } = item
    const count = await prisma.buildItems.count({
      where: {
        itemId: id,
        build: {
          isPublic: true,
          isPatchAffected: false,
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
  writeFile(
    path.join(__dirname, 'output', `${reportVars.fileName}.csv`),
    csv,
    (err) => {
      if (err) {
        console.error('error writing report', err)
      }
    },
  )
}

async function main() {
  console.info(`Running all items reports...`)

  await Promise.resolve([
    runReportForCategory('all'),
    runReportForCategory('amulet'),
    runReportForCategory('archetype'),
    runReportForCategory('helm'),
    runReportForCategory('torso'),
    runReportForCategory('gloves'),
    runReportForCategory('legs'),
    runReportForCategory('concoction'),
    runReportForCategory('consumable'),
    runReportForCategory('mod'),
    runReportForCategory('mutator'),
    runReportForCategory('perk'),
    runReportForCategory('relicfragment'),
    runReportForCategory('relic'),
    runReportForCategory('ring'),
    runReportForCategory('skill'),
    runReportForCategory('trait'),
    runReportForCategory('weapon'),
  ])

  console.info(`All items reports complete.`)
}

main()
