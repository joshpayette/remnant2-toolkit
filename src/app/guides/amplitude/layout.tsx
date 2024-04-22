import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params: { itemName } }: { params: { itemName: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const title = 'Amplitude vs Resonance Guide - Remnant2Toolkit'
  const description =
    'A guide on what items and abilities are affected by Amplitude and Resonance'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/guides/hardcore-veteran`,
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
