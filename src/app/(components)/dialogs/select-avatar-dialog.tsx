import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'
import { AvatarBox } from '@/app/profile/[userId]/(components)/avatar-box'
import { AVATARS } from '@/app/profile/[userId]/(lib)/constants'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (avatarId: string) => void
}

export function SelectAvatarDialog({ open, onClose, onSelect }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="4xl">
      <BaseDialogTitle>Select Avatar</BaseDialogTitle>
      <BaseDialogDescription>
        Select a new avatar to display on your public profile.
      </BaseDialogDescription>
      <BaseDialogBody>
        {AVATARS.map((avatar) => (
          <BaseButton
            plain
            key={avatar.id}
            className="flex items-center justify-center"
            onClick={() => onSelect(avatar.id)}
          >
            <AvatarBox key={avatar.id} avatar={avatar} showLabel={true} />
          </BaseButton>
        ))}
      </BaseDialogBody>
    </BaseDialog>
  )
}
