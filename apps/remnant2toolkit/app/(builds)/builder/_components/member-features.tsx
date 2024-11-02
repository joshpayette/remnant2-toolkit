'use client';

import {
  BaseButton,
  BaseField,
  BaseFieldset,
  BaseInput,
  BaseLabel,
  BaseLink,
  BaseSwitch,
  BaseTextarea,
  cn,
  DocumentIcon,
  NewWindowIcon,
  Skeleton,
  TokensIcon,
  Tooltip,
} from '@repo/ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { DescriptionWithTokens } from '@/app/_components/description-with-tokens';
import { BuildDescriptionTemplateAlert } from '@/app/(builds)/_components/build-description-template-alert';
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/max-build-description-length';
import { DescriptionTokenDialog } from '@/app/(builds)/builder/_components/description-token-dialog';

type Props = {
  buildId: string | null;
  buildLink: string | null;
  description: string | null;
  isEditable: boolean;
  isMainBuild: boolean;
  isPatchAffected: boolean | null;
  isPublic: boolean | null;
  isScreenshotMode: boolean;
  onChangeBuildLink: (buildLink: string) => void;
  onChangeDescription: (description: string) => void;
  onChangeIsPublic: (isPublic: boolean) => void;
  onChangeIsPatchAffected: (isPatchAffected: boolean) => void;
};

