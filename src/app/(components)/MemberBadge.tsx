import Image from 'next/image'

export default function MemberBadge() {
  return (
    <Image
      src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/badges/crystal_small.png`}
      width={43}
      height={50}
      alt="image denoting user is a member"
    />
  )
}
