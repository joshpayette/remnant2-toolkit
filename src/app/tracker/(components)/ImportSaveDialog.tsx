import { Dialog } from '@/features/ui/Dialog'
import { SubmitButton } from '@/features/ui/SubmitButton'

interface Props {
  open: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  onClose: () => void
  onSubmit: (payload: FormData) => void
}

export function ImportSaveDialog({
  fileInputRef,
  open,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Dialog
      title="Import Save"
      subtitle="Automatically import discovered items from your profile.sav"
      open={open}
      maxWidthClass="max-w-2xl"
      onClose={onClose}
    >
      <form action={onSubmit} className="bg-black">
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-y-4">
          <input
            type="file"
            name="saveFile"
            className="text-sm"
            ref={fileInputRef}
          />
          <SubmitButton
            label="Import profile.sav"
            className="border-secondary-500 bg-secondary-700 hover:bg-secondary-500 w-[200px] rounded border-2 p-2 text-lg font-bold text-white/90 hover:text-white disabled:bg-gray-500"
          />
        </div>
        <div className="col-span-full mt-8 gap-y-4 overflow-x-auto bg-black text-left">
          <h3 className="text-primary-500 mb-4 text-lg font-bold">
            Locating Your Save File
          </h3>

          <strong>Steam</strong>
          <pre className="mb-4 px-2 text-sm text-gray-400">
            C:\Users\_your_username_\Saved
            Games\Remnant2\Steam\_steam_id_\profile.sav
          </pre>

          <hr className="my-4 border-gray-700" />

          <strong>Xbox GamePass</strong>
          <p className="text-sm text-gray-400">
            This is a bit more complicated, but doable. I&apos;d recommend
            following{' '}
            <a
              href="https://www.reddit.com/r/remnantgame/comments/187rfdq/transferring_save_files_from_pcsteam_to_xbox/"
              className="text-secondary-500 hover:text-secondary-700 underline"
              target="_blank"
            >
              this guide on Reddit by SpectralHunt
            </a>
            . Once you find your file, you can rename it to profile.sav and
            import it here.
          </p>

          <hr className="my-4 border-gray-700" />

          <strong>Xbox</strong>
          <p className="text-sm italic text-gray-400">
            I don&apos;t have the ability to test this, but I believe you can
            export your save file to a USB drive, then rename the file to
            profile.sav and import. If you can confirm this works, please use
            the blue bug report icon in the bottom right to get in touch.
          </p>

          <hr className="my-4 border-gray-700" />

          <strong>Playstation</strong>
          <p className="text-sm italic text-gray-400">
            I could use some help with this one. If you know where the save is,
            or can provide a save that I can test with, I will happily try to
            make this work. Please use the blue bug report icon in the bottom
            right to get in touch.
          </p>
        </div>
      </form>
    </Dialog>
  )
}
