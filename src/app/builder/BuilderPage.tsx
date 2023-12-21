'use client'

import { useEffect, useRef, useState } from 'react'
import PageHeader from '@/app/(components)/PageHeader'
import Builder from './(components)/Builder'
import useQueryString from '@/app/builder/(hooks)/useBuildSearchParams'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useIsClient } from 'usehooks-ts'
import Actions from './(components)/Actions'
import useBuildScreenshot from './(hooks)/useBuildScreenshot'

export default function BuildHomePage() {
  const isClient = useIsClient()
  const buildImageRef = useRef<HTMLDivElement>(null)

  const { currentBuildState } = useQueryString()
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  const [showLabels, setShowLabels] = useState(builderStorage.showLabels)
  const [showControls, setShowControls] = useState(builderStorage.showControls)

  const { handleImageExport, isScreenshotModeActive } = useBuildScreenshot()

  // Add the build name to the page title
  useEffect(() => {
    if (!currentBuildState) return
    document.title = `${currentBuildState.name} | Remnant 2 Toolkit`
  }, [currentBuildState])

  if (!isClient) return null

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
          <Actions
            showLabels={showLabels}
            showControls={showControls}
            onExportAsImage={() =>
              handleImageExport(
                buildImageRef.current,
                `${currentBuildState.name}.png`,
              )
            }
            onToggleControls={() => {
              setShowControls(!showControls)
              setBuilderStorage({
                ...builderStorage,
                showControls: !showControls,
              })
            }}
            onToggleLabels={() => {
              setShowLabels(!showLabels)
              setBuilderStorage({
                ...builderStorage,
                showLabels: !showLabels,
              })
            }}
          />
        </div>
        <div
          className="w-full grow rounded border-2 border-green-500 bg-black p-4"
          ref={buildImageRef}
        >
          <Builder
            isScreenshotMode={isScreenshotModeActive}
            showLabels={showLabels}
            showControls={showControls}
          />
        </div>
      </div>
    </div>
  )
}
