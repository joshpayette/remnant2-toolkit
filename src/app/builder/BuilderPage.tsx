'use client'

import { useEffect, useRef, useState } from 'react'
import PageHeader from '@/app/(components)/PageHeader'
import Builder from './(components)/Builder'
import useQueryString from '@/app/builder/(components)/useBuilder'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useIsClient } from 'usehooks-ts'
import Actions from './(components)/Actions'
import html2canvas from 'html2canvas'

export default function BuildHomePage() {
  const isClient = useIsClient()
  const buildImageRef = useRef<HTMLDivElement>(null)

  const { currentBuild } = useQueryString()
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  const [showLabels, setShowLabels] = useState(builderStorage.showLabels)
  const [showControls, setShowControls] = useState(builderStorage.showControls)

  const [screenshotMode, setScreenshotMode] = useState<{
    el: HTMLDivElement | null
    imageFileName: string
  } | null>(null)

  // Add the build name to the page title
  useEffect(() => {
    if (!currentBuild) return
    document.title = `${currentBuild.name} | Remnant 2 Toolkit`
  }, [currentBuild])

  /**
   * Export the build as an image
   */
  const handleImageExport = async (
    el: HTMLDivElement | null,
    imageFileName: string,
  ) => {
    setScreenshotMode({ el, imageFileName })
  }

  useEffect(() => {
    async function exportImage() {
      if (!screenshotMode) return
      const { el, imageFileName } = screenshotMode

      if (!el) return

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      })
      const image = canvas.toDataURL('image/png', 1.0)

      // Need a fakeLink to trigger the download
      const fakeLink = window.document.createElement('a')
      fakeLink.download = imageFileName
      fakeLink.href = image
      document.body.appendChild(fakeLink)
      fakeLink.click()
      document.body.removeChild(fakeLink)
      fakeLink.remove()

      setScreenshotMode(null)
    }
    exportImage()
  }, [screenshotMode])

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
                `${currentBuild.name}.png`,
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
            isScreenshotMode={Boolean(screenshotMode)}
            showLabels={showLabels}
            showControls={showControls}
          />
        </div>
      </div>
    </div>
  )
}
