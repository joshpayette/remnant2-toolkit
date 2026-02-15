import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

export function ChevronRightIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChevronRight} />;
}
