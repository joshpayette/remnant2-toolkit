import { Fragment, useState } from 'react'

export default function BuildName({
  editable,
  name,
  showLabels,
  onClick,
  onClose,
}: {
  editable: boolean
  name: string
  showLabels: boolean
  onClick: () => void
  onClose: (newBuildName: string) => void
}) {
  const [newName, setNewName] = useState(name)

  return (
    <div className="relative mb-4 flex w-full flex-col items-center justify-center gap-2 border-b border-b-green-900 pb-2">
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
          {showLabels && (
            <button onClick={onClick} className="text-green-400">
              <div className="flex grow items-end justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
