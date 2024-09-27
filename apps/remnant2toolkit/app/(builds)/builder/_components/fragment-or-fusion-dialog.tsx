import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogTitle,
} from '@repo/ui';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (isFragment: boolean) => void;
}

export function FragmentOrFusionDialog({ isOpen, onClose, onSelect }: Props) {
  return (
    <BaseDialog open={isOpen} onClose={onClose} size="md">
      <BaseDialogTitle>Fragment or Fusion?</BaseDialogTitle>
      <BaseDialogActions>
        <BaseButton onClick={() => onSelect(true)}>Fragment</BaseButton>
        <BaseButton onClick={() => onSelect(false)}>Fusion</BaseButton>
      </BaseDialogActions>
    </BaseDialog>
  );
}
