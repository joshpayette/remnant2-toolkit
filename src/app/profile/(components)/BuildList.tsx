const builds = [
  {
    name: 'DPS So Good',
    link: '#',
    actions: '',
  },
  // More builds...
]

export default function BuildsList() {
  return (
    <div className="mx-auto w-full bg-black py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="w-full text-base font-semibold leading-6 text-green-500">
              Builds
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              A list of all the builds in your account.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Link
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {builds.map((build) => (
                    <tr key={build.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        {build.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {build.link}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          Edit
                          <span className="sr-only">, {build.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
