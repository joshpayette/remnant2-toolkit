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
  onConfirm: () => void;
}

export function RemoveBuildFromCollectionAlert({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Remove Build From Collection?</BaseAlertTitle>
      <BaseAlertDescription>
        Are you sure you want to remove this build from the collection?
      </BaseAlertDescription>
      <BaseAlertActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton onClick={onConfirm}>Remove Build</BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  );
}
