import Image from 'next/image'

import { cn } from '@/lib/classnames'

interface Props {
  bgClass?: string
  children: React.ReactNode
  image: 'home' | 'resources' | 'support'
  title: string
  description: React.ReactNode
}

export function LandingPageContainer({
  bgClass = 'bg-background/30',
  children,
  image,
  title,
  description,
}: Props) {
  let imageName = ''
  switch (image) {
    case 'home':
      imageName = 'home-bg1.jpg'
      break
    case 'resources':
      imageName = 'resources-bg2.jpg'
      break
    case 'support':
      imageName = 'support-r2tk-bg.jpg'
      break
    default:
      imageName = 'home-bg1.jpg'
  }

  return (
    <div className="relative isolate w-full max-w-7xl overflow-hidden py-24">
      <Image
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/${imageName}`}
        alt="Home page background"
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center light:invert"
        loading="eager"
      />
      <div
        className={cn('absolute left-0 top-0 -z-[5] h-full w-full', bgClass)}
      />
      <div className="sm:transform-g1 hidden w-full sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:blur-3xl">
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
      <div className="mx-auto grid w-full grid-cols-3 px-6 lg:px-8">
        <div className="col-span-full mx-auto max-w-2xl sm:col-span-2 sm:mx-8 lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-on-background sm:text-6xl">
            {title}
          </h1>
          {description}
        </div>
        {children}
      </div>
    </div>
  )
}
