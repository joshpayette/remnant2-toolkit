interface PageHeaderProps {
  children?: React.ReactNode
  title: string
}

export default function PageHeader({ children, title }: PageHeaderProps) {
  return (
    <div className="mb-4 flex max-w-md flex-col p-4 text-center">
      <h1 className="mb-2 w-full text-4xl font-semibold leading-6 text-white">
        {title}
      </h1>
      <p className="mb-8 w-full text-lg text-gray-400">
        Discover all the items in Remnant 2
      </p>
      {children}
    </div>
  )
}
