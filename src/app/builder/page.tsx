'use client'

import { Fragment, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import PageHeader from '@/app/PageHeader'
import ImageBuilder from './(components)/ImageBuilder'
import useQueryString from '@/hooks/useQueryString'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function BuildHomePage() {
  const searchParams = useSearchParams()
  const { parseQueryString } = useQueryString()
  const build = parseQueryString(searchParams)

  const { builder, setBuilder } = useLocalStorage()

  const [showLabels, setShowLabels] = useState(builder.showLabels)

  function toggleShowLabels() {
    setShowLabels(!showLabels)
    setBuilder({
      ...builder,
      showLabels: !showLabels,
    })
  }

  return (
    <Fragment>
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create and share Remnant 2 builds"
      >
        <div
          id="alert"
          className="rounded border border-red-500 bg-black p-4 text-red-500"
        >
          <p>
            This tool is a work in progress. It is not yet ready for public
            consumption.
          </p>
        </div>
      </PageHeader>
      <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
        <div
          id="actions-column"
          className="flex min-w-full flex-col justify-between sm:min-w-[100px]"
        >
          <div id="actions">
            <button
              id="show-labels-button"
              className={cn(
                'flex flex-col items-center rounded border px-4 py-2 font-bold text-white hover:bg-green-700',
                showLabels
                  ? 'border-transparent bg-green-500'
                  : 'border-green-500 bg-black',
              )}
              onClick={toggleShowLabels}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              <span className="text-sm">
                {showLabels ? 'Hide Labels' : 'Show Labels'}
              </span>
            </button>
          </div>
        </div>
        <div className="w-full grow rounded border-2 border-green-500 bg-black p-4">
          <ImageBuilder build={build} showLabels={showLabels} />
        </div>
      </div>
    </Fragment>
  )
}
