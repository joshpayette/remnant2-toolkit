import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons/faInbox';

export function InboxIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faInbox} />;
}
