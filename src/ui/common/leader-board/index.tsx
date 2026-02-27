'use client';

import { useEffect, useState } from 'react';

import { getArrayOfLength } from '@/utils/get-array-of-length';

import { BaseLink } from '../../base/link';
import {
  BaseTable,
  BaseTableBody,
  BaseTableCell,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
} from '../../base/table';
import { Skeleton } from '../skeleton';

export interface LeaderBoardItem {
  userId: string;
  userDisplayName: string | null;
  score: number;
}

const SCORE_COLUMN_NAME = 'Score';

interface LeaderBoardProps {
  fetchAction: () => Promise<LeaderBoardItem[]>;
  headerLink?: string;
  itemCount: number;
  scoreColumnName?: string;
  title: string;
}

export function LeaderBoard({
  fetchAction,
  headerLink,
  itemCount,
  title,
  scoreColumnName = SCORE_COLUMN_NAME,
}: LeaderBoardProps) {
  const [leaderBoardItems, setLeaderBoardItems] = useState<LeaderBoardItem[]>(
    []
  );

  useEffect(() => {
    fetchAction()
      .then((results) => {
        setLeaderBoardItems(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchAction]);

  return (
    <div className="flex w-full flex-col items-center justify-start">
      {headerLink ? (
        <BaseLink className="hover:underline" href={headerLink}>
          <h3 className="text-primary-500 mb-2 text-xl font-bold">{title}</h3>
        </BaseLink>
      ) : (
        <h3 className="text-primary-500 mb-2 text-xl font-bold">{title}</h3>
      )}
      <div className="w-full">
        <BaseTable dense grid striped>
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
                    href={`/profile/${leaderBoardItem.userId}`}
                    key={leaderBoardItem.userId}
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
  );
}

function TopScoresSkeleton({ itemCount }: { itemCount: number }) {
  return getArrayOfLength(itemCount).map((_, index) => (
    <BaseTableRow key={index}>
      <BaseTableHeader>{index + 1}</BaseTableHeader>
      <BaseTableHeader>
        <Skeleton className="h-[25px] w-full" />
      </BaseTableHeader>
      <BaseTableHeader>
        <Skeleton className="h-[25px] w-full" />
      </BaseTableHeader>
    </BaseTableRow>
  )) as React.ReactNode;
}
