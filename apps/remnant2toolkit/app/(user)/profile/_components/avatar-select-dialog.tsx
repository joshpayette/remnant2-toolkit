import {
  BaseButton,
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@repo/ui';

import { AvatarBox } from '@/app/(user)/profile/_components/avatar-box';
import { AVATARS } from '@/app/(user)/profile/_constants/avatars';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (avatarId: string) => void;
}

export function AvatarSelectDialog({ open, onClose, onSelect }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="4xl">
      <BaseDialogTitle>Select Avatar</BaseDialogTitle>
      <BaseDialogDescription>
        Select a new avatar to display on your public profile.
      </BaseDialogDescription>
      <BaseDialogBody>
        <div className="flex w-full flex-wrap items-center justify-center">
          {AVATARS.map((avatar) => (
            <BaseButton
              plain
              key={avatar.id}
              onClick={() => onSelect(avatar.id)}
            >
              <AvatarBox key={avatar.id} avatar={avatar} showLabel={true} />
            </BaseButton>
          ))}
        </div>
      </BaseDialogBody>
    </BaseDialog>
  );
}
