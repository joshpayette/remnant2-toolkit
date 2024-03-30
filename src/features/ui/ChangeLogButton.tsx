'use client'

import Link from 'next/link'

import { NAV_ITEMS } from '@/features/navigation/constants'

export function ChangeLogButton() {
  return (
    <div className="flex items-center justify-start">
      <Link
        href={NAV_ITEMS.changeLog.href}
        target="_blank"
        className="flex w-auto items-center justify-center gap-1 rounded-md bg-violet-500 p-2 text-sm font-bold text-black drop-shadow-lg hover:bg-violet-300"
      >
        <NAV_ITEMS.changeLog.icon className="h-5 w-5" />
      </Link>
    </div>
  )
}
