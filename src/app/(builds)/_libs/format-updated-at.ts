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

  // If the updatedAt date is more than 7 days ago, but less than 14 days ago
  // return '1 week ago'
  const lessThan14DaysAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 14 }),
    end: sub(new Date(), { days: 7 }),
  })
  if (lessThan14DaysAgo) return '1 week ago'

  // If the updatedAt date is more than 14 days ago, but less than 21 days ago
  // return '2 weeks ago'
  const lessThan21DaysAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 21 }),
    end: sub(new Date(), { days: 14 }),
  })
  if (lessThan21DaysAgo) return '2 weeks ago'

  // If the updatedAt date is more than 21 days ago, but less than 1 month ago
  // return '3 weeks ago'
  const lessThan1MonthAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 30 }),
    end: sub(new Date(), { days: 21 }),
  })
  if (lessThan1MonthAgo) return '3 weeks ago'

  // If the updatedAt date is more than 1 month ago, but less than 2 months ago
  // return '1 month ago'
  const lessThan2MonthsAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 60 }),
    end: sub(new Date(), { days: 30 }),
  })
  if (lessThan2MonthsAgo) return '1 month ago'

  // If the updatedAt date is more than 2 months ago, but less than 3 months ago
  // return '2 months ago'
  const lessThan3MonthsAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 90 }),
    end: sub(new Date(), { days: 60 }),
  })
  if (lessThan3MonthsAgo) return '2 months ago'

  // If the updatedAt date is more than 3 months ago, but less than 4 months ago
  // return '3 months ago'
  const lessThan4MonthsAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 120 }),
    end: sub(new Date(), { days: 90 }),
  })
  if (lessThan4MonthsAgo) return '3 months ago'

  // If the updatedAt date is more than 4 months ago, but less than 5 months ago
  // return '4 months ago'
  const lessThan5MonthsAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 150 }),
    end: sub(new Date(), { days: 120 }),
  })
  if (lessThan5MonthsAgo) return '4 months ago'

  // If the updatedAt date is more than 5 months ago, but less than 6 months ago
  // return '5 months ago'
  const lessThan6MonthsAgo = isWithinInterval(new Date(updatedAt), {
    start: sub(new Date(), { days: 180 }),
    end: sub(new Date(), { days: 150 }),
  })
  if (lessThan6MonthsAgo) return '5 months ago'

  // If the updatedAt date is more than six months ago, display
  // 'over 6 months ago'
  return 'over 6 months ago'
}
