/**
 * Opens the /data/items.ts file and assigns a unique 6-digit id to each item
 * Writes the items with ids to a json file
 */

import { remnantItems } from '../data/items'
import { Item } from '../types'
import fs from 'fs'

const outputPath = '../data/indexed-items.json'

// assign a unique id to each item

const indexItems = (items: Item[]) => {
  return items.map((item, index) => {
    if (item.id) {
      return item
    }

    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    const firstPart = ('000' + (Math.random() * 46656).toString(36)).slice(-3)
    const secondPart = ('000' + (Math.random() * 46656).toString(36)).slice(-3)
    const id = firstPart + secondPart
    return { ...item, id }
  })
}

const indexedItems = indexItems(remnantItems)

// write the indexed items to a json file
fs.writeFile(outputPath, JSON.stringify(indexedItems), (err: unknown) => {
  if (err) {
    console.log(err)
  } else {
    console.log('File written successfully\n')
  }
})
