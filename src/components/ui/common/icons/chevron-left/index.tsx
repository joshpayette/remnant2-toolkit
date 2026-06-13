import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ChevronLeftIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChevronLeft} />;
}
