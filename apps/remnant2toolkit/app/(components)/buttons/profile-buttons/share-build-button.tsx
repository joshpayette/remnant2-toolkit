'use client'

import { BaseButton } from '@repo/ui/base/button'
import { ShareIcon } from '@repo/ui/icons/share'
import { urlNoCache } from '@repo/utils/url-no-cache'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import { Tooltip } from '@/app/(components)/tooltip'

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
