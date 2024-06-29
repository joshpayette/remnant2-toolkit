import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Link } from '@repo/ui/base/link'

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
      className="bg-background-solid/50 ring-background-solid/10 hover:border-primary-500 mb-4 flex min-h-[200px] flex-row gap-x-4 rounded-xl border border-transparent p-6 ring-1 ring-inset"
    >
      {icon}
      <div className="relative w-full">
        <p className="text-lg font-bold leading-7">{label}</p>
        <div className="mt-2 text-gray-300 ">{description}</div>
        <div className="absolute bottom-0 right-0 mt-4 flex w-full items-center justify-end">
          <ArrowRightIcon
            className="text-primary-500 hover:text-primary-300 h-6 w-6"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  )
}
