import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertDescription,
  BaseAlertTitle,
} from '@/app/(components)/_base/alert'
import { BaseButton } from '@/app/(components)/_base/button'

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
            const url = window.location.href

            if (!url) {
              toast.error('Could not copy build url. Try again.')
              return
            }
            const message =
              'Build url copied to clipboard. Sign in next time for a shorter URL!'
            copy(`${url}?t=${Date.now()}`)
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
