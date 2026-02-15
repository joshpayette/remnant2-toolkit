import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

export function ChevronLeftIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faChevronLeft} />;
}
