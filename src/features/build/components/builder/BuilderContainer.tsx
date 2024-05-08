import { BuildTags } from '@prisma/client'
import { ReactNode, RefObject } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { BuildState } from '@/app/(types)/builds'
import { cn } from '@/lib/classnames'

import { Builder } from './Builder'

type Props = {
  buildContainerRef: RefObject<HTMLDivElement>
  builderActions: ReactNode
  buildState: BuildState
  isScreenshotMode: boolean
  showControls: boolean
  showCreatedBy?: boolean
  showMemberFeatures?: boolean
  usingLocalChanges?: boolean
} & (
  | { isEditable: false; onUpdateBuildState?: never }
  | {
      isEditable: true
      onUpdateBuildState: ({
        category,
        value,
        scroll,
      }: {
        category: string
        value: string | Array<string | undefined> | BuildTags[]
        scroll?: boolean
      }) => void
    }
)

export function BuilderContainer({
  buildContainerRef,
  builderActions,
  buildState,
  isEditable,
  isScreenshotMode,
  showControls,
  showCreatedBy = true,
  showMemberFeatures = true,
  usingLocalChanges = false,
  onUpdateBuildState,
}: Props) {
  return (
    <>
      {usingLocalChanges && (
        <div className="mb-2 flex w-full max-w-[500px] flex-col items-start justify-start border-2 border-red-500 p-2">
          <p>
            You are using locally stored changes to prevent data loss if the
            page is refreshed. Either save your changes, or click below to clear
            the local changes.
          </p>
          <div className="mt-1 flex w-full items-center justify-center">
            <BaseButton
              onClick={() => {
                if (!window.localStorage) return
                window.localStorage.removeItem('edit-build-state')
                window.localStorage.removeItem('create-build-state')
                window.location.reload()
              }}
            >
              Clear Local Changes
            </BaseButton>
          </div>
        </div>
      )}
      <div className="flex w-full max-w-lg flex-col-reverse items-start justify-center gap-2 sm:max-w-4xl lg:max-w-6xl lg:flex-row-reverse">
        <div
          id="actions"
          className="mt-4 flex w-full flex-row flex-wrap items-center justify-start gap-2 md:flex-row lg:mt-0 lg:max-w-[150px] lg:flex-col"
        >
          {builderActions}
        </div>
        <div
          ref={buildContainerRef}
          className={cn(
            'w-full grow bg-background-container',
            isScreenshotMode && 'min-h-[731px] min-w-[994px]',
          )}
        >
          {isEditable ? (
            <Builder
              buildState={buildState}
              isEditable={isEditable}
              isScreenshotMode={isScreenshotMode}
              showControls={showControls}
              showCreatedBy={showCreatedBy}
              showMemberFeatures={showMemberFeatures}
              onUpdateBuildState={onUpdateBuildState}
            />
          ) : (
            <Builder
              buildState={buildState}
              isEditable={isEditable}
              isScreenshotMode={isScreenshotMode}
              showControls={showControls}
              showCreatedBy={showCreatedBy}
              showMemberFeatures={showMemberFeatures}
            />
          )}
        </div>
      </div>
    </>
  )
}
