import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ChevronRightIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChevronRight} />;
}
