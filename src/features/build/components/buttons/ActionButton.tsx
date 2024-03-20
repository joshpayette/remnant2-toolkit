'use client'

import { Skeleton } from '@/features/ui/Skeleton'
import { cn } from '@/lib/classnames'

export const buttonClasses =
  'flex flex-col h-[40px] sm:h-[60px] w-full md:w-[150px] items-center justify-center rounded border-2 text-center px-4 py-2 text-sm font-bold text-white'

const primaryButtonClasses =
  'bg-primary-500 hover:bg-primary-300 text-black border-primary-700'
const secondaryButtonClasses =
  'border-secondary-500 hover:bg-secondary-500 hover:border-secondary-700 text-white hover:text-black'
const accent1ButtonClasses =
  'border-accent1-500 hover:bg-accent1-500 hover:border-accent1-700 text-white hover:text-black'

type ButtonProps = {
  onClick: () => void
}

export const ActionButton = {
  ArmorCalculator: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, accent1ButtonClasses)}
      aria-label="Get optimal armor values for this build."
      onClick={onClick}
    >
      Armor Calculator
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
      className={cn(
        buttonClasses,
        'border-accent1-700 bg-accent1-500 text-black hover:bg-accent1-300',
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
        Generate Build Image
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

  ItemSuggestions: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, accent1ButtonClasses)}
      aria-label="Find a list of items that match a specified item tag or effect."
      onClick={onClick}
    >
      Item Suggestions
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
