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
  onDelete: () => void
}

export function DeleteBuildAlert({ open, onClose, onDelete }: Props) {
  return (
    <Alert open={open} onClose={onClose}>
      <AlertTitle>Delete Build?</AlertTitle>
      <AlertDescription>
        Are you sure you want to delete this build? This cannot be reversed!
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onDelete}>Delete</Button>
      </AlertActions>
    </Alert>
  )
}
