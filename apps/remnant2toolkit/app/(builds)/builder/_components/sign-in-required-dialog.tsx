import { BaseText, BaseTextLink } from '@repo/ui';

import GenericDialog from '@/app/_components/generic-dialog';
import { NAV_ITEMS } from '@/app/_types/navigation';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SignInRequiredDialog({ open, onClose }: Props) {
  return (
    <GenericDialog
      open={open}
      onClose={() => onClose()}
      title="Sign In Required"
    >
      <BaseText>
        You must be signed in to to perform certain actions, such as following
        or favoriting builds. Favoriting or following a build will allow you to
        easily find it later from your profile, and will help the community find
        builds from the creator.
      </BaseText>
      <BaseText>
        <BaseTextLink href={NAV_ITEMS.signin.href}>
          Please click here to sign-in.
        </BaseTextLink>
      </BaseText>
    </GenericDialog>
  );
}
