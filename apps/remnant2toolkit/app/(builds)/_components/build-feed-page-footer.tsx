'use client';

import { BaseButton } from '@repo/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { DEFAULT_BUILD_FILTERS } from '@/app/(builds)/_features/filters/build-filters';
import { BUILD_FILTER_KEYS } from '@/app/(builds)/_features/filters/types';

interface Props {
  children: React.ReactNode;
}

export function BuildFeedPageFooter({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isWithQualityParam =
    searchParams.get(BUILD_FILTER_KEYS.WITHQUALITY) || true;
  let isWithQuality: boolean = DEFAULT_BUILD_FILTERS.withQuality;
  if (typeof isWithQualityParam === 'string') {
    isWithQuality = isWithQualityParam === 'true';
  }

  const nonQualityUrl = new URLSearchParams(searchParams);
  nonQualityUrl.delete(BUILD_FILTER_KEYS.WITHQUALITY);
  nonQualityUrl.append(BUILD_FILTER_KEYS.WITHQUALITY, 'false');

  if (children === null && !isWithQuality) {
    return null;
  }

  return (
    <div className="mt-4 w-full">
      <h3 className="border-secondary-500 mb-2 border-b pb-2 text-center text-2xl">
        Want more builds?
      </h3>
      <div className="text-md w-full text-center">
        {isWithQuality ? (
          <BaseButton
            outline
            onClick={() => {
              router.push(`${pathname}?${nonQualityUrl.toString()}`);
              router.refresh();
            }}
          >
            Try removing the Quality Build filter
          </BaseButton>
        ) : null}
        {children}
      </div>
    </div>
  );
}
