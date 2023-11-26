/**
 * Imports the /data/items.ts file and alphabetizes the items by type and name
 * Writes the alphabetized items to a json file
 */

import { remnantItems } from '../data/items'
import { Item } from '../types'
import fs from 'fs'

const outputPath = '../data/alphabetized-items.json'

// sort the array of objects by object.type and object.name alphabetically

const alphabetizeItems = (items: Item[]) => {
  return items.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name)
    } else {
      return a.type.localeCompare(b.type)
    }
  })
}

const alphabetizedItems = alphabetizeItems(remnantItems)

// write the alphabetized items to a json file
fs.writeFile(outputPath, JSON.stringify(alphabetizedItems), (err: unknown) => {
  if (err) {
    console.log(err)
  } else {
    console.log('File written successfully\n')
  }
})
