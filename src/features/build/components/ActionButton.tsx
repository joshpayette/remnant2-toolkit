'use client'

import { FlagIcon as FlagIconOff } from '@heroicons/react/24/outline'
import { FlagIcon as FlagIconOn } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { Skeleton } from '@/features/ui/Skeleton'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

export const buttonClasses =
  'flex flex-col h-[40px] sm:h-[60px] w-full md:w-[150px] items-center justify-center rounded border-2 text-center px-4 py-2 text-sm font-bold text-white'

type ButtonProps = {
  onClick: () => void
}

export const ActionButton = {
  BuildSuggestions: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, 'border-blue-500 hover:bg-blue-700')}
      aria-label="Generate build suggestions based on the current build."
      onClick={onClick}
    >
      Build Suggestions
    </button>
  ),

  DuplicateBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, 'border-green-500 hover:bg-green-700')}
      aria-label="Duplicate build to create a new build based on this one."
      onClick={onClick}
    >
      Duplicate Build
    </button>
  ),

  EditBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(
        buttonClasses,
        'border-transparent bg-yellow-500 text-gray-800 hover:bg-yellow-700 hover:text-white',
      )}
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
      <div
        className={cn(buttonClasses, 'border-transparent hover:bg-green-700')}
      >
        <Loading />
      </div>
    ) : (
      <button
        className={cn(
          buttonClasses,
          'border-transparent bg-green-500 text-gray-800 hover:bg-green-700 hover:text-white',
        )}
        aria-label="Export build as an image."
        onClick={onClick}
      >
        Save Image
      </button>
    ),

  FavoriteBuild: ({ upvoted, onClick }: ButtonProps & { upvoted: boolean }) => (
    <Tooltip
      content={
        upvoted
          ? 'Remove build from your favorited builds.'
          : 'Save build to your favorited builds!'
      }
    >
      <button
        className={cn(
          buttonClasses,
          upvoted
            ? 'border-transparent bg-red-500 text-black hover:bg-red-700 hover:text-white'
            : 'border-transparent bg-orange-500 text-black hover:bg-orange-700 hover:text-white',
        )}
        aria-label={upvoted ? 'Remove favorite build' : 'Favorite build'}
        onClick={onClick}
      >
        {upvoted ? 'Remove Favorite' : 'Favorite Build'}
      </button>
    </Tooltip>
  ),

  NewBuild: () => (
    <Link
      className={cn(
        buttonClasses,
        'w-full border-red-500 bg-red-700 hover:bg-red-500',
      )}
      href="/builder"
    >
      New Build
    </Link>
  ),

  RandomBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(
        buttonClasses,
        'border-2 border-purple-500 text-white hover:border-purple-700',
      )}
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
      className={cn(
        buttonClasses,
        'border-transparent bg-purple-500 text-black hover:bg-purple-700 hover:text-white',
      )}
      aria-label="Share build with others."
      onClick={onClick}
    >
      Share Build
    </button>
  ),

  ShowDetailedView: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, 'border-cyan-500 hover:bg-cyan-700')}
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
