import { BuildTags } from '@repo/db'
import { ReactNode, RefObject } from 'react'

import { BuildState } from '@/app/(types)/builds'
import { cn } from '@/app/(utils)/classnames'

import { Builder } from './builder'

type Props = {
  buildContainerRef: RefObject<HTMLDivElement>
  builderActions: ReactNode
  buildState: BuildState
  isScreenshotMode: boolean
  showControls: boolean
  showCreatedBy?: boolean
  showMemberFeatures?: boolean
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
  onUpdateBuildState,
}: Props) {
  return (
    <>
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
            'w-full grow bg-background-solid',
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
