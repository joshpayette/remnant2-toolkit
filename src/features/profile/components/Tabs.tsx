'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { name: 'Created Builds', href: '/profile/created-builds' },
  { name: 'Favorited Builds', href: '/profile/favorited-builds' },
]

export default function Tabs() {
  const pathname = usePathname()

  // get the current tab based on the pathname
  const currentTab = tabs.find((tab) => pathname.includes(tab.href))

  return (
    <div className="mt-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                tab.name === currentTab?.name
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
              )}
              aria-current={tab.name === currentTab?.name ? 'page' : undefined}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
