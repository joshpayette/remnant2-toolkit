import Input from '@/app/(components)/Input'
import { PencilIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function BuilderName({
  isEditable,
  isEditingBuildName,
  name,
  showControls,
  onClick,
  onClose,
}: {
  isEditable: boolean
  isEditingBuildName: boolean
  name: string
  showControls: boolean
  onClick: () => void
  onClose: (newBuildName: string) => void
}) {
  const [newName, setNewName] = useState(name)

  return (
    <div className="relative mb-2 flex w-full flex-col items-center justify-center gap-2 border-b border-b-green-900 pb-2">
      {isEditingBuildName && isEditable ? (
        <>
          <Input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            placeholder={'Build Name'}
            id="buildname"
          />

          <div>
            <button
              onClick={() => onClose(newName)}
              className="mr-2 rounded-md bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save
            </button>
            <button
              onClick={() => onClose(name)}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="mb-2 flex w-full items-center justify-center gap-2">
          <h2 className="text-center  text-4xl font-bold text-green-400">
            {name}
          </h2>
          {showControls && isEditable && (
            <button onClick={onClick} className="text-green-400">
              <div className="flex grow items-end justify-start">
                <PencilIcon
                  className="h-4 w-4 text-green-500 hover:text-green-300"
                  aria-hidden="true"
                />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
