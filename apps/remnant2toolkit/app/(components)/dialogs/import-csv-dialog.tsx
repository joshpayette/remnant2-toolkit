import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
  BaseField,
  BaseInput,
  BaseLabel,
} from '@repo/ui';

import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button';
import { type CsvItem } from '@/app/(types)/csv';

interface Props {
  open: boolean;
  items: CsvItem[];
  fileInputRef: React.RefObject<HTMLInputElement>;
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
