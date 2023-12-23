'use client'

import { Switch } from '@headlessui/react'
import { cn } from '../(lib)/utils'

type Props = {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}

export default function Toggle({ enabled, setEnabled }: Props) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={cn(
        enabled ? 'bg-purple-500' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={cn(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      />
    </Switch>
  )
}
