'use client'

import { ShareIcon } from '@heroicons/react/24/solid'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import { BaseButton } from '@/app/(components)/_base/button'
import { Tooltip } from '@/app/(components)/tooltip'
import { urlNoCache } from '@/app/(utils)/url-no-cache'

export function ShareBuildButton({ buildId }: { buildId: string }) {
  function handleCopyBuild() {
    const url = urlNoCache(`${window.location.origin}/builder/${buildId}`)
    copy(url)
    toast.success('Copied build URL to clipboard!')
  }

  return (
    <Tooltip content="Copy Build URL">
      <BaseButton
        color="cyan"
        aria-label="Copy build URL to clipboard"
        onClick={handleCopyBuild}
      >
        <ShareIcon className="h-4 w-4" />
      </BaseButton>
    </Tooltip>
  )
}
