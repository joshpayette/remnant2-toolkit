'use client'

import { cn } from '@/app/(lib)/utils'
import Link from 'next/link'

export const buttonClasses =
  'flex w-full flex-col items-center rounded border-2 text-center px-4 py-2 text-sm font-bold text-white'

type ButtonProps = {
  onClick: () => void
}

export const ActionButton = {
  CopyBuildUrl: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, 'border-purple-500 hover:bg-purple-700')}
      onClick={onClick}
    >
      Copy Build URL
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
        'border-yellow-700 bg-yellow-500 text-black hover:bg-yellow-300',
      )}
      onClick={onClick}
    >
      Edit Build
    </button>
  ),

  ExportImage: ({ onClick }: ButtonProps) => (
    <button
      className={cn(buttonClasses, 'border-green-500 hover:bg-green-700')}
      onClick={onClick}
    >
      Export to Image
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

  ShowLabels: ({
    onClick,
    showLabels,
  }: ButtonProps & { showLabels: boolean }) => (
    <button
      id="show-labels-button"
      className={cn(
        buttonClasses,
        'hover:bg-green-700',
        showLabels
          ? 'border-transparent bg-green-500'
          : 'border-green-500 bg-black',
      )}
      onClick={onClick}
    >
      <span className="text-sm">
        {showLabels ? 'Hide Labels' : 'Show Labels'}
      </span>
    </button>
  ),

  ShowControls: ({
    onClick,
    showControls,
  }: ButtonProps & { showControls: boolean }) => (
    <button
      id="show-controls-button"
      className={cn(
        buttonClasses,
        'hover:bg-green-700',
        showControls
          ? 'border-transparent bg-green-500'
          : 'border-green-500 bg-black',
      )}
      onClick={onClick}
    >
      <span className="text-sm">
        {showControls ? 'Hide Controls' : 'Show Controls'}
      </span>
    </button>
  ),
}

export default ActionButton