export function MemberFeatures({
  buildId,
  buildLink,
  description,
  isEditable,
  isMainBuild,
  isPatchAffected,
  isPublic,
  isScreenshotMode,
  onChangeBuildLink,
  onChangeDescription,
  onChangeIsPublic,
  onChangeIsPatchAffected,
}: Props) {
  const { status } = useSession();
  const [buildDescriptionAlertOpen, setBuildDescriptionAlertOpen] =
    useState(false);

  const [buildTagsDialogOpen, setBuildTagsDialogOpen] = useState(false);

  if (status === 'loading') return <Loading />;

  return (
    <div className="relative w-full max-w-[730px] pt-4">
      {!isEditable || isScreenshotMode ? (
        <div className="flex flex-col">
          {description && description.length > 0 && (
            <>
              <div className="mb-2 flex flex-row items-center justify-start gap-2">
                <h3 className="text-md text-primary-500 font-bold">
                  Build Description
                </h3>
                {buildId && (
                  <Tooltip content="Open description in new tab">
                    <div className="flex items-center justify-start p-0">
                      <BaseLink
                        href={`https://remnant2toolkit.com/builder/${buildId}/description`}
                        target="_blank"
                      >
                        <NewWindowIcon className="text-secondary-500 mr-1 h-4 w-4" />
                      </BaseLink>
                    </div>
                  </Tooltip>
                )}
              </div>
              <div
                className={cn(
                  'text-md overflow-x-auto overflow-y-auto whitespace-pre-wrap text-gray-200',
                  isScreenshotMode && 'max-h-none',
                )}
              >
                <DescriptionWithTokens
                  description={description}
                  highlightBuildTokens={true}
                  highlightExternalTokens={false}
                  highlightItems={true}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mb-8 h-full w-full">
          <BaseField>
            <BaseLabel>{`Build Description (${
              description?.length ?? 0
            }/${MAX_BUILD_DESCRIPTION_LENGTH})`}</BaseLabel>
            <p className="mb-2 text-xs text-zinc-400">
              Consider adding a description about how the build works, possible
              item swaps, a link to a Youtube video demonstrating the build, and
              any other info that can help others understand your build better.
              All item names will show up in bold and keywords as tokens. Not
              sure what to write? Use the Item Description Template link below!
            </p>
            <div className="grid h-full w-full">
              <BaseTextarea
                name="description"
                onChange={(e) => onChangeDescription(e.target.value)}
                value={description ?? ''}
                maxLength={MAX_BUILD_DESCRIPTION_LENGTH}
                textareaClassName="min-h-[200px]"
              />
            </div>
          </BaseField>
          <div className="flex w-full items-center justify-between">
            <BuildDescriptionTemplateAlert
              open={buildDescriptionAlertOpen}
              onClose={() => setBuildDescriptionAlertOpen(false)}
              onConfirm={() => {
                setBuildDescriptionAlertOpen(false);
                onChangeDescription(
                  `
This build is designed for [insert game difficulty here] and is a [insert build type here] build. It is designed to be played [insert solo or coop here] with a [insert weapon name here] but can be played with other weapons.

If you don't have the [insert item name here], you can use [insert alternative item name here] instead. If you don't have the [insert item name here], you can use [insert alternative item name here] instead.

The playstyle of this build relies on [insert playstyle here].
`.trim(),
                );
              }}
            />

            <DescriptionTokenDialog
              open={buildTagsDialogOpen}
              onClose={() => setBuildTagsDialogOpen(false)}
            />

            <div className="flex w-full items-start justify-between">
              <BaseButton
                plain
                className="flex flex-col items-center justify-start text-sm underline sm:flex-row"
                onClick={() => setBuildTagsDialogOpen(true)}
              >
                <TokensIcon className="text-surface-solid h-4 w-4" />
                Description Tokens
              </BaseButton>

              <BaseButton
                plain
                className="flex flex-col items-center justify-start text-sm underline sm:flex-row"
                onClick={() => setBuildDescriptionAlertOpen(true)}
              >
                <DocumentIcon className="text-surface-solid h-4 w-4" />{' '}
                Description Template
              </BaseButton>
            </div>
          </div>
        </div>
      )}

      {isScreenshotMode ? null : (
        <>
          {isEditable && (
            <div className="mb-8">
              <BaseFieldset className="mb-2 w-full">
                <BaseLabel className="mr-4 w-[200px] sm:mb-0">
                  Build Reference Link
                </BaseLabel>
                <ul className="mb-2 list-disc text-xs text-zinc-400">
                  <li className="ml-4">
                    The link must be relevant to the build or it will be
                    removed.
                  </li>
                  <li className="ml-4">
                    If you add a YouTube video URL, it will be embedded above
                    the build after 12 hours.{' '}
                  </li>
                  <li className="ml-4">Max Length: 190 characters</li>
                </ul>
                <div className="flex w-full items-center justify-start">
                  <BaseInput
                    value={buildLink ?? ''}
                    onChange={(e) => onChangeBuildLink(e.target.value)}
                    maxLength={190}
                  />
                </div>
              </BaseFieldset>
            </div>
          )}
        </>
      )}

      {isScreenshotMode ? null : (
        <>
          {isEditable ? (
            <div className="flex flex-col items-start justify-start gap-x-8 gap-y-2 sm:flex-row sm:items-center sm:justify-start">
              {isMainBuild ? (
                <div className="text-primary-500 flex flex-row items-center justify-start text-sm">
                  <BaseField className="flex flex-row items-end">
                    <BaseLabel className="mr-2">Public Build?</BaseLabel>
                    <BaseSwitch
                      checked={Boolean(isPublic)}
                      onChange={onChangeIsPublic}
                    />
                    <a
                      href="https://github.com/joshpayette/remnant2-toolkit/blob/main/CODE_OF_CONDUCT.md"
                      target="_blank"
                      className="text-secondary-500 mb-1 ml-2 text-xs underline"
                    >
                      Code of Conduct
                    </a>
                  </BaseField>
                </div>
              ) : null}

              <div className="text-primary-500 flex flex-row items-center justify-start text-sm">
                <BaseField className="flex flex-row items-end">
                  <BaseLabel className="mr-2">
                    Mark as Patch Affected?
                  </BaseLabel>
                  <BaseSwitch
                    checked={Boolean(isPatchAffected)}
                    onChange={onChangeIsPatchAffected}
                  />
                </BaseField>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-start gap-x-8 gap-y-2">
              <div className="flex flex-col">
                <div className="text-md text-primary-500 my-2 font-bold">
                  Build Visibility
                </div>
                <div className="text-md text-gray-200">
                  {isPublic ? 'Public' : 'Private'}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-md text-primary-500 my-2 font-bold">
                  Patch Affected?
                </div>
                <div className="text-md text-gray-200">
                  {isPatchAffected ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Loading() {
  return <Skeleton className="h-[300px] w-full" />;
}
