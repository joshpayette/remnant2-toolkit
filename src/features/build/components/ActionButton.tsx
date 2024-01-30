'use client'

import { cn } from '@/lib/classnames'
import Link from 'next/link'
import { StarIcon as StarIconOff } from '@heroicons/react/24/outline'
import { StarIcon as StarIconOn } from '@heroicons/react/24/solid'
import { FlagIcon as FlagIconOff } from '@heroicons/react/24/outline'
import { FlagIcon as FlagIconOn } from '@heroicons/react/24/solid'
import LoadingIndicator from '@/features/ui/LoadingIndicator'
import Tooltip from '@/features/ui/Tooltip'

export const buttonClasses =
  'flex w-full flex-col items-center rounded border-2 text-center px-4 py-2 text-sm font-bold text-white'

type ButtonProps = {
  onClick: () => void
}

export const ActionButton = {
  ArmorCalculator: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, 'border-blue-500 hover:bg-blue-700')}
      onClick={onClick}
    >
      Armor Calculator
    </button>
  ),

  DuplicateBuild: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, 'border-green-500 hover:bg-green-700')}
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
        <LoadingIndicator />
      </div>
    ) : (
      <button
        className={cn(
          buttonClasses,
          'border-transparent bg-green-500 text-gray-800 hover:bg-green-700 hover:text-white',
        )}
        onClick={onClick}
      >
        Save Image
      </button>
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
      onClick={onClick}
    >
      Random Build
    </button>
  ),

  ReportBuild: ({ onClick, active }: ButtonProps & { active: boolean }) => (
    <button
      onClick={onClick}
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
        'border-transparent bg-purple-500 text-gray-800 hover:bg-purple-700 hover:text-white',
      )}
      onClick={onClick}
    >
      Share Build
    </button>
  ),

  ShowDetailedView: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, 'border-cyan-500 hover:bg-cyan-700')}
      onClick={onClick}
    >
      Detailed View
    </button>
  ),

  Vote: ({
    active,
    onClick,
    totalUpvotes,
  }: ButtonProps & { active: boolean; totalUpvotes: number }) => (
    <Tooltip
      content={
        active
          ? 'Unfavorite build and remove your vote.'
          : 'Favorite the build to save it to your profile!'
      }
    >
      <button
        onClick={onClick}
        className={cn(
          'text-md relative flex flex-col items-center justify-center gap-y-2 rounded border border-transparent p-1',
          active ? 'text-yellow-400' : 'text-white',
        )}
      >
        <div
          className={cn(
            'relative flex w-full flex-col items-center justify-center gap-x-2 rounded border border-yellow-300 bg-gradient-to-b from-[#f12711] to-[#f5af19] p-4 hover:from-[#f5af19] hover:to-[#f12711] sm:bg-gradient-to-br',
          )}
        >
          <div className="absolute left-0 top-0 -z-10 h-full w-full animate-ping-slow bg-green-500" />
          <div className="text-5xl font-bold text-white drop-shadow-md">
            {totalUpvotes}
          </div>
          <div className="text-md font-semibold text-orange-900">
            {totalUpvotes === 1 ? 'Favorite' : 'Favorites'}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center text-yellow-500 hover:text-yellow-300 hover:underline">
          <span className="mr-1 h-5 w-5">
            {active ? <StarIconOn /> : <StarIconOff />}
          </span>
          <span className="text-md">{active ? 'Unfavorite' : 'Favorite'}</span>
        </div>
      </button>
    </Tooltip>
  ),
}

export default ActionButton
