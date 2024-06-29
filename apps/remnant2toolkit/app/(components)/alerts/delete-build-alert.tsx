import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertDescription,
  BaseAlertTitle,
} from '@repo/ui/base/alert'
import { BaseButton } from '@repo/ui/base/button'

interface Props {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

export function DeleteBuildAlert({ open, onClose, onDelete }: Props) {
  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Delete Build?</BaseAlertTitle>
      <BaseAlertDescription>
        Are you sure you want to delete this build? This cannot be reversed!
      </BaseAlertDescription>
      <BaseAlertActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton onClick={onDelete}>Delete</BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  )
}
