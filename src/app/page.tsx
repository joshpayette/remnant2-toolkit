import {
  BookmarkSquareIcon,
  DocumentCheckIcon,
  InformationCircleIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function HomePage() {
  const cards = [
    {
      name: 'Item Tracker',
      description:
        'Keep track of the items you have collected and the ones you still need.',
      href: '/tracker',
      icon: DocumentCheckIcon,
    },
    {
      name: 'Builder',
      description:
        'Create and share your favorite builds with your friends and the community.',
      href: '/builder',
      icon: BookmarkSquareIcon,
    },
    {
      name: 'Featured Builds',
      description: 'A collection of builds aggregated from various sources.',
      href: '/featured-builds',
      icon: ListBulletIcon,
    },
    {
      name: 'Item Info',
      description: 'Look up info on all the items in Remnant 2.',
      href: '/item-lookup',
      icon: InformationCircleIcon,
    },
  ]

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        src="https://d2sqltdcj8czo5.cloudfront.net/home-bg.webp"
        alt="Home page background"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div className="sm:transform-g1 hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:blur-3xl">
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#9646ff] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#9646ff] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Remnant 2 Toolkit
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Welcome to the Remnant 2 Toolkit, a set of tools for the game
            Remnant 2.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.name}
              className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
            >
              <card.icon
                className="h-7 w-5 flex-none text-green-500"
                aria-hidden="true"
              />
              <div className="text-base leading-7">
                <Link
                  href={card.href}
                  className="font-semibold text-white hover:text-green-500 hover:underline"
                >
                  {card.name}
                </Link>
                <p className="mt-2 text-gray-300">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
