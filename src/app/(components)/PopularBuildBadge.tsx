import Image from 'next/image'

export default function PopularBuildBadge() {
  return (
    <Image
      src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/badges/crystal_small.png`}
      width={43}
      height={50}
      alt="image denoting the build is popular"
    />
  )
}
