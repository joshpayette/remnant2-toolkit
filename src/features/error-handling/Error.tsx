'use client'

import { useEffect } from 'react'

import { PageHeader } from '@/features/ui/PageHeader'

export function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // * useEffect necessary here to update the document title
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    document.title = 'Oops! | Remnant 2 Toolkit'
  }, [error])

  return (
    <div className="flex max-w-lg flex-col">
      <PageHeader title="Something went wrong!" subtitle={error.message} />
      <button
        onClick={() => reset()}
        aria-label="Try again"
        className="rounded-md bg-gray-800 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  )
}
