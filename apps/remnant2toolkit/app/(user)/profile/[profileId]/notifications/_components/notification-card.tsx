import { BaseButton, BaseLink, cn } from '@repo/ui';
import { MdHideSource, MdHistory, MdMarkChatRead, MdMarkChatUnread } from 'react-icons/md';

import { NotificationCardContent } from './notification-card-content';

export interface NotificationCardProps {
  href: string;
  disabled?: string;
  target?: '_blank';
  label: string;
  description: string;
  icon: React.ReactNode;
  read: boolean;
  hidden: boolean;
  notificationStatusCallback: (read: boolean, hidden: boolean) => void;
}

export function NotificationCard({
  href,
  target,
  description,
  icon,
  label,
  read,
  hidden,
  notificationStatusCallback
}: NotificationCardProps) {
  return (
    <div className='flex flex-row'>
      <BaseLink
        href={href}
        key={label}
        target={target}
        onClick={() => read ? {} : notificationStatusCallback(true, hidden)}
        className={cn(
          'bg-background-solid/50 ring-background-solid/10 hover:border-primary-500 flex-1 mb-2 min-h-12 gap-x-4 rounded-xl border border-transparent p-4 ring-1 ring-inset content-center',
        )}
      >
        <NotificationCardContent
          icon={icon}
          label={label}
          description={description}
        />
      </BaseLink>
      <BaseButton color={read ? 'cyan' : 'purple'} onClick={() => notificationStatusCallback(!read, hidden)}>
        {read ? <MdMarkChatUnread/> : <MdMarkChatRead/>}
      </BaseButton>
      <BaseButton color={hidden ? 'green' : 'red'} onClick={() => notificationStatusCallback(read, !hidden)}>
        {hidden ? <MdHistory/> : <MdHideSource/>}
      </BaseButton>
    </div>
  );
}
