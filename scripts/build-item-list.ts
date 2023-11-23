// Iterate over the the images in the /public/armor directory and
// build the .json armor list with 3 properties: slot, name, and path.
// The path is the relative path to the image file.
// the slot is determined by the subfolder name
// the name is determined by the filename, replacing underscores with spaces,
// removing the file extension, and capitalizing the first letter of each word.

import fs from 'fs'
import path from 'path'
import type { Item, ItemType } from '../src/types'

const itemPath = path.join(__dirname, '../public/items')
const itemList: Item[] = []

fs.readdirSync(itemPath).forEach((type: string) => {
  fs.readdirSync(path.join(itemPath, type)).forEach((file: string) => {
    const armorName = file
      .replace(/_/g, ' ') // replace underscores with spaces
      .replace(/\.[^/.]+$/, '') // remove file extension
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
      ) // uppercase the first letter of each word
    itemList.push({
      type: type as ItemType,
      name: armorName,
      path: `/items/${type}/${file}`,
    })
  })
})

// Output the armor list to /data/armor.json
fs.writeFileSync(
  path.join(__dirname, '../src/data/item-list.json'),
  JSON.stringify(itemList, null, 2),
)
