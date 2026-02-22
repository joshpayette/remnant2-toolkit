export function cleanItemName(itemName: string) {
  return itemName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}
