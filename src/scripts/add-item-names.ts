/**
 * Reads a CSV export containing column[0] = item ID, column[1] = item count
 * and adds a new column with the item name, then exports it
 */

import * as fs from 'fs'
import Papa from 'papaparse'
import * as path from 'path'

import { remnantItems } from '../features/items/data/remnantItems'

const csvPath = path.join(__dirname, './itemcount.csv')
const csv = fs.readFileSync(csvPath, 'utf8')
const results = Papa.parse<[string, string]>(csv, { header: false })

const newData = []

for (const result of results.data) {
  const itemId = result[0]
  const itemCount = result[1]
  const itemName = remnantItems.find((item) => item.id === itemId)?.name

  if (itemName) {
    newData.push([itemName, itemCount])
  }
}

// Write the new data to a new file
const newCsv = Papa.unparse(newData)
const newCsvPath = path.join(__dirname, './itemcount-names.csv')
fs.writeFileSync(newCsvPath, newCsv)
console.log('Wrote new CSV to', newCsvPath)
