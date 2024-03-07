'use client'

import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { signIn, useSession } from 'next-auth/react'

import { DescriptionWithTags } from '@/features/items/components/DescriptionWithTags'
import { Input } from '@/features/ui/Input'
import { Skeleton } from '@/features/ui/Skeleton'
import { Textarea } from '@/features/ui/Textarea'
import { Toggle } from '@/features/ui/Toggle'
import { cn } from '@/lib/classnames'

import { MAX_BUILD_DESCRIPTION_LENGTH } from '../../constants'

type Props = {
  buildLink: string | null
  description: string | null
  isEditable: boolean
  isPublic: boolean | null
  isScreenshotModeActive: boolean
  onChangeBuildLink: (buildLink: string) => void
  onChangeDescription: (description: string) => void
  onChangeIsPublic: (isPublic: boolean) => void
}

export function MemberFeatures({
  buildLink,
  description,
  isEditable,
  isPublic,
  isScreenshotModeActive,
  onChangeBuildLink,
  onChangeDescription,
  onChangeIsPublic,
}: Props) {
  const { status } = useSession()

  if (status === 'loading') return <Loading />

  return (
    <div className="relative w-full max-w-[700px] pt-4">
      {!isEditable || isScreenshotModeActive ? (
        <div className="flex flex-col">
          {description && description.length > 0 && (
            <>
              <h3 className="text-md mb-2 font-bold text-green-500">
                Build Description
              </h3>
              <div
                className={cn(
                  'text-md whitespace-pre-wrap text-gray-200',
                  isScreenshotModeActive && 'max-h-none',
                )}
              >
                <DescriptionWithTags description={description} />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mb-8 w-full">
          <Textarea
            label={`Build Description (${
              description?.length ?? 0
            }/${MAX_BUILD_DESCRIPTION_LENGTH})`}
            name="description"
            placeholder="Consider adding a description about how the build works, possible item swaps, a link to a Youtube video demonstrating the build, and any other info that can help others understand your build better. Not sure what to write? Use the Item Description Template link below!"
            onChange={(e) => onChangeDescription(e.target.value)}
            value={description ?? ''}
            maxLength={MAX_BUILD_DESCRIPTION_LENGTH}
            className="h-[215px] w-full"
          />
          <div className="flex w-full items-center justify-end">
            <button
              className="my-1 text-xs text-purple-500 underline"
              onClick={() => {
                const response = confirm(
                  'Insert the description template? This will clear the current description.',
                )
                if (response) {
                  onChangeDescription(
                    `
This build is designed for [insert game difficulty here] and is a [insert build type here] build. It is designed to be played [insert solo or coop here] with a [insert weapon name here] but can be played with other weapons.
  
If you don't have the [insert item name here], you can use [insert alternative item name here] instead. If you don't have the [insert item name here], you can use [insert alternative item name here] instead.
  
For a non-boss version of this build, see [insert link here].
For an easier to obtain loot version of this build, see [insert link here].

Watch the build in action: [insert Youtube link here]
  `.trim(),
                  )
                }
              }}
            >
              <ClipboardDocumentListIcon className="inline-block h-4 w-4" />{' '}
              Insert Description Template
            </button>
          </div>
        </div>
      )}

      {isEditable && (
        <div className="mb-8 flex w-full flex-row items-center justify-start text-sm text-green-500">
          <div className="mr-4 w-[100px]">Build Reference Link</div>
          <div className="flex w-full items-center justify-start">
            <Input
              value={buildLink ?? ''}
              onChange={(e) => onChangeBuildLink(e.target.value)}
            />
          </div>
        </div>
      )}

      {isScreenshotModeActive ? null : (
        <>
          {isEditable ? (
            <div className="flex flex-row items-center justify-start text-sm text-green-500">
              <div className="mr-4">Public Build</div>
              <div className="flex items-center justify-start">
                <Toggle
                  enabled={Boolean(isPublic)}
                  setEnabled={onChangeIsPublic}
                />
                <a
                  href="https://github.com/joshpayette/remnant2-toolkit/blob/main/CODE_OF_CONDUCT.md"
                  target="_blank"
                  className="ml-2 text-xs text-purple-500 underline"
                >
                  Code of Conduct
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="text-md my-2 font-bold text-green-500">
                Build Visibility
              </div>
              <div className="text-md text-gray-200">
                {isPublic ? 'Public' : 'Private'}
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
