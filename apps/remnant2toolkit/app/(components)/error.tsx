'use client'

import { useEffect } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { PageHeader } from '@/app/(components)/page-header'

export function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
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
      {reset ? (
        <BaseButton color="cyan" onClick={() => reset()} aria-label="Try again">
          Try again
        </BaseButton>
      ) : null}
    </div>
  )
}
