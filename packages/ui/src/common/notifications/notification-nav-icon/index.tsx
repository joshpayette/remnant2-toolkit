import { MdInbox, MdMarkEmailUnread } from 'react-icons/md';
import { BaseLink } from '../../../base/link';

export function NotificationNavIcon({ hasUnread, href }: { hasUnread: boolean, href: string }) {
  return <BaseLink href={href}>
    {hasUnread 
      ? <MdMarkEmailUnread className="ui-h-6 ui-w-6" color='goldenrod' />
      : <MdInbox className="ui-h-6 ui-w-6" color='steelblue' />}
    </BaseLink>
}
