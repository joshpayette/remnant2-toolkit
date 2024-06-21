import { urlNoCache } from '@/app/(utils)/url-no-cache'

export function cleanItemName(itemName: string) {
  return itemName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}

/**
 * Builds a link to the provided item's endpoint.
 */
export function itemEndpoint(itemName: string) {
  return `https://remnant2toolkit.com/i/${cleanItemName(itemName)}`
}

/**
 * Builds a link to the provided item's endpoint and appends a unique token.
 * This is useful for cases such as shared URLs where caching is undesirable.
 */
export function itemShareEndpoint(itemName: string) {
  return `${urlNoCache(itemEndpoint(itemName))}`
}
