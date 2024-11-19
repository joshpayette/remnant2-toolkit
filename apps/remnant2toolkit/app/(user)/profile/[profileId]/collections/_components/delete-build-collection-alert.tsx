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

export function DeleteBuildCollectionAlert({ open, onClose, onDelete }: Props) {
  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Delete Build Collection?</BaseAlertTitle>
      <BaseAlertDescription>
        Are you sure you want to delete this build collection? This will not
        delete any of the builds, and this action cannot be reversed!
      </BaseAlertDescription>
      <BaseAlertActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton onClick={onDelete}>Delete Collection</BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  );
}
