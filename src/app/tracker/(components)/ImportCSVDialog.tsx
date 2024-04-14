import { Button } from '@/app/(components)/_base/button'
import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button'
import { CsvItem } from '@/features/items/types'
import { Dialog } from '@/features/ui/Dialog'

interface Props {
  csvItems: CsvItem[]
  open: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  onClose: () => void
  onSubmit: () => void
}

export function ImportCSVDialog({
  csvItems,
  fileInputRef,
  open,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Dialog
      title="Import CSV"
      subtitle="Import discovered items from a CSV file."
      open={open}
      maxWidthClass="max-w-2xl"
      onClose={onClose}
    >
      <div className="bg-black">
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-y-4">
          <input
            type="file"
            name="trackerImport"
            className="rounded-md border border-primary-500 p-4 text-sm"
            ref={fileInputRef}
          />
          <Button
            onClick={onSubmit}
            aria-label="Import CSV file"
            className="w-[200px]"
            color="cyan"
          >
            Import CSV
          </Button>
        </div>
      </div>
      <div className="col-span-full mt-8 gap-y-4 overflow-x-auto bg-black text-left">
        <h3 className="text-lg font-bold text-primary-500">Import Template</h3>

        <p>
          Export the following data, fill in the discovered column, then import
          it here.
        </p>
        <div className="mt-2 flex w-full items-center justify-center">
          <ToCsvButton data={csvItems} filename="remnant2toolkit_tracker" />
        </div>
      </div>
    </Dialog>
  )
}
