import { BaseButton } from '@repo/ui';

interface Props {
  onClick: () => void;
  followed: boolean;
}

export function FollowBuildButton({ onClick, followed }: Props) {
  return (
    <BaseButton
      color={followed ? 'red' : 'green'}
      aria-label={followed ? 'Unfollow build' : 'Follow build'}
      onClick={onClick}
      className="sm:w-full"
    >
      {followed ? 'Unfollow Build' : 'Follow Build'}
    </BaseButton>
  );
}
