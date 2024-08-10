'use client'

import { BaseLink } from '@repo/ui/base/link'
import { EyeIcon } from '@repo/ui/icons/eye'
import { useState } from 'react'

import { BuildCard } from '@/app/(components)/cards/build-card'
import { QualityBuildDialog } from '@/app/(components)/dialogs/quality-build-dialog'
import { Tooltip } from '@/app/(components)/tooltip'
import type { DBBuild } from '@/app/(types)/builds'

interface Props {
  builds: DBBuild[]
}

export function QualityBuildsFeed({ builds }: Props) {
  const [qualityBuildDialogOpen, setQualityBuildDialogOpen] = useState(false)

  return (
    <>
      <QualityBuildDialog
        open={qualityBuildDialogOpen}
        onClose={() => setQualityBuildDialogOpen(false)}
      />
      <div className="border-b-primary-500 flex w-full flex-row items-end justify-center border-b py-2">
        <div className="flex w-full flex-row justify-between text-xl sm:justify-start sm:gap-x-4">
          Latest Quality Builds
          <button
            onClick={() => setQualityBuildDialogOpen(true)}
            className="hover:text-surface-solid text-primary-400 text-right text-sm underline"
          >
            What makes a Quality Build?
          </button>
        </div>
      </div>
      <ul
        role="list"
        className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {builds.map((build) => (
          <div key={build.id} className="mt-4 w-full">
            <BuildCard
              build={build}
              isLoading={false}
              footerActions={
                <Tooltip content="View Build">
                  <BaseLink
                    href={`/builder/${build.id}`}
                    className="text-primary-500 hover:text-primary-300 flex flex-col items-center gap-x-3 rounded-br-lg border border-transparent px-4 py-2 text-xs font-semibold hover:underline"
                  >
                    <EyeIcon className="h-4 w-4" /> View
                  </BaseLink>
                </Tooltip>
              }
            />
          </div>
        ))}
      </ul>

      <div className="flex w-full flex-row items-end justify-end">
        <BaseLink
          href="/community-builds?withQuality=true"
          className="text-sm underline"
        >
          View more quality builds
        </BaseLink>
      </div>
    </>
  )
}
