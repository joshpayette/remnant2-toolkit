'use client';

import { type NotificationType } from '@repo/db';
import { useState } from 'react';

import { type FullNotification } from '../_actions/notification-types';
import { type StatusFilters } from './filter-types';
import { NotificationFilters } from './notification-filters';
import { NotificationsList } from './notifications-list';

interface Props {
  isEditable: boolean;
  notifications: Array<FullNotification>;
}

const DEFAULT_READ_FILTERS: Array<StatusFilters> = ["Unread"];
const DEFAULT_TYPE_FILTERS: Array<NotificationType> = ["Announcement", "BuildNew", "BuildUpdate"];


export function NotificationHistory(props: Props) {
  const { isEditable, notifications } = props;
  const [statusFilters, setStatusFilters] = useState<Array<StatusFilters>>(DEFAULT_READ_FILTERS);
  const [typeFilters, setTypeFilters] = useState<Array<NotificationType>>(DEFAULT_TYPE_FILTERS);

  return (
      <div className="flex w-full flex-col items-center">
        <NotificationFilters
          statusFilters={statusFilters}
          setStatusFilters={setStatusFilters}
          typeFilters={typeFilters}
          setTypeFilters={setTypeFilters}
        />

        <div className="mb-4 grid w-full grid-cols-1 gap-2">
          <NotificationsList
            isEditable={isEditable}
            notifications={notifications}
            statusFilters={statusFilters}
            typeFilters={typeFilters}
          />
        </div>
    </div>
  );
}
