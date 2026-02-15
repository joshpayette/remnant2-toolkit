import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';

export function ArrowUpIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowUp} />;
}
