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
      <div className="grid grid-cols-3 gap-2">
        <Image
          src={item.path}
          width={128}
          height={128}
          alt={item.name}
          className="col-span-1"
        />
        <div className="col-span-2 flex flex-col items-start justify-start">
          <h3 className="text-xl font-bold text-purple-500">{item.name}</h3>
          <p className="mb-2 text-left text-sm text-gray-200">
            {capitalize(item.type)}
          </p>
          <h4 className="mt-4 text-left text-sm text-gray-500">Description</h4>
          <p className="text-left text-sm text-gray-300">
            {item.description ?? 'No description available.'}
          </p>
          {item.howToGet && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-500">
                How to Get
              </h4>
              <p className="text-left text-sm text-gray-300">
                {item.howToGet ?? 'No instructions found.'}
              </p>
            </div>
          )}
          {item.wikiLinks && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-500">
                Wiki Links
              </h4>
              {item.wikiLinks.map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left text-sm text-gray-300 underline hover:text-green-400"
                >
                  {link}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}
