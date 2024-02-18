import { ToCsvButton } from '@/features/csv/ToCsvButton'
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
            className="text-sm"
            ref={fileInputRef}
          />
          <button
            onClick={onSubmit}
            aria-label="Import CSV file"
            className="w-[200px] rounded border-2 border-purple-500 bg-purple-700 p-2 text-lg font-bold text-white/90 hover:bg-purple-500 hover:text-white disabled:bg-gray-500"
          >
            Import CSV
          </button>
        </div>
      </div>
      <div className="col-span-full mt-8 gap-y-4 overflow-x-auto bg-black text-left">
        <h3 className="mb-4 text-lg font-bold text-green-500">
          Import Template
        </h3>

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
