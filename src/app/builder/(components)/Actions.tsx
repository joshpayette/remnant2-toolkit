'use client'

import copy from 'clipboard-copy'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import { cn } from '@/app/(lib)/utils'
import useQueryString from '@/app/builder/(hooks)/useBuildSearchParams'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { buildToCsvData } from '../(lib)/utils'

export default function Actions({
  showControls,
  showLabels,
  onExportAsImage,
  onToggleControls,
  onToggleLabels,
}: {
  showControls: boolean
  showLabels: boolean
  onExportAsImage: () => void
  onToggleControls: () => void
  onToggleLabels: () => void
}) {
  const { currentBuildState } = useQueryString()

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildToCsvData(currentBuildState)

  return (
    <div id="actions" className="flex flex-col gap-2">
      <button
        id="show-labels-button"
        className={cn(
          'flex flex-col items-center rounded border px-4 py-2 font-bold text-white hover:bg-green-700',
          showLabels
            ? 'border-transparent bg-green-500'
            : 'border-green-500 bg-black',
        )}
        onClick={onToggleLabels}
      >
        <span className="text-sm">
          {showLabels ? 'Hide Labels' : 'Show Labels'}
        </span>
      </button>

      <button
        id="show-controls-button"
        className={cn(
          'flex flex-col items-center rounded border px-4 py-2 font-bold text-white hover:bg-green-700',
          showControls
            ? 'border-transparent bg-green-500'
            : 'border-green-500 bg-black',
        )}
        onClick={onToggleControls}
      >
        <span className="text-sm">
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </span>
      </button>

      <Link
        className="flex flex-col items-center justify-center rounded border border-red-500 bg-red-700 px-4 py-2 text-center text-sm font-bold text-white hover:bg-red-500"
        href="/builder"
      >
        New Build
      </Link>

      <hr className="my-4 border-gray-900" />

      <button
        className="flex flex-col items-center rounded border-2 border-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
        onClick={onExportAsImage}
      >
        Export to Image
      </button>

      <button
        className="flex flex-col items-center rounded border border-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
        onClick={() => {
          copy(window.location.href)
          toast.success('Copied Build URL to clipboard')
        }}
      >
        Copy Build URL
      </button>

      <ToCsvButton
        data={csvBuildData.filter((item) => item?.name !== '')}
        filename={`remnant2_builder_${currentBuildState.name}`}
      />
    </div>
  )
}
