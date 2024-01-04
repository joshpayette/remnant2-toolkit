'use client'

import { cn } from '@/app/(lib)/utils'
import Link from 'next/link'
import { StarIcon as StarIconOff } from '@heroicons/react/24/outline'
import { StarIcon as StarIconOn } from '@heroicons/react/24/solid'
import { FlagIcon as FlagIconOff } from '@heroicons/react/24/outline'
import { FlagIcon as FlagIconOn } from '@heroicons/react/24/solid'
import LoadingIndicator from '@/app/(components)/LoadingIndicator'

export const buttonClasses =
  'flex w-full flex-col items-center rounded border-2 text-center px-4 py-2 text-sm font-bold text-white'

type ButtonProps = {
  onClick: () => void
}

export const ActionButton = {
  CopyBuildUrl: ({ onClick }: ButtonProps) => (
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

  ReportBuild: ({ onClick, active }: ButtonProps & { active: boolean }) => (
    <button
      onClick={onClick}
      className={cn(
        'text-md flex flex-row items-center justify-center rounded border border-transparent p-1 hover:text-red-300 hover:underline',
        active ? 'text-red-400' : 'text-white',
      )}
    >
      <span className="mr-1 h-5 w-5">
        {active ? <FlagIconOn /> : <FlagIconOff />}
      </span>
      <span className="text-md">{active ? 'Reported' : 'Report'}</span>
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

  Vote: ({ active, onClick }: ButtonProps & { active: boolean }) => (
    <button
      onClick={onClick}
      className={cn(
        'text-md relative flex flex-row items-center justify-center rounded border border-transparent p-1 hover:text-yellow-300 hover:underline',
        active ? 'text-yellow-400' : 'text-white',
      )}
    >
      <span className="mr-1 h-5 w-5">
        {active ? <StarIconOn /> : <StarIconOff />}
      </span>
      <span className="text-md">{active ? 'Favorited' : 'Favorite'}</span>
    </button>
  ),
}

export default ActionButton
