import { cn } from '@/app/(lib)/utils'
import Link from 'next/link'

const sharedClasses =
  'flex w-full flex-col items-center rounded border-2 text-center px-4 py-2 text-sm font-bold text-white'

interface ButtonProps {
  onClick: () => void
}

export const Button = {
  ExportImage: ({ onClick }: ButtonProps) => (
    <button
      className={cn(sharedClasses, 'border-green-500 hover:bg-purple-700')}
      onClick={onClick}
    >
      Export to Image
    </button>
  ),

  CopyBuildUrl: ({ onClick }: ButtonProps) => (
    <button
      className={cn(sharedClasses, 'border-purple-500 hover:bg-purple-700')}
      onClick={onClick}
    >
      Copy Build URL
    </button>
  ),

  ShowLabels: ({
    onClick,
    showLabels,
  }: ButtonProps & { showLabels: boolean }) => (
    <button
      id="show-labels-button"
      className={cn(
        sharedClasses,
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
        sharedClasses,
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

  NewBuild: () => (
    <Link
      className={cn(
        sharedClasses,
        'w-full border-red-500 bg-red-700 hover:bg-red-500',
      )}
      href="/builder"
    >
      New Build
    </Link>
  ),
}
