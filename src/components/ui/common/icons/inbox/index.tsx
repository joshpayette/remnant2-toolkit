import { faInbox } from '@fortawesome/free-solid-svg-icons/faInbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function InboxIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faInbox} />;
}
