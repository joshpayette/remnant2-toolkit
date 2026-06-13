import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ChevronUpIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChevronUp} />;
}
