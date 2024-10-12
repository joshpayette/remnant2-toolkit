import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';

export function ChevronUpIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChevronUp} />;
}
