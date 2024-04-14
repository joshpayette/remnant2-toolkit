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
  onCancel: () => void
  onConfirm: () => void
}

export function RemoveFromLoadoutAlert({
  open,
  onCancel,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Alert open={open} onClose={onClose}>
      <AlertTitle>Remove From Loadout?</AlertTitle>
      <AlertDescription>
        Are you sure you want to remove this build from your loadout?
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Remove</Button>
      </AlertActions>
    </Alert>
  )
}
