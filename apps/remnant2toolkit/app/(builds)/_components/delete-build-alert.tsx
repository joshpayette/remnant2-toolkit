import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertDescription,
  BaseAlertTitle,
  BaseButton,
} from '@repo/ui';

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteBuildAlert({ open, onClose, onDelete }: Props) {
  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Delete Build?</BaseAlertTitle>
      <BaseAlertDescription>
        Are you sure you want to delete this build? This will delete the build{' '}
        <strong>and all variants!</strong>. This cannot be reversed!
      </BaseAlertDescription>
      <BaseAlertActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton onClick={onDelete}>Delete</BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  );
}
