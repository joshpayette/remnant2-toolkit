'use client'

import { ShareIcon } from '@heroicons/react/24/solid'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import { Tooltip } from '@/features/ui/Tooltip'

export function CopyBuildUrlButton({ buildId }: { buildId: string }) {
  function handleCopyBuild() {
    const url = `${window.location.origin}/builder/${buildId}`
    copy(`${url}?t=${Date.now()}`)
    toast.success('Copied build URL to clipboard!')
  }

  return (
    <Tooltip content="Copy Build URL">
      <button
        className="flex flex-col items-center gap-y-1 text-xs text-primary-500 hover:text-primary-300"
        aria-label="Copy build URL to clipboard"
        onClick={handleCopyBuild}
      >
        <ShareIcon className="h-4 w-4" /> Share
      </button>
    </Tooltip>
  )
}
