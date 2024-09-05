import { cleanItemName, urlNoCache } from '@repo/utils';

/**
 * Builds a link to the provided item's endpoint.
 */
export function itemEndpoint(itemName: string) {
  return `https://remnant2toolkit.com/i/${cleanItemName(itemName)}`;
}

/**
 * Builds a link to the provided item's endpoint and appends a unique token.
 * This is useful for cases such as shared URLs where caching is undesirable.
 */
export function itemShareEndpoint(itemName: string) {
  return `${urlNoCache(itemEndpoint(itemName))}`;
}
