'use client'

import { toast } from 'react-toastify'

import { setIsLoadoutPublic } from '@/features/loadouts/actions/setIsLoadoutPublic'
import { Checkbox } from '@/features/ui/Checkbox'

interface Props {
  isLoadoutPublic: boolean
}

export function LoadoutPublicCheckbox({ isLoadoutPublic }: Props) {
  return (
    <Checkbox
      label="Public?"
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
  )
}
