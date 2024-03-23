import Image from 'next/image'

interface Props {
  alt: string
  imagePath: string
}

export function Avatar({ alt, imagePath }: Props) {
  return (
    <div className="rounded-md bg-secondary-400/10 p-1 text-xs font-medium ring-1 ring-inset ring-secondary-400/30">
      <Image
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${imagePath}`}
        alt={alt}
        width={128}
        height={128}
      />
    </div>
  )
}
