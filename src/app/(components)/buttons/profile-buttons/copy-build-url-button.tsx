'use client'

import { ShareIcon } from '@heroicons/react/24/solid'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import { Button } from '@/app/(components)/_base/button'
import { Tooltip } from '@/features/ui/Tooltip'

export function CopyBuildUrlButton({ buildId }: { buildId: string }) {
  function handleCopyBuild() {
    const url = `${window.location.origin}/builder/${buildId}`
    copy(`${url}?t=${Date.now()}`)
    toast.success('Copied build URL to clipboard!')
  }

  return (
    <Tooltip content="Copy Build URL">
      <Button
        color="cyan"
        aria-label="Copy build URL to clipboard"
        onClick={handleCopyBuild}
      >
        <ShareIcon className="h-4 w-4" />
      </Button>
    </Tooltip>
  )
}
