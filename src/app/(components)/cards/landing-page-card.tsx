import { ArrowRightIcon } from '@heroicons/react/24/solid'

import { Link } from '@/app/(components)/_base/link'

interface Props {
  href: string
  target?: '_blank'
  label: string
  description: string
  icon: React.ReactNode
}

export function LandingPageCard({
  href,
  target,
  description,
  icon,
  label,
}: Props) {
  return (
    <Link
      href={href}
      key={label}
      target={target}
      className="mb-4 flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent bg-background-container/60 p-6 ring-1 ring-inset ring-background-container hover:border-primary"
    >
      {icon}
      <div className="relative w-full">
        <p className="text-lg font-bold leading-7">{label}</p>
        <div className="mt-2 text-on-background-variant">{description}</div>
        <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
          <ArrowRightIcon
            className="h-6 w-6 text-primary/75 hover:text-primary"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  )
}
