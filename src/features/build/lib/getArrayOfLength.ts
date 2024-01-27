/**
 * Generates an array of the specified length
 */
export default function getArrayOfLength(length: number): number[] {
  return Array.from(Array(length).keys())
}
