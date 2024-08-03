import { BaseField, BaseLabel } from '@repo/ui/base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox'
import { useSession } from 'next-auth/react'

import { BUILD_FILTER_KEYS } from '@/app/(components)/filters/builds/types'
import { areQualityBuildsEnabled } from '@/app/(utils)/builds/are-quality-builds-enabled'

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export const MINIMUM_QUALITY_DESCRIPTION_LENGTH = 200

export function BuildMiscFilter({ value, onChange }: Props) {
  // TODO Remove this once Quality Builds issue is fully resolved
  const { data: sessionData } = useSession()

  const options = [
    // * This has to be in the first position for the
    // * NEXT_PUBLIC_ENABLE_QUALITY_BUILDS check on the next lines
    // * to work correctly
    {
      label: `Only Quality Builds`,
      value: BUILD_FILTER_KEYS.WITHQUALITY,
    },
    {
      label: 'Only Builds w/ Video',
      value: BUILD_FILTER_KEYS.WITHVIDEO,
    },
    {
      label: 'Only Builds w/ Reference Link',
      value: BUILD_FILTER_KEYS.WITHREFERENCE,
    },
    {
      label: 'Patch Affected Builds',
      value: BUILD_FILTER_KEYS.PATCHAFFECTED,
    },
  ]

  if (
    !areQualityBuildsEnabled({
      userId: sessionData?.user?.id,
      withQuality: true,
    })
  ) {
    options.shift()
  }

  return (
    <BaseField>
      <BaseLabel>Include...</BaseLabel>
      <BaseListbox multiple name="misc" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
