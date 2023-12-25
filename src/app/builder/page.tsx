'use client'

import { useEffect, useRef } from 'react'
import PageHeader from '@/app/(components)/PageHeader'
import Builder from './(components)/Builder'
import useBuildState from '@/app/builder/(hooks)/useBuildState'
import { useIsClient } from 'usehooks-ts'
import useBuildScreenshot from './(hooks)/useBuildScreenshot'
import { buildToCsvData, cn } from '../(lib)/utils'
import SaveBuildButton from './(components)/SaveBuildButton'
import useBuildActions from './(hooks)/useBuildActions'
import { Button } from './(components)/Button'
import ToCsvButton from '../(components)/ToCsvButton'
import { useLocalStorage } from '../(hooks)/useLocalStorage'
import { useSearchParams } from 'next/navigation'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

export default function Page() {
  const { buildState } = useBuildState()
  const { builderStorage, setBuilderStorage } = useLocalStorage()
  const searchParams = useSearchParams()

  const { isScreenshotModeActive, handleImageExport } = useBuildScreenshot()
  const buildContainerRef = useRef<HTMLDivElement>(null)

  const { showLabels, showControls, handleToggleControls, handleToggleLabels } =
    useBuildActions()

  const isClient = useIsClient()

  function handleCopyBuildUrl() {
    copy(window.location.href)
    toast.success(
      `Build url copied to clipboard.\r\n
      \r\n
      Want a shorter and more readable URL? Next time, click the "Save Build" button!`,
    )
  }

  // if search params are empty, clear the temp values
  // from localstorage
  useEffect(() => {
    console.info('checking search params')
    if (searchParams.toString() === '') {
      setBuilderStorage({
        ...builderStorage,
        tempBuildId: null,
        tempCreatedById: null,
        tempDescription: null,
        tempIsPublic: null,
      })
    }
  }, [searchParams])

  // Add the build name to the page title
  useEffect(() => {
    if (!buildState) {
      document.title = 'Remnant 2 Toolkit'
      return
    }
    document.title = `${buildState.name} | Remnant 2 Toolkit`
  }, [buildState])

  if (!isClient) return null

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildToCsvData(buildState)

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
            <SaveBuildButton buildState={buildState} />
            <Button.ExportImage
              onClick={() =>
                handleImageExport(
                  buildContainerRef.current,
                  `${buildState.name}.png`,
                )
              }
            />
            <Button.CopyBuildUrl onClick={handleCopyBuildUrl} />
            <ToCsvButton
              data={csvBuildData.filter((item) => item?.name !== '')}
              filename={`remnant2_builder_${buildState.name}`}
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
            buildState={buildState}
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
