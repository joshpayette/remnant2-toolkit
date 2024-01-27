import { cn } from '@/lib/classnames'
import Builder from './Builder'
import { BuildState } from '../types'
import { ReactNode, RefObject } from 'react'
import MasonryItemList from '@/features/items/components/MasonryItemList'
import { buildStateToMasonryItems } from '../lib/buildStateToMasonryItems'

type Props = {
  buildContainerRef: RefObject<HTMLDivElement>
  builderActions: ReactNode
  buildState: BuildState
  detailedViewContainerRef: RefObject<HTMLDivElement>
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

export default function BuilderPage({
  buildContainerRef,
  builderActions,
  buildState,
  detailedViewContainerRef,
  includeMemberFeatures,
  isEditable,
  isScreenshotMode,
  showControls,
  showCreatedBy = true,
  onUpdateBuildState,
}: Props) {
  const masonryItems = buildStateToMasonryItems(buildState)

  return (
    <>
      <div className="flex w-full max-w-xl flex-col-reverse items-start justify-center gap-2 sm:flex-row-reverse">
        <div
          id="actions-column"
          className="flex min-w-full flex-col justify-between gap-2 sm:min-w-[100px]"
        >
          {builderActions}
        </div>
        <div
          ref={buildContainerRef}
          className={cn(
            'w-full grow bg-black',
            isScreenshotMode && 'min-h-[731px] min-w-[502px]',
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
      <div
        className="mt-12 flex w-full flex-col items-center justify-center gap-2"
        ref={detailedViewContainerRef}
      >
        <MasonryItemList items={masonryItems} />
      </div>
    </>
  )
}
