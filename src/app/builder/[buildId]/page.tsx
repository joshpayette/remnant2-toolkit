'use client'

import Builder from '@/app/builder/(components)/Builder'
import { buildToCsvData, cn, dbBuildToBuildState } from '@/app/(lib)/utils'
import useBuildActions from '../(hooks)/useBuildActions'
import { ActionButton } from '../(components)/ActionButton'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import { useIsClient } from 'usehooks-ts'
import { useRef } from 'react'
import { useSession } from 'next-auth/react'
import PageHeader from '@/app/(components)/PageHeader'
import { DBBuild } from '@/app/(types)'
import TotalUpvotes from '../(components)/TotalUpvotes'
import DetailedBuildView from '../(components)/DetailedBuildView'
import Dialog from '@/app/(components)/Dialog'
import Link from 'next/link'
import ImageDownloadLink from '../(components)/ImageDownloadLink'

export default function Page({
  params: { dbBuild },
}: {
  params: { dbBuild: DBBuild }
}) {
  const isClient = useIsClient()
  const { data: session } = useSession()

  const {
    isScreenshotMode,
    showControls,
    imageLink,
    handleClearImageLink,
    handleCopyBuildUrl,
    handleDuplicateBuild,
    handleEditBuild,
    handleImageExport,
    handleToggleReport,
    handleToggleVote,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)

  // Need to convert the build data to a format that the BuildPage component can use
  const buildState = dbBuildToBuildState(dbBuild)
  if (!session?.user) {
    buildState.upvoted = false
    buildState.reported = false
  }

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildToCsvData(buildState)

  if (!isClient) return null

  return (
    <>
      <PageHeader
        title={buildState.name}
        subtitle={`Build by ${buildState.createdByDisplayName}`}
      />
      <ImageDownloadLink onClose={handleClearImageLink} imageLink={imageLink} />
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
          <div
            id="actions-column"
            className="flex min-w-full flex-col justify-between sm:min-w-[100px]"
          >
            <div id="actions" className="flex flex-col gap-2">
              {session && session.user?.id === buildState.createdById && (
                <ActionButton.EditBuild
                  onClick={() => handleEditBuild(buildState)}
                />
              )}
              <ActionButton.DuplicateBuild
                onClick={() => handleDuplicateBuild(buildState)}
              />
              <ActionButton.ExportImage
                onClick={() =>
                  handleImageExport(
                    buildContainerRef.current,
                    `${buildState.name}.png`,
                  )
                }
              />
              <ActionButton.CopyBuildUrl
                onClick={() =>
                  handleCopyBuildUrl(
                    window.location.href,
                    'Copied Build URL to clipboard.',
                  )
                }
              />
              <ToCsvButton
                data={csvBuildData.filter((item) => item?.name !== '')}
                filename={`remnant2_builder_${buildState.name}`}
              />
              {session?.user && (
                <>
                  <hr className="my-4 border-gray-500" />

                  <div className="flex w-full flex-col items-center justify-center gap-4">
                    <TotalUpvotes totalUpvotes={buildState.totalUpvotes} />

                    <ActionButton.Vote
                      active={buildState.upvoted}
                      onClick={() => handleToggleVote(buildState)}
                    />
                  </div>

                  <hr className="my-4 border-gray-500" />

                  <div className="flex w-full flex-col items-center justify-center gap-4">
                    <ActionButton.ReportBuild
                      active={buildState.reported}
                      onClick={() => handleToggleReport(buildState)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            className={cn(
              'w-full grow rounded border-2 border-green-500 bg-black p-4',
              isScreenshotMode && 'min-h-[731px] min-w-[502px]',
            )}
            ref={buildContainerRef}
          >
            <Builder
              buildState={buildState}
              isEditable={false}
              isScreenshotMode={isScreenshotMode}
              showControls={showControls}
            />
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center gap-2">
          <DetailedBuildView
            buildState={buildState}
            isScreenshotMode={isScreenshotMode}
          />
        </div>
      </div>
    </>
  )
}
