'use client'

import Builder from '@/app/builder/(components)/Builder'
import { cn } from '@/app/(lib)/utils'
import useBuildScreenshot from '../(hooks)/useBuildScreenshot'
import useBuildActions from '../(hooks)/useBuildActions'
import Button from '../(components)/Button'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import { buildToCsvData, dbBuildToBuildState } from '../(lib)/utils'
import { Build } from '@prisma/client'
import { useIsClient } from 'usehooks-ts'
import { useRef } from 'react'

export default function Page({
  params: { dbBuild },
}: {
  params: { dbBuild: Build }
}) {
  const isClient = useIsClient()

  const buildContainerRef = useRef<HTMLDivElement>(null)
  const { isScreenshotModeActive, handleImageExport } = useBuildScreenshot()

  // Need to convert the build data to a format that the BuildPage component can use
  const build = dbBuildToBuildState(dbBuild)

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildToCsvData(build)

  const {
    showLabels,
    handleCopyBuildUrl,
    handleEditBuild,
    handleToggleLabels,
  } = useBuildActions()

  if (!isClient) return null

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
        <div
          id="actions-column"
          className="flex min-w-full flex-col justify-between sm:min-w-[100px]"
        >
          <div id="actions" className="flex flex-col gap-2">
            <Button.EditBuild onClick={() => handleEditBuild(build)} />
            <Button.ExportImage
              onClick={() =>
                handleImageExport(
                  buildContainerRef.current,
                  `${build.name}.png`,
                )
              }
            />
            <Button.CopyBuildUrl onClick={handleCopyBuildUrl} />
            <ToCsvButton
              data={csvBuildData.filter((item) => item?.name !== '')}
              filename={`remnant2_builder_${build.name}`}
            />
            <hr className="my-4 border-gray-900" />
            <Button.ShowLabels
              onClick={handleToggleLabels}
              showLabels={showLabels}
            />
          </div>
        </div>
        <div
          className={cn(
            'w-full grow rounded border-2 border-green-500 bg-black p-4',
          )}
          ref={buildContainerRef}
        >
          <Builder
            buildState={build}
            isEditable={false}
            isScreenshotMode={isScreenshotModeActive}
            showControls={false}
            showLabels={showLabels}
          />
        </div>
      </div>
    </div>
  )
}
