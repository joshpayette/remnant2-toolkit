'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({
  className,
  label,
}: {
  className: string
  label: string
}) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} className={className}>
      {label}
    </button>
  )
}
