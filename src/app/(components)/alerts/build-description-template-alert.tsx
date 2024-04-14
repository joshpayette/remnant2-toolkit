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
  onConfirm: () => void
}

export function BuildDescriptionTemplateAlert({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Alert open={open} onClose={onClose}>
      <AlertTitle>Insert Description Template?</AlertTitle>
      <AlertDescription>
        Are you sure you want to insert the description template? This will
        clear the current description!
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Continue</Button>
      </AlertActions>
    </Alert>
  )
}
