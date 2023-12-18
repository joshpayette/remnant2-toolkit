import Image from 'next/image'
import Link from 'next/link'

export default function Logo({ showUrl = false }: { showUrl?: boolean }) {
  return (
    <Link href="/" className="-m-1.5 flex items-center justify-start p-1.5">
      <Image
        className="mr-2 h-8 w-auto"
        src="https://d2sqltdcj8czo5.cloudfront.net/logo-sm.png"
        alt="Remnant 2 Toolkit logo, a purple and yellow toolbox."
        height={32}
        width={32}
      />
      <div className="flex flex-col gap-0">
        <span className="mb-0 pb-0 text-white">Remnant 2 Toolkit</span>
        {showUrl && (
          <span className="text-xs text-gray-400">remnant2toolkit.com</span>
        )}
      </div>
    </Link>
  )
}
