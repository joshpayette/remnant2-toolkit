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
        className="text-primary-500 hover:text-primary-300"
        aria-label="Copy build URL to clipboard"
        onClick={handleCopyBuild}
      >
        <ShareIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  )
}
