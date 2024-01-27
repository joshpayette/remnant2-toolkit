import { cn } from '@/lib/classnames'
import { Modifier } from '../types'
import { parseItemModifiers } from '../lib/parseItemModifiers'

interface Props {
  itemDescription: string | undefined
}

export function ItemModifiers({ itemDescription }: Props) {
  if (!itemDescription) return null

  const modifiersFound = parseItemModifiers(itemDescription)
  if (modifiersFound.length === 0) return null

  return (
    <div className="text-left text-xs text-gray-400">
      <div className="mt-1 flex flex-row items-start justify-start">
        {modifiersFound.map((modifier) => (
          <div key={modifier.type} className="ml-4 first:ml-0">
            <span className={cn(modifier.color)}>{modifier.token}</span>{' '}
            {modifier.type}
          </div>
        ))}
      </div>
    </div>
  )
}
