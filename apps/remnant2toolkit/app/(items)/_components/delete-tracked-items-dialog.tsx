import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogTitle,
} from '@repo/ui';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTrackedItemsDialog({ open, onClose, onConfirm }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>Delete all tracked items?</BaseDialogTitle>
      <BaseDialogBody>
        Are you sure you want to delete <strong>ALL</strong> tracked item data?
        There is no undoing this action!
      </BaseDialogBody>
      <BaseDialogActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton
          color="red"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Delete
        </BaseButton>
      </BaseDialogActions>
    </BaseDialog>
  );
}
