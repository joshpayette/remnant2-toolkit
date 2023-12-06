import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Modifies the URL query string by adding or updating a parameter.
 *
 * @example Adds a `name` parameter to the query string
 * router.push(`${pathname}?${createQueryString('name', name)}`)
 */
export default function useCreateQueryString() {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  return createQueryString
}
