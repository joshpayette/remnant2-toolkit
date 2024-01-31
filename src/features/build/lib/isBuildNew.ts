import { isWithinInterval, sub } from 'date-fns'

export default function isBuildNew(createdAt: Date) {
  return isWithinInterval(createdAt, {
    start: sub(new Date(), { hours: 24 }),
    end: new Date(),
  })
}
