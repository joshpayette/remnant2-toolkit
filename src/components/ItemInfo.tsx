import { Item, LoadoutItem } from '@/types'
import Dialog from './Dialog'
import Image from 'next/image'
import { capitalize } from '@/lib/utils'

interface ItemInfoProps {
  item: Item | LoadoutItem | null
  open: boolean
  onClose: () => void
}

export default function ItemInfo({ item, open, onClose }: ItemInfoProps) {
  if (!item) return null

  return (
    <Dialog open={open} onClose={onClose} title={'Item Info'}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="flex w-full flex-col items-center justify-center">
          <Image src={item.path} width={128} height={128} alt={item.name} />
          <div className="w-full text-center">
            <h3 className="text-xl font-bold text-purple-500">{item.name}</h3>
            <p className="mb-2 text-sm text-gray-200">
              {capitalize(item.type)}
            </p>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-start justify-start">
          <h4 className="mt-4 text-left text-sm text-gray-500">Description</h4>
          <p className="text-left text-sm text-gray-300">
            {item.description ?? 'No description available.'}
          </p>

          <div className="flex flex-col items-start justify-start">
            <h4 className="mt-4 text-left text-sm text-gray-500">How to Get</h4>
            <p className="text-left text-sm text-gray-300">
              {item.howToGet ?? 'No instructions found.'}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h4 className="mt-4 text-left text-sm text-gray-500">Wiki Links</h4>
            {item.wikiLinks?.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-sm text-gray-300 underline hover:text-green-400"
              >
                {link}
              </a>
            )) ?? (
              <div className="text-left text-sm text-gray-300">
                No links found.
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}
