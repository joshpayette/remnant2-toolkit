import Image from 'next/image'

export default function ToolkittenBadge() {
  return (
    <Image
      src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkitten_small.png`}
      width={43}
      height={50}
      alt="Toolkitten image denoting user is a member"
    />
  )
}
