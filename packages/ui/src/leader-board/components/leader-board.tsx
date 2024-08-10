'use client'

import { BaseLink } from '@repo/ui/base/link'
import {
  BaseTable,
  BaseTableBody,
  BaseTableCell,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
} from '@repo/ui/base/table'
import { Skeleton } from '@repo/ui/skeleton'
import { getArrayOfLength } from '@repo/utils/get-array-of-length'
import { useEffect, useState } from 'react'

import { BaseTextLink } from '../../base/text'
import type { LeaderBoardItem } from '../types/leader-board-item'

const SCORE_COLUMN_NAME = 'Score'

interface Props {
  fetchAction: () => Promise<LeaderBoardItem[]>
  scoreColumnName?: string
  itemCount: number
  title: string
}

export function LeaderBoard({
  fetchAction,
  itemCount,
  title,
  scoreColumnName = SCORE_COLUMN_NAME,
}: Props) {
  const [leaderBoardItems, setLeaderBoardItems] = useState<LeaderBoardItem[]>(
    [],
  )

  useEffect(() => {
    fetchAction().then((results) => {
      setLeaderBoardItems(results)
    })
  }, [fetchAction])

  return (
    <>
      <div className="ui-flex ui-w-full ui-flex-col ui-items-center ui-justify-start">
        <BaseLink href="/item-quiz" className="hover:ui-underline">
          <h3 className="ui-text-primary-500 ui-mb-2 ui-text-xl ui-font-bold">
            {title}
          </h3>
        </BaseLink>
        <div className="ui-w-full">
          <BaseTable dense striped grid>
            <BaseTableHead>
              <BaseTableRow>
                <BaseTableHeader>Rank</BaseTableHeader>
                <BaseTableHeader>User</BaseTableHeader>
                <BaseTableHeader>{scoreColumnName}</BaseTableHeader>
              </BaseTableRow>
            </BaseTableHead>
            <BaseTableBody>
              {leaderBoardItems.length > 0 ? (
                leaderBoardItems
                  .slice(0, itemCount)
                  .map((leaderBoardItem, index) => (
                    <BaseTableRow
                      key={leaderBoardItem.userId}
                      href={`/profile/${leaderBoardItem.userId}`}
                    >
                      <BaseTableCell>{index + 1}</BaseTableCell>
                      <BaseTableCell>
                        {leaderBoardItem.userDisplayName}
                      </BaseTableCell>
                      <BaseTableCell>{leaderBoardItem.score}</BaseTableCell>
                    </BaseTableRow>
                  ))
              ) : (
                <TopScoresSkeleton itemCount={itemCount} />
              )}
            </BaseTableBody>
          </BaseTable>
        </div>
      </div>
    </>
  )
}

function TopScoresSkeleton({ itemCount }: { itemCount: number }) {
  return getArrayOfLength(itemCount).map((_, index) => (
    <BaseTableRow key={index}>
      <BaseTableHeader>{index + 1}</BaseTableHeader>
      <BaseTableHeader>
        <Skeleton className="ui-h-[25px] ui-w-full" />
      </BaseTableHeader>
      <BaseTableHeader>
        <Skeleton className="ui-h-[25px] ui-w-full" />
      </BaseTableHeader>
    </BaseTableRow>
  ))
}
