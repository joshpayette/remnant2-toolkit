import { Item } from '@/types'
import Dialog from './Dialog'
import { capitalize } from '@/lib/utils'
import Image from 'next/image'

interface ItemInfoProps {
  item: Item | null
  open: boolean
  onClose: () => void
}

export default function ItemInfo({ item, open, onClose }: ItemInfoProps) {
  if (!item) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={'Item Info'}
      maxWidthClass="max-w-3xl"
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="flex w-full flex-col items-center justify-center">
          <Image
            src={`https://d2sqltdcj8czo5.cloudfront.net${item.imagePath}`}
            width={128}
            height={128}
            alt={item.name}
            className="h-full max-h-full w-auto max-w-full"
          />
          <div className="w-full text-center">
            <h3 className="text-xl font-bold text-purple-500">{item.name}</h3>
            <p className="mb-2 text-sm text-gray-200">
              {capitalize(item.category)}
            </p>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-start justify-start">
          <h4 className="mt-4 text-left text-sm text-gray-500">Description</h4>
          <p className="text-left text-sm text-gray-300">
            {item.description || 'No description available.'}
          </p>

          <div className="flex flex-col items-start justify-start">
            <h4 className="mt-4 text-left text-sm text-gray-500">How to Get</h4>
            <p className="text-left text-sm text-gray-300">
              {item.howToGet || 'No instructions found.'}
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
            )) || (
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
