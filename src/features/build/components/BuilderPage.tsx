import { ReactNode, RefObject } from 'react'

import { cn } from '@/lib/classnames'

import { BuildState } from '../types'
import { Builder } from './Builder'

type Props = {
  buildContainerRef: RefObject<HTMLDivElement>
  builderActions: ReactNode
  buildState: BuildState
  includeMemberFeatures: boolean
  isScreenshotMode: boolean
  showControls: boolean
  showCreatedBy?: boolean
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
        value: string | Array<string | undefined>
        scroll?: boolean
      }) => void
    }
)

export function BuilderPage({
  buildContainerRef,
  builderActions,
  buildState,
  includeMemberFeatures,
  isEditable,
  isScreenshotMode,
  showControls,
  showCreatedBy = true,
  onUpdateBuildState,
}: Props) {
  return (
    <>
      <div className="flex w-full max-w-lg flex-col-reverse items-start justify-center gap-2 sm:max-w-4xl lg:max-w-6xl lg:flex-row-reverse">
        <div
          id="actions"
          className="mt-4 flex w-full flex-col items-center justify-between gap-2 md:flex-row lg:mt-0 lg:max-w-[150px] lg:flex-col"
        >
          {builderActions}
        </div>
        <div
          ref={buildContainerRef}
          className={cn(
            'w-full grow bg-black',
            isScreenshotMode && 'min-h-[731px] min-w-[994px]',
          )}
        >
          {isEditable ? (
            <Builder
              buildState={buildState}
              includeMemberFeatures={includeMemberFeatures}
              isEditable={isEditable}
              isScreenshotMode={isScreenshotMode}
              showControls={showControls}
              showCreatedBy={showCreatedBy}
              onUpdateBuildState={onUpdateBuildState}
            />
          ) : (
            <Builder
              buildState={buildState}
              includeMemberFeatures={includeMemberFeatures}
              isEditable={isEditable}
              isScreenshotMode={isScreenshotMode}
              showControls={showControls}
              showCreatedBy={showCreatedBy}
            />
          )}
        </div>
      </div>
    </>
  )
}
