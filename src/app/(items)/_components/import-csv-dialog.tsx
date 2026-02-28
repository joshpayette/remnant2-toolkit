import { type CsvItem } from '@/app/_types/csv';
import { ToCsvButton } from '@/components/to-csv-button';
import { BaseButton } from '@/ui/base/button';
import {
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@/ui/base/dialog';
import { BaseField, BaseLabel } from '@/ui/base/fieldset';
import { BaseInput } from '@/ui/base/input';

interface Props {
  open: boolean;
  items: CsvItem[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onSubmit: () => void;
}

export function ImportCsvDialog({
  open,
  items,
  fileInputRef,
  onClose,
  onSubmit,
}: Props) {
  return (
    <BaseDialog open={open} onClose={onClose}>
      <BaseDialogTitle>Import CSV</BaseDialogTitle>
      <BaseDialogDescription>
        Import your discovered items from a CSV file.
      </BaseDialogDescription>
      <BaseDialogBody>
        <BaseField>
          <BaseLabel>Select CSV File</BaseLabel>
          <BaseInput type="file" ref={fileInputRef} />
        </BaseField>
      </BaseDialogBody>
      <BaseDialogActions>
        <BaseButton plain onClick={onClose}>
          Cancel
        </BaseButton>
        <BaseButton onClick={onSubmit}>Import CSV</BaseButton>
      </BaseDialogActions>
      <BaseDialogTitle>Export CSV</BaseDialogTitle>
      <BaseDialogDescription>
        Click the button below to download the item tracker data as a CSV, fill
        in the discovered column with true/false, then import it above.
      </BaseDialogDescription>
      <BaseDialogActions>
        <ToCsvButton
          label="Get CSV Template"
          data={items}
          filename="remnant2toolkit_itemtracker"
        />
      </BaseDialogActions>
    </BaseDialog>
  );
}
