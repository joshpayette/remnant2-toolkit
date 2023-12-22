'use client'

import { useEffect } from 'react'
import PageHeader from '@/app/(components)/PageHeader'
import Builder from './(components)/Builder'
import useBuildSearchParams from '@/app/builder/(hooks)/useBuildSearchParams'
import { useIsClient } from 'usehooks-ts'
import useBuildScreenshot from './(hooks)/useBuildScreenshot'
import { cn } from '../(lib)/utils'
import SaveBuildButton from './(components)/SaveBuildButton'
import useBuildActions from './(hooks)/useBuildActions'
import { Button } from './(components)/Button'
import ToCsvButton from '../(components)/ToCsvButton'
import { buildToCsvData } from './(lib)/utils'

export default function Page() {
  const { currentBuildState } = useBuildSearchParams()
  const { buildContainerRef, isScreenshotModeActive } = useBuildScreenshot()

  const {
    showLabels,
    showControls,
    handleExportImage,
    handleCopyBuildUrl,
    handleToggleControls,
    handleToggleLabels,
  } = useBuildActions()

  const isClient = useIsClient()

  // Add the build name to the page title
  useEffect(() => {
    if (!currentBuildState) return
    document.title = `${currentBuildState.name} | Remnant 2 Toolkit`
  }, [currentBuildState])

  if (!isClient) return null

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildToCsvData(currentBuildState)

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create your builds and share them with your friends and the community."
      >
        &nbsp;
      </PageHeader>
      <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
        <div
          id="actions-column"
          className="flex min-w-full flex-col justify-between sm:min-w-[100px]"
        >
          <div id="actions" className="flex flex-col gap-2">
            <SaveBuildButton />
            <Button.ExportImage onClick={handleExportImage} />
            <Button.CopyBuildUrl onClick={handleCopyBuildUrl} />
            <ToCsvButton
              data={csvBuildData.filter((item) => item?.name !== '')}
              filename={`remnant2_builder_${currentBuildState.name}`}
            />
            <hr className="my-4 border-gray-900" />
            <Button.ShowControls
              onClick={handleToggleControls}
              showControls={showControls}
            />
            <Button.ShowLabels
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
            buildState={currentBuildState}
            isEditable={true}
            isScreenshotMode={isScreenshotModeActive}
            showLabels={showLabels}
            showControls={showControls}
          />
        </div>
      </div>
    </div>
  )
}
