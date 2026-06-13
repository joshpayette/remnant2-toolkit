import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ArrowRightIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon className={className} icon={faArrowRight} />;
}
