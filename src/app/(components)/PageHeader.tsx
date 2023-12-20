interface PageHeaderProps {
  children?: React.ReactNode
  title: string
  subtitle?: string
}

export default function PageHeader({
  children,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-4 flex max-w-md flex-col p-4 text-center">
      <h1 className="mb-2 w-full text-4xl font-semibold  text-white">
        {title}
      </h1>
      <p className="mb-8 w-full text-lg text-gray-400">{subtitle}</p>
      {children}
    </div>
  )
}
