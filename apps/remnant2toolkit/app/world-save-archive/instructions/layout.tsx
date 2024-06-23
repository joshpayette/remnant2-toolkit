import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'World Save Archive Instructions - Remnant2Toolkit'
  const description =
    'Instructions on using the World Save Archive files provided by the Remnant 2 Toolkit.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/world-save-archive/instructions`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/toolkit/og-image-sm.jpg',
          width: 150,
          height: 150,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-start justify-start text-left">
      {children}
    </div>
  )
}
