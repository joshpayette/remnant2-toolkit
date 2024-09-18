import {
  type AnnouncementNotification,
  type Build,
  type BuildNewNotification,
  type BuildUpdateNotification,
  type NotificationBase,
  type User,
} from '@repo/db';

export type FullNotification = NotificationBase & { createdBy: User } & (
    | FullAnnouncementNotification
    | FullBuildNewNotification
    | FullBuildUpdateNotification
  );

type FullAnnouncementNotification = {
  type: 'Announcement';
  announcementNotification: AnnouncementNotification;
};

type FullBuildNewNotification = {
  type: 'BuildNew';
  buildNewNotification: BuildNewNotification & { build: Build };
};

type FullBuildUpdateNotification = {
  type: 'BuildUpdate';
  buildUpdateNotification: BuildUpdateNotification & { build: Build };
};
