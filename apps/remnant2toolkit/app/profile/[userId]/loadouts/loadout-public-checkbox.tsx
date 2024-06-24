'use client'

import { BaseCheckbox } from '@repo/ui/base/checkbox'
import { toast } from 'react-toastify'

import { setIsLoadoutPublic } from '@/app/(actions)/loadouts/set-is-loadout-public'
import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'

interface Props {
  isLoadoutPublic: boolean
}

export function LoadoutPublicCheckbox({ isLoadoutPublic }: Props) {
  return (
    <BaseField className="flex items-center justify-start gap-x-2">
      <BaseLabel className="mt-2">Public?</BaseLabel>
      <BaseCheckbox
        name="isLoadoutPublic"
        checked={isLoadoutPublic}
        onChange={async () => {
          const response = await setIsLoadoutPublic(!isLoadoutPublic)
          if (!response.success) {
            toast.error(response.message)
          } else {
            toast.success(response.message)
          }
        }}
      />
    </BaseField>
  )
}
