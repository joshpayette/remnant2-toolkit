import { getServerSession } from '@/app/(lib)/auth'

export default async function ProfileHeader() {
  const session = await getServerSession()

  if (!session?.user?.image) return null

  const { image, name, email } = session.user

  return (
    <div className="flex items-center gap-x-8">
      <img
        src={image}
        alt={`Profile picture of ${name}`}
        className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
      />
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-semibold text-white">{name}</h2>
        <p className="text-sm text-gray-400">{email}</p>
      </div>
    </div>
  )
}
