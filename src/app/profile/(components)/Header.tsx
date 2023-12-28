import { getServerSession } from '@/app/(lib)/auth'
import DisplayName from './DisplayName'
import { DEFAULT_DISPLAY_NAME } from '@/app/(lib)/constants'
import PlaceHolderIcon from '@/app/(components)/PlaceholderIcon'

export default async function Header() {
  const session = await getServerSession()
  if (!session?.user) return null

  const { image, displayName, name, email } = session.user

  return (
    <div className="flex flex-col items-center gap-x-8 gap-y-4 sm:flex-row sm:gap-y-0">
      {image ? (
        <img
          src={image}
          alt={`Profile picture of ${name}`}
          className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
        />
      ) : (
        <span className="h-24 w-24 flex-none rounded-lg bg-gray-100 object-cover">
          <PlaceHolderIcon />
        </span>
      )}
      <div className="flex flex-col gap-0">
        <DisplayName name={displayName ?? name ?? DEFAULT_DISPLAY_NAME} />
        <span className="text-sm text-white">{name}</span>
        <span className="text-sm text-gray-400">{email}</span>
      </div>
    </div>
  )
}
