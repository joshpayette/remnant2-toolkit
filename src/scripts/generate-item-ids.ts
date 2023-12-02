/**
 * Opens the /data/items.ts file and assigns a unique 6-digit id to each item
 * Writes the items with ids to a json file
 */

import { remnantItems } from '../data/items'
import { Item } from '../types'
import fs from 'fs'

const outputPath = '../data/indexed-items.json'

function generateId(): string {
  const firstPart = ('000' + (Math.random() * 46656).toString(36)).slice(-3)
  const secondPart = ('000' + (Math.random() * 46656).toString(36)).slice(-3)
  return firstPart + secondPart
}

const indexItems = (items: Item[]): Item[] => {
  return items.map((item) => {
    // If the item already has an id, return it as is
    if (item.id !== '') return item

    // Keep generating an id until it is unique
    let id = generateId()
    while (items.find((item) => item.id === id)) {
      id = generateId()
    }
    return { ...item, id }
  })
}

const indexedItems = indexItems(remnantItems)

// write the indexed items to a json file
fs.writeFile(outputPath, JSON.stringify(indexedItems), (err: unknown) => {
  if (err) {
    console.error(err)
  } else {
    console.info('File written successfully\n')
  }
})
