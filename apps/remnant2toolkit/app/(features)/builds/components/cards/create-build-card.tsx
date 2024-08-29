import { BaseLink, cn, getImageUrl } from '@repo/ui';
import Image from 'next/image';

export function CreateBuildCard() {
  return (
    <BaseLink
      className={cn(
        'border-primary-500 bg-background-solid hover:border-primary-300 col-span-1 flex h-full min-h-[362px] flex-col items-center justify-center rounded-lg border-4 text-center shadow hover:scale-[1.05]',
      )}
      href="/builder/create"
    >
      <Image
        width={100}
        height={102}
        src={getImageUrl(`/misc/plus-icon.png`)}
        alt="Create a New Build"
        className="mb-4"
      />
      <p className="text-surface-solid text-2xl font-bold">
        Create a New Build
      </p>
    </BaseLink>
  );
}
