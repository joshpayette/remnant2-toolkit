'use client'

import { BaseLink } from '@repo/ui/base/link'
import {
  BaseTable,
  BaseTableBody,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
} from '@repo/ui/base/table'
import { BaseTextLink } from '@repo/ui/base/text'
import { getArrayOfLength } from '@repo/utils/get-array-of-length'
import { useEffect, useState } from 'react'

import { Skeleton } from '@/app/(components)/skeleton'
import { Heading } from '@/app/(features)/item-quiz/components/heading'
import { getLeaderBoard } from '@/app/(features)/item-quiz/leader-board/actions/get-leader-board'
import type { Score } from '@/app/(features)/item-quiz/leader-board/types/score'

export function LeaderBoard() {
  const [topScores, setTopScores] = useState<Score[]>([])

  useEffect(() => {
    getLeaderBoard().then((scores) => {
      setTopScores(scores)
    })
  }, [])

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <BaseLink href="/item-quiz" className="hover:underline">
          <Heading>Item Quiz Leaderboard</Heading>
        </BaseLink>
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
          {topScores.length > 0 ? (
            topScores.map((userScore, index) => (
              <BaseTableRow key={userScore.userId}>
                <BaseTableHeader>{index + 1}</BaseTableHeader>
                <BaseTableHeader>
                  <BaseTextLink href={`/profile/${userScore.userId}`}>
                    {userScore.user.displayName}
                  </BaseTextLink>
                </BaseTableHeader>
                <BaseTableHeader>{userScore.topItemQuizScore}</BaseTableHeader>
              </BaseTableRow>
            ))
          ) : (
            <TopScoresSkeleton />
          )}
        </BaseTableBody>
      </BaseTable>
    </>
  )
}

function TopScoresSkeleton() {
  return getArrayOfLength(20).map((_, index) => (
    <BaseTableRow key={index}>
      <BaseTableHeader>{index + 1}</BaseTableHeader>
      <BaseTableHeader>
        <Skeleton className="h-[25px] w-full" />
      </BaseTableHeader>
      <BaseTableHeader>
        <Skeleton className="h-[25px] w-full" />
      </BaseTableHeader>
    </BaseTableRow>
  ))
}
