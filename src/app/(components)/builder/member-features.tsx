'use client'

import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { BuildTags } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import { BaseInput } from '@/app/(components)/_base/input'
import { BaseSwitch } from '@/app/(components)/_base/switch'
import { BaseTextarea } from '@/app/(components)/_base/textarea'
import { BuildDescriptionTemplateAlert } from '@/app/(components)/alerts/build-description-template-alert'
import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens'
import { Skeleton } from '@/app/(components)/skeleton'
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(data)/builds/constants'
import { cn } from '@/app/(utils)/classnames'

import { BuildTagsDisplay } from './build-tags/build-tags-display'

type Props = {
  buildLink: string | null
  buildTags: BuildTags[]
  description: string | null
  isEditable: boolean
  isPatchAffected: boolean | null
  isPublic: boolean | null
  isScreenshotMode: boolean
  onChangeBuildLink: (buildLink: string) => void
  onChangeBuildTags: (tags: BuildTags[]) => void
  onChangeDescription: (description: string) => void
  onChangeIsPublic: (isPublic: boolean) => void
  onChangeIsPatchAffected: (isPatchAffected: boolean) => void
}

export function MemberFeatures({
  buildLink,
  buildTags,
  description,
  isEditable,
  isPatchAffected,
  isPublic,
  isScreenshotMode,
  onChangeBuildLink,
  onChangeBuildTags,
  onChangeDescription,
  onChangeIsPublic,
  onChangeIsPatchAffected,
}: Props) {
  const { status } = useSession()
  const [buildDescriptionAlertOpen, setBuildDescriptionAlertOpen] =
    useState(false)

  if (status === 'loading') return <Loading />

  return (
    <div className="relative w-full max-w-[700px] pt-4">
      <div className="mb-4 flex w-full flex-col items-start justify-start">
        <BuildTagsDisplay
          buildTags={buildTags ?? []}
          isEditable={isEditable}
          isScreenshotMode={isScreenshotMode}
          onChange={onChangeBuildTags}
          showLabel={isEditable || buildTags.length > 0}
        />
      </div>

      {!isEditable || isScreenshotMode ? (
        <div className="flex flex-col">
          {description && description.length > 0 && (
            <>
              <h3 className="text-md mb-2 font-bold text-primary-500">
                Build Description
              </h3>
              <div
                className={cn(
                  'text-md overflow-x-auto overflow-y-auto whitespace-pre-wrap text-gray-200',
                  isScreenshotMode && 'max-h-none',
                )}
              >
                <DescriptionWithTokens
                  description={description}
                  highlightBuildTags={true}
                  highlightItems={true}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mb-8 w-full">
          <BaseField>
            <BaseLabel>{`Build Description (${
              description?.length ?? 0
            }/${MAX_BUILD_DESCRIPTION_LENGTH})`}</BaseLabel>
            <BaseTextarea
              name="description"
              placeholder="Consider adding a description about how the build works, possible item swaps, a link to a Youtube video demonstrating the build, and any other info that can help others understand your build better. All item names will show up in bold and keywords as tokens. Not sure what to write? Use the Item Description Template link below!"
              onChange={(e) => onChangeDescription(e.target.value)}
              value={description ?? ''}
              maxLength={MAX_BUILD_DESCRIPTION_LENGTH}
              className="h-[215px] w-full"
            />
          </BaseField>
          <div className="flex w-full items-center justify-end">
            <BuildDescriptionTemplateAlert
              open={buildDescriptionAlertOpen}
              onClose={() => setBuildDescriptionAlertOpen(false)}
              onConfirm={() => {
                setBuildDescriptionAlertOpen(false)
                onChangeDescription(
                  `
This build is designed for [insert game difficulty here] and is a [insert build type here] build. It is designed to be played [insert solo or coop here] with a [insert weapon name here] but can be played with other weapons.

If you don't have the [insert item name here], you can use [insert alternative item name here] instead. If you don't have the [insert item name here], you can use [insert alternative item name here] instead.

For a non-boss version of this build, see [insert link here].
For an easier to obtain loot version of this build, see [insert link here].

Watch the build in action: [insert Youtube link here]
`.trim(),
                )
              }}
            />

            <BaseButton
              plain
              className="my-1underline"
              onClick={() => setBuildDescriptionAlertOpen(true)}
            >
              <ClipboardDocumentListIcon className="inline-block h-4 w-4 text-surface-solid" />{' '}
              Insert Description Template
            </BaseButton>
          </div>
        </div>
      )}

      {isScreenshotMode ? null : (
        <>
          {isEditable && (
            <div className="mb-8">
              <div className="mb-2 flex w-full flex-col items-start justify-start text-sm text-primary-500 sm:flex-row sm:items-center">
                <div className="mb-2 mr-4 w-[200px] sm:mb-0">
                  Build Reference Link
                </div>
                <div className="flex w-full items-center justify-start">
                  <BaseInput
                    value={buildLink ?? ''}
                    onChange={(e) => onChangeBuildLink(e.target.value)}
                    placeholder="The link must be relevant to the build or it will be removed."
                  />
                </div>
              </div>
              <div className="flex w-full items-center justify-start text-xs text-gray-300">
                If you add a YouTube video URL, it will be embedded above the
                build after 12 hours.{' '}
              </div>
            </div>
          )}
        </>
      )}

      {isScreenshotMode ? null : (
        <>
          {isEditable ? (
            <div className="flex flex-col items-start justify-start gap-x-8 gap-y-2 sm:flex-row sm:items-center sm:justify-start">
              <div className="flex flex-row items-center justify-start text-sm text-primary-500">
                <BaseField className="flex flex-row items-end">
                  <BaseLabel className="mr-2">Public Build?</BaseLabel>
                  <BaseSwitch
                    checked={Boolean(isPublic)}
                    onChange={onChangeIsPublic}
                  />
                  <a
                    href="https://github.com/joshpayette/remnant2-toolkit/blob/main/CODE_OF_CONDUCT.md"
                    target="_blank"
                    className="mb-1 ml-2 text-xs text-secondary-500 underline"
                  >
                    Code of Conduct
                  </a>
                </BaseField>
              </div>

              <div className="flex flex-row items-center justify-start text-sm text-primary-500">
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
                <div className="text-md my-2 font-bold text-primary-500">
                  Build Visibility
                </div>
                <div className="text-md text-gray-200">
                  {isPublic ? 'Public' : 'Private'}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-md my-2 font-bold text-primary-500">
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
  )
}

function Loading() {
  return <Skeleton className="h-[300px] w-full" />
}
