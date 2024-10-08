import {
  BaseButton,
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@repo/ui';
import { useSession } from 'next-auth/react';

import {
  getPermittedBuilder,
  isPermittedBuilder,
} from '@/app/(builds)/_libs/is-permitted-builder';
import { AvatarBox } from '@/app/(user)/profile/_components/avatar-box';
import { AVATARS } from '@/app/(user)/profile/_constants/avatars';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (avatarId: string) => void;
}

export function AvatarSelectDialog({ open, onClose, onSelect }: Props) {
  const avatarList = AVATARS;

  const { data: sessionData } = useSession();
  if (sessionData?.user?.id) {
    const customAvatarAllowed = isPermittedBuilder(sessionData.user.id);
    if (customAvatarAllowed) {
      const permittedBuilder = getPermittedBuilder(sessionData.user.id);
      if (
        permittedBuilder &&
        permittedBuilder.avatar &&
        !avatarList.some((a) => a.id === permittedBuilder.userId)
      ) {
        avatarList.unshift({
          id: permittedBuilder.userId,
          name: permittedBuilder.name,
          imagePath: permittedBuilder.avatar,
        });
      }
    }
  }

  return (
    <BaseDialog open={open} onClose={onClose} size="4xl">
      <BaseDialogTitle>Select Avatar</BaseDialogTitle>
      <BaseDialogDescription>
        Select a new avatar to display on your public profile.
      </BaseDialogDescription>
      <BaseDialogBody>
        <div className="flex w-full flex-wrap items-center justify-center">
          {avatarList.map((avatar) => (
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
