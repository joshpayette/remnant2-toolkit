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

export function BuildDescriptionTemplateAlert({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Insert Description Template?</BaseAlertTitle>
      <BaseAlertDescription>
        Are you sure you want to insert the description template? This will
        clear the current description!
      </BaseAlertDescription>
      <BaseAlertActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton onClick={onConfirm}>Continue</BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  );
}
