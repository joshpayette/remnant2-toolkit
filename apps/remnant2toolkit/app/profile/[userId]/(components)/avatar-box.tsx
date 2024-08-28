import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { Avatar } from '@/app/profile/[userId]/(lib)/types';

interface Props {
  avatar: Avatar;
  showLabel?: boolean;
}

export function AvatarBox({
  avatar: { name, id, imagePath },
  showLabel = false,
}: Props) {
  return (
    <div className="bg-background-solid ring-secondary-400/30 rounded-md p-1 text-xs font-medium ring-1 ring-inset">
      <Image
        id={id}
        src={getImageUrl(imagePath)}
        alt={name}
        width={128}
        height={128}
      />
      {showLabel ? (
        <div className="bg-secondary-900 mt-1 py-1 text-center">{name}</div>
      ) : null}
    </div>
  );
}
