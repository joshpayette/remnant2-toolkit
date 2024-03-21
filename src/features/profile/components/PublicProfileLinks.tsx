import Link from 'next/link'

interface Props {
  userId?: string
}

export function PublicProfileLinks({ userId }: Props) {
  if (!userId) return null

  return (
    <div className="my-8 flex flex-col items-center justify-center gap-y-2">
      <Link
        className="text-md text-white underline hover:text-gray-300 "
        href={`/profile/${userId}?t=${Date.now()}`}
      >
        Share your profile
      </Link>
    </div>
  )
}
