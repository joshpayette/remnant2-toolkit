'use client';

import { getArrayOfLength } from '@repo/utils';
import { useEffect, useState } from 'react';
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
    [],
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
    <div className="ui-flex ui-w-full ui-flex-col ui-items-center ui-justify-start">
      {headerLink ? (
        <BaseLink className="hover:ui-underline" href={headerLink}>
          <h3 className="ui-text-primary-500 ui-mb-2 ui-text-xl ui-font-bold">
            {title}
          </h3>
        </BaseLink>
      ) : (
        <h3 className="ui-text-primary-500 ui-mb-2 ui-text-xl ui-font-bold">
          {title}
        </h3>
      )}
      <div className="ui-w-full">
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return getArrayOfLength(itemCount).map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <BaseTableRow key={index}>
      <BaseTableHeader>{index + 1}</BaseTableHeader>
      <BaseTableHeader>
        <Skeleton className="ui-h-[25px] ui-w-full" />
      </BaseTableHeader>
      <BaseTableHeader>
        <Skeleton className="ui-h-[25px] ui-w-full" />
      </BaseTableHeader>
    </BaseTableRow>
  )) as React.ReactNode;
}
