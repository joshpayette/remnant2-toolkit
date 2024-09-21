'use client';

import { type NotificationType } from "@repo/db";
import { useState } from "react";
import { MdAnnouncement, MdEdit, MdNewReleases } from "react-icons/md";

import { type FullNotification } from "../_actions/notification-types";
import { updateNotificationStatus } from "../_actions/update-notification-status";
import { type StatusFilters } from "./filter-types";
import { NotificationCard } from "./notification-card";

interface Props {
  isEditable: boolean;
  notifications: Array<FullNotification>
  statusFilters: Array<StatusFilters>;
  typeFilters: Array<NotificationType>;
}

export function NotificationsList({
  isEditable,
  notifications, 
  statusFilters, 
  typeFilters
}: Props) {

  if (!isEditable) return;

  return (
    notifications
    .sort((a, b) => b.eventTime.getTime() - a.eventTime.getTime()) // Newest first
    .map((notification) => {
      const {id, type, read, hidden, createdBy, eventTime} = notification;
      const [isRead, setIsRead] = useState(read);
      const [isHidden, setIsHidden] = useState(hidden);
      const notificationStatusCallback = async (read: boolean, hidden: boolean) => {
        await updateNotificationStatus(id, read, hidden);
        setIsRead(read);
        setIsHidden(hidden);
      }

      const readState: StatusFilters = isHidden ? "Hidden" : isRead ? "Read" : "Unread";
      if (!statusFilters.includes(readState)) return null;
      if (!typeFilters.includes(type)) return null;

      switch (type) {
        case "Announcement": {
          const { notificationId } = notification.announcementNotification;

          return <NotificationCard
            label={`New announcement with placeholder content ${notificationId}!`}
            description={`This announcement was made by ${createdBy.displayName}`}
            href={`/`}
            target="_blank"
            icon={
              <MdAnnouncement
                className="text-primary-500 h-7 w-7 flex-none"
                aria-hidden="true"
              />
            }
            read={isRead}
            hidden={isHidden}
            notificationStatusCallback={notificationStatusCallback}
          />
        }
        case "BuildNew": {
          const userName = createdBy.displayName;
          const { build, buildId } = notification.buildNewNotification;
          const { isPublic, name } = build;
          if (!isPublic) return undefined;

          return <NotificationCard
            label={`${userName} created a new build: "${name}"`}
            description={`The build "${name}" was created by ${userName} on ${eventTime.toDateString()}. Click here to check it out!`}
            href={`/builder/${buildId}`}
            target="_blank"
            icon={
              <MdNewReleases
                className="text-primary-500 h-7 w-7 flex-none"
                aria-hidden="true"
              />
            }
            read={isRead}
            hidden={isHidden}
            notificationStatusCallback={notificationStatusCallback}
          />
        }
        case "BuildUpdate": {
          const userName = createdBy.displayName;
          const { build, buildId } = notification.buildUpdateNotification;
          const { isPublic, name } = build;
          if (!isPublic) return undefined;

          return <NotificationCard
            label={`${userName} updated the "${name}" build`}
            description={`"${name}" was updated by ${userName} on ${eventTime.toDateString()}. Click here to check it out!`}
            href={`/builder/${buildId}`}
            target="_blank"
            icon={
              <MdEdit
                className="text-primary-500 h-7 w-7 flex-none"
                aria-hidden="true"
              />
            }
            read={isRead}
            hidden={isHidden}
            notificationStatusCallback={notificationStatusCallback}
          />
        }
      }
    })
  );
}