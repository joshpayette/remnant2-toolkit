import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

export function ArrowRightIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowRight} />;
}
