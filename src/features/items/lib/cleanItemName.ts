import { Item } from '../types'

export function cleanItemName(item: Item) {
  return item.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}

/**
 * Builds a link to the provided item's endpoint. 
 */
export function itemEndpoint(item: Item) {
  return `https://remnant2toolkit.com/endpoint/item/${cleanItemName(item)}`
}

/**
 * Builds a link to the provided item's endpoint and appends a unique token. 
 * This is useful for cases such as shared URLs where caching is undesirable. 
 */
export function itemShareEndpoint(item: Item) {
  return `${itemEndpoint(item)}?t=${Date.now()}`
}
