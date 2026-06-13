import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ArrowUpIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowUp} />;
}
