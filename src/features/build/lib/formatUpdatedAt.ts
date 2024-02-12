import { isWithinInterval, sub } from 'date-fns'

export function formatUpdatedAt(updatedAt: Date) {
  // If the updatedAt date is less than 24 hours ago, return 'less than 24h ago'
  const lessThan24HoursAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { hours: 24 }),
    end: new Date(),
  })
  if (lessThan24HoursAgo) return 'less than 24h ago'

  // If the updatedAt date is more than 1 day ago, but less than 2 days ago
  // return '1 day ago'
  const lessThan2DaysAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 2 }),
    end: sub(new Date(), { days: 1 }),
  })
  if (lessThan2DaysAgo) return '1 day ago'

  // If the updatedAt date is more than 2 days ago, but less than 3 days ago
  // return '2 days ago'
  const lessThan3DaysAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 3 }),
    end: sub(new Date(), { days: 2 }),
  })
  if (lessThan3DaysAgo) return '2 days ago'

  // If the updatedAt date is more than 3 days ago, but less than 4 days ago
  // return '3 days ago'
  const lessThan4DaysAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 4 }),
    end: sub(new Date(), { days: 3 }),
  })
  if (lessThan4DaysAgo) return '3 days ago'

  // If the updatedAt date is more than 4 days ago, but less than 5 days ago
  // return '4 days ago'
  const lessThan5DaysAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 5 }),
    end: sub(new Date(), { days: 4 }),
  })
  if (lessThan5DaysAgo) return '4 days ago'

  // If the updatedAt date is more than 5 days ago, but less than 6 days ago
  // return '5 days ago'
  const lessThan6DaysAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 6 }),
    end: sub(new Date(), { days: 5 }),
  })
  if (lessThan6DaysAgo) return '5 days ago'

  // If the updatedAt date is more than 6 days ago, but less than 7 days ago
  // return '6 days ago'
  const lessThan7DaysAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 7 }),
    end: sub(new Date(), { days: 6 }),
  })
  if (lessThan7DaysAgo) return '6 days ago'

  // If the updatedAt date is more than a week ago, display
  // 'more than a week ago'
  return 'over a week ago'
}
