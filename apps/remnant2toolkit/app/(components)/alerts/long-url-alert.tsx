import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertDescription,
  BaseAlertTitle,
} from '@repo/ui/base/alert'
import { BaseButton } from '@repo/ui/base/button'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import { urlNoCache } from '@/app/(utils)/url-no-cache'

interface Props {
  open: boolean
  onClose: () => void
}

export function LongUrlAlert({ open, onClose }: Props) {
  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Copy Long URL?</BaseAlertTitle>
      <BaseAlertDescription>
        This build is unsaved, meaning the URL will be very long. Sign in and
        Save Build for a shorter URL, plus additional features.
      </BaseAlertDescription>
      <BaseAlertActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton
          onClick={() => {
            const url = urlNoCache(window.location.href)

            const message =
              'Build url copied to clipboard. Sign in next time for a shorter URL!'
            // need to add a query param to the current url
            copy(url)
            toast.success(message)
            onClose()
          }}
        >
          Copy Build URL
        </BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  )
}
