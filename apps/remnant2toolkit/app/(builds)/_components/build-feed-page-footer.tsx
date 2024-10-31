'use client';

import { BaseButton } from '@repo/ui';
import { usePathname, useSearchParams } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';

import { withQualityFilter } from '@/app/(builds)/_features/filters/_libs/with-quality-filter';

interface Props {
  children: React.ReactNode;
}

export function BuildFeedPageFooter({ children }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isClient = useIsClient();

  const isWithQualityParam =
    searchParams.get(withQualityFilter.buildFilterKey) || true;
  let isWithQuality: boolean = withQualityFilter.defaultValue === true;
  if (typeof isWithQualityParam === 'string') {
    isWithQuality = isWithQualityParam === 'true';
  }

  const nonQualityUrl = new URLSearchParams(searchParams);
  nonQualityUrl.delete(withQualityFilter.buildFilterKey);
  nonQualityUrl.append(withQualityFilter.buildFilterKey, 'false');

  if (children === null && !isWithQuality) {
    return null;
  }
  if (!isClient) {
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
              window.location.href = `${pathname}?${nonQualityUrl.toString()}`;
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
