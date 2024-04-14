import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from '@/app/(components)/_base/alert'
import { Button } from '@/app/(components)/_base/button'

interface Props {
  open: boolean
  onClose: () => void
}

export function LongUrlAlert({ open, onClose }: Props) {
  return (
    <Alert open={open} onClose={onClose}>
      <AlertTitle>Copy Long URL?</AlertTitle>
      <AlertDescription>
        This build is unsaved, meaning the URL will be very long. Sign in and
        Save Build for a shorter URL, plus additional features.
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button
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
        </Button>
      </AlertActions>
    </Alert>
  )
}
