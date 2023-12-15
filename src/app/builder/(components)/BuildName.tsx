import { PencilIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

export default function BuildName({
  editable,
  name,
  showControls,
  onClick,
  onClose,
}: {
  editable: boolean
  name: string
  showControls: boolean
  onClick: () => void
  onClose: (newBuildName: string) => void
}) {
  const [newName, setNewName] = useState(name)

  return (
    <div className="relative mb-2 flex w-full flex-col items-center justify-center gap-2 border-b border-b-green-900 pb-2">
      {editable ? (
        <Fragment>
          <input
            type="text"
            name="buildname"
            id="buildname"
            value={newName}
            className="block w-full max-w-xl rounded-md border-0 bg-black py-1.5 text-center text-xl text-green-500 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:leading-6"
            placeholder="Build Name"
            onChange={(e) => setNewName(e.target.value)}
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
        </Fragment>
      ) : (
        <div className="mb-2 flex w-full items-center justify-center gap-2">
          <h2 className="text-center  text-4xl font-bold text-green-400">
            {name}
          </h2>
          {showControls && (
            <button onClick={onClick} className="text-green-400">
              <div className="flex grow items-end justify-start">
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
