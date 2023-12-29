import { cn } from '@/app/(lib)/utils'

const aClass = 'text-gray-300 hover:text-green-400 underline'

export default function Footer() {
  return (
    <div className="max-w-2xl gap-2">
      <div className="flex w-full flex-row items-center justify-center gap-4 p-2">
        <a
          href="https://github.com/joshpayette/remnant2-toolkit"
          target="_blank"
        >
          <img
            src={'https://d2sqltdcj8czo5.cloudfront.net/github.png'}
            alt="Remnant 2 Toolkit on GitHub"
            className="h-8 w-8"
          />
        </a>
        <a href="https://twitter.com/Remnant2Toolkit" target="_blank">
          <img
            src={'https://d2sqltdcj8czo5.cloudfront.net/twitter.png'}
            alt="Josh Payette on Twitter"
            className="h-6 w-6"
          />
        </a>
        <a href="https://patreon.com/JoshPayette" target="_blank">
          <img
            src={'https://d2sqltdcj8czo5.cloudfront.net/patreon.png'}
            alt="Josh Payette on Patreon"
            className="h-6 w-6"
          />
        </a>
      </div>
      <p className="mb-4">
        Remnant 2 Toolkit is an{' '}
        <a
          href="https://github.com/joshpayette/remnant2-toolkit"
          target="_blank"
          className={cn(aClass)}
        >
          open source project
        </a>{' '}
        created and managed by Josh Payette.
      </p>
      <hr className="border-gray-900 pb-4" />
      <p className="pb-4">
        These tools would not be possible without the{' '}
        <a
          href="https://remnant2.wiki.fextralife.com/Remnant+2+Wiki"
          target="_blank"
          className={cn(aClass)}
        >
          Fextralife Remnant 2 Wiki
        </a>
        , as well as the amazingly detailed{' '}
        <a
          href="https://docs.google.com/spreadsheets/d/1hgcUe-PvFnm3QSf3iamtaX3Q8tf_RS_y1fdwS1QHXMU/edit#gid=389923786"
          target="_blank"
          className={cn(aClass)}
        >
          Google Sheet
        </a>{' '}
        compiled by Matthew Whyment.
      </p>
      <hr className="border-gray-900 pb-4" />
      <p>
        {`This project was inspired by Robin Kuiper's `}
        <a
          href="https://remnant.rkuiper.nl/"
          target="_blank"
          className={cn(aClass)}
        >
          Remnant 2 Tools
        </a>
        .
      </p>
      <div className="h-[50px] w-full bg-black sm:hidden">
        {/* Spacer for the back to top button on mobile */}
        &nbsp;
      </div>
    </div>
  )
}
