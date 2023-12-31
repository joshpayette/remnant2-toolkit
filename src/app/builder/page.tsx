'use client'

import { useEffect, useRef } from 'react'
import PageHeader from '@/app/(components)/PageHeader'
import Builder from './(components)/Builder'
import useBuildState from '@/app/builder/(hooks)/useBuildState'
import { useIsClient } from 'usehooks-ts'
import { buildToCsvData, cn } from '../(lib)/utils'
import SaveBuildButton from './(components)/SaveBuildButton'
import useBuildActions from './(hooks)/useBuildActions'
import { ActionButton } from './(components)/ActionButton'
import ToCsvButton from '../(components)/ToCsvButton'
import { useLocalStorage } from '../(hooks)/useLocalStorage'
import { useSearchParams } from 'next/navigation'
import DetailedBuildView from './(components)/DetailedBuildView'
import ImageDownloadLink from './(components)/ImageDownloadLink'
import PageActions from '../(components)/PageActions'
import BackToTopButton from '../(components)/BackToTopButton'

export default function Page() {
  const searchParams = useSearchParams()
  const isClient = useIsClient()

  const { buildState } = useBuildState()
  const { builderStorage, setBuilderStorage } = useLocalStorage()
  const {
    isScreenshotMode,
    showControls,
    imageExportLoading,
    imageLink,
    handleClearImageLink,
    handleCopyBuildUrl,
    handleImageExport,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)

  // if search params are empty, clear the temp values
  // from localstorage
  useEffect(() => {
    if (searchParams.toString() === '') {
      setBuilderStorage({
        ...builderStorage,
        tempBuildId: null,
        tempCreatedById: null,
        tempDescription: null,
        tempIsPublic: null,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <PageActions>
        <BackToTopButton />
      </PageActions>

      <ImageDownloadLink onClose={handleClearImageLink} imageLink={imageLink} />

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

            <ActionButton.ExportImage
              imageExportLoading={imageExportLoading}
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
                  'Build url copied to clipboard. Sign in for a shorter URL!',
                )
              }
            />
            <ToCsvButton
              data={csvBuildData.filter((item) => item?.name !== '')}
              filename={`remnant2_builder_${buildState.name}`}
            />
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
            isEditable={true}
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
  )
}
