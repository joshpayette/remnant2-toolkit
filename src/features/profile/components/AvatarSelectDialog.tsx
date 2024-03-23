import { Avatar } from '@/features/profile/components/Avatar'
import { AVATARS } from '@/features/profile/constants'
import { Dialog } from '@/features/ui/Dialog'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (avatarId: string) => void
}

export function AvatarSelectDialog({ open, onClose, onSelect }: Props) {
  return (
    <Dialog
      title="Select Avatar"
      maxWidthClass="max-w-4xl"
      open={open}
      onClose={onClose}
    >
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {AVATARS.map((avatar) => (
          <button
            key={avatar.id}
            className="flex items-center justify-center"
            onClick={() => onSelect(avatar.id)}
          >
            <Avatar
              key={avatar.id}
              alt={avatar.name}
              imagePath={avatar.imagePath}
            />
          </button>
        ))}
      </div>
    </Dialog>
  )
}
