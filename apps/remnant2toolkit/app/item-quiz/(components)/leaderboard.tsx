import {
  BaseTable,
  BaseTableBody,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
} from '@repo/ui/base/table'
import { useEffect, useState } from 'react'

import getTopScores from '@/app/item-quiz/(components)/actions/getTopScores'
import { Heading } from '@/app/item-quiz/(components)/ui/heading'
import type { Score } from '@/app/item-quiz/(types)/score'

export function Leaderboard() {
  const [topScores, setTopScores] = useState<Score[]>([])

  useEffect(() => {
    async function fetchTopScores() {
      const scores = await getTopScores()
      setTopScores(scores)
    }

    fetchTopScores()
  }, [])

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <Heading>Leaderboard</Heading>
      </div>
      <BaseTable>
        <BaseTableHead>
          <BaseTableRow>
            <BaseTableHeader>Rank</BaseTableHeader>
            <BaseTableHeader>Name</BaseTableHeader>
            <BaseTableHeader>Score</BaseTableHeader>
          </BaseTableRow>
        </BaseTableHead>
        <BaseTableBody>
          {topScores.map((userProfile, index) => (
            <BaseTableRow key={userProfile.userId}>
              <BaseTableHeader>{index + 1}</BaseTableHeader>
              <BaseTableHeader>{userProfile.user.displayName}</BaseTableHeader>
              <BaseTableHeader>{userProfile.topItemQuizScore}</BaseTableHeader>
            </BaseTableRow>
          ))}
        </BaseTableBody>
      </BaseTable>
    </>
  )
}
