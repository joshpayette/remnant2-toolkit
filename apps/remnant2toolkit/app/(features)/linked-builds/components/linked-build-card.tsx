'use client';

import { BaseLink } from '@repo/ui';
import { cn } from '@repo/ui';
import { Skeleton } from '@repo/ui';

import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens';
import type { LinkedBuildState } from '@/app/(types)/linked-builds';

interface Props {
  linkedBuildState: LinkedBuildState;
  footerActions?: React.ReactNode;
  isLoading: boolean;
}

export function LinkedBuildCard({
  linkedBuildState,
  footerActions,
  isLoading,
}: Props) {
  return (
    <div
      key={linkedBuildState.id}
      className={cn('h-full min-h-[300px] w-full text-left')}
      role="listitem"
    >
      {linkedBuildState.id.includes('placeholder') || isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <div
          className={cn(
            'border-secondary-500 bg-background-solid relative col-span-1 flex h-full flex-col rounded-lg border shadow',
          )}
        >
          <div className="flex w-full flex-1 items-start justify-start p-4 pb-0">
            <div className="flex w-full flex-col items-start justify-start">
              <BaseLink
                href={`/builder/linked/${linkedBuildState.id}`}
                className="text-surface-solid w-full hover:text-gray-200 hover:underline"
              >
                <h3 className={cn('text-md whitespace-pre-wrap font-medium')}>
                  {linkedBuildState.name}
                </h3>
              </BaseLink>
              <div className="mb-1 grid w-full grid-cols-3 truncate text-sm">
                <div className="col-span-2 truncate text-left text-gray-300">
                  by{' '}
                  <BaseLink
                    href={`/profile/${linkedBuildState.createdById}/linked-builds`}
                    className="text-primary-500 hover:text-primary-300 underline"
                  >
                    {linkedBuildState.createdByDisplayName}
                  </BaseLink>
                </div>
              </div>
              <div className="mt-2 flex w-full flex-row flex-wrap items-center justify-center gap-2">
                {linkedBuildState.linkedBuildItems.map((linkedBuildItem) => (
                  <span
                    key={linkedBuildItem.id}
                    className="'text-md font-medium' inline-flex flex-shrink-0 items-center justify-center rounded-md bg-gray-900 px-2 py-1"
                  >
                    {linkedBuildItem.label}
                  </span>
                ))}
              </div>
              {linkedBuildState.description && (
                <div className="mt-2 h-auto max-h-[140px] w-full flex-row items-start justify-start gap-x-2 overflow-x-auto overflow-y-auto whitespace-pre-wrap text-xs text-gray-300">
                  <DescriptionWithTokens
                    description={linkedBuildState.description}
                    highlightItems={true}
                    highlightBuildTokens={true}
                    highlightExternalTokens={false}
                  />
                </div>
              )}
            </div>
          </div>
          {footerActions ? (
            <div className="mt-2 flex items-center justify-end gap-x-2 text-sm">
              {footerActions}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
