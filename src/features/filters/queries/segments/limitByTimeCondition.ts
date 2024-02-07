import { Prisma } from '@prisma/client'
import { TimeRange } from '../../types'

function formatDateToMySQL(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

function getTimeCondition(timeRange: TimeRange) {
  let timeCondition = ''
  const now = new Date()
  const allTime = new Date(2023, 0, 1)

  switch (timeRange) {
    case 'day':
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      timeCondition = `${formatDateToMySQL(oneDayAgo)}`
      break
    case 'week':
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      timeCondition = `${formatDateToMySQL(oneWeekAgo)}`
      break
    case 'month':
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate(),
      )
      timeCondition = `${formatDateToMySQL(oneMonthAgo)}`
      break
    case 'all-time':
      timeCondition = `${formatDateToMySQL(allTime)}`
    default:
      timeCondition = `${formatDateToMySQL(allTime)}`
      break
  }

  return timeCondition
}

export function limitByTimeConditionSegment(timeRange: TimeRange) {
  const timeCondition = getTimeCondition(timeRange)
  return Prisma.sql`AND Build.createdAt > ${timeCondition}`
}
