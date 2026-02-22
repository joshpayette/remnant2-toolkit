/**
 * Passing a number back from the database to the frontend
 * via JSON.parse will break, as the numbers are stored as
 * bigints. This function converts them so that they can be
 * passed back to the frontend without errors
 */
export function bigIntFix<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(
      value,
      (k, v) => (typeof v === 'bigint' ? v.toString() : v), // return everything else unchanged
    ),
  ) as T
}
