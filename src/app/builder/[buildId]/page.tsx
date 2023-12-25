'use client'

import Builder from '@/app/builder/(components)/Builder'
import { buildToCsvData, cn, dbBuildToBuildState } from '@/app/(lib)/utils'
import useBuildScreenshot from '../(hooks)/useBuildScreenshot'
import useBuildActions from '../(hooks)/useBuildActions'
import { ActionButton } from '../(components)/ActionButton'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import { useIsClient } from 'usehooks-ts'
import { useRef } from 'react'
import { useSession } from 'next-auth/react'
import PageHeader from '@/app/(components)/PageHeader'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'
import { DBBuild } from '@/app/(types)'

export default function Page({
  params: { dbBuild },
}: {
  params: { dbBuild: DBBuild }
}) {
  const isClient = useIsClient()
  const { data: session } = useSession()

  const buildContainerRef = useRef<HTMLDivElement>(null)
  const { isScreenshotModeActive, handleImageExport } = useBuildScreenshot()

  // Need to convert the build data to a format that the BuildPage component can use
  const buildState = dbBuildToBuildState(dbBuild)

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildToCsvData(buildState)

  const {
    showLabels,
    handleDuplicateBuild,
    handleEditBuild,
    handleToggleLabels,
  } = useBuildActions()

  if (!isClient) return null

  function handleCopyBuildUrl() {
    copy(window.location.href)
    toast.success('Copied Build URL to clipboard.')
  }

  return (
    <>
      <PageHeader
        title={buildState.name}
        subtitle={`Build by ${buildState.createdByDisplayName}`}
      >
        {/* <div className="text-md mb-4 rounded border border-purple-500 p-4 text-left">
          <p className="text-md text-left text-gray-200">
            {buildState.description}
          </p>
        </div> */}
      </PageHeader>
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
              <ActionButton.CopyBuildUrl onClick={handleCopyBuildUrl} />
              <ToCsvButton
                data={csvBuildData.filter((item) => item?.name !== '')}
                filename={`remnant2_builder_${buildState.name}`}
              />
              <hr className="my-4 border-gray-900" />
              <ActionButton.ShowLabels
                onClick={handleToggleLabels}
                showLabels={showLabels}
              />
            </div>
          </div>
          <div
            className={cn(
              'w-full grow rounded border-2 border-green-500 bg-black p-4',
              isScreenshotModeActive && 'min-h-[731px] min-w-[502px]',
            )}
            ref={buildContainerRef}
          >
            <Builder
              buildState={buildState}
              isEditable={false}
              isScreenshotMode={isScreenshotModeActive}
              showControls={false}
              showLabels={showLabels}
            />
          </div>
        </div>
      </div>
    </>
  )
}
