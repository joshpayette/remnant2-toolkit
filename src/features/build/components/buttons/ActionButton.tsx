'use client'

import { FlagIcon as FlagIconOff } from '@heroicons/react/24/outline'
import { FlagIcon as FlagIconOn } from '@heroicons/react/24/solid'

import { Skeleton } from '@/features/ui/Skeleton'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

export const buttonClasses =
  'flex flex-col h-[40px] sm:h-[60px] w-full md:w-[150px] items-center justify-center rounded border-2 text-center px-4 py-2 text-sm font-bold text-white'

const primaryButtonClasses =
  'bg-primary-500 hover:bg-primary-300 text-black border-primary-700'
const secondaryButtonClasses =
  'border-secondary-500 hover:bg-secondary-500 hover:border-secondary-700 text-white hover:text-black'

type ButtonProps = {
  onClick: () => void
}

export const ActionButton = {
  BuildSuggestions: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, primaryButtonClasses)}
      aria-label="Generate build suggestions based on the current build."
      onClick={onClick}
    >
      Build Suggestions
    </button>
  ),

  DeleteBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(
        buttonClasses,
        'border-red-700 bg-red-500 text-black hover:bg-red-300',
      )}
      aria-label="Delete build."
      onClick={onClick}
    >
      Delete Build
    </button>
  ),

  DuplicateBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, secondaryButtonClasses)}
      aria-label="Duplicate build to create a new build based on this one."
      onClick={onClick}
    >
      Duplicate Build
    </button>
  ),

  EditBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, primaryButtonClasses)}
      aria-label="Edit build."
      onClick={onClick}
    >
      Edit Build
    </button>
  ),

  ExportImage: ({
    onClick,
    imageExportLoading,
  }: ButtonProps & { imageExportLoading: boolean }) =>
    imageExportLoading ? (
      <div className={cn(buttonClasses, primaryButtonClasses)}>
        <Loading />
      </div>
    ) : (
      <button
        className={cn(
          buttonClasses,
          'border-accent2-700 bg-accent2-500 text-black hover:bg-accent2-300',
        )}
        aria-label="Export build as an image."
        onClick={onClick}
      >
        Save Image
      </button>
    ),

  FavoriteBuild: ({ upvoted, onClick }: ButtonProps & { upvoted: boolean }) => (
    <button
      className={cn(
        buttonClasses,
        upvoted
          ? 'border-red-700 bg-red-500 text-black hover:bg-red-300'
          : 'border-orange-700 bg-orange-500 text-black hover:bg-orange-300',
      )}
      aria-label={upvoted ? 'Remove favorite build' : 'Favorite build'}
      onClick={onClick}
    >
      {upvoted ? 'Remove Favorite' : 'Favorite Build'}
    </button>
  ),

  LoadoutManagement: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, primaryButtonClasses)}
      aria-label="Loadout Builds"
      onClick={onClick}
    >
      Add To Loadout
    </button>
  ),

  RandomBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, secondaryButtonClasses)}
      aria-label="Randomly generate a build."
      onClick={onClick}
    >
      Random Build
    </button>
  ),

  ReportBuild: ({ onClick, active }: ButtonProps & { active: boolean }) => (
    <button
      onClick={onClick}
      aria-label="Report build as inappropriate."
      className={cn(
        'text-md flex flex-row items-center justify-center rounded border border-transparent p-1 text-red-500 hover:text-red-300 hover:underline',
      )}
    >
      <span className="mr-1 h-5 w-5">
        {active ? <FlagIconOn /> : <FlagIconOff />}
      </span>
      <span className="text-md">
        {active ? 'Build Reported' : 'Report Build'}
      </span>
    </button>
  ),

  ShareBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, primaryButtonClasses)}
      aria-label="Share build with others."
      onClick={onClick}
    >
      Share Build
    </button>
  ),

  ShowDetailedView: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, secondaryButtonClasses)}
      onClick={onClick}
      aria-label="Show detailed view of build"
    >
      Detailed View
    </button>
  ),
}

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Skeleton className="h-[40px] w-[100px]" />
    </div>
  )
}
