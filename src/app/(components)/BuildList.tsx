interface Props {
  children: React.ReactNode
  headerActions: React.ReactNode | undefined
  label: string
}

export default function BuildList({ children, headerActions, label }: Props) {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-center border-b border-b-green-500 py-2">
        <h2 className="flex w-full items-center justify-start text-2xl">
          {label}
        </h2>
        <div className="flex w-full items-center justify-end">
          {headerActions}
        </div>
      </div>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {children}
      </ul>
    </>
  )
}
